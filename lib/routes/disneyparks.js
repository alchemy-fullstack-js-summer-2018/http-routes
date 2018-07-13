/* RESOURCES */
const Disneypark = require('../models/disneypark');
const notFound = require('./not-found');

const get = (req, res) => {
    if(req.id) {
        Disneypark.selectOne(req.id)
            .then(park => res.send(park));
    }
    else {
        Disneypark.selectAll()
            .then(parks => res.send(parks));
    }
};

const post = (req, res) => {
    Disneypark.insert(req.body)
        .then(park => res.send(park));
};

const methods = { get, post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};