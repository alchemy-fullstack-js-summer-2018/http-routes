/* eslint no-console: off, quotes: off */

const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS cars(
        id SERIAL PRIMARY KEY,
        brand VARCHAR(256),
        model VARCHAR(256)
    );
`)
    .then(
        () => console.log('Tables created...'),
        err => console.error(err)
    )
    .then(() => client.end());