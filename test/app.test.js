const { join } = require('path');
require('dotenv').config({ path: join(__dirname, '.env.test') });
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');

describe('Testing at the app level', () => {

    it('Returns 404 Not found', () => {
        return chai.request(app)
            .get('/not-found')
            .then(res => {
                assert.equal(res.status, 404);
                assert.equal(res.type, 'application/json');
            });
    });
});

after(() => client.end());