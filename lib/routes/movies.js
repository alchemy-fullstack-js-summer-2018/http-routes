const Movie = require('../models/movie');
const notFound = require('./not-found');

const get = (req, res) => {
    if(req.id) {
        Movie.selectOne(req.id)
            .then(movie => {
                if(!movie) notFound(req, res);
                else res.send(movie);
            });
    }
    else {
        Movie.selectAll()
            .then(movies => res.send(movies));
    }
};

const methods = { get };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};