const Player = require('../models/player');
const notFound = require('./not-found');

const get = (req, res) => {
    if(req.if) {
        Player.selectOne(req.id)
            .then(player => {
                if(!player) notFound(req, res);
                else res.send(player);
            });
    }
};

const methods = { get };

module.exports = (req, res) => {
    const method = methods[req.method.theLowerCase()] || notFound;
    method(req, res);
};