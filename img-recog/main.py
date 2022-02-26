import requests
import os
import face_recognition as fr
import flask
import asyncio

IMG_CACHE: str = "./images/"
IMG_TEST: str = "./images_test/"
TEST: bool = False

img_cache = []


class Image:
    def __init__(self, img_id: str, img_bytes: bytes):
        self.img_id = img_id
        file_name: str = IMG_CACHE + self.img_id

        # Write the file
        print("Saving {file_name} to the cache")
        f = open(file_name, "wb")
        f.write(img_bytes)
        f.close()

        # Add to the cache
        print("Adding {file_name} to RAM")
        self.encodings = self._getEncodings(IMG_CACHE + self.img_id)
        img_cache.append(self)

    def __init__(self, img_id: str):
        self.img_id = img_id
        self.encodings = self._getEncodings(IMG_CACHE + self.img_id)
        img_cache.append(self)

    def _getEncodings(self, file_name: str):
        return fr.face_encodings(fr.load_image_file(file_name))

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
        Image(file)

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
