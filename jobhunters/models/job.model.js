/**
 * This file will holds the schema of the Job Models
 */

 const mongoose = require("mongoose");
 const constants = require("../utils/constants");
 
 const jobSchema = new mongoose.Schema({
 
     /**
      *  Title , Description , status , students , companyID
      */
     
     title : {
         type : String,
         required : true
     },
 
     description : {
         type : String,
         required : true     
     },
 
     status : {
         type :String , 
         default : constants.jobStatus.active
     },
 
     students : {
         type : [mongoose.SchemaTypes.ObjectId],
         ref : "User"
     },
 
     companyId : {
         type : [mongoose.SchemaTypes.ObjectId],
         ref : "Company"
     }
 });
 
 module.exports = mongoose.model("Job", jobSchema)