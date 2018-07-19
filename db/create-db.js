/* eslint no-console: off, quotes: off */

const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS shows(
        id SERIAL PRIMARY KEY,
        name VARCHAR(256) UNIQUE NOT NULL,
        description VARCHAR(256)
    );
`)
    .then(
        () => console.log('create db table workin'),
        err => console.error(err)
    )
    .then(() => client.end());
