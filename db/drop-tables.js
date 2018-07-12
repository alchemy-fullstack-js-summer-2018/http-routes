/* eslint no-console:off, quotes: off */

const client = require('../lib/db-client');

client.query(`
    DROP TABLE IF EXISTS shows;
`)
    .then(
        () => console.log('table dropped'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });