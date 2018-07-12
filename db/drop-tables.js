/* eslint no-console: off, quotes: off */

const client = require('../lib/db-client');

client.query(`
DROP TABLE coffee;
`)
    .then(
        () => console.log('drop successful'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });