/**
* This file will hold the schema for the User resource
*/
const mongoose = require("mongoose");
const constants = require("../utils/constants");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 10,
        unqiue: true
    },

    userType: {
        type: String,
        default: constants.userTypes.student
    },

    createdAt: {
        type: Date,
        immutable: true,
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

    jobs : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Job"
    }


});

module.exports = mongoose.model("User", userSchema);
