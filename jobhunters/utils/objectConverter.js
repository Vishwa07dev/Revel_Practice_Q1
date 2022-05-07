exports.companiesListResponse = (companies) => {
    companiesList = [];
    companies.forEach(company => {
        companiesList.push({
            id: company._id,
            name: company.name,
            address: company.address,
            createdAt: company.createdAt,
            updatedAt: company.updatedAt,
            verified: company.verified,
            jobs: company.jobs
        });
    })
    return companiesList;
}

exports.companyListResponse = (company) => {

    return  {
         id: company._id,
         name: company.name,
         address: company.address,
         createdAt: company.createdAt,
         updatedAt: company.updatedAt,
         verified: company.verified,
         jobs: company.jobs
    }
}

exports.jobCreationResponse = (job) => {
    return {
        id: job._id,
        name: job.name,
        title: job.title,
        description: job.description,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
    }
}

exports.jobDetails = (job) => {
    return {
        id: job._id,
        name: job.name,
        title: job.title,
        description: job.description,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt
    }
}