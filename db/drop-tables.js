/* eslint no-console: off, quote: off */

const client = require('../lib/db-client');

client.query(`
    DROP TABLE fruits;
`)
    .then(
        () => console.log('drop successful'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });