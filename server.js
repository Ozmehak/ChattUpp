const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const port = 3333;

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log(`A client with id ${socket.id} connected to the chat!`);

    socket.on('chatMessage', msg => {
        console.log('Meddelande: ' + msg.user + ' ' + msg.message);
        io.emit('newChatMessage', msg.user + ' : ' + msg.message);
    });

    socket.on('roll', msg => {
        console.log('Meddelande: ' + msg.user + ' ' + msg.message);
        io.emit('newRoll', `${msg.user} rolled ${msg.roll}! Sum of ${msg.user} rolls: ${msg.totalRolls}`);
    });


    socket.on('disconnect', () => {
        console.log(`Client ${socket.id} disconnected!`);
    });
});

server.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});
