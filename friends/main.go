package main;

import (
  "fmt"
  "net/http"
  "log"
  "os"
  "github.com/joho/godotenv"
  "database/sql"
  "encoding/json"
  _ "github.com/lib/pq"
)

type Config struct {
  dbname string
  dbusername string
  dbpassword string
  dburl string
  dbport string
}

type InImage struct {
  user_name string
  user_id string
	user_pfp string
}

type Post struct {
  user_name string
  user_id string
  user_pfp string
  image_id string

  in_image []InImage;
}

var conf = Config {};
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

type Err struct {
  errmsg string
};

func mkError(err string) string {
  errstruct := Err{errmsg: err};
  ret, _ := json.Marshal(errstruct);
  return string(ret);
}

func getfeed(w http.ResponseWriter, r *http.Request) {
  log.Println("Returning the feed");

	// Connect and select
	pq, err := getconn(conf);
	if (err != nil) {
    fmt.Fprintln(w, mkError("cannot fetch random posts"));
    log.Println(err);
    return;
	}
  defer pq.Close();

	rows, err := pq.Query("select public.user.user_name, " +
	"public.user.id, public.user.pfp_uid, public.image.uid, " +
	"public.users_in_image.user_id " +
	"from public.user, " +
	"public.image, public.users_in_image " +
	"where public.image.processed = true and " +
	"public.image.uid = public.users_in_image.image_uid limit 25;");
	if (err != nil) {
    fmt.Fprintln(w, mkError("cannot fetch posts "));
    log.Println(err);
    return;
	}

	defer rows.Close();

	// Get from table
	posts := make([]Post, 0);
  for rows.Next() {
    var user_name string
    var user_id string
    var pfp_uid string
    var uid string

    err := rows.Scan(&user_name,
      &user_id,
      &pfp_uid,
      &uid,
      &user_id);

		if (err != nil) {
      fmt.Fprintln(w, mkError("cannot fetch random posts "));
      log.Println(err);
      return;
  	}

		posts = append(posts, Post{user_name: user_name,
		  user_id: user_id,
			user_pfp: pfp_uid,
			image_id: pfp_uid});
	}

	// To json
  json, err := json.Marshal(posts);
	if (err != nil) {
    fmt.Fprintln(w, mkError("cannot fetch random posts "));
    log.Println(err);
    return;
	}

  fmt.Fprintln(w, string(json));
}

func main() {
  log.SetFlags(2 | 3);
	log.Println("Starting the friends server...");

	// Get conf
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
  conf = config;
	log.Printf("Database configuration: %s.\n", config);

	// Test config
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
  http.HandleFunc("/getfeed", getfeed);
  log.Fatal(http.ListenAndServe(bindaddr, nil));
}

