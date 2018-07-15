/* eslint no-console: off, quotes: off */

const client = require('../lib/db-client');

const guitars = ['Fender', 'Gibson', 'Squire'];

const categoryPromises = guitars.map(guitar => {
    return client.query(
        `INSERT INTO guitars(model)
        VALUES($1)
        ON CONFLICT DO NOTHING;`,
        [guitar]
    );
});

Promise.all(categoryPromises)
    .then(() => {
        return client.query(
            `SELECT * FROM guitars`
        );
    })
    .then(
        () => console.log('load successful'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });