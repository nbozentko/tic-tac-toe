const express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'))

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

let searchQueue = [];

let searchingRoom = io.of('/gameRoom');
searchingRoom.on('connection', socket => {
    searchQueue.push(socket);
    if (searchQueue.length > 1) {
        let player1 = searchQueue.shift();
        let player2 = searchQueue.shift();

        console.log(player1.conn.id)
        console.log(player2.conn.id)

        io.of('/gameRoom').to(player1.id).emit('gameFound', { opponent: player2.id, piece: 'X' });
        io.of('/gameRoom').to(player2.id).emit('gameFound', { opponent: player1.id, piece: 'O' });
    }


    // searchQueue.push(socket);
    // if (searchQueue.length > 1) {
    //     console.log('we can start a game');
    //     let player1 = searchQueue.shift();
    //     let player2 = searchQueue.shift();
    //     let roomName = player1.conn.id + ',' + player2.conn.id;
    //     player1.join(roomName);
    //     player2.join(roomName);
    //     io.of('/searchingRoom').to(player1).emit('roomFound', { roomNumber: roomName, piece: 'X' });
    //     io.of('/searchingRoom').to(player1).emit('roomFound', { roomNumber: roomName, piece: 'O' });
    // }
    // searchingRoom.emit('data', 'someone entered the waiting room');
})


// Test
io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit("test", "a new client has connected");
    socket.on('disconnect', client => {
        console.log(client.id + ' disconnected')
        console.log('user disconnected');
    });
});


module.exports = router;