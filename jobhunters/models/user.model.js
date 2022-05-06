const mongoose = require('mongoose');


const userSchema = mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        immutable : true,
        default: () => {
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    },
});
 
module.exports = mongoose.model("Users",userSchema);