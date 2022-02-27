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

type Profile struct {
  User_name string
  User_id string
  User_pfp string
}

type Post struct {
  User_name string
  User_id string
  User_pfp string
  Image_id string
  In_image []Profile;
}

// Utils

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


// Serve funcs
func mkuser(w http.ResponseWriter, r *http.Request) {
  log.Println("Making a user");

	// Connect and select
	pq, err := getconn(conf);
	if (err != nil) {
    fmt.Fprintln(w, mkError("making a user"));
    log.Println(err);
    return;
	}
  defer pq.Close();

	stmt, err := pq.Prepare("insert into public.user(user_name) values ($1);");
	if (err != nil) {
    fmt.Fprintln(w, mkError("making a user"));
    log.Println(err);
    return;
	}

	defer stmt.Close();

	_, err = stmt.Exec(r.Header.Get("user_name"));
	if (err != nil) {
    fmt.Fprintln(w, mkError("making a user"));
    log.Println(err);
    return;
	}

	stmt, err = pq.Prepare("select id from public.user where user_name = $1;");
	if (err != nil) {
    fmt.Fprintln(w, mkError("making a user"));
    log.Println(err);
    return;
	}

	defer stmt.Close();

	rows, err := stmt.Query(r.Header.Get("user_name"));
	if (err != nil) {
    fmt.Fprintln(w, mkError("making a user"));
    log.Println(err);
    return;
	}

	defer rows.Close();
	
	for rows.Next() {
		var id int
		rows.Scan(&id);

		fmt.Fprintf(w, "{\"id\": %d}", id);
		return;
	}

	fmt.Fprintln(w, mkError("Something went wrong - idk mate"));
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
  	"public.user.id, public.user.pfp_uid, public.image.uid " +
  	"from public.user, " +
  	"public.image " +
  	"where public.image.processed = true and " +
  	"public.image.owner_id = public.user.id limit 25;");
	if (err != nil) {
    fmt.Fprintln(w, mkError("cannot fetch posts"));
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
    var img_id string
    in_img := make([]Profile, 0);

  	// Put the rest of the data in the struct
    err = rows.Scan(&user_name,
      &user_id,
      &pfp_uid,
      &img_id);

		if (err != nil) {
      fmt.Fprintln(w, mkError("cannot fetch random posts"));
      log.Println(err);
      return;
  	}
	
  	// Get the in image crap	
  	stmt, err := pq.Prepare("select public.user.id, " +
      "public.user.user_name, " +
      "public.user.pfp_uid " +
      "from public.user, public.users_in_image, public.image " +
      "where public.user.id = public.users_in_image.user_id and " +
    	"public.users_in_image.image_uid = public.image.uid and " +
    	"public.image.uid = $1;");
    if (err != nil) {
      fmt.Fprintln(w, mkError("cannot fetch profile"));
      log.Println(err);
		  return;
    }

  	rows_inner, err := stmt.Query(img_id);
    defer rows_inner.Close();

    for rows_inner.Next() {
      var user_name_ string
      var user_id_ string
      var pfp_uid_ string

      err = rows_inner.Scan(&user_name_,
        &user_id_,
        &pfp_uid_);
      if (err != nil) {
  		  fmt.Fprintln(w, mkError("cannot fetch profile"));
	      log.Println(err);
		    return;
	    }

      profile := Profile{User_name: user_name_,
        User_id: user_id_,
  	    User_pfp: pfp_uid_};
      in_img = append(in_img, profile);
	  }

	  // Insert the whole post
    post := Post{User_name: user_name,
  	  User_id: user_id,
    	User_pfp: pfp_uid,
			Image_id: img_id,
    	In_image: in_img};
	  posts = append(posts, post);
	}

	// To json
  jsonret, err := json.Marshal(posts);
	if (err != nil) {
    fmt.Fprintln(w, mkError("cannot fetch random posts"));
    log.Println(err);
    return;
	}

	log.Printf("Returned %d results.\n", len(posts));

	ret := string(jsonret);
  fmt.Fprintln(w, ret);
}

func getprofile(w http.ResponseWriter, r *http.Request) {
  log.Println("Returning the feed for a profile");

	// Connect and select
	pq, err := getconn(conf);
	if (err != nil) {
    fmt.Fprintln(w, mkError("cannot fetch random posts for a profile"));
    log.Println(err);
    return;
	}
  defer pq.Close();

	user_id := r.Header.Get("user_id");
	stmt, err := pq.Prepare("select public.user.user_name, " +
  	"public.user.id, public.user.pfp_uid, public.image.uid " +
  	"from public.user, " +
  	"public.image " +
  	"where public.image.processed = true and " +
  	"public.image.owner_id = public.user.id and " +
  	"public.user.id = $1 limit 25;");
	if (err != nil) {
    fmt.Fprintln(w, mkError("cannot fetch posts for a profile"));
    log.Println(err);
    return;
	}

	rows, err := stmt.Query(user_id);
	if (err != nil) {
    fmt.Fprintln(w, mkError("cannot fetch posts for a profile"));
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
    var img_id string
    in_img := make([]Profile, 0);

  	// Put the rest of the data in the struct
    err = rows.Scan(&user_name,
      &user_id,
      &pfp_uid,
      &img_id);

		if (err != nil) {
      fmt.Fprintln(w, mkError("cannot fetch random posts for a profile"));
      log.Println(err);
      return;
  	}
	
  	// Get the in image crap	
  	stmt, err := pq.Prepare("select public.user.id, " +
      "public.user.user_name, " +
      "public.user.pfp_uid " +
      "from public.user, public.users_in_image, public.image " +
      "where public.user.id = public.users_in_image.user_id and " +
    	"public.users_in_image.image_uid = public.image.uid and " +
    	"public.image.uid = $1;");
    if (err != nil) {
      fmt.Fprintln(w, mkError("cannot fetch profile for a profile"));
      log.Println(err);
		  return;
    }

  	rows_inner, err := stmt.Query(img_id);
    defer rows_inner.Close();

    for rows_inner.Next() {
      var user_name_ string
      var user_id_ string
      var pfp_uid_ string

      err = rows_inner.Scan(&user_name_,
        &user_id_,
        &pfp_uid_);
      if (err != nil) {
  		  fmt.Fprintln(w, mkError("cannot fetch profile for a profile"));
	      log.Println(err);
		    return;
	    }

      profile := Profile{User_name: user_name_,
        User_id: user_id_,
  	    User_pfp: pfp_uid_};
      in_img = append(in_img, profile);
	  }

	  // Insert the whole post
    post := Post{User_name: user_name,
  	  User_id: user_id,
    	User_pfp: pfp_uid,
			Image_id: img_id,
    	In_image: in_img};
	  posts = append(posts, post);
	}

	// To json
  jsonret, err := json.Marshal(posts);
	if (err != nil) {
    fmt.Fprintln(w, mkError("cannot fetch random posts for a profile"));
    log.Println(err);
    return;
	}

	log.Printf("Returned %d results.\n", len(posts));

	ret := string(jsonret);
  fmt.Fprintln(w, ret);
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
  http.HandleFunc("/getprofile", getprofile);
  http.HandleFunc("/mkaccount", mkuser);
  log.Fatal(http.ListenAndServe(bindaddr, nil));
}

