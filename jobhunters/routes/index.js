
const companyRoutes = require('./company.route')
const authRoutes = require("./auth.routes");
module.exports = (app)=>{
    authRoutes(app);
    companyRoutes(app);
}