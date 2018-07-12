const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');


describe('HTTP methods and paths', () => {

    it('returns 404 on not found', () => {
        return chai.request(app)
            .get('/sad-path')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });
});