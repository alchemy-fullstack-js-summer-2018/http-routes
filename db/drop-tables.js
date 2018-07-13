const client = require('../lib/db-client');

client.query(`
    DROP TABLE archer;
`)
    .then(
        () => console.log('drop successful'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });