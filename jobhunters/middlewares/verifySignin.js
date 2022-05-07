validateSigninRequest = (req, res, next) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "Failed ! name is not provided"
        });
    }
    if(!req.body.password) {
        return res.status(400).send({
            message: "Failed ! password is not provided"
        });
    }
    next();
}
module.exports = {
    validateSigninRequest: validateSigninRequest
}