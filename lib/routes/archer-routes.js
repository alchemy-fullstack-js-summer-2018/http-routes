const Character = require('../models/character');
const notFound = require('./not-found');

const post = (req, res) => {
    Character.insert(req.body)
        .then(character => {
            res.send(character);
        });
};

const get = (req, res) => {
    if(req.id) {
        Character.selectOne(req.id)
            .then(character => {
                if(!character) notFound(req, res);
                else res.send(character);
            });
    }
    else {
        Character.selectAll()
            .then(characters => res.send(characters));
    }
};

const put = (req, res) => {
    Character.update(req.body)
        .then(character => res.send(character));
};

const methods = { post, get, put };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};