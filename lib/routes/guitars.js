const Guitar = require('../models/guitar');
const notFound = require('./not-found');

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

const methods = { get };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};

