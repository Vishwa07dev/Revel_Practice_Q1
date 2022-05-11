const jobController = require("../controllers/job.controller");
const {authJwt} = require("../middlewares");


module.exports = (app) => {
    
    app.post("/jobhunters/api/v1/jobs", [authJwt.verifyToken, authJwt.isAdminOrRecruiter], jobController.createJob);

    app.put("/jobhunters/api/v1/jobs/{id}", [authJwt.verifyToken, authJwt.isAdminOrRecruiter], jobController.updateJobDetails);

    app.delete("/jobhunters/api/v1/jobs/{id}", [authJwt.verifyToken, authJwt.isAdminOrRecruiter], jobController.deleteJob);

    app.get("/jobhunters/api/v1/jobs/", [authJwt.verifyToken], jobController.getJobDetails);

    app.get("/jobhunters/api/v1/jobs/{id}", [authJwt.verifyToken], jobController.getJobDetailsById);

    app.put("/jobhunters/api/v1/jobs/{jobid}", [authJwt.verifyToken], jobController.applyForJob);
}