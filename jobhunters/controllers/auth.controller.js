const Bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");

// Model requirements
const User = require("../models/user.model");

// Constants requirements
const { httpCodes, authSecret } = require("../utils/constants.js");

// Signup controller
exports.signUp = async (req, res) => {
  const userRole = req.params.role;

  //   Creation of the user
  const user = {};
  user.name = req.body.name;
  user.userId = req.body.userId;
  user.password = Bcrypt.hashSync(req.body.password, 8);
  user.email = req.body.email;
  user.userType = userRole;

  try {
    //   Creating the user in the database
    const createdUser = await User.create(user);

    //   Creating the details that will be send to the user as a response
    const details = {
      name: createdUser.name,
      userId: createdUser.userId,
      userEmail: createdUser.email,
    };

    // Send successful response if user is created
    return res.status(httpCodes.success).send({
      message: "User creation was successful",
      details,
    });
  } catch (err) {
    console.error(err);

    // Send unsuccessful response if any error occurred while creating the user
    return res.status(httpCodes.internalServerError).send({
      message: "Some error occurred while creating the user",
      errorMessage: err.message,
    });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    // Find the user
    const user = User.findOne({ userId: req.body.userId });

    // Return if the user doesn't exist
    if (!user) {
      return res.status(httpCodes.badRequest).send({
        message: "User doesn't exist",
      });
    }

    // Check the user's password
    const validPassword = Bcrypt.compareSync(req.body.password, user.password);

    if (!validPassword) {
      return res.status(httpCodes.forbidden).send({
        message: "Please check your password",
      });
    }

    // Generate token if the user exist
    const token = Jwt.sign({ id: user.userId }, authSecret);

    // Return the response with the generated token
    const details = {};
    details.userId = user.name;
    details.token = token;

    return res.status(httpCodes.success).send({
      message: "Success",
      details,
    });
  } catch (err) {
    return res.status(httpCodes.internalServerError).send({
      message: "Some error in login",
      error: err.message,
    });
  }
};
