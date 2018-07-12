const { parse } = require('url');
const notFound = require('./routes/not-found');
const players = require('./routes/players');

// const routes = {
//     players,
// };

module.exports = (req, res) => {
    const  url = parse(req.url, true);
    const parts = url.pathname.split('/').slice(1);
    req.id = parts[1];
    console.log('***PARTS***', parts);

    if(parts[0] !== 'players'){
        res.setHeader('Content-Type', 'application/json');
        notFound(req, res);
    }
    else if(parts[0] === 'players'){
        res.setHeader('Content-Type', 'application/json');
        players(req, res);
    }
    else {
        console.log('***HAPPY PATH COMPLETE NO ERRORS OCCURRED***');
        res.end();
    }
};