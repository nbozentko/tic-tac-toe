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

let gameQueue = [];

let searchingRoom = io.of('/gameRoom');
searchingRoom.on('connection', socket => {
    console.log(socket.handshake.query.name)
    gameQueue.push(socket);
    if (gameQueue.length > 1) {
        let player1 = gameQueue.shift();
        let player2 = gameQueue.shift();

        io.of('/gameRoom').to(player1.id).emit('gameFound', {
            opponent: player2.id,
            piece: 'X',
            opponentName: player2.handshake.query.name
        });

        io.of('/gameRoom').to(player2.id).emit('gameFound', {
            opponent: player1.id,
            piece: 'O',
            opponentName: player1.handshake.query.name
        });
    }
})


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', client => {
        console.log(client.id + ' disconnected')
        console.log('user disconnected');
    });
});


module.exports = router;