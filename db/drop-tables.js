/* eslint no-console:off, quotes: off */

const client = require('../lib/db-client');

client.query(`
    DROP TABLE IF EXISTS heroes;
`)
    .then(
        () => console.log('drop table successful'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });