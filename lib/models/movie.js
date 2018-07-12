const client = require('../db-client');

module.exports = {
    select(id) {
        return id ? this.selectOne(id) : this.selectAll();
    },
    
    selectAll() {
        return client.query('SELECT * FROM movies;')
            .then(({ rows }) => rows);
    },

    selectOne(id) {
        return client.query(`
            SELECT *
            FROM movies
            WHERE id = $1;
        `,
        [id]
        ).then(({ rows }) => rows[0]);
    },

    insert(movie) {
        return client.query(`
            INSERT INTO movies (name, genre, year)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
        [movie.name, movie.genre, movie.year]
        ).then(({ rows }) => rows[0]);
    },

    delete(id) {
        return client.query(`
            DELETE FROM movies
            WHERE id = $1;
        `,
        [id]
        ).then(() => null);
    }
};