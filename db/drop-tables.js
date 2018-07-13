/* eslint no-console: off, quotes: off */

const client = require('../lib/db-client');

client.query(
    `DROP TABLE cars;
`)
    .then(
        () => console.log('Dropped tables...'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });