const http = require('http');

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        res.end("Home Page");
    }
    else if (req.url === '/about') {
        res.end("About Page");
    }
    else if (req.url === '/contact') {
        res.end("Contact Page");
    }
    else {
        res.statusCode = 404;
        res.end("404 Page Not Found");
    }

});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});