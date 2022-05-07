const Job = require("../models/job.model");
const objectConverter = require("../utils/objectConverter");


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

        return res.status(201).send(objectConverter.jobCreationResponse(jobCreated));

        
    } catch (err) {
        console.error("Error while creating job", err.message);
        res.status(500).send({
            message: "Internal server error while creating job"
        });
    }
}

exports.getJobDetails = async (req, res) => {

    const jobId = req.params.id;

    try {
        const job = await Job.find({_id: jobId});

        res.status(200).send(objectConverter.jobDetails(job))
    } catch (err) {
        console.error("Error while fetching job details", err.message);
        res.status(500).send({
            message: "Internal server error while fetching job details"
        });
    }

} 

