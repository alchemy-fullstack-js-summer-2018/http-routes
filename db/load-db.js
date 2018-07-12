// const client = require('../lib/db-client');

// const archer = [
//     {
//         'name': 'Sterling Archer',
//         'sex': 'male', 
//         'quote': 'Phrasing'
//     },

//     {
//         'name': 'Lana Kane',
//         'sex': 'female',
//         'quote': 'Yup.'
//     }
// ];

// const archerTable = archer.map(character => {
//     return client.query(`
//         INSERT INTO archer (
//             name,
//             sex,
//             quote
//         )
//         VALUES ($1, $2, $3);
//         `,
//     [
//         character.name,
//         character.sex,
//         character.quote
//     ]
//     );
// });

// Promise.all(archerTable)
//     .then(() => {
//         return client.query(`
//         SELECT *
//         FROM archer;
//         `
//         );
//     })
//     .then(result => {
//         console.log(result.rows);
//     })
//     .then(
//         () => console.log('load successful'),
//         err => console.error(err)
//     )
//     .then(() => {
//         client.end();
//     });