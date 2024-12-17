import { getNotificationsFromDB, setNotificationsInDB } from "../models/notificationModel.js";

export const getNotifications = (req, res) => {
    const {id} = req.params;
    getNotificationsFromDB(id, (err, results) => {
        if (err) {
            console.error('Error fetching notifications:', err);
            res.status(500).json({ error: 'Failed to fetch notification from the database.' });
        } else {
            res.status(200).json( results );
        }
    });
}


export const setNotifications = (req, res) => {
    const {id, sender_id} = req.params;
    setNotificationsInDB(id, sender_id, (err, results) => {
        if (err) {
            console.error('Error fetching threads:', err);
            res.status(500).json({ error: 'Failed to fetch threads from the database.' });
        } else {
            res.status(200).json( results );
        }
    });
}