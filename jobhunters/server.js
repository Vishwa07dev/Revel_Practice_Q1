const express = require("express");
const serverConfig = require("./configs/server.config");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
const bodyParser = require("body-parser");



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(dbConfig.DB_URL, () => {
    console.log(`Connecting to MongoDB...`);
    console.log(`Connection Successful`);
});


app.listen(serverConfig.PORT, () => {
    console.log(`JobHunters App listening on port ${serverConfig.PORT}`);
})