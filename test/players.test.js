const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');

describe('the basketball players API', () => {

    beforeEach(() => client.query('DELETE FROM players;'));

    let lebron = {
        name: 'LeBron James',
        id: 1,
        position: 'SF',
        description: 'Best player on the planet'
    };

    function save(player) {
        return chai.request(app)
            .post('/players')
            .send(player)
            .then(({ body }) => {
                player.id = body.id;
                assert.deepEqual(body, player);
            });
    }
        
    let kd = {
        name: 'Kevin Durant',
        id: 2,
        position: 'SF/PF',
        description: 'People do not like KD cause he snekked'
    };
        
    beforeEach(() => {
        return save(lebron);
    });

    beforeEach(() => {
        return save(kd);
    });

    it('saves a player', () => {
        assert.ok(lebron.id);
    });

    it('can GET all players at once', () => {
        return chai.request(app)
            .get('/players')
            .then(({ body }) => {
                // assert.equal()
                assert.deepEqual(body, [lebron, kd]);
            });
    });

    it('can GET lebron when given his id', () => {
        return chai.request(app)
            .get('/players/1')
            .then(({ body }) => {
                assert.deepEqual(body, lebron);
            });
    });

    it('can GET kd when given his id', () => {
        return chai.request(app)
            .get('/players/2')
            .then(({ body }) => {
                assert.deepEqual(body, kd);
            });
    });




});