import uuid
import requests

IMG_CACHE: str = "./images_test/"


def main():
    f = open(IMG_CACHE + "1.png", "rb")
    test_img = f.read()
    f.close()

    url = "http://localhost:5000/upload"
    headers = {"img-id": str(uuid.uuid4())}

    r = requests.post(url, data=test_img, headers=headers)
    print(r)


if __name__ == "__main__":
    main()
