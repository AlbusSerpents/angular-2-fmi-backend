const usersService = require('./../services/users.service');
const networking = require('./../shared/networking.utils');

module.exports = (app, secured) => {
    app.post('/login', async (req, res) => {
        const login = await usersService.findByCredentials(req.body, req.db);
        if (!login.error) {
            const user = await usersService.findMe(login.id, req.db);
            networking.makeResponse(user, res, 201);
        } else {
            networking.makeResponse(login, res, 201);
        }
    });

    secured.delete('/logout', (req, res) => {
        res.status(204).json();
    });
}