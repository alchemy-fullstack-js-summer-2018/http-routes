const client = require('../db-client');

module.exports = {
    select(id) {
        return id ? this.selectOne(id) : this.selectAll();
    },
    selectAll() {
        return client.query('SELECT * FROM GUITARS')
            .then(({ rows }) => rows);
    },
    selectOne(id) {
        return client.query(`
            SELECT *
            FROM GUITARS
            WHERE id = $1;
        `,
        [id]
        ).then(({ rows }) => rows[0]);
    },
    insert(guitar) {
        return client.query(`
            INSERT INTO GUITARS (
                model, manufacturer, category_id
            )
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
        [guitar.model, guitar.manufacturer, guitar.category_id]
        ).then(({ rows }) => rows[0]);
    },
    update(guitar) {
        return client.query(`
            UPDATE GUITARS
            SET
                model = $1,
                manufacturer = $2,
                category_id + $3,
            WHERE id =$5
            RETURNING *;
        `,
        [guitar.model, guitar.manufacturer, guitar.category_id]
        ).then(({ rows }) => rows[0]);
    },
    delete(id) {
        return client.query(`
            DELETE FROM GUITARS
            WHERE id = $1;
        `, 
        [id]
        ).then(() => null);
    }

};