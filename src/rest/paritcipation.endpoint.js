const networking = require('./../shared/networking.utils');
const participations = require('./../services/participatiosn.service');

module.exports = (secured) => {
    secured.post('/competitions/:id/participate', async (req, res) => {
        const result = await participations.participate(req.params.id, req.authenticatedUser, req.db);
        networking.makeResponse(result, res, 201);
    });

    secured.post('/competitions/:id/:problemId', (req, res) => {
        console.log(`Submit a solution to a problem in a competition`)
        console.log(req.params);

        res.status(200).json();
    });

    secured.delete('/competitions/:id/leave', async (req, res) => {
        const result = await participations.leave(req.params.id, req.authenticatedUser, req.db);
        networking.makeResponse(result, res, 204);
    });
}