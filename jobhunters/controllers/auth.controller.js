const Bcrypt = require("bcryptjs");

// Model requirements
const User = require("../models/user.model");

// Constants requirements
const { userType, userStatus, httpCodes } = require("../constants");

// Signup controller
exports.signUp = async (req, res) => {
  const userRole = req.params.role;

  // Set the user status to pending if the user is an admin
  if (userRole === userType.admin) {
    req.body.userStatus = userStatus.pending;
  }

  //   Creation of the user
  const user = {};
  user.name = req.body.name;
  user.userId = req.body.userId;
  user.password = Bcrypt.hashSync(req.body.password, 8);
  user.email = req.body.email;
  user.userStatus = req.body.userStatus;
  user.userType = userRole;

  try {
    //   Creating the user in the database
    const createdUser = await User.create(user);

    //   Creating the details that will be send to the user as a response
    const details = {
      name: createdUser.name,
      userId: createdUser.userId,
      userEmail: createdUser.email,
      userStatus: createdUser.userStatus,
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
