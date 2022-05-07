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

exports.httpCodes = {
  success: 200,
  internalServerError: 500,
  badRequest: 400,
  forbidden: 403,
  unAuthorized: 401,
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
