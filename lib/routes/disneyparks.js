/* RESOURCES */
const Disneypark = require('../models/disneypark');

module.exports = (req, res) => {
    res.send(Disneypark.get(req.id));
};