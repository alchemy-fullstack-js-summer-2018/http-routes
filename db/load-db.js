/* eslint no-console: off, quotes: off */

const client = require('../lib/db-client');
const coffee = ['drip', 'espresso', 'latte', 'americano'];

const coffeePromises = coffee.map(coffee => {
    return client.query(
        `INSERT INTO coffee(name)
        VALUES($1)
        ON CONFLICT DO NOTHING;`,
        [coffee]
    );
});

Promise.all(coffeePromises)
    .then(() => {
        return client.query(
            `SELECT * FROM coffee`
        );
    })
    .then(result => {
        console.log(result.rows);
    })
    .then(
        () => console.log('load successful'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });