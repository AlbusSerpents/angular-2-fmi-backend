const users = require('./../services/users.service');
const networking = require('./../shared/networking.utils');

module.exports = (secured) => {
    secured.get('/users/profile/:id', async (req, res) => {
        const user = await users.findById(req.params.id, req.db);
        networking.makeResponse(user, res, 200);
    });

    secured.get('/users/my-profile', async (req, res) => {
        const user = await users.findMe(req.authenticatedUser, req.db);
        networking.makeResponse(user, res, 200);
    })

    secured.put('/users/:id', async (req, res) => {
        const result = await users.update(req.authenticatedUser, req.body, req.db);
        networking.makeResponse(result, res, 204);
    })
}