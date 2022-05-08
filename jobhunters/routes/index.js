
const companyRoutes = require('./company.route')
const authRoutes = require("./auth.routes");
const companyRoutes = require("./company.routes");
module.exports = (app)=>{
    authRoutes(app);
    companyRoutes(app);
}