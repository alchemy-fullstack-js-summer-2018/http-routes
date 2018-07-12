const chai = require('chai');
const chaitHttp = require('chai-http');
const { assert } = chai;
chai.use(chaitHttp);
const app = require('../lib/db-client');
const client = require('../lib/db-client');

describe('Cars API', () => {

    beforeEach(() => client.query('DELETE FROM cars'));

    let skyline = {
        brand: 'nissan',
        model: 'skyline'
    };

    let impreza = {
        brand: 'subaru',
        model: 'impreza'
    };

    let lancer = {
        brand: 'mistubishi',
        model: 'lancer'
    };

    function save(car) {
        return chai.request(app)
            .post('/cars')
            .send(car)
            .then(({ body }) => {
                car.id = body.id;
                assert.deepEqual(body, car);
            });
    }

    beforeEach(() => {
        return save(skyline);
    });

    beforeEach(() => {
        return save(impreza);
    });

    beforeEach(() => {
        return save(lancer);
    });

    it('Saves a car', () => {
        assert.ok(skyline.id);
    });
}); 
