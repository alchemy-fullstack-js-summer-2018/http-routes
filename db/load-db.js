/* eslint no-console: off, quotes: off */

const client = require('../lib/db-client');

const disneyparks = ['DLR', 'WDW', 'TDR', 'DLP'];

const parkPromises = disneyparks.map(park => {
    return client.query(
        `INSERT INTO disneyparks(name)
        VALUES($1)
        ON CONFLICT DO NOTHING;`,
        [park]
    );
});

Promise.all(parkPromises)
    .then(() => {
        return client.query(
            `SELECT * FROM disneyparks`
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