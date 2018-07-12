const { createServer } = require('http');
const app = require('./lib/app');

cost PORT = 3000;

const server = createServer(app).listen(PORT, () => {
    console.log('server running on', server.address().port);
});