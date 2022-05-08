/**
 * This file will act as the route for authentication and authorzation
 * 
 */

// define the routes - REST endpoints for user registration
const compnayController = require('../controllers/company.controller');
const { authjwt } = require('../middleware')


module.exports = (app)=>{
    
    //  POST 127.0.0.1:8080/jobhunter/ap/v1/companies
    app.post("/jobhunter/ap/v1/companies", [authjwt.verifyToken,authjwt.isAdmin],compnayController.addCompanies);

    //PUT 127.0.0.1:8080/jobhunter/ap/v1/companies/{id}
    app.put("/jobhunter/ap/v1/companies/:id",[authjwt.verifyToken,authjwt.isAdmin],compnayController.updateCompany);

     
    //DELETE 127.0.0.1:8080/jobhunter/ap/v1/companies/{id}
    app.delete("/jobhunter/ap/v1/companies/:id",[authjwt.verifyToken,authjwt.isAdmin], compnayController.deleteCompany);

    //GET 127.0.0.1:8080/jobhunter/ap/v1/companies
    app.get("/jobhunter/ap/v1/companies",[authjwt.verifyToken,authjwt.isAdmin], compnayController.getCompany);

    
    //GET 127.0.0.1:8080/jobhunter/ap/v1/companies/{id}
    app.get("/jobhunter/ap/v1/companies/:id",[authjwt.verifyToken,authjwt.isAdmin], compnayController.findCompanyById);
    
}