const dotenv = require('dotenv');
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/tvshows';

const pg = require('pg');
const Client = pg.Client;

const client = new Client(DATABASE_URL);
client.connect()
    .then(() => console.log('Connected to DB', DATABASE_URL))
    .catch(err => console.log('Connection error', err));

client.on('error', err => {
    console.log('\n****** DATABASE ERROR ******\n\n', err);
});

module.exports = client;