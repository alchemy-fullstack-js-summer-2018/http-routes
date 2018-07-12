const Hero = require('../models/hero');
const notFound = require('./not-Found');


const post = (req, res) => {
    Hero.insert(req.body)
        .then(hero => res.send(hero));
};


const methods = { post };
module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};