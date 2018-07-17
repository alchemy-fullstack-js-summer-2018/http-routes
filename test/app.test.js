const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');


describe('Archer API', () => {

    beforeEach(() => client.query('DELETE FROM archer'));

    let archer = {
        name: 'Sterling Archer',
        sex: 'male',
        quote: 'Phrasing.'
    };

    let lana = {
        name: 'Lana Kane',
        sex: 'female',
        quote: 'Yup.'
    };

    function save(character) {
        return chai.request(app)
            .post('/archer')
            .send(character)
            .then(({ body }) => {
                character.id = body.id;
                assert.deepEqual(body, character);
            });
    }

    beforeEach(() => {
        return save(archer);
    });

    beforeEach(() => {
        return save(lana);
    });

    it('saves a character', () => {
        assert.ok(archer.id);
    });

    it('gets a character', () => {
        return chai.request(app)
            .get(`/archer/${archer.id}`)
            .then(({ body }) => {
                assert.deepEqual(archer, body);
            });
    });

    it('gets all the characters from Archer', () => {
        return chai.request(app)
            .get('/archer')
            .then(({ body }) => {
                assert.deepEqual(body, [archer, lana]);
            });
    });

    it('returns 404 on not found', () => {
        return chai.request(app)
            .get('/sad-path')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('updates a character', () => {
        lana.quote = 'With your looks, maybe ‘bitchy’ isn’t the way to go.';
        return chai.request(app)
            .put(`/archer/${lana.id}`)
            .send(lana)
            .then(({ body }) => {
                assert.equal(body.quote, lana.quote);
            });
    });
});
    
after(() => client.end()); 