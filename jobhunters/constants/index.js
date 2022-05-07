exports.userType = {
  candidate: "CANDIDATE",
  admin: "ADMIN",
};

exports.userStatus = {
  approved: "APPROVED",
  pending: "PENDING",
  rejected: "REJECTED",
};

exports.jobStatus = {
  active: "ACTIVE",
  expired: "EXPIRED",
};

//---------------------------------
// All enum exports ----

exports.userTypes = Object.entries(this.userType).map((result) => {
  return result[1];
});

exports.userStatuses = Object.entries(this.userStatus).map((result) => {
  return result[1];
});

exports.jobStatuses = Object.entries(this.jobStatus).map((result) => {
  return result[1];
});
