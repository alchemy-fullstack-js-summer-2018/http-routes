const Hero = require('../models/hero');
const notFound = require('./not-Found');


const post = (req, res) => {
    Hero.insert(req.body)
        .then(hero => res.send(hero));
};

const get = (req, res) => {
    if(req.id) {
        Hero.selectOne(req.id)
            .then(hero => {
                if(!hero) notFound(req, res);
                else res.send(hero);
            });
    }
    else {
        Hero.selectAll()
            .then(heroes => res.send(heroes));

    }
};


const methods = { post, get };
module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};