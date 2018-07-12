const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');

describe('fruits API', () => {

    beforeEach(() => client.query('DELETE FROM pets'));

    let fruit1 = {
        name: 'Strawberries',
        color: 'red',
        calories: '125'
    };

    let fruit2  = {
        name: 'Watermelon',
        color: 'yellow',
        calories: '75'
    };

    function save(fruit) {
        return chai.request(app)
            .post('/fruits')
            .send(fruit)
            .then(({ body }) => {
                fruit.id = body.id;
                assert.deepEqual(body, fruit);
            });
    }

    beforeEach(() => {
        return save(fruit1);
    });

    beforeEach(() => {
        return save(fruit2);
    });

    it('saves a fruit', () => {
        assert.ok(fruit2.id);
    });
});