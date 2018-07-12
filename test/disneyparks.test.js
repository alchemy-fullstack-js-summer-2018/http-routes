const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');

describe('disneyparks API', () => {

    it('returns list of parks(GET /disneyparks)', () => {
        return chai.request(app)
            .get('/disneyparks')
            .then(res => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, [
                    { name: 'DLR' }
                ]);
            });
    });

    it('GET park by id', () => {
        return chai.request(app)
            .get('/disneyparks')
            .then(res => {
                assert.deepEqual(res.body, [
                    { name: 'DLR' }
                ]);
            });
    });
});