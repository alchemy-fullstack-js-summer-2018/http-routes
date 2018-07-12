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

const put = (req, res) => {
    Hero.update(req.body)
        .then(hero => res.send(hero));
};

const del = (req, res) => {
    Hero.delete(req.id)
        .then(() => res.send({ removed: true }));
};


const methods = { post, get, put, delete: del };
module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};