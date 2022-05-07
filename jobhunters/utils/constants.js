/**
 * This contains the constants to be used everywhere in the code
 */

module.exports = {
  httpCodes: {
    success: 200,
    internalServerError: 500,
    badRequest: 400,
    forbidden: 403,
    unAuthorized: 401,
  },
  verificationStatus: {
    verified: "VERIFIED",
    notVerified: "NOT_VERIFIED",
  },
  jobStatus: {
    active: "ACTIVE",
    expired: "EXPIRED",
  },
  userType: {
    student: "STUDENT",
    admin: "ADMIN",
    recruiter: "RECRUITER",
  },
  authSecret: "Vishwa sir is awesome",
};
