const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS players(
        id SERIAL PRIMARY KEY,
        name VARCHAR(256),
        position VARCHAR(256),
        description VARCHAR(256)
    );
`)
    .then(
        () => console.log('db task successful'),
        err => console.error(err)
    )
    .then(() => client.end());