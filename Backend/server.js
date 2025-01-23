import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import commonRoutes from './routes/commonRoutes.js'
import userRoutes from './routes/userRoutes.js';
import sessionMiddleware from './middlewares/session.js';
import aluminiRoutes from './routes/aluminiRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import http from "http";
import { v4 as uuidv4 } from 'uuid';
import db from './models/db.js';
import dotenv from 'dotenv';
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"],
    allowedHeaders: ['Content-Type'],
    methods: ["POST", "GET", "PUT", "OPTIONS"],
    credentials: true
};

app.use(express.json());
app.use(cors(corsOptions));
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
app.use('/admin', adminRoutes)
app.use('/', commonRoutes);

const server = http.createServer(app)
const io = new Server(server, {
    cors: corsOptions
});


io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Event to create or join a room
    socket.on("create_room", async (data) => {
        const { sender, receiver } = data;

        try {
            const roomDetails = await createOrReuseRoom(sender, receiver);
            socket.join(roomDetails.room_id);
            const messages = await db.query(
                `
                SELECT  
                    cm.sent_by AS sender, 
                    cm.created_at AS createdAt, 
                    cm.message
                FROM 
                    connection_messages cm
                JOIN 
                    connection_rooms cr 
                    ON cr.id = cm.room_id
                WHERE 
                    (
                        (cr.sender = $1 AND cr.receiver = $2) OR 
                        (cr.sender = $2 AND cr.receiver = $1)
                    ) 
                    AND (cm.sent_by = $1 OR cm.sent_by = $2)
                ORDER BY 
                    cm.created_at ASC;
                `,
                [sender, receiver]
            );
            

            socket.emit("chat_history", { messages: messages.rows });
            socket.emit("room_created", { roomID: roomDetails.room_id });
        } catch (error) {
            console.error("Error creating room:", error);
            socket.emit("error", { message: "Unable to create or join room." });
        }
    });

    // // Event to join a specific room
    // socket.on("join_room", async (roomID) => {
    //     try {
    //         const now = new Date();

    //         // Fetch the room details
    //         const room = await db.query(`SELECT * FROM connection_rooms WHERE room_id = ?`, [roomID]);
    //         console.log("HI")
    //         if (room.length === 0) {
    //             // Room does not exist
    //             socket.emit("error", { message: "Room does not exist." });
    //         } else if (new Date(room[0].expires_at) < now) {
    //             // Room exists but is expired, create a new one
    //             const { sender, receiver } = room[0];
    //             const newRoomDetails = await createUniqueRoom(sender, receiver);
             
    //             socket.join(newRoomDetails.room_id);
    //             socket.emit("room_expired_new_room", {
    //                 message: "The room has expired. A new room has been created.",
    //                 newRoomID: newRoomDetails.room_id
    //             });
    //             console.log(`User ${socket.id} joined new room after expiration: ${newRoomDetails.room_id}`);
    //         } else {
    //             // Room exists and is active
    //             socket.join(roomID);
    //             socket.emit("room_joined", { roomID });
    //             console.log(`User ${socket.id} joined room: ${roomID}`);
    //         }
    //     } catch (error) {
    //         console.error("Error joining room:", error);
    //         socket.emit("error", { message: "Unable to join room." });
    //     }
    // });

    // Event to send a message
    socket.on("send_message", async (data) => {
        const { room, sender, receiver, message } = data;
        console.log("data: ", data)

        try {
            const roomDetails = await createOrReuseRoom(sender, receiver, room);
            const roomID = roomDetails.id; // Reference ID from DB
            const createdAt = new Date();
            // console.log(roomDetails)
            // console.log({ sender, roomID, message, createdAt })

            // Save the message
            const messageResult = await db.query(
                `INSERT INTO connection_messages (room_id, sent_by, message, created_at) 
                 VALUES ($1, $2, $3, $4) RETURNING id`,
                [roomID, sender, message, createdAt]
            );
            // console.log(messageResult)
            const messageID = messageResult.rows[0].id;

        // Insert notification for the receiver
          await db.query(
            `INSERT INTO notifications (user_id, room_id, message_id, is_read, created_at)
             VALUES ($1, $2, $3, FALSE, $4)`,
            [receiver, roomID, messageID, createdAt]
         );

            // Broadcast the message
            socket.to(roomDetails.room_id).emit("receive_message", {
                room: roomDetails.room_id,
                sender,
                message,
                createdAt,
            });
        } catch (error) {
            console.error("Error sending message:", error);
            socket.emit("error", { message: "Unable to send message." });
        }
    });


    async function createOrReuseRoom(sender, receiver, existingRoomID = null) {
        const now = new Date();
        console.log({ sender, receiver });

        if (existingRoomID) {
            const existingRoom = await db.query(`SELECT * FROM connection_rooms WHERE room_id = $1`, [existingRoomID]);

            if (existingRoom.rows.length > 0) {
                for (const room of existingRoom.rows) {
                    if (new Date(room.expires_at) > now) {
                        return { room_id: room.room_id, id: room.id }; // Valid room found
                    }
                }
            }
        }

        // Check if there's an active room between sender and receiver (in either direction)
        const queryText = `
        SELECT * 
        FROM connection_rooms 
        WHERE 
            ((sender = $1 AND receiver = $2) OR (sender = $2 AND receiver = $1)) 
            AND expires_at > $3
    `;
        const params = [sender, receiver, now];
        const activeRoom = await db.query(queryText, params);

        if (activeRoom.rows.length > 0) {
            return { room_id: activeRoom.rows[0].room_id, id: activeRoom.rows[0].id }; // Valid active room found
        }

        // Create a new room if none exists or if expired
        const roomID = uuidv4();
        const expiresAt = new Date(now.getTime() + 60 * 60 * 1000); // 1-hour expiration

        const result = await db.query(
            `INSERT INTO connection_rooms (room_id, sender, receiver, created_at, expires_at) 
         VALUES ($1, $2, $3, $4, $5) RETURNING id`,
            [roomID, sender, receiver, now, expiresAt]
        );

        return { room_id: roomID, id: result.rows[0].id }; // Return newly created room
    }

});



const PORT = process.env.PORT || process.env.SERVER_PORT || 8082;
server.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});

// app.listen(8081, () => {
//     console.log("Server running on port 8081");
// });
