


const mongoose = require('mongoose');
const constants = require('../utils/constants');





const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    verificationStatus:{
        type: String,
        default: constants.verificationStatus.notVerified
    },
    createdAt: {
        type: Date,
        default: () => {
            return Date.now()
        },
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now()
        }
    },
    jobsPosted:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref: "Job"
    }
})

module.exports = mongoose.model('Company', companySchema)