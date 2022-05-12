/**
 * This file will act as the route for jobs
 * 
 */

// define the routes - REST endpoints for josb
const jobsController = require("../controllers/jobs.controller")
const {auth} = require("../middlewares")

module.exports = (app)=>{
    
    
    app.post("/jobhunters/api/v1/jobs", [auth.verifyToken,auth.isAdminOrRecruiter],jobsController.createJob);
 
    app.put("/jobhunters/api/v1/jobs/:id", [auth.verifyToken],jobsController.updateJob);

    app.delete(" /jobhunters/api/v1/jobs/:id", [auth.verifyToken,auth.isAdminOrRecruiter],jobsController.deleteJob);

    app.get("/jobhunters/api/v1/jobs/:id",[auth.verifyToken],jobsController.getOneJob);

    app.get("/jobhunters/api/v1/jobs",jobsController.getOneJob);

    



}