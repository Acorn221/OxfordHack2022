import requests
import os
import face_recognition as fr
import flask
import uuid

IMG_CACHE: str = "./images/"
IMG_TEST: str = "./images_test/"

img_cache = []

def startupLoadImagesToCache() -> None:
    ret = []
    print("Loading the image cache to RAM...")
    files = []
    try:
        files = os.listdir(IMG_CACHE)
    except:
        print("No images found")
        files = os.makedirs(IMG_CACHE)

    for _file in files:
        file = IMG_CACHE + _file

        print(f"Loading file {file} to RAM...")
        ret.append(fr.face_encodings(fr.load_image_file(file)))

    print("Loaded the image cache to RAM")
    img_cache = ret

def addToCache(binary_blob: bytes, ext: str) -> None:
    file_name: str = IMG_CACHE + uuid.uuid4() + ext

    # Write the file
    print("Saving {file_name} to the cache")
    f = open(file_name, "wb")
    f.write(data)
    f.close()

    # Add to the cache
    print("Adding {file_name} to RAM")
    img_cache.append(fr.face_encodings(fr.load_image_file(file_name)))

app = flask.Flask(__name__)

@app.route("/")
def index():
  return "running"

def runFrTests():
    ret = []
    print("PRE_TESTS: Loading the image cache to RAM...")
    files = []
    try:
        files = os.listdir(IMG_TEST)
    except:
        print("PRE_TESTS: No images found")
        files = os.makedirs(IMG_TEST)

    for _file in files:
        if _file == "all.jpg":
            continue

        file = IMG_TEST + _file

        print(f"PRE_TESTS: Loading file {file} to RAM...")
        ret.append(fr.face_encodings(fr.load_image_file(file)))

    print("PRE_TESTS: Loaded the image cache to RAM")

    allImgs = fr.face_encodings(fr.load_image_file(IMG_TEST + "all.jpg"))
    matches = 0

    for allImg in allImgs:
        for img in ret:
            results = fr.compare_faces(img, allImg)
            if len(results) == 0:
                continue
            if results[0]:
                matches += 1

    print(f"Tests passing: {matches}.")

if __name__ == "__main__":
  print("Starting the AI face recognition server")
  runFrTests()

  startupLoadImagesToCache()
  app.run()

