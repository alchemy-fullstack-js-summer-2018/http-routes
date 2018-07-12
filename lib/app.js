const { parse } = require('url');
const notFound = require('./routes/not-found');

// const routes = {
//     players,
// };

module.exports = (req, res) => {
    const  url = parse(req.url, true);
    const parts = url.pathname.split('/').slice(1);
    req.id = parts[1];
    console.log('***PARTS***', parts);

    if(parts[0] !== ''){
        res.setHeader('Content-Type', 'application/json');
        notFound(req, res);
    }
    else {
        console.log('***HAPPY PATH COMPLETE NO ERRORS OCCURRED***');
        res.end();
    }
};