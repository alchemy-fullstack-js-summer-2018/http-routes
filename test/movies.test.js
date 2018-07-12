const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
// const client = require('../lib/db-client');

describe('movies API', () => {
    it('GET movie by id', () => {
        return chai.request(app)
            .get('/movies/1')
            .then(({ body }) => {
                assert.deepEqual(body.name, 'terminator');
            });
    });
});