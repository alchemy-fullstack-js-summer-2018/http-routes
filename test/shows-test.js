//const { join } = require('path');
//require('dotenv').config({ path: join(__dirname, '.env') });
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');

describe('shows API', () => {

    beforeEach(() => client.query('DELETE FROM shows'));

    function save(show) {
        return chai.request(app)
            .post('/shows')
            .send(show)
            .then(({ body }) => {
                show.id = body.id;
                assert.deepEqual(body, show);
            });
    }

    let alone = {
        name: 'Alone',
        description: 'Weirdos surviving for months alone in nature with an ax and a tarp.'
    };

    let bachelorette = {
        name: 'Bachelorette',
        description: '11 man-babies, 8 dummies, 7 bores, and 2 almost-decent humans compete to marry a woman they barely know.'
    };

    beforeEach(() => {
        return save(alone);
    });
    
    beforeEach(() => {
        return save(bachelorette);
    });

    it('saves a show', () => {
        assert.ok(alone.id);
    });

    it('DELETE show', () => {
        return chai.request(app)
            .del(`/shows/${alone.id}`)
            .then(res => {
                assert.deepEqual(res.body, { removed: true });
            })
            .then(() => {
                return chai.request(app)
                    .get(`/shows/${alone.id}`);
            })
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('updates a show', () => {
        alone.description = 'Ten weirdos surviving for months alone in nature with an ax and a tarp.';
        return chai.request(app)
            .put('/shows')
            .send(alone)
            .then(({ body }) => {
                assert.equal(body.description, 'Ten weirdos surviving for months alone in nature with an ax and a tarp.');
            });
    });

    it('GET shows', () => {
        return chai.request(app)
            .get('/shows')
            .then(({ body }) => {
                assert.deepEqual(body, [alone, bachelorette]);
            });
    });

    it('GET show Alone by id', () => {
        return chai.request(app)
            .get(`/shows/${alone.id}`)
            .then(({ body }) => {
                assert.deepEqual(body, alone);
            });
    });

    it('update only show being updated', () => {
        alone.description = 'Ten weirdos surviving for months alone in nature with an ax and a tarp.';
        return chai.request(app)
            .put(`/shows/${alone.id}`)
            .send(alone)
            .then(() => chai.request(app).get('/shows'))
            .then(({ body }) => {
                body.sort((a, b) => a.id - b.id);
                assert.deepEqual(body, [alone, bachelorette]);
            });
    });







});