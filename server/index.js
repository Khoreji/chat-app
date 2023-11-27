const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const events = require('events');
const sequelize = require('./Utils/connection.js');
const authRoutes = require('./Routes/auth.routes.js');
const userRoutes = require('./Routes/user.routes.js');
const authenticateUser = require('./Utils/checkauth.js');
const messageRoutes = require('./Routes/message.routes.js');
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: '*',
    }
});

global.eventEmitter = new events.EventEmitter();


const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

sequelize.authenticate().then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log(err);
});


io.on('connection', (socket) => {
    socket.on('typing', (data) => {
        io.emit('typing', data);
    });
});

global.eventEmitter.on('message', (data) => {
    io.emit('message', data);
});


app.use('/auth', authRoutes);
app.use('/user', authenticateUser, userRoutes);
app.use('/message', authenticateUser, messageRoutes);


server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});