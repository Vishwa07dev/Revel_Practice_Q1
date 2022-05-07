const Express = require("express");

// Server requirements
const { PORT: appPort } = require("./config/server.config");
const bodyParser = require("body-parser");

// MongoDB requirements
const { DB_URL } = require("./config/db.config");

// Mongoose requirements
const Mongoose = require("mongoose");

// Initialization requirements
const { initAdmin } = require("./extras");

const app = Express();

app.use(bodyParser.json()); // Essential to convert the incoming json request body to a js object
app.use(bodyParser.urlencoded({ extended: true }));

Mongoose.connect(DB_URL, (err) => {
  if (err) {
    return console.log("error in connection", err);
  }

  try {
    initAdmin();
  } catch (error) {
    console.error("Some error occurred in root admin creation \n ", error);
  }

  return console.log("Connection successful");
});

require("./routes").userRoutes(app);

module.exports = app.listen(appPort, () => {
  console.log(`app has been started on port number ${appPort}`);
});
