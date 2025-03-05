// Connect to the server using Socket.io
const socket = io();

// Hide the chat UI until the user enters their name
const mainContent = document.querySelector('#main-content');
mainContent.style.display = 'none';

// Flag to track if the user has been set, preventing the name prompt from showing again
let isUserSet = false;

// Prompt the user to enter their name when joining the chat
if (!isUserSet) {
    Swal.fire({
        title: 'Welcome to Simple Chat!',
        text: 'Please enter your name',
        input: 'text',
        showCancelButton: false,
        confirmButtonText: 'Join',
        allowOutsideClick: false,
        allowEscapeKey: false,
        inputValidator: (value) => {
            return !value && 'You need to write something!';
        },
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            const user = result.value;
            socket.emit('userConnected', user);
        }
    });
}

// Enable chat UI when the user is accepted
socket.on('userAccepted', () => {
    mainContent.style.display = 'block';
    isUserSet = true;
});

// Show error if the username already exists, then reload the page
socket.on('userExists', (errorMessage) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
    }).then(() => {
        location.reload();
    });
});

// Notify when a new user joins the chat
socket.on('userJoin', (user) => {
    if (isUserSet) {
        Swal.fire({
            text: `${user} has joined the chat`,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
        });
    }
});

// Update the list of online users
socket.on('users', (users) => {
    const onlineUsers = document.querySelector('#online-users');
    onlineUsers.innerHTML = '';
    users.forEach((user) => {
        const userElement = document.createElement('li');
        userElement.textContent = user;
        onlineUsers.appendChild(userElement);
    });
});

// Get form and input field for sending messages
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');

// Send a message when the form is submitted
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if (!message) return;
    socket.emit('sendNewMessage', message);
    messageInput.value = '';
});

// Display incoming messages in the chat
socket.on('showNewMessage', (message) => {
    const chat = document.querySelector('#chat');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    chat.appendChild(messageElement);
});

// Notify when a user leaves the chat
socket.on('userLeft', (user) => {
    if (isUserSet) {
        Swal.fire({
            text: `${user} has left the chat`,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
        });
    }
});