const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');

describe('mushrooms API', () => {

    beforeEach(() => client.query('DELETE FROM mushrooms'));

    let shiitake = {
        id: 1,
        name: 'Shiitake',
        origin: 'East Asia',
        description: 'Delicious mushroom.'
    };

    let amanita = {
        id: 2,
        name: 'Amanita Muscaria',
        origin: 'Northern Hemisphere',
        description: 'Super Mario Brothers love these.'
    };

    function save(shroom) {
        return chai.request(app)
            .post('/mushrooms')
            .send(shroom)
            .then(({ body }) => {
                shroom.id = body.id;
                assert.deepEqual(body, shroom);
            });
    }

    beforeEach(() => {
        return save(shiitake);
    });

    beforeEach(() => {
        return save(amanita);
    });

    it('Saves a shroom', () => {
        assert.ok(shiitake.id);
    });

    it('Gets a shroom by id', () => {
        return chai.request(app)
            .get(`/mushrooms/${shiitake.id}`)
            .then(({ body }) => {
                assert.deepEqual(body, shiitake);
            });
    });

    it('Gets all the shrooms', () => {
        return chai.request(app)
            .get('/mushrooms')
            .then(({ body }) => {
                assert.deepEqual(body, [shiitake, amanita]);
            });
    });

    it('Updates a shroom', () => {
        amanita.origin = 'The Mushroom Kingdom';
        return chai.request(app)
            .put('/mushrooms')
            .send(amanita)
            .then(({ body }) => {
                assert.equal(body.origin, 'The Mushroom Kingdom');
            });
    });

    it('Deletes a shroom', () => {
        return chai.request(app)
            .delete(`/mushrooms/${shiitake.id}`)
            .then(() => {
                return chai.request(app)
                    .get(`/mushrooms/${shiitake.id}`);
            })
            .then(res => {
                assert.equal(res.status, 404);
            });
                
    });
});