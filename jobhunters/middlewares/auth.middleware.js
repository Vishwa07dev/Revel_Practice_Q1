const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const User = require("../models/user.model");
const constants = require("../utils/constants");


/**
 * Authentication
 * 
 *     - If the token passed is valid or no
 * 
 * 
 * 1. If no token is passed in the request header - Not Allowed
 * 2. If token is passed : AUthenticated
 *       if correct allow, else reject 
 */

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

    //If the token was provided, we need to verify it
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
 * If the passed access token is of ADMIN or not
 */

isAdminOrRecruiter = async (req,res, next) =>{

    /**
     * Fetcht user from the DB using the userId
     */
    const user = await User.findOne({userId : req.userId});

    /**
     * Check what is the user type
     */
    if(user && (user.userType == constants.userType.admin || user.userType == constants.userType.recruiter )){
        next();
    }else{
        res.status(403).send({
            message: "Requires ADMIN/RECRUITER role"
        })
    }
}

isStudent = async (req,res, next) =>{

    /**
     * Fetcht user from the DB using the userId
     */
    const user = await User.findOne({userId : req.userId});

    /**
     * Check what is the user type
     */
    if(user && (user.userType == constants.userType.student)){
        next();
    }else{
        res.status(403).send({
            message: "Requires STUDENT role"
        })
    }
}

verifyApplyOrUpdateJob = async (req,res, next) =>{

    const user = await User.findOne({userId : req.userId});

    if(req.query.applyJob){
        if(user.userType != constants.userType.student){
            res.status(403).send({
                message: "Requires STUDENT role"
            })
        }
    }else{
        if(user.userType != constants.userType.admin || user.userType != constants.userType.recruiter){
            res.status(403).send({
                message: "Requires ADMIN/RECRUITER Role"
            })
        }
    }

    next();
}

const authJwt = {
    verifyToken : verifyToken,
    isAdminOrRecruiter : isAdminOrRecruiter,
    isStudent: isStudent,
    verifyApplyOrUpdateJob: verifyApplyOrUpdateJob
};
module.exports= authJwt;