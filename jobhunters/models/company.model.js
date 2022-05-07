const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        zipcode: {
            type: Number,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    id: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false,
        required: true
    },
    jobIds : {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Job"
    }
});

module.exports = mongoose.model("Company", companySchema);

