const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');

describe('Albums API', () => {

    beforeEach(() => client.query('DELETE FROM albums'));

    let synchronicity = {
        title: 'Synchronicity',
        artist: 'The Police'
    };

    let disintegration = {
        title: 'Disintegration',
        artist: 'The Cure'
    };

    let so = {
        title: 'So',
        artist: 'Peter Gabriel'
    };

    function save(album) {
        return chai.request(app)
            .post('/albums')
            .send(album)
            .then(({ body }) => {
                album.id = body.id;
                assert.deepEqual(body, album);
            });
    }

    beforeEach(() => {
        return save(so);
    });

    beforeEach(() => {
        return save(synchronicity);
    });

    beforeEach(() => {
        return save(disintegration);
    });


    it('saves an album', () => {
        assert.ok(so.id);
    });

    it('GETS an album by id', () => {
        return chai.request(app)
            .get(`/albums/${so.id}`)
            .then(({ body }) => {
                assert.deepEqual(body, so);
            });
    });

    it('GETs all albums', () => {
        return chai.request(app)
            .get('/albums')
            .then(({ body }) => {
                assert.deepEqual(body, [so, synchronicity, disintegration]);
            });
    });

    
    it('updates an album', () => {
        so.title = 'So: Extended Edition';
        return chai.request(app)
            .put(`/albums/${so.id}`)
            .send(so)
            .then(({ body }) => {
                assert.equal(body.title, 'So: Extended Edition');
            });
    });

    it('DELETES an album', () => {
        return chai.request(app)
            .del(`/albums/${so.id}`)
            .then(() => {
                return chai.request(app)
                    .get(`/albums/${so.id}`);
            })
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

});