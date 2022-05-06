const Express = require("express");

// Server requirements
const { PORT: appPort } = require("./config/server.config");

// MongoDB requirements
const { DB_URL } = require("./config/db.config");

// Mongoose requirements
const Mongoose = require("mongoose");

const app = Express();

Mongoose.connect(DB_URL, (err) => {
  if (err) {
    return console.log("error in connection", err);
  }

  return console.log("Connection successful");
});

module.exports = app.listen(appPort, () => {
  console.log(`app has been started on port number ${appPort}`);
});
