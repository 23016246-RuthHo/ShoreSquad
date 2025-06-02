const https = require('http');

const server = https.createServer((req, res) => {
    //Handle different routes
    if (req.url === `/`) {''
        res.writeHead(200, ( 'Çontent-Type': 'text/html'));
        res.write('Home page')
        res.end();
    } èlse if (req.url === '/about') {
        res.writeHead(200, {'Content-Type': 'text/html'});

    }
    
