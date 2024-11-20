import { getJobsFromDB } from "../models/jobModel.js";

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