const { join } = require('path');
const app = require('../lib/app');
require('dotenv').config({ path: join(__dirname, '.env.test') });
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const client = require('../lib/db-client');

describe('app level 404', () => {

    it('returns 404 on not found', () => {
        return chai.request(app)
            .get ('/not-found')
            .then(res => {
                assert.equal(res.status, 404);
                assert.equal(res.type, 'application/json');
            });
    });
});

after(() => client.end());
