module.exports = (app) => {
    app.post('/register', (req, res) => {
        console.log(req.body);
        console.log('Do registration here');

        res.status(200).json(req.body);
    });
}