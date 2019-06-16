module.exports = (app) => {
    app.post('/login', (req, res) => {
        console.log(req.body);
        console.log('Login');
    });

    app.post('/login', (req, res) => {
        console.log(req.body);
        console.log('Logout');
    });
}