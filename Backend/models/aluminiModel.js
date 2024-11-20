import db from './db.js'

export const getAluminiListFromDB = (callback) => {
    const query = 'SELECT * FROM alumini_info';
    db.query(query, callback);
};