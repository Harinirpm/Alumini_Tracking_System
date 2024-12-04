import db from './db.js';

export const getJobsFromDB = (callback) => {
    const query = 'SELECT * FROM jobs_info';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.rows); // Use `results.rows` for PostgreSQL
    });
};
