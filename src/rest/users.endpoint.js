module.exports = (app) => {
    app.get('/users/:id', (req, res) => {
        console.log(`Get another user's profile`)
        console.log(req.params);
    });

    app.get('/users/my-profile', (req, res) => {
        console.log('Send my profile')
    })

    app.put('/users/:id', (req, res) => {
        console.log(`Update my profile`)
    })
}