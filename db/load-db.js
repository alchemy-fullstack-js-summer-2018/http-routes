const client = require('../lib/db-client');

// const players = ['1', 'LeBron', 'SF', 'Best player on the planet'];
const players = [{
    id: '1',
    name: 'Lebron',
    position: 'SF',
    description: 'Best player on the planet'
},
{
    id: '2',
    name: 'Kevin Durant',
    position: 'SF/PF',
    description: 'People do not like KD cause he snekked'
}];

const playerPromises = players.map(player => {
    return client.query(
        `INSERT INTO players
        VALUES($1, $2, $3, $4)
        ON CONFLICT DO NOTHING;`,
        [player.id, player.name, player.position, player.description]
    );
});

Promise.all(playerPromises)
    .then(() => {
        return client.query(
            `SELECT * FROM players`
        );
    })
    .then(result => {
        console.log(result.rows);
    })
    .then(
        () => console.log('load successful'),
        err => console.error(err)
    )
    .then(() => {
        client.end();
    });