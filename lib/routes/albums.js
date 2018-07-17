const Album  = require('../models/albums');
const notFound = require('./not-found');

const get = (req, res) => {
    if(req.id) {
        Album.selectOne(req.id)
            .then(album => {
                if(!album) notFound(req, res);
                else res.send(album);
            });
    }
    else {
        Album.selectAll()
            .then(albums => res.send(albums));
    }
};

const post = (req, res) => {
    Album.insert(req.body)
        .then(album => res.send(album));
};

const put = (req, res) => {
    Album.update(req.body)
        .then(album => res.send(album));
};

const del = (req, res) => {
    Album.delete(req.id)
        .then(() => res.send({ removed: true }));
};

const methods = { get, post, put, delete: del };


module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
