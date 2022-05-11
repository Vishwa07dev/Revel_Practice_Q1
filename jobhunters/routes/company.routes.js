const companyController = require("../controllers/company.controller");
const {authJwt} = require("../middlewares");


module.exports = (app) => {
    
    app.post("/jobhunter/ap/v1/companies", [authJwt.verifyToken, authJwt.isAdminOrRecruiter], companyController.createCompany);

    app.put("/jobhunter/ap/v1/companies/{id}", [authJwt.verifyToken, authJwt.isAdmin], companyController.updateCompany);

    app.delete("/jobhunter/ap/v1/companies/{id}", [authJwt.verifyToken, authJwt.isAdmin], companyController.deleteCompany);

    app.get("/jobhunter/ap/v1/companies/", [authJwt.verifyToken], companyController.getAllCompanies);

    app.get("/jobhunter/ap/v1/companies/{id}", [authJwt.verifyToken], companyController.getOneCompany);


}