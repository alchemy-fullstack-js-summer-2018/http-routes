const Player = require('../models/player');
const notFound = require('./not-found');

const get = (req, res) => {
    if(req.id) {
        Player.selectOne(req.id)
            .then(player => {
                if(!player) notFound(req, res);
                else res.send(player);
            });
    }
    else {
        Player.selectAll()
            .then(players => {
                res.send(players);
            });
    }
};

const post = (req, res) => {
    Player.insert(req.body)
        .then(player => res.send(player));
};

const methods = { get, post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    // console.log('***METHOD***', method);
    method(req, res);
};