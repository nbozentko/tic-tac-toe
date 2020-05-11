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
let currentGames = [];

let searchingRoom = io.of('/gameRoom');
searchingRoom.on('connection', socket => {
    gameQueue.push(socket);
    if (gameQueue.length > 1) {
        let player1 = gameQueue.shift();
        let player2 = gameQueue.shift();
        let firstTurn = Math.random() < 0.5 ? 'X' : 'O';

        currentGames.push([player1, player2]);

        io.of('/gameRoom').to(player1.id).emit('gameFound', {
            opponentId: player2.id,
            piece: 'X',
            opponentName: player2.handshake.query.name,
            firstTurn: firstTurn
        });

        io.of('/gameRoom').to(player2.id).emit('gameFound', {
            opponentId: player1.id,
            piece: 'O',
            opponentName: player1.handshake.query.name,
            firstTurn: firstTurn
        });
    }

    socket.on('move', move => {
        io.of('/gameRoom').to(move.to).emit('move', move.board);
    });

    socket.on('chat', msg => {
        io.of('/gameRoom').to(msg.to).emit('chat', msg);
    });

    socket.on('stopSearch', () => {
        console.log(socket.id + ' stopped searching');
        gameQueue = gameQueue.filter(c => c.id !== socket.id);
    });

    socket.on('leftGame', () => {
        console.log('boi left the game')
    });

    socket.on('disconnect', () => {
        gameQueue = gameQueue.filter(c => c.id !== socket.id);

        for (let g of currentGames) {
            if (g[0].id === socket.id) {
                io.of('/gameRoom').to(g[1].id).emit('opponentLeft', g[0].id);
            } else if (g[1].id === socket.id) {
                io.of('/gameRoom').to(g[0].id).emit('opponentLeft', g[1].id);
            }
        }
        currentGames = currentGames.filter(g => g[0].id !== socket.id && g[1].id !== socket.id);
    });
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');
    });
});

module.exports = router;