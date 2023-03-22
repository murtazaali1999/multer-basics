//LIBRARY IMPORTS
const express = require("express");
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images")
        //path of the destination folder
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname));
        //when file is uploaded it gives the name and the whole path of it
        // date + path
    }
})

const upload = multer({ storage: storage }) //storage is the configuration for multer

const app = express();
app.use(express.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("upload.ejs")
})

app.post("/upload", upload.single("image"), (req, res) => { //uploading done as a middleware in multer
    res.send("Happy");
})

app.listen(3000);
console.log("Running");