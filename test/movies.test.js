const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
const client = require('../lib/db-client');

describe('movies API', () => {
    beforeEach(() => client.query('DELETE FROM movies;'));

    let terminator = {
        name: 'terminator',
        genre: 'sci-fi',
        year: 1984
    };
    
    let collateral = {
        name: 'collateral',
        genre: 'action',
        year: 2004
    };
    
    let coraline = {
        name: 'coraline',
        genre: 'horror',
        year: 2009
    };

    function save(movie) {
        return chai.request(app)
            .post('/movies')
            .send(movie)
            .then(({ body }) => {
                movie.id = body.id;
                assert.deepEqual(body, movie);
            });
    }

    beforeEach(() => {
        return save(terminator);
    });
    
    beforeEach(() => {
        return save(collateral);
    });
    beforeEach(() => {
        return save(coraline);
    });

    it('GET movie by id', () => {
        return chai.request(app)
            .get(`/movies/${terminator.id}`)
            .then(({ body }) => {
                assert.deepEqual(body, terminator);
            });
    });

    it('GET movies', () => {
        return chai.request(app)
            .get('/movies')
            .then(({ body }) => {
                assert.deepEqual(body, [terminator, collateral, coraline]);
            });
    });

    it('DELETE movie', () => {
        return chai.request(app)
            .del('/movies/1')
            .then(() => {
                return chai.request(app)
                    .get('/movies/1');
            })
            .then(res => {
                assert.equal(res.status, 404);
            });
    });
});