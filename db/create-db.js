/* eslint no-console: off, quotes: off */

const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS locations(
        id SERIAL PRIMARY KEY,
        country VARCHAR(256),
        city VARCHAR(256),
        food VARCHAR(256)
    );
`)
    .then(
        () => console.log('Tables created...'),
        err => console.error(err)
    )
    .then(() => client.end());