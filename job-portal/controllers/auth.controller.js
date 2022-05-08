const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const constants = require('../utils/constants');




exports.signup = async (req, res) => {
    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        password: bcrypt.hashSync(req.body.password, 8),
        email: req.body.email
    }



    try {
        const userCreated = await User.create(userObj);
        console.log("User created ", userCreated);

        const userCreationResponse = {
            name: userCreated.name,
            userId: userCreated.userId,
            email: userCreated.email,
            userType: userCreated.userType,
            jobsApplied: userCreated.jobsApplied,
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt
        }

        res.status(201).send(userCreationResponse);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Some internal server error."
        })
    }

}


exports.signin = async (req, res) => {
    try {
        var user = await User.findOne({ userId: req.body.userId });
    } catch (err) {
        console.log(err);
    }
    if (user == null) {
        return res.status(400).send({
            message: "User doesn't exit"
        })
    }


    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType
    })
}