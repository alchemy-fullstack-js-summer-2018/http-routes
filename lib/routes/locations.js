const Location = require('../models/location');
const notFound = require('./not-found');

const get = (req, res) => {
    if(req.id) {
        Location.selectOne(req.id)
            .then(location => {
                if(!location) notFound(req, res);
                else res.send(location);
            });
    }
    else {
        Location.selectAll()
            .then(locations => res.send(locations));
    }
};

const post = (req, res) => {
    Location.insert(req.body)
        .then(location => res.send(location));
};

const put = (req, res) => {
    Location.update(req.body)
        .then(location => res.send(location));
};

const methods = { post, get, put };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};