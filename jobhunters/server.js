const Express = require("express");

// Server requirements
const { PORT: appPort } = require("./config/server.config");
const bodyParser = require("body-parser");

// MongoDB requirements
const { DB_URL } = require("./config/db.config");

// Mongoose requirements
const Mongoose = require("mongoose");

const app = Express();

app.use(bodyParser.json()); // Essential to convert the incoming json request body to a js object
app.use(bodyParser.urlencoded({ extended: true }));

Mongoose.connect(DB_URL, (err) => {
  if (err) {
    return console.log("error in connection", err);
  }

  return console.log("Connection successful");
});

app.get("/", (req, res) => {
  return res.status(200).send({ requestBody: req.body });
});

module.exports = app.listen(appPort, () => {
  console.log(`app has been started on port number ${appPort}`);
});
