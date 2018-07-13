const dotenv = require('dotenv');
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/nba';

const pg = require('pg');
const Client = pg.Client;

const client = new Client(DATABASE_URL);
client.connect()
    .then(() => console.log('connected to db', DATABASE_URL))
    .catch(err => console.error('connection error', err));

client.on('error', err => {
    console.error('****DATABASE ERROR****', err);
});

module.exports = client;