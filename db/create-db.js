/* eslint no-console: off, quotes: off */

const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS albums(
        id SERIAL PRIMARY KEY,
        title VARCHAR(256),
        artist VARCHAR(256)
    );
`)
    .then(
        () => console.log('db create tables successful'),
        err => console.error(err)
    )
    .then(() => client.end());