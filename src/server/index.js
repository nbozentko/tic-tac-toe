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

// Test
io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit("test", "a new client has connected");
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


module.exports = router;