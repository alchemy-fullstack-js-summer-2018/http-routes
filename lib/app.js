const { parse } = require('url');
const notFound = require('./routes/not-found');
const players = require('./routes/players');
const bodyParser = require('./body-parser');

const routes = {
    players,
};

module.exports = (req, res) => {
    const  url = parse(req.url, true);
    const parts = url.pathname.split('/').slice(1);
    req.id = parts[1];
    console.log('***PARTS***', parts);

    const resource = parts[0];

    res.send = data => res.end(JSON.stringify(data));
    const route = routes[resource] || notFound;
    res.setHeader('Content-Type', 'application/json');

    bodyParser(req)
        .then(body => {
            req.body = body;
            route(req, res);
        });
};