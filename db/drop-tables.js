const client = require('../lib/db-client');

client.query(`
    DROP TABLE players;
`)
    .then(
        () => console.log('drop successful'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });