import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import commonRoutes from './routers/commonRoutes.js'

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    allowedHeaders: ['Content-Type'],
    methods: ["POST", "GET", "PUT", "OPTIONS"],
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', commonRoutes);

app.listen(8081, () => {
    console.log("Server running on port 8081");
});
