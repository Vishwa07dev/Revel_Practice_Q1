const jwt = require("jsonwebtoken");
const Config = require("../configs/auth.config");
const User = require("../models/user.model");
const Constants = require("../utils/constants");


verifyToken = (req, res, next) => {

    const token = req.headers['x-access-token'];

    if(!token) {
        return res.status(403).send({
            message: "No token provided"
        });
    }

    console.log("token >>", token);
 
    jwt.verify(token, Config.secret, (err, decoded) =>{
        if(err) {
            console.log("Token expiredAt", err.expiredAt);
            return res.status(401).send({
                message: "Token expired at " + err.expiredAt + ", please create new token"
            });
        } 
       
        req.userId = decoded.id;
        next();
    });
}

isAdminOrRecruiter = async (req, res, next) => {
  
    const user = await User.findOne({userId: req.userId});

   
    if(!user) {
         return res.status(403).send({
            message: "No user Found"
        });
    }
    else if(user && (user.userType == Constants.userTypes.admin || user.userType == Constants.userTypes.recruiter))
        next();
    else {
        return res.status(403).send({
            message: "Requires ADMIN Role"
        });
    }
}
const authJwt = {
    verifyToken: verifyToken,
    isAdminOrRecruiter: isAdminOrRecruiter
};

module.exports = authJwt;