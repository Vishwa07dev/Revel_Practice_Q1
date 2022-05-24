
/**
 * This file will act as the route for authentication and authorzation
 * 
 */


// define the routes - REST endpoints for user registration
const authController = require("../controllers/auth.controller")

module.exports = (app)=>{
    
    //  POST 127.0.0.1:8080/jobhunters/api/v1/auth/signup
    app.post("/jobhunters/api/v1/auth/signup", authController.signup);

    //Sign POST 127.0.0.1:8080/jobhunters/api/v1/auth/signin
    app.post("/jobhunters/api/v1/auth/signin", authController.signin);

}