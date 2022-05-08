const authController = require("../controllers/auth.controller");
const companyController = require("../controllers/company.controller");



module.exports = (app)=>{

    // signup 
    app.post("/jobhunt/api/v1/auth/signup", authController.signup);

    // signin
    app.post("/jobhunt/api/v1/auth/signin", authController.signin);

    

}  