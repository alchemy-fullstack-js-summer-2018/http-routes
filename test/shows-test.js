const { join } = require('path');
require('dotenv').config({ path: join(__dirname, '.env') });
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');

describe('shows API', () => {

    beforeEach(() => client.query('DELETE FROM shows'));

    let alone = {
        name: 'Alone',
        description: 'Weirdos surviving for months alone in nature with an ax and a tarp.'
    };

    function save(show) {
        return chai.request(app)
            .post('/shows')
            .send(show)
            .then(({ body }) => {
                show.id = body.id;
                assert.deepEqual(body, show);
            });
    }

    beforeEach(() => {
        return save(alone);
    });

    it('saves a show', () => {
        assert.ok(alone.id);
    });

});