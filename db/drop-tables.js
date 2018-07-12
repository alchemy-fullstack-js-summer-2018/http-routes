const client = require('../lib/db-client');

client.query(`
    DROP TABLE mushrooms
`)
    .then(
        () => console.log('drop succesful'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });