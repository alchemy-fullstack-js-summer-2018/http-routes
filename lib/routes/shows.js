const Show = require('../models/show');
const notFound = require('./not-found');

const get = (req, res) => {
    if(req.id) {
        Show.selectOne(req.id)
            .then(show => {
                if(!show) notFound(req, res);
                else res.send(show);
            });
    }
    else {
        Show.selectAll()
            .then(shows => {
                res.send(shows);
            });
    }
};

const post = (req, res) => {
    Show.insert(req.body)
        .then(show => res.send(show));
};

const put = (req, res) => {
    Show.update(req.body)
        .then(show => res.send(show));
};

const del = (req, res) => {
    Show.delete(req.id)
        .then(() => res.send({ removed: true }));
};

const methods = { get, post, put, delete: del };

module.exports = (req, res) => {
    const method =  methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};