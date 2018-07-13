const Character = require('../models/character');
const notFound = require('./not-found');

const post = (req, res) => {
    Character.insert(req.body)
        .then(character => {
            res.send(character);
        });
};

const methods = { post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};