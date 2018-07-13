/* eslint no-condole: off, quotes: off */

const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS fruits(
        id SERIAL PRIMARY KEY,
        name VARCHAR(256),
        color VARCHAR(256),
        calories INTEGER NOT NULL
    );
`)
    .then(
        () => console.log('db task successful'),
        err => console.error(err)
    )
    .then(() => client.end());
