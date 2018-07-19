/* eslint no-console: off, quotes: off */

const client = require('../lib/db-client');

const shows = [{
    name: 'Alone',
    description: 'Weirdos surviving for months alone in nature with an ax and a tarp.'
},
{
    name: 'Bachelorette',
    description: '11 man-babies, 8 dummies, 7 bores, and 2 almost-decent humans compete to marry a woman they barely know.'
}];

const showPromises = shows.map(show => {
    return client.query(
        `INSERT INTO shows(
            name,
        description
        ) 
        VALUES($1, $2)
        ON CONFLICT DO NOTHING;`,
        [show.name, show.description]
    );
});

Promise.all(showPromises)
    .then(() => {
        return client.query(
            `SELECT * FROM shows`
        );
    })
    .then(result => {
        console.log(result.rows);
    })
    .then(
        () => console.log('load workin baby'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });
    