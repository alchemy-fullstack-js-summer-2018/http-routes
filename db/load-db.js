/* eslint no-console: off, quotes: off */

const client = require('../lib/db-client');

const locations = require('../data/locations.json');

const locationPromise = locations.map(location => {
    return client.query(
        `INSERT INTO locations (country, city, food)
        VALUES($1, $2, $3)
        ON CONFLICT DO NOTHING;`,
        [location.country, location.city, location.food]
    );
});

Promise.all(locationPromise)
    .then(() => {
        return client.query(
            `SELECT * FROM locations`
        );
    })
    .then(result => {
        console.log(result.rows);
    })
    .then(
        () => console.log('Load DB successful...'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });