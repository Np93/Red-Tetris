const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Adapté à Vite
    methods: ["GET", "POST"]
  }
});

server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});

const rooms = {}; // { roomId: [user1, user2] }

io.on('connection', (socket) => {
  console.log('New socket connected:', socket.id);

  socket.on('join_room', ({ roomId, username }) => {
    socket.join(roomId);

    if (!rooms[roomId]) rooms[roomId] = [];
    if (!rooms[roomId].includes(username)) rooms[roomId].push(username);

    io.to(roomId).emit('room_update', rooms[roomId]);

    // Auto-start for solo or if 2 players
    if (rooms[roomId].length === 1) {
      socket.emit('game_start', { solo: true, username });
    } else if (rooms[roomId].length === 2) {
      io.to(roomId).emit('game_start', { solo: false, players: rooms[roomId] });
    }
  });

  socket.on('disconnect', () => {
    const roomId = socket.roomId;
    const username = socket.username;

    if (!roomId || !username) return;

    rooms[roomId] = rooms[roomId].filter(user => user !== username);
    io.to(roomId).emit('room_update', rooms[roomId]);

    if (rooms[roomId].length === 0) {
        delete rooms[roomId]; // Nettoyage de la room si vide
    }
  });

  io.on("connection", (socket) => {
    console.log("Nouvelle connexion:", socket.id);

    socket.on("join_room", ({ roomId, username }) => {
        socket.join(roomId);
        console.log(`${username} a rejoint la room ${roomId}`);

        // Option solo : démarrer la partie tout de suite
        if (roomId && username && roomId === socket.id.slice(0, 8)) {
        io.to(roomId).emit("start_game", { board: createInitialBoard() }); // Ex. de fonction à définir
        }

        // Option multi : attendre plusieurs joueurs (tu ajoutes une logique ici plus tard)
    });
  });
});