const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
// const client = require('../lib/db-client');

describe('the basketball players API', () => {

    let lebron = {
        name: 'LeBron James',
        position: 'SF',
        description: 'Best player on the planet'
    };

    let kd = {
        name: 'Kevin Durant',
        position: 'SF/PF',
        description: 'People do not like KD cause he snekked'
    };

    it('can GET all players at once', () => {
        return chai.request(app)
            .get('/players')
            .then(({ body }) => {
                // assert.equal()
                console.log('***PLAYER CONSOLE***', body);
                assert.deepEqual(body, [lebron, kd]);
            });
    });

    // beforeEach(() => client.query('DELETE FROM players;'));


    // function save(player) {
    //     return chai.request(app)
    //         .post('/players')
    //         .send(player)
    //         .then(({ body }) => {
    //             player.id = body.id;
    //             assert.deepEqual(body, player);
    //         });
    // }

    // beforeEach(() => {
    //     return save(lebron);
    // });

    // beforeEach(() => {
    //     return save(kd);
    // });

    // it('saves a player', () => {
    //     assert.ok(lebron.id);
    // });
});