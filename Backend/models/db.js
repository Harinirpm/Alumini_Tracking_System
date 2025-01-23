import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pkg;

const Host = process.env.PG_HOST
const Port = process.env.PG_PORT

const db = new Client({
    user: process.env.DB_USER,
    host: Host,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Port,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

export default db;

import express from 'express';
const app = express();

app.listen(process.env.SERVER_PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${process.env.SERVER_PORT}`);
});
