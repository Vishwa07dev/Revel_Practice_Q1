const companyController = require('../controllers/company.controller');



module.exports = (app)=>{

    // create company
    app.post("/jobhunt/api/v1/companies", companyController.createCompany);

}