const http = require('http');

const server = http.createServer ((req,res) => {
    //res.end('Hello,World!');

    res.write('<h1> Welcome to my first Node.JS Page! </h1>');
    res.write('<b> Name:</b> Peter Lim');
    res.write('<b>School:</b> Republic Polytechnic <br>');
    res.write('<h1> Diploma:</b> Diploma in Digital Design and Development</h2>');
    res.end()
});


const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Sever running at http://localhost;${PORT}/`);
});

