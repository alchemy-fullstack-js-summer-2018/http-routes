const client = require('../db-client');

module.exports = {
    insert(guitar) {
        return client.query(`
            INSERT INTO guitars (
                model, manufacturer
            )
            VALUES ($1, $2)
            RETURNING *;
        `,
        [guitar.model, guitar.manufacturer]
        ).then(({ rows }) => rows[0]);
    },
    select(id) {
        return id ? this.selectOne(id) : this.selectAll();
    },
    selectAll() {
        return client.query(`
            SELECT * FROM guitars
        `)
            .then(({ rows }) => rows);
    },
    selectOne(id) {
        return client.query(`
            SELECT * FROM guitars
            WHERE id = $1;
        `,
        [id]
        ).then(({ rows }) => rows[0]);
    },
    update(guitar) {
        return client.query(`
            UPDATE guitars SET
                model = $1,
                manufacturer = $2
               
            WHERE id = $3
            RETURNING *;
        `,
        [guitar.model, guitar.manufacturer, guitar.id]
        ).then(({ rows }) => rows[0]);
    },
    delete(id) {
        return client.query(`
            DELETE FROM guitars
            WHERE id = $1;
        `, 
        [id]
        ).then(() => null);
    }

};