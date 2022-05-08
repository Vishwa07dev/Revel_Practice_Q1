/*
* API for the job resource
 
 *   Creating  POST  /jobhunters/api/v1/jobs
 * 
 *   Updating  PUT  /jobhunters/api/v1/jobs/{id}
 * 
 *   Deleting DELETE /jobhunters/api/v1/jobs/{id}
 * 
 *   All the above APIs can be trigger by either ADMIN/owner of the company
 * 
 *   Search  GET /jobhunters/api/v1/jobs
 *           GET /jobhunters/api/v1/jobs/{id}
 * 
 */
const jobController = require('../controllers/job.controller');
const { auth } = require('../middlewares');



exports.module = (app) => {
    // Creating  POST  /jobhunters/api/v1/jobs

    app.post("/jobhunters/api/v1/jobs", [auth.verifyToken, auth.isAdminOrRecruiter], jobController.createJob);

    // Search  GET /jobhunters/api/v1/jobs
    app.get("/jobhunters/api/v1/jobs", [auth.verifyToken], jobController.getAllJobs)

    //         GET /jobhunters/ap/v1/jobs/{id} 
    app.get("/jobhunters/api/v1/jobs/:id", [auth.verifyToken], jobController.getOneJob)

    // Updating  PUT  /jobhunters/api/v1/jobs/{id}

    app.put("/jobhunters/api/v1/jobs/:id", [auth.verifyToken, auth.isAdminOrRecruiter], jobController.updateJob);


    //   Deleting DELETE /jobhunters/api/v1/jobs/{id}

    app.delete("/jobhunters/api/v1/jobs/:id", [auth.verifyToken, auth.isAdminOrRecruiter], jobController.deleteJob);


    // apply job
    // PUT  /jobhunters/api/v1/jobs/{jobid}/?applyJob=true

    app.put("/jobhunters/api/v1/jobs/:id/?applyJob=true", [auth.verifyToken], jobController.applyForJob);
}