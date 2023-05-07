const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const path = require("path");
const crypto = require("crypto");

const app = express();

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/image-uploader", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const conn = mongoose.connection;

// GridFS Connection
let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Multer Storage
const storage = new GridFsStorage({
  url: "mongodb://localhost:27017/image-uploader",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

// Upload Image Endpoint
app.post("/upload", upload.array("images"), (req, res) => {
  res.json({ message: "Images uploaded successfully!" });
});

app.listen(3000, () => console.log("Server started on port 3000"));
