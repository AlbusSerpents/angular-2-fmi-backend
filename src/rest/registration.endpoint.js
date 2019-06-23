const usersService = require('./../services/users.service');
const networking = require('./../shared/networking.utils');

module.exports = (public) => {
    public.post('/register', async (req, res) => {
        const result = await usersService.create(req.body, req.db);
        networking.makeResponse(result, res, 201);
    });
}