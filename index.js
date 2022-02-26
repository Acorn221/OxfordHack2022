const multer = require("multer");
const http = require("http");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require('uuid');

const express = require("express");
const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3000;

const allowedTypes = ['.png', '.jpg', 'jpeg'];

const handleError = (err, res) => {
  res
    .status(418)
    .contentType("text/plain")
    .end("TEA!");
};

const upload = multer({
  dest: "./uploadsCache/"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


app.post(
  "/upload",
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
		const fileExt = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.join(__dirname, "./imageUploads/"+uuid()+fileExt);
		
    if (allowedTypes.includes(fileExt)) {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only "+allowedTypes.join(' ')+" files are allowed!");
      });
    }
  }
);




httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// put the HTML file containing your form in a directory named "public" (relative to where this script is located)
app.get("/", express.static(path.join(__dirname, "./public")));