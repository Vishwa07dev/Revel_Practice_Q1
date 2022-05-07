const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    status: {
        type: String,       // Active / Expired
        required: true
    },
    students: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User"
    },
});

module.exports = mongoose.model("Job", jobSchema);