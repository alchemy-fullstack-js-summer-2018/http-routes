const client = require('../db-client');

module.exports = {
    select(id) {
        return id ? this.selectOne(id) : this.selectAll();
    },
    selectAll() {
        return client.query('SELECT * FROM FRUITS')
            .then(({ rows }) => rows);
    },
    selectOne(id) {
        return client.query(`
            SELECT * 
            FROM FRUITS
            WHERE id = $1;
        `,
        [id]
        ).then(({ rows }) => rows[0]);
    },
    insert(fruit) {
        return client.query(`
            INSERT INTO FRUITS (
                name, color, calories
            )
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
        [fruit.name, fruit.color, fruit.calories]
        ).then(({ rows }) => rows[0]);
    },
};    