const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    }
  });

function generateRoomCode() {

    return Math.random().toString().substr(2, 5);

}

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("user connected", (name, room) => {
    
    console.log(name + " has connected to room " + room);
    socket.join(room);
    io.to(room).emit("room joined");

  });

  socket.on("user hosted", (name) => {
    
    room = generateRoomCode();

    console.log(name + " has hosted room " + room);
    socket.join(room);
    io.to(room).emit("roomid", room);

  });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});