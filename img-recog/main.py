import os
import face_recognition as fr
import flask
import asyncio
import psycopg2
import json
import conf
import jwt

IMG_CACHE: str = "./images/cdn/"
IMG_TEST: str = "./images_test/"
TEST: bool = False

img_cache = []


class UserImage:
    def __init__(self, img_id: str, img_bytes: bytes, is_pfp: bool) -> None:
        self.img_id = img_id
        file_name: str = IMG_CACHE + self.img_id
        if ".jpg" not in img_id:
            file_name += ".jpg"

        if (img_bytes is not None):
            if is_pfp:
                # Write the file
                _file_name = file_name.split(".jpg")[0] + "__pfp__.jpg"
                print(f"Saving ./{_file_name} to the local cache")
                f = open(_file_name, "wb")
                f.write(img_bytes)
                f.close()

            # Write the file
            print(f"Saving ./{file_name} to the local cache")
            f = open(file_name, "wb")
            f.write(img_bytes)
            f.close()

        self.encodings = self._getEncodings(file_name)
        if is_pfp:
            # Adding to cache
            print(f"Adding ./{file_name} to RAM")
            self.img_id = img_id
            img_cache.append(self)

    def _getEncodings(self, file_name: str):
        return fr.face_encodings(fr.load_image_file(file_name))


def getOwner(img_in: "Image", captions: str, is_pfp: bool, user_id: str) -> str:
    matching_img_ids = []

    for image in img_cache:
        print("E")
        for i in range(len(image.encodings)):
            print(" E")
            if image.img_id == img_in.img_id:
                continue

            res = fr.compare_faces(img_in.encodings, image.encodings[i])
            if True in res:
                print(f"{img_in.img_id} matches existing image {image.img_id}.")
                matching_img_ids.append(image.img_id)

    # Get the user id
    users = []
    conn = psycopg2.connect(database=conf.dbname, user=conf.dbuser, password=conf.dbpassword, host=conf.dburl, port=conf.dbport)

    subjects = []
    cur = conn.cursor()
    for img_id in matching_img_ids:
        cur.execute("select public.image.owner_id from public.image where public.image.uid = %s;", (img_id,))

        rows = cur.fetchall()
        for row in rows:
            subject_id, = row
            if subject_id not in subjects:
                subjects.append(subject_id)
                print("Ins")
                cur.execute("insert into public.users_in_image(user_id, image_uid) values (%s, %s);", (subject_id, img_in.img_id))

    cur.execute("insert into public.image(owner_id, captions, uid, processed) values (%s, %s, %s, %s);", (user_id, captions, img_in.img_id, True,))

    if is_pfp:
        cur.execute("update user set pfp_uid = %s where id = %s;", (img_in.img_id, user_id, ))

    conn.commit()
    conn.close()

    return {
            "img-id": img_in.img_id,
            "in-img": subjects
           }


async def getEncodings(file_name: str):
    return fr.face_encodings(fr.load_image_file(file_name))


async def startupLoadImagesToCache() -> None:
    print("Loading the image cache to RAM...")
    try:
        files = os.listdir(IMG_CACHE)
    except:
        print("No images found")
        files = os.makedirs(IMG_CACHE)

    for file in files:
        print(f"Loading file {file} to RAM...")
        img = UserImage(file, None, "__pfp__" in file)

        if "__pfp__" in file:
            print(f"{len(img.encodings)} encodings")

    print("Loaded the image cache to RAM")


app = flask.Flask(__name__)


@app.route("/")
def index():
    return "running"

@app.route("/upload", methods=["POST", "GET"])
def upload():
    img_id = flask.request.headers.get("img-id")
    caption = flask.request.headers.get("caption")
    is_pfp = bool(flask.request.headers.get("is-pfp"))
    user_id = flask.request.headers.get("user-id")

    data = flask.request.stream.read()

    return getOwner(UserImage(img_id, data, is_pfp), caption, is_pfp, user_id)


async def main():
    print("Setting up the cache")
    await startupLoadImagesToCache()

    print("Starting the AI face recognition server")
    await app.run()


if __name__ == "__main__":
    asyncio.run(main())
