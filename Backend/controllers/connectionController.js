import { checkConnectionFromDB, createConnectionInDB, getConnectionsFromDB } from "../models/connectionModel.js";

export const checkConnection = async (req, res) => {
    const { email, user_id } = req.params;

    try {
        const result = await new Promise((resolve, reject) => {
            checkConnectionFromDB(email, user_id, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results); 
            });
        });

        if (result) {
            return res.status(200).json({ message: 'Connection exists.',length: result.length });
        } else {
            return res.status(404).json({ message: 'Connection does not exist.' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Failed to check for connection.' });
    }
};

export const createConnection = async(req, res) => {
    const { email, user_id } = req.params;
    try {
        const result = await new Promise((resolve, reject) => {
            createConnectionInDB(email, user_id, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results); 
            });
        });

        if (result) {
            return res.status(200).json({ message: 'Connection created.'});
        } else {
            return res.status(404).json({ message: 'Unable to create Connection'});
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Failed to create for connection.' });
    }

}

export const getConnections = async(req, res) => {
    const {email} = req.params;

    try{
        const result = await new Promise((resolve, reject) => {
            getConnectionsFromDB(email, (err, results) => {
                if(err) return reject(err);
                resolve(results)
            })
        })

        if(result){
            return res.status(200).json(result.rows);
        }else{
            res.status(500).json({ error: 'Failed to fetch connections from the database.' });
        }

    }catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Failed to fetching connections.' });
    }

}
