const client = require('../db-client');

module.exports = {
    select(id) {
        return id ? this.selectOne(id) : this.selectAll();
    },
    selectAll() {
        return client.query('SELECT * FROM players')
            .then(({ rows }) => rows);

    },
    selectOne(id) {
        return client.query(`
            SELECT *
            FROM players
            WHERE id = $1;
        `,
        [id]
        ).then(({ rows }) => rows[0]);
    },
    insert(player) {
        return client.query(`
        INSERT INTO players(
            name, position, description
        )
        VALUES($1, $2, $3)
        RETURNING *;
        `,
        [player.name, player.position, player.description]
        ). then(({ rows }) => rows[0]);
    },
    update(player) {
        return client.query(`
        UPDATE players
        SET
            name = $1,
            position = $2,
            description = $3
        WHERE id = $4
        RETURNING *;
        `,
        [player.name, player.position, player.description, player.id]
        ).then(({ rows }) => rows[0]);
    },
    delete(id) {
        return client.query(`
            DELETE FROM players
            WHERE id = $1;    
        `,
        [id]
        ).then(() => null);
    }
};