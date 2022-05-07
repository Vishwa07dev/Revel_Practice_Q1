const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "VERIFIED" // VERIFIED | UNVERIFIED
    },
    jobs_posted: {
        type: [mongoose.SchemaTypes.ObjectId] //ids of jobs posted by the company
    },
});

module.exports = mongoose.model("Company", CompanySchema);