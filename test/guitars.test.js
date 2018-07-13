const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');

describe('guitars API', () => {

    beforeEach(() => client.query('DELETE FROM guitars'));


    let Stratocaster = {
        model: 'Stratocaster',
        manufacturer: 'Fender',
     
    };
    
    function save(guitar) {
        return chai.request(app)
            .post('/guitars')
            .send(guitar)
            .then(({ body }) => {
                guitar.id = body.id;
                assert.deepEqual(body, guitar);
            });
    }
    
    beforeEach(() => {
        return save(Stratocaster);
    });

    it('saves a guitar', () => {
        assert.ok(Stratocaster.id);
    });
     
});
