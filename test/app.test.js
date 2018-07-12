const { join } = require('path');
require('dotenv').config({ path:join(__dirname, '.env.test') });
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
// const client = require('../lib/db-client');

describe('app level', () => {

    it('returns 404 on not found', () => {
        return chai.request(app)
            .get('/not-found')
            .then(res => {
                assert.equal(res.status, 404);
                // assert.equal(res.type, 'application/json');
            });
    });

    it('returns disneyparks page on GET', () => {
        return chai.request(app)
            .get('/disney-parks')
            .then(res => {
                assert.equal(res.text, 'Here you you leave today...')
            });
    });
});
