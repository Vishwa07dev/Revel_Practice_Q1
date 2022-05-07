const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  userType: {
    type: String,
    required: true,
    default: "CANDIDATE",
  },
  /**
   * Why use "userStatus" field ?
   * Since there will be multiple admin users in the site who will be having privileged access, so after the admin is signed up, then he or she
   * must be approved by other responsible admin to be able to login
   */
  userStatus: {
    type: String,
    required: true,
    default: "APPROVED",
  },
  jobsApplied: {
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

module.exports = Mongoose.model("User", userSchema);
