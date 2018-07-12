const { join } = require('path');
require('dotenv').config({ path: join(__dirname, '.env') });
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');
const myDB = chai.request(app);

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

    function save(hero) {
        return chai.request(app)
            .post('/heroes')
            .send(hero)
            .then(({ body }) => {
                hero.id = body.id;
                assert.deepEqual(body, hero);
            });
    }

    beforeEach(() => {
        return save(rubick);
    });
    beforeEach(() => {
        return save(slithice);
    });
    beforeEach(() => {
        return save(kunkka);
    });

    it('can POST heroes', () => {
        assert.ok(rubick.id);
        assert.ok(slithice.id);
        assert.ok(kunkka.id);
    });

    it('can GET all heroes', () => {
        return chai.request(app)
            .get('/heroes')
            .then(({ body }) => {
                assert.deepEqual(body, [rubick, slithice, kunkka]);
            });
    });
});

after(() => client.end());
