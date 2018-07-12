/* eslint no-console: off */

const client = require('../lib/db-client');

client.query(`
    DROP TABLE locations;
`)
    .then(
        () => console.log('Dropped tables...'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });