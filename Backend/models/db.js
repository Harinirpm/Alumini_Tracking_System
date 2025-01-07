// import mysql from 'mysql2';

// const db = mysql.createConnection({
//     user: "root",
//     host: "localhost",
//     password: "dharshini@18",
//     database: "alumini",
// });


// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err.stack);
//         return;
//     }
//     console.log('Connected to database.');
// });

// export default db;

import pkg from 'pg';
const { Client } = pkg;

const db = new Client({
    user: "postgres",
    host: "localhost",
    password: "dharshini",
    database: "alumini",
    port: 5432,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

export default db;

