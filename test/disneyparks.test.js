const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');

describe('disneyparks API', () => {

    it.skip('returns here you leave today on GET', () => {
        return chai.request(app)
            .get('/disney-parks')
            .then(res => {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'Here you leave today...');
            });
    });

    it('returns you found a park', () => {
        return chai.request(app)
            .get('/disney-parks')
            .then(res => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, [
                    { name: 'DLR' }
                ]);
            });
    });
});