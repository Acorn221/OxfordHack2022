import os
import face_recognition as fr
import flask
import asyncio
import psycopg2
import json

IMG_CACHE: str = "./images/"
IMG_TEST: str = "./images_test/"
TEST: bool = False

img_cache = []


class UserImage:
    def __init__(self, img_id: str, img_bytes: bytes) -> None:
        self.img_id = img_id
        file_name: str = IMG_CACHE + self.img_id

        if (img_bytes is not None):
            # Write the file
            print(f"Saving {file_name} to the local cache")
            f = open(file_name, "wb")
            f.write(img_bytes)
            f.close()

        # Adding to cache
        print(f"Adding {img_id} to RAM")
        self.img_id = img_id
        self.encodings = self._getEncodings(file_name)
        img_cache.append(self)

    def _getEncodings(self, file_name: str):
        return fr.face_encodings(fr.load_image_file(file_name))


def getOwner(img_in: "Image") -> str:
    matching_img_ids = []

    for image in img_cache:
        for i in range(len(image.encodings)):
            if image.img_id == img_in.img_id:
                continue

            res = fr.compare_faces(img_in.encodings, image.encodings[i])
            if True in res:
                print(f"{img_in.img_id} matches existing image {image.img_id}.")
                matching_img_ids.append(image.img_id)

    # Get the user id
    users = []
    for img_id in matching_img_ids:
        conn = psycopg2.connect(database=conf.dbname, user=conf.dbuser, password=conf.dbpassword, host=conf.dburl, port=conf.dbport)




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
        UserImage(file, None)

    print("Loaded the image cache to RAM")


async def runFrTests():
    ret = []
    print("PRE_TESTS: Loading the image cache to RAM...")
    files = []
    try:
        files = os.listdir(IMG_TEST)
    except:
        print("PRE_TESTS: No images found")
        files = os.makedirs(IMG_TEST)

    for _file in files:
        file = IMG_TEST + _file

        print(f"PRE_TESTS: Loading file {file} to RAM...")
        ret.append(await getEncodings(file))

    print("PRE_TESTS: Loaded the image cache to RAM")

    print("PRE_TESTS: Checking the image matches")
    allImgs = await getEncodings("./all.jpg")
    matches = 0

    for allImg in allImgs:
        for img in ret:
            results = fr.compare_faces(img, allImg)
            if len(results) == 0:
                continue
            if results[0]:
                matches += 1

    print(f"Tests passing: {matches} out of {len(ret)}.")

    johnImg = await getEncodings("./test1.jpg")
    johnImg2 = await getEncodings("./test2.jpg")

    print(f"Found imgs: {len(johnImg)} {len(johnImg2)}")
    for img in johnImg:
        print(fr.compare_faces(johnImg2, img))


app = flask.Flask(__name__)


@app.route("/")
def index():
    return "running"

@app.route("/upload", methods=["POST", "GET"])
def upload():
    img_id = flask.request.headers.get("img-id")
    data = flask.request.stream.read()

    return getOwner(UserImage(img_id, data))


async def main():
    if TEST:
        print("Running pre flight tests")
        await runFrTests()

    print("Setting up the cache")
    await startupLoadImagesToCache()

    print("Starting the AI face recognition server")
    await app.run()


if __name__ == "__main__":
    asyncio.run(main())
