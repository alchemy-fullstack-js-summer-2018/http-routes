const Car = require('../models/car');
const notFound = require('./not-found');

const get = (req, res) => {
    if(req.id) {
        Car.selectOne(req.id)
            .then(car => {
                if(!car) notFound(req, res);
                else res.send(car);
            });
    }
    else {
        Car.selectAll()
            .then(cars => res.send(cars));
    }
};

const post = (req, res) => {
    Car.insert(req.body)
        .then(car => res.send(car));
};

const put = (req, res) => {
    Car.update(req.body)
        .then(car => res.send(car));
};

const del = (req, res) => {
    Car.delete(req.id)
        .then(() => res.send({ removed: true }));
};

const methods = { get, post, put, delete: del };

module.exports = (res, req) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};