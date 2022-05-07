
const authController = require("../controllers/auth.controller");
const {verifySignup} = require("../middlewares");
const {verifySignin} = require("../middlewares");

module.exports = (app)=>{
    
    //  POST 127.0.0.1:8080/jobhunters/api/v1/auth/signup
    app.post("/jobhunters/api/v1/auth/signup", [verifySignup.validateSignupRequest], authController.signup);

    //Sign POST 127.0.0.1:8080/jobhunters/api/v1/auth/signin
    app.post("/jobhunters/api/v1/auth/signin", [verifySignin.validateSigninRequest], authController.signin);


}