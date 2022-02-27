import psycopg2

i = 0

class User:
    def __init__(self, name):
        self.id = i
        i += 1
        self.name = name

    def addToDb(self, cursor):
        cursor.execute("insert into public.user(id, user_name) values(%s, %s);", (self.id, selfname,))
        cursor.commit()

print("Generating users")
user = [User("John"), User("James"), User("Danny"), User("Shrey")]


