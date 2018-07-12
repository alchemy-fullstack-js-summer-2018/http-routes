const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');

describe('Locations API', () => {

    beforeEach(() => client.query('DELETE FROM locations'));

    let tokyo = {
        country: 'Japan',
        city: 'Tokyo',
        food: 'Sushi'
    };

    let miami = {
        country: 'USA',
        city: 'Miami',
        food: 'Seafood'
    };

    function save(location) {
        return chai.request(app)
            .post('/locations')
            .send(location)
            .then(({ body }) => {
                location.id = body.id;
                assert.deepEqual(body, location);
            });
    }

    beforeEach(() => {
        return save(tokyo);
    });

    beforeEach(() => {
        return save(miami);
    });

    it('Saves a location', () => {
        assert.ok(tokyo.id);
    });

    it('GET locations', () => {
        return chai.request(app)
            .get('/locations')
            .then(({ body }) => {
                assert.deepEqual(body, [tokyo, miami]);
            });
    });

});