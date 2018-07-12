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
    }
};