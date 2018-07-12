const client = require('../db-client');

// module.exports = {
//     select(id) {
//         return(id) ? this.selectOne(id) : this.selectAll();
//     },
//     selectAll() {
//         return client.query('SELECT * FROM PETS')
//         .then(({ rows })) => rows);
//     },
//     selectOne(id) {
//         return client.query(`
//             SELECT *
//             FROM PETS
//             WHERE id = $1;
//         `,
//         [id]
//         ).then(({ rows })) => rows[0]);
//     }

// };