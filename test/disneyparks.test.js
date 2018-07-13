const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');

describe('disneyparks API', () => {

    beforeEach(() => client.query('DELETE FROM disneyparks'));

    let dlr = {
        name: 'DLR',
        location: 'Anaheim',
        est: 1955
    };

    // let wdw = {
    //     name: 'WDW',
    //     location: 'Orlando',
    //     est: 1971
    // };

    // let tdr = {
    //     name: 'TDR',
    //     location: 'Tokyo',
    //     est: 1983
    // };

    // let dlp = {
    //     name: 'DLP',
    //     location: 'Paris',
    //     est: 1992
    // };

    function save(park) {
        return chai.request(app)
            .post('/disneyparks')
            .send(park)
            .then(({ body }) => {
                park.id = body.id;
                console.log('body', body);
                assert.deepEqual(body, park);
            });
    }

    beforeEach(() => {
        return save(dlr);
    });

    it('saves a park', () => {
        assert.ok(dlr.id);
    });
    
    it.skip('returns list of parks(GET /disneyparks)', () => {
        return chai.request(app)
            .get('/disneyparks')
            .then(res => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body.length, 4);
            });
    });

    it('GET park by id', () => {
        return chai.request(app)
            .get(`/disneyparks/${dlr.id}`)
            .then(res => {
                assert.deepEqual(res.body.name, 'DLR');
            });
    });
});