const { parse } = require('ulr');
const notFound = require('./routes/not-found');
const shows = require('./routes/shows');

const routes = {
    shows
};

module.exports = (req, res) => {
    const url = parse(req.url, true);
    const parts = url.pathname.split('/').slice(1);
    req.id = parts[1];

    const resource = parts[0];

    res.send = data => res.end(JSON.stringify(data));
    const route = routes[resource] || notFound;
    res.setHeader('Content-Type', 'application/json');

    route(req, res);
};
