// MODEL
const client = require('../db-client');

module.exports = {

    select(id) {
        return id ? this.selectOne(id) : this.selectAll();
    },

    selectAll() {
        return client.query('SELECT * FROM mushrooms')
            .then(({ rows }) => rows);
    },

    selectOne(id) {
        return client.query(`
            SELECT * FROM mushrooms
            WHERE id = $1;
        `,
        [id]
        ).then(({ rows }) => rows[0]);
    },

    insert(shroom) {
        return client.query(`
            INSERT INTO mushrooms (
                id, name, origin, description
            )
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `,
        [shroom.id, shroom.name, shroom.origin, shroom.description]
        ).then(({ rows }) => rows[0]);
    }
};