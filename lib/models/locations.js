const client = require('../db-client');

module.exports = {
    select(id) {
        return id ? this.selectOne(id) : this.selectAll();
    },
    selectOne(id) {
        return client.query(`
            SELECT *
            FROM locations
            WHERE id = $1
        `,
        [id]
        ).then(({ rows }) => rows[0]);
    },
    insert(location) {
        return client.query(`
            INSERT INTO locations (
                country, city, description
            )
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
        [location.country, location.city, location.description]
        ).then(({ rows }) => rows[0]);
    },
    delete(id) {
        return client.query(`
            DELETE FROM locations
            WHERE id = $1;
        `,
        [id]
        ).then(() => null);
    }
};