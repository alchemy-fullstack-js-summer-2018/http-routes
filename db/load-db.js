const client = require('../lib/db-client');

const positions = ['pg', 'sg', 'sf', 'pf', 'c'];

const positionPromises = positions.map(position => {
    return client.query(
        `INSERT INTO positions(position)
        VALUES($1)
        ON CONFLICT DO NOTHING;`,
        [position]
    );
});

Promise.all(positionPromises)
    .then(() => {
        return client.query(
            `SELECT * FROM positions`
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