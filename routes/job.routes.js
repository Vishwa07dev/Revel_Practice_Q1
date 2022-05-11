const jobController = require("../controllers/job.controller")
const {auth} = require("../middlewares/");

module.exports = (app)=>{
    
    // CREATE CALL
    app.post("/jobhunters/api/v1/jobs", [auth.verifyToken, auth.isAdminOrRecruiter], jobController.addJob);

    // UPDATE CALL
    app.put("/jobhunters/api/v1/jobs/:id", [auth.verifyToken, auth.isAdminOrRecruiter], jobController.updateJob);

    // DELETE CALL
    app.delete("/jobhunters/api/v1/jobs/:id", [auth.verifyToken, auth.isAdminOrRecruiter], jobController.deleteJob);
    
    // GET ALL jobs
    app.get("/jobhunters/api/v1/jobs", [auth.verifyToken], jobController.getAllJobs);
    
    // GET SINGLE job
    app.get("/jobhunters/api/v1/jobs/:id", [auth.verifyToken], jobController.getOneJob);
    //aplly job
    app.post("/jobhunters/api/v1/jobs/apply", jobController.applyJob);
}