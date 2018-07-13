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

    // let lana = {
    //     name: 'Lana Kane',
    //     sex: 'male',
    //     quote: 'Yup.'
    // };

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

    it('saves a character', () => {
        assert.ok(archer.id);
    });

    it('returns 404 on not found', () => {
        return chai.request(app)
            .get('/sad-path')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });
});
    
after(() => client.end());