/* RESOURCES */
const Disneypark = require('../models/disneypark');

module.exports = (req, res) => {
    if(req.id) {
        Disneypark.selectOne(req.id)
            .then(park => res.send(park));
    }
    else {
        Disneypark.selectAll()
            .then(parks => res.send(parks));
    }
};