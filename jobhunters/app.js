const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Setup the mongodb connection and create on ADMIN user
 */
 mongoose.connect(dbConfig.DB_URL, () => {
    console.log("MongoDB connected");
})

/**
 * Start the express server
 */
 app.listen(serverConfig.PORT, () => {
    console.log("Application has started on the port ", serverConfig.PORT);
})