// Connect to the server using Socket.io
const socket = io();

// Handle the sending of a message
document.getElementById('message-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the message from the input field
    const message = document.getElementById('message-input').value;

    // Emit the message to the server
    socket.emit('send_message', message);

    // Clear the input field after sending the message
    document.getElementById('message-input').value = '';
});

// Listen for incoming messages from the server
socket.on('receive_message', (message) => {
    const messagesContainer = document.getElementById('messages');

    // Create a new element to display the message
    const messageElement = document.createElement('div');
    messageElement.textContent = message;

    // Append the new message to the messages container
    messagesContainer.appendChild(messageElement);
});