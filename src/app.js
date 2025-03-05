import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

// Calculating __filename (the current file's path) using import.meta.url
const __filename = fileURLToPath(import.meta.url);

// Calculating __dirname (the project's root directory) by joining the file path with '..'
const __dirname = path.join(path.dirname(__filename), '..');

// Creating an Express app
const app = express();

// Serving static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Setting up Handlebars as the view engine for rendering HTML views
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'handlebars');

// Setting up a route for the home page
app.get('/', (req, res) => {
    res.render('home');
});

// Starting the server on port 8080
const httpServer = app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

// Setting up WebSocket server with Socket.io
const io = new Server(httpServer);

// Array to store the online users
const users = [];

// Handling WebSocket connections
io.on('connection', (socket) => {
    // Variable to store the current user
    let user = null;

    // Handle user connection
    socket.on('userConnected', (newUser) => {
        // If the user name already exists, emit an error message to the current user
        if (users.includes(newUser)) {
            socket.emit('userExists', `The name "${newUser}" is already taken. Please choose a different name.`);
            return;
        }
        // Emit the user accepted event to the current user
        socket.emit('userAccepted');
        // Set the current user
        user = newUser;
        // Emit the new user to all connected users except the current user
        socket.broadcast.emit('userJoin', user);
        // Add the new user to the users array
        users.push(user);
        // Emit the updated users array to all connected users
        io.emit('users', users);
    });

    // Handle incoming messages from the users
    socket.on('sendNewMessage', (newMessage) => {
        // Construct the message with the user's name
        const message = `${user}: ${newMessage}`;
        // Emit the new message to all connected users
        io.emit('showNewMessage', message);
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        // Emit the disconnected user to all connected users except the current user
        socket.broadcast.emit('userLeft', user);
        // Remove the disconnected user from the users array
        const index = users.indexOf(user);
        if (index !== -1) users.splice(index, 1);
        // Emit the updated users array to all connected users
        io.emit('users', users);
    });
});