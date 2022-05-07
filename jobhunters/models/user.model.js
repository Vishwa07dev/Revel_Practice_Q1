const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
        minLength: 10
    },
    userType: {
        type: String,
        required: true,
        default: "ASPIRANT" // ASPIRANT | ADMIN
    },
    jobs_applied: {
        type: [mongoose.SchemaTypes.ObjectId] //jobs applied by user
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
        immutable: true
    },
    updatedAt: {
        type: Date
    }
});

module.exports = mongoose.model("User", UserSchema);