import db from './db.js'

export const getJobsFromDB = (callback) => {
    const query = 'SELECT * FROM jobs_info';
    db.query(query, callback);
};