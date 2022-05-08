const bcrypt = require("bcryptjs");
const {httpCodes, userType} = require("../utils/constants");
const Company = require("../models/company.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");


/**
 * Controller for creating a company
 */
exports.create = async (req, res) => {
    
    //How the company creation will happen
    const companyObjToBeStoredInDB = {
        name : req.body.name,
        ownerId : req.body.userId,
        address : req.body.address,
    }
    /**
     * Insert this new company to the db
     */
    try {
    const companyCreated = await Company.create(companyObjToBeStoredInDB);

    console.log("company created ", companyCreated);

    /**
     * Return the response
     */
    const userCreationResponse  = {
        name : companyCreated.name,
        companyId: companyCreated._id,
        ownerId : companyCreated.ownerId,
        address: companyCreated.address,
        createdAt : companyCreated.createdAt,
        updatedAt : companyCreated.updatedAt
    }

    res.status(httpCodes.created).send(userCreationResponse);
} catch(err){
    console.error("Error while creating new company", err.message);
    res.status(httpCodes.internalServerError).send({
        message : "some internal error while inserting new company"
    })
}

}


/**
 * Controller for updating a previously created company
 */
exports.update = async (req, res) =>{
    
    //Search the company if it exists 
    try{
    var company =  await Company.findOne({_id : req.params.id});
    }catch(err){
        console.log(err.message);
    }
    if(company == null){
       return res.status(httpCodes.badRequest).send({
            message : "Failed ! Company id doesn't exist"
        })
    }

    // Proceed further only if the requesting user is an admin or the company owner
    try{
    var user =  await User.findOne({userId : req.body.userId});
    }catch(err){
        console.log(err.message);
    }
    if(!user.userType == userType.admin || !user.userId == company.ownerId){
       return res.status(httpCodes.forbidden).send({
            message : "You are not allowed to update the company details"
        })
    }

    //Search the owner if it exists as a user in the site 
    if(req.body.ownerId){
        try{
        var owner =  await User.findOne({userId : req.body.ownerId});
        }catch(err){
            console.log(err.message);
        }
        if(owner == null){
        return res.status(httpCodes.badRequest).send({
                message : "Failed ! Owner doesn't exist as a user of the site"
            })
        }
    }

    //Company is existing, so now we will update the company
    try {

        Company.findOneAndUpdate({
            _id: req.params.id
        }, {
            name: req.body.name,
            address: req.body.address,
            ownerId: req.body.ownerId
        }).exec();

        res.status(httpCodes.success).send({
            message: "Company succesfully updated"
        })
    } catch (err) {
        console.log(err.message);
        res.status(httpCodes.internalServerError).send({
            message: "Internal server error while updating the company"
        })
    }
};


/**
 * Controller for deleting a previously created company
 */
exports.update = async (req, res) =>{
    
    //Search the company if it exists 
    try{
    var company =  await Company.findOne({_id : req.params.id});
    }catch(err){
        console.log(err.message);
    }
    if(company == null){
       return res.status(httpCodes.badRequest).send({
            message : "Failed ! Company id doesn't exist"
        })
    }

    // Proceed further only if the requesting user is an admin or the company owner
    try{
    var user =  await User.findOne({userId : req.body.userId});
    }catch(err){
        console.log(err.message);
    }
    if(!user.userType == userType.admin || !user.userId == company.ownerId){
       return res.status(httpCodes.forbidden).send({
            message : "You are not allowed to update the company details"
        })
    }

    

    //Company is existing, so now we will delete the company
    try {

        Company.deleteOne({_id: req.params.id})

        res.status(httpCodes.success).send({
            message: "Company succesfully deleted"
        })
    } catch (err) {
        console.log(err.message);
        res.status(httpCodes.internalServerError).send({
            message: "Internal server error while deleting the company"
        })
    }
};