module.exports = (public) => {
    public.post('/register', (req, res) => {
        console.log(req.body);
        console.log('Do registration here');

        res.status(201).json(req.body);
    });
}