const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");


exports.signup = async (req, res) => {


    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: req.body.userType,
        password: bcrypt.hashSync(req.body.password, 8)
    }

    try {
        const userCreated = await User.create(userObj);

        const userCreationResponse = {
        userId: userCreated.userId,
        email: userCreated.email,
        userType: userCreated.userType,
        createdAt: userCreated.createdAt,
        updatedAt: userCreated.updatedAt
        }
        res.status(201).send(userCreationResponse);
   } catch (err) {
        console.error("Error while creating user", err.message);
        res.status(500).send({
            message: "Internal server error while creating user"
    
        });
    }
}

exports.signin = async (req, res) => {

    const user = await User.findOne({userId: req.body.userId});

    if(user == null) {
        return res.status(400).send({
            message: "Failed ! User id doesn't exist"
        });
    }
 
    if(user.userStatus != constants.userStatus.approved) {
        return res.status(200).send({
            message: "Can't  allow the login as the user is still not approved"
        });
    }

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    console.log(isPasswordValid);

    if(!isPasswordValid) {
        return res.status(401).send({
            message: "Invalid Password"
        });
    }

    const token = jwt.sign({id: user.userId}, config.secret, {
        expiresIn: 600
    });


    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        accessToken: token
    });
}