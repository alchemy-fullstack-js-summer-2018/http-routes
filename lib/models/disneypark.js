/* MODEL */
const client = require('../db-client');

module.exports = {
    select(id) {
        return id ? this.selectOne(id) : this.selectAll();
    },
    selectAll() {
        return client.query('SELECT * FROM disneyparks')
            .then(({ rows }) => rows);
    },
    selectOne(id) {
        return client.query(`
            SELECT * 
            FROM disneyparks
            WHERE id = $1;
        `,
        [id]
        ).then(({ rows }) => rows[0]);
    },
    insert(park) {
        return client.query(`
            INSERT INTO disneyparks (
                name, location, est
            )
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
        [park.name, park.location, park.est]
        ).then(({ rows }) => rows[0]);
    },
};