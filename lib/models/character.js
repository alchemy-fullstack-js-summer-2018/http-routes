const client = require('../db-client');

module.exports = {
    insert(character) {
        return client.query(`
            INSERT INTO archer (
                name,
                sex,
                quote
            )
            VALUES($1, $2, $3)
            RETURNING *;
        `,
        [character.name, character.sex, character.quote]
        ).then(({ rows }) => rows[0]);
    },
    selectOne(id) {
        return client.query(`
            SELECT * 
            FROM archer
            WHERE id = $1;
        `,
        [id]
        ).then(({ rows }) => rows[0]);
    },
    selectAll() {
        return client.query(`
            SELECT *
            FROM archer
            `)
            .then(({ rows }) => rows);
    },
    update(character) {
        return client.query(`
            UPDATE archer
            SET
                name = $1,
                sex = $2,
                quote = $3

            WHERE id = $4
            RETURNING *;
        `,
        [character.name, character.sex, character.quote, character.id]
        ).then(({ rows }) => rows[0]);
    },
    delete(id) {
        return client.query(`
            DELETE FROM archer
            WHERE id = $1;
        `,
        [id]
        ).then(() => null);
    }
};