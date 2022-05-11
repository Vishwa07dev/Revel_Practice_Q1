const User = require("../models/user.model");
const constants = require("../utils/constants");
const job = require("../models/job.model");

/**
 * Create a job
 */
 exports.addJob = async (req, res) => {

    //logic to create the ticket

    const jobObj = {
        title: req.body.title,
        description: req.body.description,
        students : req.body.students,
        componyId : req.body.componyId

    
    }

    try {
        const job= await Job.create(jobObj);
        console.log(job)

        return res.status(201).send(job);

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }

}

exports.getAllJobs = async (req, res) => {

    const jobs = await Job.find();

    res.status(200).send(jobs);
}

exports.getOnejob= async (req, res) => {
    const job = await Job.findOne({
        _id: req.params.id
    });

    res.status(200).send(job);
}

exports.updatedjob = async (req, res) => {

    const job= await Job.findOne({
        _id: req.params.id
    });

    console.log(job);

    if (job == null) {
        return res.status(200).send({
            message: "Job doesn't exist"
        })
    }

    // Update the attributes of the saved company
    job.title = req.body.title != undefined ? req.body.title : job.title;
    job.description = req.body.description != undefined ? req.body.description : job.description;
    job.status = req.body.status != undefined ? req.body.status : job.status;
    job.students = req.body.students != undefined ? req.body.students: job.students;

    const updatedjob = await job.save();

    // Return the updated ticket

    return res.status(200).send(updatedjob);
}

exports.deleteJob= async (req, res) => {
    try {
        const job= await Job.deleteOne({
            _id: req.params.id
        });    
        res.status(200).send(job);
    } catch (error) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}