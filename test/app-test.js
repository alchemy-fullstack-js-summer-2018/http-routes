const { join } = require('path');
require('dotenv').config({ path: join(__dirname, '.env-test') });
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');

describe('app level', () => {

    it('returns 404 not found', () => {
        return chai.request(app)
            .get('/shows')
            .then(res => {
                assert.equal(res.status, 404);
                assert.equal(res.type, 'application/json');
            });
    });
});

describe('shows API', () => {
    beforeEach(() => client.query('DELETE FROM shows'));

    let alone = {
        name: 'Alone',
        description: 'Weirdos surviving for months alone in nature with an ax and a tarp.'
    };
});

after(() => client.end());