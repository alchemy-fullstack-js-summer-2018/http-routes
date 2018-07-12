/* eslint no-console: off, quotes: off */
const client = require('../lib/db-client');

const movies = [
    {
        name: 'terminator',
        genre: 'sci-fi',
        year: 1984
    },
    {
        name: 'collateral',
        genre: 'action',
        year: 2004
    },
    {
        name: 'coraline',
        genre: 'horror',
        year: 2009
    }
];

const moviePromises = movies.map(movie => {
    return client.query(`
        INSERT INTO movies (name, genre, year)
        VALUES ($1, $2, $3);
    `,
    [movie.name, movie.genre, movie.year]
    );
});

Promise.all(moviePromises)
    .then(() => {
        return client.query(`
            SELECT * FROM movies;
        `);
    })
    .then(
        () => console.log('load successful'),
        err => console.error(err)
    )
    .then(() => client.end());