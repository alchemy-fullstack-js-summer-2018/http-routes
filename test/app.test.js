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

    let disruptor = {
        name: 'Disruptor',
        title: 'Stormcrafter',
        attribute: 'Intelligence'
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
    beforeEach(() => {
        return save(disruptor);
    });

    it('can POST heroes', () => {
        assert.ok(rubick.id);
        assert.ok(slithice.id);
        assert.ok(kunkka.id);
        assert.ok(disruptor.id);
    });

    it('can DELETE a hero', () => {
        return chai.request(app)
            .del(`/heroes/${disruptor.id}`)
            .then(res => {
                assert.equal(res.status, 200);
            })
            .then(() => {
                return chai.request(app).get(`/heroes/${disruptor.id}`);
            })
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('can GET all heroes', () => {
        return chai.request(app)
            .get('/heroes')
            .then(({ body }) => {
                assert.deepEqual(body, [rubick, slithice, kunkka, disruptor]);
            });
    });

    it('can GET a hero by id', () => {
        return chai.request(app)
            .get(`/heroes/${slithice.id}`)
            .then(({ body }) => {
                assert.deepEqual(body, slithice);
            });
    });

    it('can GET heroes by attribute', () => {
        return chai.request(app)
            .get('/heroes?attribute=Intelligence')
            .then(({ body }) => {
                assert.deepEqual(body, [rubick, disruptor]);
            });
    });

    it('can UPDATE a hero', () => {
        kunkka.title = 'Rival of Tidehunter';
        return chai.request(app)
            .put(`/heroes/${kunkka.id}`)
            .send(kunkka)
            .then(({ body }) => {
                assert.equal(body.title, kunkka.title);
            })
            .then(() => chai.request(app).get('/heroes'))
            .then(({ body }) => {
                assert.deepEqual(body, [rubick, slithice, disruptor, kunkka]);
            });
    });

    
});

after(() => client.end());
