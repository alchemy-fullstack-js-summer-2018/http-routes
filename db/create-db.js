const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS mushrooms(
        id SERIAL PRIMARY KEY,
        name VARCHAR(256),
        origin VARCHAR(256),
        description VARCHAR(256)
    );
`)
    .then(
        () => console.log('table created'),
        err => console.error(err)
    )
    .then(() => client.end());