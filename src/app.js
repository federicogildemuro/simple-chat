// Importing required modules
import { fileURLToPath } from 'url'; // To convert the URL to a file path
import path from 'path'; // To handle file and directory paths
import express from 'express'; // To create an Express server
import handlebars from 'express-handlebars'; // To render views using Handlebars
import { Server } from 'socket.io'; // To handle WebSockets

// Calculating __filename (the current file's path) using import.meta.url
const __filename = fileURLToPath(import.meta.url);

// Calculating __dirname (the current directory's path) by going up one level
const __dirname = path.join(path.dirname(__filename), '..');

// Creating an Express app
const app = express();

// Serving static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Setting up Handlebars as the view engine for rendering HTML views
app.engine('handlebars', handlebars.engine()); // Setting the engine to Handlebars
app.set('views', path.join(__dirname, 'src', 'views')); // Setting the views folder
app.set('view engine', 'handlebars'); // Setting Handlebars as the template engine

// Setting up a route for the home page
app.get('/', (req, res) => {
    res.render('home', {}); // Rendering the "home" view when the user accesses the root route
});

// Starting the server on port 8080
const httpServer = app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

// Setting up WebSocket server with Socket.io
const io = new Server(httpServer);

// When a user connects, set up events for handling messages
io.on('connection', (socket) => {
    console.log('User connected');

    // Handle incoming messages from the client
    socket.on('send_message', (message) => {
        // Broadcast the message to all connected clients
        io.emit('receive_message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});