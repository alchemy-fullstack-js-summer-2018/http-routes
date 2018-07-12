const client = require('../lib/db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS positions(
        id SERIAL PRIMARY KEY,
        position VARCHAR(256) UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS players(
        id SERIAL PRIMARY KEY,
        name VARCHAR(256),
        position_id INTEGER NOT NULL REFERENCES positions (id),
        description VARCHAR(256)
    );
`)
    .then(
        () => console.log('db task successful'),
        err => console.error(err)
    )
    .then(() => client.end());