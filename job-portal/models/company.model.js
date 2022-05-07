


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
        type: String
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
    }
})

module.exports = mongoose.model('User', companySchema)