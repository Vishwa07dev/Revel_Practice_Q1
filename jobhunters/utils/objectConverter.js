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
exports.jobsListResponse = (jobs) => {
    jobsList = [];
    jobs.forEach(job => {
        companiesList.push({
            id: job._id,
            title: job.title,
            description: job.description,
            createdAt: job.createdAt,
            updatedAt: job.updatedAt,
            status: job.status,
            students: jobs.students,
            companyId: jobs.companyId
        });
    })
    return jobsList;
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
exports.jobsListResponse = (company) => {

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