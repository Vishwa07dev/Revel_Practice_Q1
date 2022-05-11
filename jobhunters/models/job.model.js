
const mongoose = require("mongoose");
const constants = require("../utils/constants");

const jobSchema = new mongoose.Schema({

    /**
     * title, description, status, students, companyId, createdAt , updatedAt
     */
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
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
    status : {
        type : String,
        default : constants.jobStatus.active
    },
    students: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User"
    },
    companyId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Company"
    }   
});

module.exports = mongoose.model("Job", jobSchema);