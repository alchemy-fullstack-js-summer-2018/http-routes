module.exports = (req, res) => {
    console.log('*****ROUTE NOT FOUND*****');
    res.statusCode = 404;
    res.end();
};