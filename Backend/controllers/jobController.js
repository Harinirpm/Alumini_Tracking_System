import { getJobsFromDB, addJobOfferToDB } from "../models/jobModel.js";

export const getJobs = (req, res) => {
    getJobsFromDB((err, results) => {
        if (err) {
            console.error('Error fetching list:', err);
            res.status(500).json({ error: 'Failed to fetch list from the database.' });
        } else {
            res.status(200).json( results );
        }
    });
};

export const addJobOffer = (req, res) => {
    const {
        job_title,
        company_name,
        expected_minimum_salary_per_year,
        expected_maximum_salary_per_year,
        location,
        created_by,
        offer_url
    } = req.body;

    console.log(req.body)

    addJobOfferToDB(
        {
            job_title,
            company_name,
            expected_minimum_salary_per_year,
            expected_maximum_salary_per_year,
            location,
            created_by,
            offer_url,
        },
        (err, results) => {
            if (err) {
                console.error('Error creating job offer:', err);
                res.status(500).json({ error: 'Failed to create job offer' });
            } else {
                res.status(200).json({ message: 'Job offer created successfully', jobId: results });
            }
        }
    );
};
