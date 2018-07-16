const Guitar = require('../models/guitar');
const notFound = require('./not-found');

const post = (req, res) => {
    Guitar.insert(req.body)
        .then(guitar => res.send(guitar));
};

const put = (req, res) => {
    Guitar.update(req.body)
        .then(guitar => res.send(guitar)); 
};

const get = (req, res) => {
    if(req.id) {
        Guitar.selectOne(req.id)
            .then(guitar => {
                if(!guitar) notFound(req, res);
                else res.send(guitar);
            });
    }
    else {
        Guitar.selectAll()
            .then(guitars => res.send(guitars));
    }
};

const del = (req, res) => {
    Guitar.delete(req.id)
        .then(() => res.send({ removed: true }));
};

const methods = { get, post, put, delete: del };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};