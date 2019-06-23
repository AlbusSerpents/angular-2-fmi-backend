const problems = require('./../services/problems.service');
const networking = require('./../shared/networking.utils');

module.exports = (secured) => {
    secured.get('/problems/', async (req, res) => {
        const result = await problems.findAll(req.query, req.db);
        res.status(200).json(result);
    });

    secured.get('/problems/:id', async (req, res) => {
        const result = await problems.findById(req.params.id, req.db);
        networking.makeResponse(result, res, 200);
    })

    secured.get('/problems/:id/tests', async (req, res) => {
        const result = await problems.findTests(req.params.id, req.authenticatedUser, req.db);
        networking.makeResponse(result, res, 200);
    })

    secured.get('/problems/:id/statistics', async (req, res) => {
        console.log('Get problem statistics');
        console.log(req.params.id);

        res.status(200).json();
    })

    secured.post('/problems', async (req, res) => {
        const result = await problems.create(req.body, req.authenticatedUser, req.db);
        networking.makeResponse(result, res, 201);
    })

    secured.put('/problems/:id', async (req, res) => {
        const result = await problems.update(req.params.id, req.body, req.authenticatedUser, req.db);
        networking.makeResponse(result, res, 204);
    })

    secured.delete('/problems/:id', async (req, res) => {
        console.log(`Deletes a problem, only for the creator`);
        console.log(req.params.id);

        res.status(204).json();
    })
}