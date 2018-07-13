const Fruit = require('../models/fruit');
const notFound = require('./not-found');

const get = (req, res) => {
    if(req.id) {
        Fruit.selectOne(req.id)
            .then(fruit => {
                if(!fruit) notFound(req, res);
                else res.send(fruit);
            });
    }
    else {
        Fruit.selectAll()
            .then(fruits => res.send(fruits));
    }
};

const post = (req, res) => {
    Fruit.insert(req.body)
        .then(fruit => res.send(fruit));
};

const put = (req, res) => {
    Fruit.update(req.body)
        .then(fruit => res.send(fruit));
};

const methods = { get, post, put };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};