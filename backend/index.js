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

  socket.on("add movie", (title, user, room) => {

    var obj = {title: title, user: {name: user, room: room}};

    console.log(user + " has added " + title);
    socket.to(room).emit("add movie", obj);

  });

  socket.on("remove movie", (title, user, room) => {

    var obj = {title: title, user: {user, room}};

    console.log(user + " has removed " + title);
    socket.to(room).emit("remove movie", obj);

  });

  socket.on("random movie", (title, user, room) => {

    var obj = {title: title, user: {name: user, room: room}};

    console.log(user + " chose " + title);
    socket.to(room).emit("random movie", obj);

  });


});

server.listen(3000, () => {
  console.log('listening on *:3000');
});