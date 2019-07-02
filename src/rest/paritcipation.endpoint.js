const networking = require('./../shared/networking.utils');
const participations = require('./../services/participatiosn.service');

module.exports = (secured) => {
    secured.post('/competitions/:id/participate', async (req, res) => {
        const result = await participations.participate(req.params.id, req.authenticatedUser, req.db);
        networking.makeResponse(result, res, 201);
    });

    secured.post('/competitions/:id/:problemId', async (req, res) => {
        const solution = { code: req.body.code, problemId: req.params.problemId };
        const result = await participations.submit(req.params.id, solution, req.authenticatedUser, req.db);
        networking.makeResponse(result, res, 201);
    });

    secured.delete('/competitions/:id/leave', async (req, res) => {
        const result = await participations.leave(req.params.id, req.authenticatedUser, req.db);
        networking.makeResponse(result, res, 204);
    });

    secured.get('/competitions/show/mine', async (req, res) => {
        const result = await participations.mine(req.authenticatedUser, req.db);
        networking.makeResponse(result, res, 200);
    });
}