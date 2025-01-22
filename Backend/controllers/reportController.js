import { addFlagToDB, getAllFlagsFromDB } from "../models/reportModel.js";

export const addFlag = (req, res) => {
    const { user_id, title, reason } = req.body;

    if (!user_id || !title || !reason) {
        return res.status(400).json({ error: "All fields are required" });
    }

    addFlagToDB(
        { user_id, title, reason },
        (err, results) => {
            if (err) {
                console.error("Error adding flag:", err);
                res.status(500).json({ error: "Failed to add flag" });
            } else {
                res.status(201).json({
                    message: "Flag added successfully",
                    flagId: results,
                });
            }
        }
    );
};

export const getAllFlags = (req, res) => {
    const {id} = req.params;
    getAllFlagsFromDB(id, (err, results) => {
        if (err) {
            console.error("Error fetching flags:", err);
            res.status(500).json({ error: "Failed to fetch flags" });
        } else {
            res.status(200).json({
                message: "Flags fetched successfully",
                data: results,
            });
        }
    });
};

