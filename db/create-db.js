const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS archer (
        id SERIAL PRIMARY KEY,
        name VARCHAR(32),
        sex VARCHAR(32),
        quote VARCHAR(256)
    );
`)
    .then(
        () => console.log('create tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });