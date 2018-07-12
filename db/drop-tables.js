/* eslint no-console: off, quote: off */

const client = require('../lib/db-client');

client.query(`
    DROP TABLE albums;
`)
    .then(
        () => console.log('Drop successful'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });