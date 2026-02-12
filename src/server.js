const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const { testConnection } = require('./config/db');
const dotenv = require('dotenv');

//access the env variables
dotenv.config();

//defining the server port to run the backend
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for cross origin resrouece sharing
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

// Make io accessible globally
app.set('socketio', io);

io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

// Connect to Database
testConnection();

//test log to check whether the server is running or not
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
