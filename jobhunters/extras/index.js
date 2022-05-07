// Model requirements
const User = require("../models/user.model");

// Constants requirements
const { rootAdmin } = require("../constants");

exports.initAdmin = async () => {
  // Check if the admin is already created
  let adminUser = await User.findOne({ userId: rootAdmin.userId });

  if (adminUser) {
    return console.log("Using the previously created admin user");
  }

  // Create the admin user if the admin user is not present
  adminUser = await User.create(rootAdmin);

  return console.log("Admin user created");
};
