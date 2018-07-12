/* eslint no-console: off */

const { createServer } = require('http');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;

const app = require('./lib/app');

const server = createServer(app).listen(PORT, () => {
    console.log('server running on', server.address().port);
});
