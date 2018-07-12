const client = require('../lib/db-client');

const players = [{
    name: 'Lebron',
    position: 'SF',
    description: 'Best player on the planet'
},
{
    name: 'Kevin Durant',
    position: 'SF/PF',
    description: 'People do not like KD cause he snekked'
}];

const playerPromises = players.map(player => {
    return client.query(
        `INSERT INTO players(
            name,
            position,
            description
        )
        VALUES($1, $2, $3)
        ON CONFLICT DO NOTHING;`,
        [player.name, player.position, player.description]
    );
});

Promise.all(playerPromises)
    .then(() => {
        return client.query(
            'SELECT * FROM players;'
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