import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import commonRoutes from './routes/commonRoutes.js'
import userRoutes from './routes/userRoutes.js';
import sessionMiddleware from './middlewares/session.js';
import aluminiRoutes from './routes/aluminiRoutes.js'
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(sessionMiddleware);

const dir = path.join(__dirname, 'uploads');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

app.use('/log', userRoutes);
app.use('/alumini', aluminiRoutes)
app.use('/', commonRoutes);


app.listen(8081, () => {
    console.log("Server running on port 8081");
});
