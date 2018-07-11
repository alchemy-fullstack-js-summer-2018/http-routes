const { createServer } = require('http');
const app = require('./lib/app');

const PORT = 3000;

const server = createServer(app).listen(PORT, () => {
    console.log('Server running on port', server.address().port);
});