const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

app.use(cors());
dotenv.config();
app.use(express.json());
app.use('/', authRoutes);

// Aumento della dimensione del payload:
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

let notifications = [];

io.on('connection', (socket) => {
    console.log('Un utente si è connesso:', socket.id);

    socket.on('disconnect', () => {
        console.log('Un utente si è disconnesso:', socket.id);
    });

    socket.on('interested', (data) => {
        const { senderName, senderId, receiverId } = data;
        const notification = { message: `L'azienda ${senderName} è interessata al vostro profilo! `, timestamp: new Date() };
        notifications.push(notification);
        io.emit('notification', notification);
    });
});

app.get('/notifications', (req, res) => {
    res.json(notifications);
});

const connessioneDb = async () => {
    try {
        await mongoose.connect(process.env.DBURI);
        console.log("Connessione al DB riuscita");
    } catch (err) {
        console.log("Errore nella connessione al DB");
    }
};

server.listen(3000, () => {
    console.log("Server in esecuzione");
    connessioneDb();
});
