// imprts the Express.js framework
const express = require('express');
// creates an instance of the express plication. This app variable will be used to define routes and configure the server.
const app = express();
const port = 3000;

// defines a route for the root URL (/). When a client makes a GET request to the root URL,
// the server responds with msg 'Hello World!'
app.get('/', (req,res)=> {
    res.send('Hello, World!');
});

// start the server
app.listen(port, () => {
    console.log(`Sever is running at http://localhost:$(port)`);
});