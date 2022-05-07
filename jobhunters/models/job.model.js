const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },    
    description: {
        type: String,
        required: true
    },    
    posted_by_company: {
        type: mongoose.SchemaTypes.ObjectId // company id who posted this job
    },    
    applicants: {
        type: [mongoose.SchemaType.ObjectId] // list of apllicants
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
        immutable: true
    },
    updatedAt: {
        type: Date
    }
});

module.exports = mongoose.model("Job", JobSchema);