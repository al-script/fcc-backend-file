// init project
require("dotenv").config();
var express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var cors = require("cors");
var app = express();

// basic config and routing
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// listen for requests
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});

// log requests in console
app.use("/", function (req, res, next) {
  console.log("+++");
  console.log(req.method + " " + req.path + " - " + req.ip);
  console.log("---");
  next();
});

// handle file analysis and json response
app.post("/api/fileanalyse", function (req, res) {
  let fileName = req.files.upfile.name;
  let fileType = req.files.upfile.mimetype;
  let fileSize = req.files.upfile.size;
  console.log(fileName, fileType, fileSize);
  res.json({ name: fileName, type: fileType, size: fileSize });
});
