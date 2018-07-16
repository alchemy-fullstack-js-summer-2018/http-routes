const { join } = require('path');
require('dotenv').config({ path: join(__dirname, '.env') });

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
        manufacturer: 'Fender' 
    };
    //Saves a guitar
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
    //Updates a guitar 
    it('updates a guitar', () => {
        Stratocaster.manufacturer = 'Squire';
        return chai.request(app)
            .put(`/guitars/${Stratocaster.id}`)
            .send(Stratocaster)
            .then(({ body }) => {
                assert.deepEqual(body.manufacturer, Stratocaster.manufacturer);
          
            });
    });
    //Gets sll guitars
    it('gets all guitars', () => {
        return chai.request(app)
            .get('/guitars')
            .then(({ body }) => {
                assert.deepEqual(body, [Stratocaster]);
            });
    });
    //Get guitar by ID
    it('gets a guitar by id', () => {
        return chai.request(app)
            .get(`/guitars/${Stratocaster.id}`)
            .then(({ body }) => {
                assert.deepEqual(body, Stratocaster);
            });
    });
});
