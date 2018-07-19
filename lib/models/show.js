const client = require('../db-client');

module.exports = {
    select(id) {
        return id ? this.selectOne(id) : this.selectAll();
    },
    selectAll() {
        return client.query('SELECT * FROM shows')
            .then(({ rows }) => rows);

    },
    selectOne(id) {
        return client.query(`
            SELECT *
            FROM shows
            WHERE id = $1;
        `,
        [id]
        ).then(({ rows }) => rows[0]);
    },
    insert(show) {
        return client.query(`
        INSERT INTO shows (
            name, description
        )
        VALUES ($1, $2)
        RETURNING *;
    `,
        [show.name, show.description]
        ).then(({ rows }) => rows[0]);
    },
    update(show) {
        return client.query(`
        UPDATE SHOWS
        SET
            name = $1,
            description = $2
        WHERE id = $3
        returning *;
    `,
        [show.name, show.description, show.id]
        ).then(({ rows }) => rows[0]);
    },
    delete(id) {
        return client.query(`
        DELETE FROM shows
        WHERE id = $1;
        `,
        [id]
        ).then(() => null);
    }
};