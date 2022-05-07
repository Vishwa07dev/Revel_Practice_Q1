const Mongoose = require("mongoose");

const companySchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  /**
   * Made this field mandatory while signing up the company as this field is required for verification of the company by the site admin
   */
  address: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  jobsPublished: {
    type: [Mongoose.SchemaTypes.ObjectId],
    ref: "Job",
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

module.exports = Mongoose.model("Company", companySchema);
