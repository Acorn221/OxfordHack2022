import uuid
import psycopg2
import requests
import os
import conf

IMG_CACHE: str = "./images_test/"

users = [
    ("Shrey", "1f92669d-9617-403c-869e-7e3dacfeddd3__pfp__", 44441),
    ("James", "3452669d-9617-403c-869e-7e9dacfcddd3__pfp__", 44442),
    ("Charlie", "7772669d-9617-403c-869e-7e9dacfcddd3__pfp__", 44443),
    ("Obama", "8772669d-9617-403c-869e-7e9dacfcddd3", 44444)
]


def main():
    f = open(IMG_CACHE + "1.png", "rb")
    test_img = f.read()
    f.close()

    conn = psycopg2.connect(database=conf.dbname, user=conf.dbuser, password=conf.dbpassword, host=conf.dburl, port=conf.dbport)
    cur = conn.cursor()
    cur.execute("delete from users_in_image where true;")
    cur.execute("delete from public.image where true;")
    cur.execute("delete from public.user where true;")

    # Insert the users
    for usr in users:
        user_name = usr[0]
        user_id = usr[2]

        print(f"Inserting {user_name} into user")
        cur.execute("insert into public.user(user_name, id) values (%s, %s);", (user_name, user_id))

    # Insert the images
    for usr in users:
        user_name = usr[0]
        user_pfp = usr[1].split("__pfp__")[0]
        user_id = usr[2]

        uid = uuid.uuid4()

        print(f"Inserting image {uid} for {user_name}")
        cur.execute("insert into public.image(captions, owner_id, processed, uid) values(%s, %s, %s, %s);", ("test data", user_id, True, user_pfp))

        print(f"Updating the pfp")
        cur.execute("update public.user set pfp_uid = %s where id = %s;", (user_pfp, user_id))

        cur.execute("insert into public.users_in_image(user_id, image_uid) values(%s, %s);", (user_id, user_pfp));

    conn.commit()
    conn.close()


if __name__ == "__main__":
    main()
