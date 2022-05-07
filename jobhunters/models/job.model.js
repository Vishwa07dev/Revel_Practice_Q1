const Mongoose = require("mongoose");

// Constants requirements
const { jobStatus } = require("../constants");

const jobSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: jobStatus.active,
  },
  candidatesApplied: {
    type: [Mongoose.SchemaTypes.ObjectId],
    ref: "User",
  },
  createdAt: {
    type: Date,
    required: true,
    immutable: true,
    default: () => {
      return Date.now();
    },
  },
  updatedAt: {
    type: Date,
    required: true,
    default: () => {
      return Date.now();
    },
  },
});

module.exports = Mongoose.model("Job", jobSchema);
