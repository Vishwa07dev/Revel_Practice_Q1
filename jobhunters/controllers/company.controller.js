const constants = require("../utils/constants");
const User = require("../models/user.model");
const company = require('../models/company.model')
const config = require("../configs/auth.config");


/**
 * Controller for adding companies 
 */
exports.addCompanies = async (req, res) => {


    const userObjToBeStoredInDB = {
        name: req.body.name,
        address: req.body.address,
    }
    /**
     * Insert this new user to the db
     */
    try {
        const companyCreated = await company.create(userObjToBeStoredInDB);

        console.log("Company created ", companyCreated);

        /**
         * Return the response
         */
        const companyCreationResponse = {
            name: req.body.name,
            address: req.body.address,
            verified: req.body.verified,
            createdAt: companyCreated.createdAt,
            updatedAt: companyCreated.updatedAt
        }

        res.status(201).send(companyCreationResponse);
    } catch (err) {
        console.error("Error while creating new company", err.message);
        res.status(500).send({
            message: "some internal error while inserting new comapany"
        })
    }

}


/**
 * Controller for updating company 
 */

exports.updateCompany = (req, res) => {

    /**
     * One of the ways of updating
     */
    try {
        const companyIdReq = req.params.companyId;

        const Company = company.findOneAndUpdate({
            _id: companyIdReq
        }, {
            name: req.body.name,
            address: req.body.address,
            verified: req.body.verified,
            jobs: req.body.jobs
        }).exec();

        return res.status(200).send({
            message: "Comapany  record succesfully updated"
        })
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Internal server error while updating"
        })
    }
}

exports.deleteCompany = async (req, res) => {

    try {
            const companyId = req.params.id;
            const Company = await company.deleteOne({
                _id: companyId
            })

            return res.status(200).send({
                message: "Comapany  record succesfully deleted"
            })
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Internal server error while deleting"
        })
    }


}

exports.getCompany = async (req, res) => {

    try {
        const Company = await company.find();
        return res.status(200).send(Company);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Internal error while fetching the data "
        })
    }
}


exports.findCompanyById = async (req, res) => {
    const companyId = req.params.id; 

    const Company = await company.find({
        _id: companyId
    });

    if (Company) {
        res.status(200).send(Company);
    } else {
        res.status(200).send({
            message: "Comapny  with id " + companyId + " doesn't exist"
        })
    }
}


