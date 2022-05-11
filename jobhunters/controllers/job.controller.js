const Job = require("../models/job.model");
const Company = require("../models/company.model");
const objectConverter = require("../utils/objectConverter");
const constants = require("../utils/constants");

exports.createJob = async (req, res) => {

    const jobObj = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        companyId: req.body.companyId,
    }
    console.log(jobObj);

    try {
        const jobCreated = await Job.create(jobObj);

        const company = await Company.find({
            _id: jobObj.companyId
        });

        company.jobs.push(jobCreated._Id);

        await company.save();


        return res.status(201).send(objectConverter.jobCreationResponse(jobCreated));
        
    } catch (err) {
        console.error("Error while creating job", err.message);
        res.status(500).send({
            message: "Internal server error while creating job"
        });
    }
}

exports.updateJobDetails = async (req, res) => {

   try {
        const jobId = req.params.id;

    const job = await Job.findOne({
        _id: jobId
    });

    if(job == null) {
        return res.status(500).send({
            message: "Job not found, check the id and try again"
        });
    }

    job.title = req.body.title != undefined ? req.body.title: job.title;
    job.description = req.body.address != undefined ? req.body.address: job.description;
    job.status = req.body.status != undefined ? req.body.status: job.status;
    job.company = req.body.company != undefined ? req.body.company: job.company;

    const updatedJobDetails = await job.save();

    return res.status(200).send({ 
        message: "Successfully updated job details",
        updatedJobDetails: updatedJobDetails
    })
   } catch (err) {
       console.log(err);
       return res.status(500).send({ message: "Something went wrong"})
   }
}
exports.deleteJob = async (req, res) => {
    try {
        
        await Job.deleteOne({
            _id: req.params.id
        });

        return res.status(200).send({
            message : "Successfully deleted job"
        });


    } catch (err) {
        return res.status(500).send({
            message: "Some internal error occurred while deleting job."
        });
    }
}
exports.getJobDetails = async (req, res) => {


    try {
        const jobs = {
             $in: Job.find({})
         };

        if(jobs == null || jobs.length == 0) {
            return res.status(500).send({
                message: "No job/s found at this moment, try after some time"
            })
        }
        res.status(200).send(objectConverter.jobsListResponse(jobs))
    } catch (err) {
        console.error("Error while fetching job/s", err.message);
        res.status(500).send({
            message: "Internal server error while fetching job/s"
        });
    }
} 

exports.getJobDetailsById = async (req, res) => {

    const jobId = req.params.id;

    try {
        const job = await Job.find({_id: jobId});

        if(job == null) {
            return res.status(500).send({
                message: "Job not found for the provided id, trying using another id."
            })
        }
        res.status(200).send(objectConverter.jobDetails(job))
    } catch (err) {
        console.error("Error while fetching job details", err.message);
        res.status(500).send({
            message: "Internal server error while fetching job details"
        });
    }
}

exports.applyForJob = async (req, res) => {

    const userId = req.id;
    const jobId = req.params.jobid;
    const query = req.query.applyJob;

    if(!query) {
        return res.status(404).send({
            message: "Only allowed to apply for a job if query params has applyJob = true"
        });
    }
    try {
        const job = await Job.find({
        _id: jobId
    });

    if(job == null || job.length == 0) {
        return res.status(500).send({
            message: "You are trying to apply for a job which doesn't exist, try applying for existing job."
        });
    }

    if(job.status == constants.jobStatus.expired) {
        return res.status(500).send({
            message: "You are trying to apply for a job which doesn't exist, try applying for existing job."
        });
    }

    const student = await User.find({
        userId: userId
    });

    const studentId = student._id;

    job.students.push(studentId);

    await job.save();

    student.jobs.push(jobId);

    const updateStudent = await student.save();


    return res.status(200).send({
        message: "Successfully created job",
        userDetails: updateStudent
    });

    } catch (err) {
        console.log(err);
        console.error("Error while applying for job", err.message);
        res.status(500).send({
            message: "Internal server error while applying for job, try after some time"
        });
    }
}

