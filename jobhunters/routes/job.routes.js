/**
 * This file will act as the route for authentication and authorzation
 * 
 */

// define the routes - REST endpoints for user registration
const jobController = require("../controllers/job.controller")
const {auth} = require("../middlewares/");

module.exports = (app)=>{
    
    // CREATE CALL
    app.post("/jobhunters/app/v1/jobs", [auth.verifyToken, auth.isAdminOrRecruiter], jobController.createJob);

    // UPDATE CALL
    app.put("/jobhunters/app/v1/jobs/:id", [auth.verifyToken], jobController.updateJob);

    // DELETE CALL
    app.delete("/jobhunters/app/v1/jobs/:id", [auth.verifyToken, auth.isAdminOrRecruiter], jobController.deleteJob);
    
    // GET ALL COMPANIES
    app.get("/jobhunters/app/v1/jobs", [auth.verifyToken], jobController.getAllJobs);
    
    // GET SINGLE COMPANY
    app.get("/jobhunters/app/v1/jobs/:id", [auth.verifyToken], jobController.getOneJob);

}