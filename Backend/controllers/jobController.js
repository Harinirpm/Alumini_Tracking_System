import { getJobsFromDB, addJobOfferToDB, rejectJobsInDB } from "../models/jobModel.js";

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

export const rejectJobs = (req, res) => {
    const { id, reason, user_id } = req.body;

    if (!id || !reason) {
        return res.status(400).json({ error: 'Thread ID and reason are required.' });
    }

    rejectJobsInDB(id, reason, user_id, (err, results) => {
        if (err) {
            console.error('Error rejecting thread:', err);
            return res.status(500).json({ error: 'Failed to reject the thread in the database.' });
        }

        res.status(200).json({
            message: 'Thread rejected successfully.',
            thread: results,
        });
    });
};