import {getAluminiListFromDB} from '../models/aluminiModel.js'

export const getAluminiList = (req, res) => {
    getAluminiListFromDB((err, results) => {
        if (err) {
            console.error('Error fetching list:', err);
            res.status(500).json({ error: 'Failed to fetch list from the database.' });
        } else {
            res.status(200).json( results );
        }
    });
};