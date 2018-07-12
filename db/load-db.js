const client = require('../lib/db-client');

const mushrooms = [{
    id: 1,
    name: 'Shiitake',
    origin: 'East Asia',
    description: 'Delicious mushroom.'
},
{
    id: 2,
    name: 'Amanita Muscaria',
    origin: 'Northern Hemisphere',
    description: 'Super Mario Brothers love these.'
}];

const mushroomPromises = mushrooms.map(shroom => {
    return client.query(`
        INSERT INTO mushrooms
        VALUES($1, $2, $3, $4)
        ON CONFLICT DO NOTHING;`,
    [shroom.id, shroom.name, shroom.origin, shroom.description]
    );
});

Promise.all(mushroomPromises)
    .then(() => {
        return client.query(
            'SELECT * FROM mushrooms'
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