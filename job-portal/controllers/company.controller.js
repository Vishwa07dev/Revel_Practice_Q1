const req = require('express/lib/request');
const Company = require('../models/company.model');


exports.createCompany = async (req, res)=>{
    const companyObj = {
        companyName: req.body.companyName,
        companyId : req.body.companyId,
        address: req.body.address
    }

    try{
        const companyCreated = await Company.create(companyObj);
        console.log("Company Created", companyCreated);

        const companyCreationResponse = {
            companyName : companyCreated.companyName,
            companyId: companyCreated.companyId,
            address: companyCreated.address,
            verificationStatus: companyCreated.verificationStatus,
            jobsPosted: companyCreated.jobsPosted,
            createdAt: companyCreated.createdAt,
            updatedAt: companyCreated.updatedAt
        }

        res.status(201).send(companyCreationResponse);
    }catch(err){
        res.status(500).send({
            message: "Some internal error."
        })
    }
}


// search for a company
