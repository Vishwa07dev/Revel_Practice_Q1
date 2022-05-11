const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const User = require("../models/user.model");
const constants = require("../utils/constants");


// Authentication

verifyToken = (req,res, next) =>{
    /**
     * Read the token from the header
     */
    const token = req.headers['x-access-token'];

    if(!token){
        return res.status(403).send({
            message : "No token provided"
        })
    }

    //If the token is provided, we need to verify it
    jwt.verify(token,config.secret, (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
        //I will try to read the userId from the decoded token and store it in req object
        req.userId = decoded.id;
        next();
    } )
};

/**
 * we have to check that passed access token is for Admin or not.
 */

isAdminOrRecruiter = async (req,res, next) =>{

    
     //1.  Fetch the user from the DB using the userId
    
    const user = await User.findOne({userId : req.userId});


     //2. Check what is the user type
     
    if(user && (user.userType == constants.userType.admin || user.userType == constants.userType.recruiter )){
        next();
    }else{
        res.status(403).send({
            message: "Requires ADMIN/RECRUITER role"
        })
    }
}


const authJwt = {
    verifyToken : verifyToken,
    isAdminOrRecruiter : isAdminOrRecruiter
};
module.exports= authJwt;