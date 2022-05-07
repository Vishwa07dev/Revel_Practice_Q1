// Constants requirements
const { httpCodes, userTypes } = require("../constants");

// Utility requirements
const Check = require("../utils/check");

// Signup request validator
exports.signUp = (req, res, next) => {
  // Validations for mandatory fields
  if (!req.body.name) {
    return res.status(httpCodes.badRequest).send({
      message: "name is a mandatory field",
    });
  }
  if (!req.body.userId) {
    return res.status(httpCodes.badRequest).send({
      message: "userId is a mandatory field",
    });
  }
  if (!req.body.password) {
    return res.status(httpCodes.badRequest).send({
      message: "password is a mandatory field",
    });
  }
  if (!req.body.email) {
    return res.status(httpCodes.badRequest).send({
      message: "email is a mandatory field",
    });
  }

  // Validations for correctness of the provided field values -------------------------------

  //   Check for correct role value
  if (req.params.role && !userTypes.includes(req.params.role)) {
    return res.status(httpCodes.badRequest).send({
      message: "provided role value is invalid",
    });
  }

  //   Check for correct email format
  if (!Check.email(req.body.email)) {
    return res.status(httpCodes.badRequest).send({
      message: "Email format is invalid",
    });
  }

  // --------------------------------------------------------------------------------------------

  // Pass control to next function
  next();
};
