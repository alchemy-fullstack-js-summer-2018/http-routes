/* eslint no-console: off, quotes: off */

const client = require('../lib/db-client');

const disneyparks = [
    {
        name: 'DLR',
        location: 'Anaheim',
        est: 1955
    },
    {
        name: 'WDW',
        location: 'Orlando',
        est: 1971
    },
    {
        name: 'TDR',
        location: 'Tokyo',
        est: 1983
    },
    {
        name: 'DLP',
        location: 'Paris',
        est: 1992
    }
];

const parkPromises = disneyparks.map(park => {
    return client.query(
        `INSERT INTO disneyparks(name, location, est)
        VALUES($1, $2, $3)
        ON CONFLICT DO NOTHING;`,
        [park.name, park.location, park.est]
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