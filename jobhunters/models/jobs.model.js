const mongoose = require('mongoose');


const jobsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
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
    students :{
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Users"
    }
});
 
module.exports = mongoose.model("Jobs",jobsSchema);