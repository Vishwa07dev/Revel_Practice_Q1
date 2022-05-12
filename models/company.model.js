
const mongoose = require("mongoose");
const constants = require("../utils/constants");

const companySchema = new mongoose.Schema({

    /**
     * name, address, verified, createdAt , updatedAt
     */
    name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    companyId:{
        type: String,
        required: true
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : ()=>{
            return Date.now();
        }
    },
    updatedAt : {
        type : Date,
        default : ()=>{
            return Date.now();
        }
    },
    verified : {
        type : String,
        default : constants.verificationStatus.notVerified
    },
    jobsPosted: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Job"
    }

});

module.exports = mongoose.model("Company", companySchema);