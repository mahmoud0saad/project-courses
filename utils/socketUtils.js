
const socket = require('socket.io');
const { getDataFromTokenJWT } = require('../middleware/verifyToken');

/** @type {socket.Server} */
let io;

function initSocketIO(server) {
    if (!io)
        io = new socket.Server(server);

    initConnection();
    return io;
}
function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialized! Call init(server) first.");
    }
    return io;
}
function initConnection() {
    io.on('connection', (connectSocket) => {

        console.log('start connection for id ', connectSocket.handshake.query.token);
        const userData = getDataFromTokenJWT(connectSocket.handshake.query.token);
        if (userData != null) {
            connectSocket.join(`create-course:${userData.userId}`);
        }

        // io.join(`create-user:${userId}`);
        connectSocket.on('message', (message) => {
            console.log('listen on channel message ', message);



        });
        connectSocket.on('disconnect', (disConnectSocket) => {
            console.log('end connection for id ', connectSocket.id);
        });
    });
}
module.exports = { initSocketIO, getIO }
