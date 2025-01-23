// import pkg from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();

// const { Client } = pkg;

// // Database configuration
// const db = new Client({
//     user: process.env.DB_USER,
//     host: process.env.PG_HOST,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.PG_PORT,
    
// });

// // Connect to the database
// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err.stack);
//         return;
//     }
//     console.log('Connected to database.');
// });

// export default db;

import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pkg;

// Database configuration
const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Required for Render's SSL setup
    },
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

export default db;