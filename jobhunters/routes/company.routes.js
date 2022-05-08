/**
 * This file will act as the route for authentication and authorzation
 * 
 */

// define the routes - REST endpoints for user registration
const companyController = require("../controllers/companies.controller")
const {auth} = require("../middlewares/");

module.exports = (app)=>{
    
    // CREATE CALL
    app.post("/jobhunters/app/v1/companies", [auth.verifyToken, auth.isAdminOrRecruiter], companyController.addCompany);

    // UPDATE CALL
    app.put("/jobhunters/app/v1/companies/:id", [auth.verifyToken, auth.isAdminOrRecruiter], companyController.updateCompany);

    // DELETE CALL
    app.delete("/jobhunters/app/v1/companies/:id", [auth.verifyToken, auth.isAdminOrRecruiter], companyController.deleteCompany);
    
    // GET ALL COMPANIES
    app.get("/jobhunters/app/v1/companies", [auth.verifyToken], companyController.getAllCompanies);
    
    // GET SINGLE COMPANY
    app.get("/jobhunters/app/v1/companies/:id", [auth.verifyToken], companyController.getOneCompany);

}