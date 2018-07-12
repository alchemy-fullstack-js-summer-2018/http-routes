const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const app = require('../lib/app');
// const client = require('../lib/db-client');

const movies = [
    {
        name: 'terminator',
        genre: 'sci-fi',
        id: 1,
        year: 1984
    },
    {
        name: 'collateral',
        genre: 'action',
        id: 2,
        year: 2004
    },
    {
        name: 'coraline',
        genre: 'horror',
        id: 3,
        year: 2009
    }
];

describe('movies API', () => {
    it('GET movie by id', () => {
        return chai.request(app)
            .get('/movies/1')
            .then(({ body }) => {
                assert.deepEqual(body.name, 'terminator');
            });
    });

    it('GET movies', () => {
        return chai.request(app)
            .get('/movies')
            .then(({ body }) => {
                assert.deepEqual(body, movies);
            });
    });
});