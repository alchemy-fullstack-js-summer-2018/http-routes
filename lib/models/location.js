const client = require('../db-client');

module.exports = {
    select(id) {
        return id ? this.selectOne(id) : this.selectAll();
    },
    selectAll() {
        return client.query('SELECT * FROM locations')
            .then(({ rows }) => rows);
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
                country, city, food
            )
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
        [location.country, location.city, location.food]
        ).then(({ rows }) => rows[0]);
    },
    update(location) {
        return client.query(`
            UPDATE locations
            SET
                country = $1,
                city = $2,
                food = $3
            WHERE id = $5
            RETURNING *;
        `,
        [location.country, location.city, location.food, location.id]
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