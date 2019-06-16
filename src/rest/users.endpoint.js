module.exports = (secured) => {
    secured.get('/users/:id', (req, res) => {
        console.log(`Get another user's profile`)
        console.log(req.params);

        res.status(200).json();
    });

    secured.get('/users/my-profile', (req, res) => {
        console.log('Send my profile')

        res.status(200).json();
    })

    secured.put('/users/:id', (req, res) => {
        console.log(`Update my profile`)

        res.status(204).json();
    })
}