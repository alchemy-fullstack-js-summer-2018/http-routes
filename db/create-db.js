/* eslint no-console: off, quotes: off */
const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS guitars(
        id SERIAL PRIMARY KEY,
        model VARCHAR(256) UNIQUE NOT NULL,
        manufacturer VARCHAR(256) UNIQUE NOT NULL
    );
`)
    .then(
        () => console.log('db task successful'),
        err => console.error(err)

    )
    .then(() => client.end());
    