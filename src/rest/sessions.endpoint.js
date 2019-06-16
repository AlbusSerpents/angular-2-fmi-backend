module.exports = (app, secured) => {
    app.post('/login', (req, res) => {
        console.log(req.body);
        console.log('Login');

        res.status(201).json();
    });

    secured.delete('/logout', (req, res) => {
        console.log('Logout');

        res.status(204).json();
    });
}