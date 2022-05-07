const authController = require("../controllers/auth.controller");

module.exports = (app) => {
    

    app.post("/jobhunters/api/v1/auth/signup",  authController.signup);

    app.post("/jobhunters/api/v1/auth/signin",  authController.signin);

    app.post("/jobhunters/api/v1/compaines", companyController.createCompany);
}