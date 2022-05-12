
const authRoutes = require("./auth.routes");
const companyRoutes = require("./company.routes");
const jobsRoutes = require("./jobs.routes");


module.exports = (app)=>{
    authRoutes(app);
    companyRoutes(app);
    jobsRoutes(app);
}