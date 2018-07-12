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
    select(id) {
        return id ? this.selectOne(id) : this.selectAll();
    },
    selectAll() {
        return client.query(`
            SELECT * FROM heroes;
        `)
            .then(({ rows }) => rows);
    },
    selectOne(id) {
        return client.query(`
            SELECT * FROM heroes
            WHERE id = $1;
        `,
        [id])
            .then(({ rows }) => rows[0]);
    },
    update(hero) {
        return client.query(`
            UPDATE heroes SET
                name = $1,
                title = $2,
                attribute = $3
            WHERE id = $4
            RETURNING *;

        `,
        [hero.name, hero.title, hero.attribute, hero.id])
            .then(({ rows }) => rows[0]);
    },
    delete(id) {
        return client.query(`
            DELETE FROM heroes
            WHERE id = $1;
        `,
        [id])
            .then(() => null);
    }
};