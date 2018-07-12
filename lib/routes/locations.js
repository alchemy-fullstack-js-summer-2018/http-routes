const Location = require('../models/location');
const notFound = require('./not-found');

const post = (req, res) => {
    Location.insert(req.body)
        .then(location => res.send(location));
};

const methods = { post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};