const chai = require('chai');
const chaitHttp = require('chai-http');
const { assert } = chai;
chai.use(chaitHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');

describe('Cars API', () => {

    beforeEach(() => client.query('DELETE FROM cars'));

    let nissan = {
        brand: 'nissan',
        model: 'skyline'
    };

    let subaru = {
        brand: 'subaru',
        model: 'impreza'
    };

    let mistubishi = {
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
        return save(nissan);
    });

    beforeEach(() => {
        return save(subaru);
    });

    beforeEach(() => {
        return save(mistubishi);
    });

    it('Saves a car', () => {
        assert.ok(nissan.id);
    });

    it('Updates a car', () => {
        nissan.model = 'sentra';
        return chai.request(app)
            .put(`/cars/${nissan.id}`)
            .send(nissan)
            .then(({ body }) => {
                assert.equal(body.model, 'sentra');
            });
    });

    it('Get car by id', () => {
        return chai.request(app)
            .get(`/cars/${nissan.id}`)
            .then(({ body })  => {
                assert.deepEqual(body, nissan);
            });
    });
    
    it('Get cars', () => {
        return chai.request(app)
            .get('/cars')
            .then(({ body }) => {
                console.log(body);
                assert.deepEqual(body, [nissan, subaru, mistubishi]);
            });
    });
}); 
