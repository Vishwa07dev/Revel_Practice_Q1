/**
 * API for the job resource
 
 *   Creating  POST  /jobhunters/ap/v1/jobs
 * 
 *   Updating  PUT  /jobhunters/ap/v1/jobs/{id}
 * 
 *   Deleting DELETE /jobhunters/ap/v1/jobs/{id}
 * 
 *   All the above APIs can be trigger by either ADMIN/owner of the company
 * 
 *   Search  GET  /jobhunters/ap/v1/jobs/{id}
 *           GET /jobhunters/ap/v1/jobs/{id}
 * 
 * 
 * /**
 * I should be able to apply to a job 
 * 
 *      job should get tagged to the user schema
 *      student should get tagged to the job schema
 * 
 *    if query options is passed, students should be allowed to call
 *    No edit in the job can be done by the stundents except applying to the job
 *    PUT  /jobhunters/ap/v1/jobs/{jobid}/?applyJob=true
 * 
 *  
 * 
 * 
 * 
 *  Create a new branch called as company and raise PR to main branch
 */