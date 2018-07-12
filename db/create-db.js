/* eslint no-console: off, quotes: off */

const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS disneyparks(
        id SERIAL PRIMARY KEY,
        name VARCHAR(256) UNIQUE NOT NULL,
        location VARCHAR(256) UNIQUE NOT NULL,
        est INTEGER NOT NULL
    );
`)
    .then(
        () => console.log('db task successful'),
        err => console.error(err)
    )
    .then(() => client.end());