const client = require('../lib/db-client');

client.query(`
    DROP TABLE players;
    DROP TABLE positions;
`)
    .then(
        () => console.log('drop successful'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });