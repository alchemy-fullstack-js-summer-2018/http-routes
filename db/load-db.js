/* eslint no-console: off, quotes: off */

const client = require('..lib/db-client');

const titles = ['Synchronicity', 'Disintegration', 'Violator', 'So', 'Ghost in the Machine'];

const titlePromises = titles.map(title => {
    return client.query(
        `INSERT INTO albums(title)
        VALUES($1)
        ON CONFLICT DO NOTHING;
        `,
        [title]
    );
});

Promise.all(titlePromises)
    .then(() => {
        return client.query(
            `SELECT * FROM albums`
        );
    })
    .then(result => {
        console.log(result.rows);
    })
    .then(
        () => console.log('db load successful'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });
