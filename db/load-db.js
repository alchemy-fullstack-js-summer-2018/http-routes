/* eslint no-console: off */

const client = require('../lib/db-client');

const cars = require('../data/cars.json');

const carsPromise = cars.map(cars => {
    return client.query(
        `INSERT INTO cars (brand, model)
        VALUES($1, $2)
        ON CONFLICT DO NOTHING;`,
        [cars.brand, cars.model]
    );
});

Promise.all(carsPromise)
    .then(() => {
        return client.query(
            `SELECT * FROM cars`
        );
    })
    .then(result => {
        console.log(result.rows);
    })
    .then(
        () => console.log('Load DB successful'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });