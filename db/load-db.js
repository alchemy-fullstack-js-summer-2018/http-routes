/* eslint no-console: off, quotes: off */

const client = require('../lib/db-client');

const categories = ['single coil pickups', 'humbucker pickups'];

const categoryPromises = categories.map(category => {
    return client.query(
        `INSERT INTO categories(model)
        VALUES($1)
        ON CONFLICT DO NOTHING;`,
        [category]
    );
});

Promise.all(categoryPromises)
    .then(() => {
        return client.query(
            `SELECT * FROM categories`
        );
    })
    .then(
        () => console.log('load successful'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });