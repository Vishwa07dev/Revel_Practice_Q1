
const User = require("../models/user.model");

validateSignupRequest = async (req, res, next) => {
    //? Validate if userName exists
    if(!req.body.name) {
        return res.status(400).send({
            message: "Failed ! user name is not provided"
        });
    }
    if(!req.body.userId) {
        return res.status(400).send({
            message: "Failed ! UserId is not provided"
        });
    }
    if(!req.body.email) {
        return res.status(400).send({
            message: "Failed ! Email is not provided"
        });
    }
    if(!req.body.password) {
        return res.status(400).send({
            message: "Failed ! Password is not provided"
        });
    }


    const user = await User.findOne({userId: req.body.userId});
    console.log(user);
    if(user != null) {
        return res.status(400).send({
            message: "Failed ! User Id already exists"
        });
    }
   
    next(); 
}

module.exports = {
    validateSignupRequest: validateSignupRequest
}