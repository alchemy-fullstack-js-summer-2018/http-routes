/* eslint no-console: off */
const { createServer } = require('http');
const app = require ('./lib/app');

const PORT = 3000;

const server = createServer(app).listen(PORT, () => {
    console.log('server runnin on', server.address().port);
});