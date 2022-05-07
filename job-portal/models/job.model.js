


const mongoose = require('mongoose');
const constants = require('../utils/constants');






const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },
    status:{
        type:String,
        default: constants.jobStatus.active
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
    }
})

module.exports = mongoose.model('Job',jobSchema)