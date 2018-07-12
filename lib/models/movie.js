const client = require('../db-client');

module.exports = {
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