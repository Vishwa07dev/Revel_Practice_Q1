const companyController = require("../controllers/company.controller");
const {authJwt} = require("../middlewares");


module.exports = (app) => {
    
    app.post("/jobhunters/ap/v1/companies", [authJwt.verifyToken, authJwt.isAdminOrRecruiter], companyController.createCompany);

    app.put("/jobhunters/ap/v1/companies/{id}", [authJwt.verifyToken, authJwt.isAdmin], companyController.updateCompany);

    app.delete("/jobhunters/ap/v1/companies/{id}", [authJwt.verifyToken, authJwt.isAdmin], companyController.deleteCompany);

    app.get("/jobhuntesr/ap/v1/companies/", [authJwt.verifyToken], companyController.getAllCompanies);

    app.get("/jobhunters/ap/v1/companies/{id}", [authJwt.verifyToken], companyController.getOneCompany);


}