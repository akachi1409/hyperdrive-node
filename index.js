const express = require("express");
const cors = require("cors");
const Hyperdrive = require("hyperdrive");
const Corestore = require("corestore");
const fs = require("fs");
const corestore = new Corestore("storage");

const drive = new Hyperdrive(corestore /* optionalKey */);
// to initialize the keys and other properties of the drive


const app = express();
app.use(express.json()); // Parses incoming JSON requests
app.use(
  express.urlencoded({
    extended: true,
  })
); // Parses incoming request body
app.use(cors());
// app.get("/", (req, res) => {
//   res.send("Successful response.");
// });

app.route("/").get(async function (req, res) {
  // console.log("req", req);
  var data = await drive.get('/blob.txt')
  console.log("data", data.toString());
  res.status(200).send({
    status: 200,
    data: data.toString()
  })  
});

app.route("/").post(async function (req, res) {
  console.log("req post", req.body.username);
  await drive.ready();
  const ws = drive.createWriteStream("/blob.txt");

  ws.write(req.body.username);
  ws.end();
  res.status(200).send({
    status:200
  })
});
app.listen(5000, () => console.log("Example app is listening on port 3000."));
