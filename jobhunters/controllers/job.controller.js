const Job = require('../models/job.model');
const User = require('../models/job.model');




// create job

exports.createJob = async (req, res) => {
    const jobObj = {
        title: req.body.title,
        description: req.body.description,
        companyId: req.body.companyId
    }

    try {
        // insert into db
        const createdJob = await Job.create(jobObj);

        //send response
        const jobCreationResponse = {
            title: createdJob.title,
            description: createdJob.description,
            status: createdJob.status,
            companyId: createdJob.companyId,
            createdAt: createdJob.createdAt,
            updatedAt: createdJob.updatedAt
        }
        res.status(201).send(jobCreationResponse);
    } catch (err) {
        console.log(err.message);

        res.status(500).send("Some internal server error while creating job.");
    }
}



// search all job

exports.getAllJobs = async (req, res) => {

    try {
        const jobs = await Job.find()

        res.status(200).send(jobs);
    } catch (err) {
        console.log(err.message);

        res.status(500).send("Some internal server error while fetching job.");
    }

}

// search one job
exports.getOneJob = async (req, res) => {
    try {
        const job = await Job.findOne({ _id: req.params.id });

        res.status(200).send(job);
    } catch (err) {
        console.log(err.message);

        res.status(500).send("Some internal server error while fetching job.");
    }

}

// update job
exports.updateJob = async (req, res) => {
    try {
        // get job from path param
        const job = await job.findOne({ _id: req.params.id });
        // check job exists or not
        if (!job) {
            return res.status(200).send({
                message: "job doesn't exit"
            })
        }
        // update job
        job.title = req.body.title != undefined ? req.body.title : job.title;
        job.description = req.body.description != undefined ? req.body.description : job.description;
        job.status = req.body.status != undefined ? req.body.status : job.status;
        // save updated job
        const updateJob = await job.save();
        // return updated response
        res.status(201).send(updateJob);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Some internal server error while updating job.");
    }


}

// delete job
exports.deleteJob = async (req, res) => {
    try {
        // get job from path params
        const job = await Job.findOne({ _id: req.params.id });
        // send deleted job
        res.status(200).send(job);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Some internal server error while deleting job.");
    }

}


exports.applyForJob = async (req, res) => {

    if (req.query.applyJob == "true") {     // then only apply for job   
        // get student and job
        const student = await User.findOne({ userId: req.userId });
        const job = await Job.findOne({ _id: req.params.id });
        // update job
        job.students.push(student._id);
        // save job in database
        await job.save();
        // update student
        student.jobs.push(job._id);
        // save updated student in db
        await student.save();
        // send resonse of job applied
        res.status(201).send({
            message: "Successfully applied for job" + job._id
        })
    } else {
        return res.status(200).send({
            message: "Provided path for apply job is not correct."
        })
    }
}

