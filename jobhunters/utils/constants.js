/**
 * This contains the constants to be used everywhere in the code
 */

 module.exports = {
    verificationStatus : {
        verified : "VERIFIED",
        notVerified : "NOT_VERIFIED"
    },
    jobStatus: {
        active: "ACTIVE",
        expired: "EXPIRED"
    },
    userType : {
        student : "STUDENT",
        admin : "ADMIN",
        recruiter : "RECRUITER"
    },
    httpCodes: {
        internalServerError: 500,
        notFound: 404,
        forbidden: 403,
        success: 200,
        created: 201,
        badRequest: 400,
    },
};