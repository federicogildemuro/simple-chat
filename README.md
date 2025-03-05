# Simple Chat - Basic Real Time Messaging

This project is a basic real-time chat application powered by WebSockets through an Express server. Users can send and receive messages instantly, providing a simple and responsive messaging experience. The app is built using core web technologies and focuses on real-time communication.

## Features

- **Real-Time Messaging**: Users can send and receive messages instantly through WebSockets.
- **Simple UI**: The interface is clean and straightforward, providing users with an easy-to-use chat experience.
- **Message History**: Messages persist during the chat session, allowing users to view past messages.
- **User Notifications**: Users are notified when someone joins or leaves the chat.
- **Styling**: The project’s styles are primarily handled using Bootstrap, implemented via its CDN for simplicity.
- **Responsive Design**: Fully responsive and optimized for mobile, tablet, and desktop.

## Dependencies

The project uses the following dependencies:

- **Express**: A web framework for Node.js that simplifies routing and server setup.
- **Handlebars**: A templating engine for rendering dynamic content in the views.
- **Socket.io**: A library for enabling real-time, bidirectional communication between the server and the client via WebSockets.
- **Bootstrap CSS (via CDN)**: A popular CSS framework for building responsive, mobile-first websites and user interfaces.
- **SweetAlert2 (via CDN)**: A library for creating beautiful, customizable alerts and popups.

## Prerequisites

Before starting, make sure you have:

- **Node.js** installed on your machine. You can download it from [here](https://nodejs.org/).
- **npm** (Node Package Manager), which is installed automatically with Node.js.

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/federicogildemuro/simple-chat.git
```

2. Navigate into the project directory:

```bash
cd simple-chat
```

3. Install the dependencies using npm:

```bash
npm install
```

## Usage

To run the development server, use the following command:

```bash
npm run dev
```

This will start the app on [http://localhost:8080](http://localhost:8080).

## Contribution

Contributions are welcome! If you find a bug or have suggestions, feel free to create an issue or submit a pull request.

## Author

This project was developed by Federico Gil de Muro.

## License

This project is licensed under the ISC License. See the `LICENSE` file for more details.
