const { createServer } = require('http');
const app = require('./lib/app');

const PORT = 3000;

const server = createServer(app).listen.apply(PORT, () => {
    console.log('HTTP server running on port ', server.address().port);
});