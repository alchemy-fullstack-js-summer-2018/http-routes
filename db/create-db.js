/* eslint no-console: off, quotes: off */

const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS heroes(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        title VARCHAR(128) NOT NULL,
        attribute VARCHAR(64) NOT NULL
    );
`)
    .then(
        () => console.log('create table successful'),
        err => console.error(err)
    )
    .then(() => client.end());