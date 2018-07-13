const client = require('../db-client');

module.exports = {
    select(id) {
        return id ? this.selectOne(id) : this.selectAll();
    },
    selectAll() {
        return client.query('SELECT * FROM CARS')
            .then(({ rows }) => rows);
    },
    selectOne(id) {
        return client.query(
            `SELECT *
            FROM CARS
            WHERE id = $1;
            `,
            [id]
        ).then(({ rows }) => rows[0]);
    },
    insert(car) {
        return client.query(`
            INSERT INTO CARS (
                brand, model
            )
            VALUES ($1, $2)
            RETURNING *;
        `,
        [car.brand, car.model]
        ).then(({ rows }) => rows[0]);
    },
    update(car) {
        return client.query(`
            UPDATE CARS
            SET
                brand = $1,
                model = $2
            WHERE id = $3
            RETURNING *;
        `,
        [car.brand, car.model, car.id]
        ).then(({ rows }) => rows[0]);
    },
    delete(id) {
        return client.query(`
            DELETE FROM CARS
            WHERE id = $1;
        `,
        [id]
        ).then(() => null);
    }
};