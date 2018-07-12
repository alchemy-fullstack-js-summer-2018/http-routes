const client = require('../db-client');

module.exports = {
    insert(hero) {
        return client.query(`
            INSERT INTO heroes (
                name,
                title,
                attribute
            )
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
        [hero.name, hero.title, hero.attribute])
            .then(({ rows }) => rows[0]);
    },
    selectAll() {
        return client.query(`
            SELECT * FROM heroes;
        `)
            .then(({ rows }) => rows);
    }
};