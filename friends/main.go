package main;

import (
  "fmt"
  "net/http"
  "log"
  "os"
  "github.com/joho/godotenv"
  "database/sql"
  _ "github.com/lib/pq"
)

type Config struct {
  dbname string
  dbusername string
  dbpassword string
  dburl string
  dbport string
}

func getconn(config Config) (*sql.DB, error) {
  psqlconn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
    config.dburl,
    config.dbport,
    config.dbusername,
    config.dbpassword,
    config.dbname);
  pq, err := sql.Open("postgres", psqlconn);
  if (err == nil) {
  	err = pq.Ping();
  }
  return pq, err;
}

func getenv(name string) string {
	ret := os.Getenv(name);
	if (ret == "") {
		log.Fatalf("ERROR %s is not set.\n", name);
	}

	return ret;
}

func statusHandler(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintln(w, "running");
}

func main() {
  log.SetFlags(2 | 3);
	log.Println("Starting the friends server...");
	godotenv.Load();
	dbname := getenv("DB_NAME");
	dbusername := getenv("DB_USERNAME");
	dbpassword := getenv("DB_PASSWORD");
  dburl := getenv("DB_URL");
	dbport := getenv("DB_PORT");
	bindaddr := getenv("BIND_ADDR");

	config := Config {dbname: dbname,
  	dbusername: dbusername,
	  dbpassword: dbpassword,
		dburl: dburl,
		dbport: dbport};
	log.Printf("Database configuration: %s.\n", config);

  pq, err := getconn(config);
  if (err != nil) {
    log.Fatalf("Unable to connect to the database %s.\n");
	} else {
		log.Println("Successfully pinged the database, ready to go.");
	}
  pq.Close();

	log.Printf("Started the friends server on http://%s.\n", bindaddr);

  // Setup and start the server
  http.HandleFunc("/", statusHandler);
  log.Fatal(http.ListenAndServe(bindaddr, nil));
}

