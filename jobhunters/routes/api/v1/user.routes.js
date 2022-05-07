// Controller requirements
const User = require("../../../controllers/auth.controller");

// Middleware requirements
const { validate } = require("../../../middlewares");

module.exports = (app) => {
  app.post("/jobhunters/api/v1/users/:role", [validate.signUp], User.signUp);
  app.post("/jobhunters/api/v1/users/", [validate.signUp], User.signUp);
};
