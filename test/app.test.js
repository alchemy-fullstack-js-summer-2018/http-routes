const { join } = require('path');
require('dotenv').config({ path: join(__dirname, '.env') });
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');

describe('app level', () => {

    it('returns 404 on not found', () => {
        return chai.request(app)
            .get('/neroes')
            .then(res => {
                assert.equal(res.status, 404);
                assert.equal(res.type, 'application/json');
            });
    });
});

describe('heroes API', () => {
    beforeEach(() => client.query('DELETE FROM heroes'));

    let rubick = {
        name: 'Rubick',
        title: 'Grand Magus',
        attribute: 'Intelligence'
    };

    let slithice = {
        name: 'Slithice',
        title: 'Naga Siren',
        attribute: 'Agility'
    };

    let kunkka = {
        name: 'Kunkka',
        title: 'Admiral',
        attribute: 'Strength'
    };

});

after(() => client.end());
