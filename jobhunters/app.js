const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
const constant = require("./utils/constants");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Setup the mongodb connection and create on ADMIN user
 */
 mongoose.connect(dbConfig.DB_URL, async() => {
    console.log("MongoDB connected");
    


    await User.collection.drop();// Since this a dev setup
    

   // if(user == null){
    const user = await User.create({
        name : "Vishwa Mohan",
        userId : "admin",
        password : bcrypt.hashSync("Welcome1",8),
        email : "kankvish@gmail.com",
        userType :  constant.userType.admin   
    });
    console.log("admin created", user);
// }
    
});

require('./routes/auth.routes')(app);



/**
 * Start the express server
 */
 app.listen(serverConfig.PORT, () => {
    console.log("Application has started on the port ", serverConfig.PORT);
})