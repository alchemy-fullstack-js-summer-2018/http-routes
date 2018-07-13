const { createServer } = require('http');
const app = require('./lib/app');

const PORT = 8080;

const server = createServer(app).listen(PORT, () => {
    console.log('server is running on', server.address().port);
});