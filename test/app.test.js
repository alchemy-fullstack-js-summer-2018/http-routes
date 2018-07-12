const { join } = require('path');
require('dotenv').config({ path: join(__dirname, '.env.test') });
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');

describe('app level functionality', () => {

    it.skip('returns a 404 when the path is not found', () => {
        return chai.request(app)
            .get('/path-does-not-exist')
            .then(res => {
                assert.equal(res.status, 404);
                assert.equal(res.type, 'application/json');
            });
    });
});

after(() => client.end());