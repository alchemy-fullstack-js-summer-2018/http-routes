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

const post = (req, res) => {
    Movie.insert(req.body)
        .then(movie => res.send(movie));
};

const del = (req, res) => {
    Movie.delete(req.id)
        .then(() => res.send({ removed: true }));
};

const methods = { get, post, delete: del };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};