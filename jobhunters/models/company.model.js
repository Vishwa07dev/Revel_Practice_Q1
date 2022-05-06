const mongoose = require('mongoose');
const constants = require('../utils/constants')

const companySchema = mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    address: {
        type : String,
        required : true,
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
    verified : {
        type : string,
        required : true,
        default: constants.verifiedStatus.false,
    },
    jobs :{
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Users"
    }
});
 
module.exports = mongoose.model("Companys",companySchema);