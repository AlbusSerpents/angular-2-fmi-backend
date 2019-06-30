const solutions = require('./../services/solutions.service');
const networking = require('./../shared/networking.utils');

module.exports = (secured) => {
    secured.post('/problems/:id/solve', async (req, res) => {
        const solution = { problemId: req.params.id, code: req.body.code };
        const result = await solutions.submitSolution(solution, req.authenticatedUser, req.db);
        networking.makeResponse(result, res, 201);
    })

    secured.get('/problems/:id/solutions', async (req, res) => {
        const result = await solutions.findAll(req.params.id, req.db);
        networking.makeResponse(result, res, 200);
    })
}