const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const constants = require('../utils/constants');

exports.signup = async (res, req) => {
    
    const user_to_store = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        password:  bcrypt.hashSync(req.body.password, 8),
    }

    try{
        const stored_user = await User.create( user_to_store );
    } catch(err) {
        console.log("Error in inserting new user:", err.message);
        return res.status(500).send({
            message: `Server error while registering user: ${err.message}`
        });
    }

    const responseData = {
        name: stored_user.name,
        username: stored_user.userId,
        email: stored_user.email,
        userType: stored_user.userType
    }

    return res.status(200).send({
        message: "Successfully signed up",
        output: responseData
    })
}

exports.signin = async (res, req) => {

    const username = req.body.userId;

    try{
        var user = await User.findOne({userId: username});
    } catch(err) {
        console.log("Error while registering user:", err.message);
        return res.status(500).send({
            message: `Server error while registering user: ${err.message}`
        });
    }
    
    if(user) {
    
        const isValid = bcrypt.compareSync(req.body.password, user.password);
    
        if(!isValid) {
            return res.status(401).send({
                message : "Invalid password"
            });
        }

        //Generating tokens
        const token = jwt.sign({id: user.userId}, constants.secret_key, {
            expiresIn: 600
        });

        res.status(200).send({
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            accessToken : token
        });
    } else {
        return res.status(403).send({
            message: "Bad request. No such user exists."
        })
    }

}
