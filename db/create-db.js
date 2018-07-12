/* eslint no-console: off, quotes: off */
const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS movies(
        id SERIAL PRIMARY KEY,
        name VARCHAR(256),
        genre VARCHAR(256),
        year INTEGER NOT NULL
    );
`)
    .then(
        () => console.log('db task successful'),
        err => console.error(err)
    )
    .then(() => client.end());