/**
 * This file will act as the route for authentication and authorzation
 * 
 */

// define the routes - REST endpoints for user registration
const companyController = require("../controllers/companies.controller")

module.exports = (app)=>{
    
    app.post("/jobhunter/ap/v1/companies", companyController.addCompany);

    app.put("/jobhunter/ap/v1/companies/{id}", companyController.updateCompany);

    app.delete("/jobhunter/ap/v1/companies/{id}", companyController.deleteCompany);
    app.get("/jobhunter/ap/v1/companies", companyController.getAllCompanies);
    app.get("/jobhunter/ap/v1/companies/{id}", companyController.getOneCompany);

}