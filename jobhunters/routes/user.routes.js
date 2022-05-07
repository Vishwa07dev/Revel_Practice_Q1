// Controller imports
const Auth = require("../controllers/auth.controller");

module.exports = (app) => {
  app.post("/jobhunters/api/vi/signup/:roles", Auth.signUp);
  app.post("/jobhunters/api/vi/signup/", Auth.signUp);
  app.post("/jobhunters/api/vi/login/", Auth.login);
};
