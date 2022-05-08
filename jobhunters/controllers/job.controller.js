const User = require("../models/user.model");
const constants = require("../utils/constants");
const Job = require("../models/job.model");
const e = require("express");

/**
 * Create a Job - job
 *   v1 - Any one should be able to create the ticket
 */

exports.createJob = async (req, res) => {

    const user =  await User.findOne({userId : req.userId});

    const jobObj = {
        title: req.body.title,
        description: req.body.description,
        companyId: user._id,
        students: []
    }

    try {
        const job = await Job.create(jobObj);
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

    // const user =  await User.findOne({userId : req.userId});

    const jobs = await Job.find({});

    res.status(200).send(jobs)
}

exports.getOneJob = async (req, res) => {
    const job = await Job.findOne({
        _id: req.params.id
    });

    res.status(200).send(job);
}

exports.updateJob = async (req, res) => {

    const job = await Job.findOne({
        _id: req.params.id
    });

    const user =  await User.findOne({userId : req.userId});

    if (job == null) {
        return res.status(200).send({
            message: "Job doesn't exist"
        })
    }

    if(user.userType == constants.userType.student){
        if(req.query.applyJob){
            return applyJob(req, res, job, user);
        }else{
            console.log(err.message);
            return res.status(500).send({
                message: "Requires ADMIN/RECRUITER Role"
            })
        }
    }

    // Update the attributes of the saved company

    job.name = req.body.title != undefined ? req.body.title : job.title;
    job.description = req.body.description != undefined ? req.body.description : job.description;
    job.status = req.body.status != undefined ? req.body.status : job.status;
    job.students = req.body.students != undefined ? req.body.students : job.students;

    const updatedJob = await job.save();

    // Return the updated job

    return res.status(200).send(updatedJob);
}

let applyJob = async (req, res, job, user)=>{
    try {
        job.students.push(req.userId);
        const updatedJob = await job.save();

        user.jobs.push(job._id);
        const updatedUser = await user.save();

        return res.status(200).send(updatedUser);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
    
}

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.deleteOne({
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