const Company = require("../models/company.model");
const User = require("../models/user.model");
const constants = require("../utils/constants");
const objectConverter = require("../utils/objectConverter");

exports.createCompany = async (req, res) => {

    const companyObj = {
        name: req.body.name, 
        address: req.body.address,
        verified: req.body.verified
    }
    
    try {
        const companyCreated = await Company.create(companyObj);

        res.status(201).send(companyCreated);
    } catch (err) {
        console.log(err);
         return res.status(500).send({
            message: "Some internal error"
        });
    }
}

exports.updateCompany = async (req, res) => {

    try {

    const company = findOne({
        _id: req.params.id
    });

    if(company == null) {
        return res.status(500).send({
            message: "Company not found, please check the is and try again."
        })
    }
    company.name = req.body.name != undefined ? req.body.name: company.name;
    company.address = req.body.address != undefined ? req.body.address: company;
    company.verified = req.body.verified != undefined ? req.body.verified: company.verified;

    const updatedCompanyDetails = company.save();

    return res.status(200).send(updatedCompanyDetails);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error occurred while updating company details."
        });
    }
}


exports.deleteCompany = async (req, res) => {
    try {

        await Company.deleteOne({
            _id: req.params.id
        });

        return res.status(200).send({
            message : "Successfully deleted company"
        });


    } catch (err) {
        return res.status(500).send({
            message: "Some internal error occurred while deleting company."
        });
    }
}

exports.getAllCompanies = async (req, res) => {

    try {

         const companies = {
             $in: Company.find({})
         };

         return res.status(200).send(objectConverter.companiesListResponse(companies));
    } catch (err) {
         return res.status(500).send({
            message: "Some internal error occurred while fetching companies details."
        });
    }
}

exports.getOneCompany = async (req, res) => {
    try {
        const company = await Company.find({ 
            _id: req.params.id
        });
        
        return res.status(200).send(objectConverter.companyListResponse(company)); 
    } catch (err) {
        return res.status(500).send({
            message: "Some internal error occurred while fetching company details."
        });
    }
}