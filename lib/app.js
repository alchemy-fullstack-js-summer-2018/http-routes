const { parse } = require('url');
const notFound = require('./routes/not-found');
const archer = require('./routes/archer-routes');
const bodyParser = require('./body-parser');

const routes = {
    archer,
};

module.exports = (req, res) => {
    const url = parse(req.url, true);
    const parts = url.pathname.split('/').slice(1);
    const resource = parts[0];
    const route = routes[resource] || notFound;
    res.send = data => res.end(JSON.stringify(data));
    res.setHeader('Content-Type', 'application/json');
    
    bodyParser(req)
        .then(body => {
            req.body = body;
            route(req, res);
        });
};
