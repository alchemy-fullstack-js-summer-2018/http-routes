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
    }
};