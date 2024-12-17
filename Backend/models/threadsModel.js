import db from './db.js';

export const getThreadsFromDB = (id, callback) => {  
    const query = `  
    SELECT   
        t.*,   
        CASE   
            WHEN u.role = 'alumni' THEN   
                jsonb_build_object('name', ai.name, 'profile_image_path', ai.profile_image_path, 'role', u.role)  
            WHEN u.role IN ('staff', 'student') THEN   
                jsonb_build_object('email', u.email, 'role', u.role)  
        END AS created_by_details,  
        CASE   
            WHEN l.user_id IS NOT NULL THEN true   
            ELSE false   
        END AS liked  
    FROM   
        threads t  
    JOIN   
        users u ON t.created_by = u.id  
    LEFT JOIN   
        alumni_info ai ON u.id = ai.user_id  
    LEFT JOIN   
        thread_likes l ON l.thread_id = t.id AND l.user_id = \$1 AND liked = true
    `;  
    
    db.query(query, [id], (err, results) => {  
        if (err) {  
            return callback(err);  
        }  
        callback(null, results.rows); 
    });  
}; 

export const addThreadToDB = (threadData, callback) => {
    const { title, content, imagePath, created_by } = threadData;
    const query = `
        INSERT INTO threads (thread_domain, thread_content, image_path, created_by) 
        VALUES ($1, $2, $3, $4)
        RETURNING *;  -- Optional: Returns the inserted row
    `;
    const values = [title, content, imagePath, created_by];

    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.rows[0]); 
    });
};

export const storeLikeInDB = (thread_id, user_id, callback) => {
    // Step 1: Check if an entry exists in thread_likes
    const checkQuery = `
        SELECT liked 
        FROM thread_likes 
        WHERE thread_id = $1 AND user_id = $2;
    `;
    const checkValues = [thread_id, user_id];

    db.query(checkQuery, checkValues, (err, results) => {
        if (err) {
            return callback(err);
        }

        if (results.rows.length > 0) {
            // Entry exists: Toggle liked status
            const currentLiked = results.rows[0].liked;
            const newLiked = currentLiked ? 0 : 1;

            // Step 2: Update the liked status in thread_likes
            const updateLikeQuery = `
                UPDATE thread_likes 
                SET liked = $1 
                WHERE thread_id = $2 AND user_id = $3
                RETURNING liked;
            `;
            const updateLikeValues = [newLiked, thread_id, user_id];

            db.query(updateLikeQuery, updateLikeValues, (err, updateResults) => {
                if (err) {
                    return callback(err);
                }

                // Step 3: Increment or decrement likes in threads table
                const likeChange = newLiked ? 1 : -1;

                // Ensure likes do not become negative
                const checkLikesQuery = `
                    SELECT likes 
                    FROM threads 
                    WHERE id = $1;
                `;
                const checkLikesValues = [thread_id];

                db.query(checkLikesQuery, checkLikesValues, (err, threadResults) => {
                    if (err) {
                        return callback(err);
                    }

                    const currentLikes = threadResults.rows[0].likes;
                    const newLikes = Math.max(0, currentLikes + likeChange); // Ensure likes don't go below zero

                    const updateThreadQuery = `
                        UPDATE threads 
                        SET likes = $1 
                        WHERE id = $2
                        RETURNING likes;
                    `;
                    const updateThreadValues = [newLikes, thread_id];

                    db.query(updateThreadQuery, updateThreadValues, (err, finalResults) => {
                        if (err) {
                            return callback(err);
                        }
                        callback(null, {
                            message: "Like toggled successfully",
                            liked: newLiked,
                            totalLikes: finalResults.rows[0].likes,
                        });
                    });
                });
            });
        } else {
            // No entry exists: Insert a new like
            const insertQuery = `
                INSERT INTO thread_likes (thread_id, user_id, liked) 
                VALUES ($1, $2, $3)
                RETURNING liked;
            `;
            const insertValues = [thread_id, user_id, 1];

            db.query(insertQuery, insertValues, (err, insertResults) => {
                if (err) {
                    return callback(err);
                }

                // Step 3: Increment likes in threads table
                const incrementQuery = `
                    UPDATE threads 
                    SET likes = likes + 1 
                    WHERE id = $1
                    RETURNING likes;
                `;
                const incrementValues = [thread_id];

                db.query(incrementQuery, incrementValues, (err, finalResults) => {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, {
                        message: "Like added successfully",
                        liked: 1,
                        totalLikes: finalResults.rows[0].likes,
                    });
                });
            });
        }
    });
};
