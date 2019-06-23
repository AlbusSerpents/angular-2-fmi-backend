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

    secured.get('/problems/:id/statistics', (req, res) => {
        console.log('Get problem statistics');
        console.log(req.params.id);

        res.status(200).json();
    })

    secured.post('/problems', async (req, res) => {
        const result = await problems.create(req.body, req.authenticatedUser, req.db);
        networking.makeResponse(result, res, 201);
    })

    secured.put('/problems/:id/manage', (req, res) => {
        console.log(`Change problem's description, points, etc`);
        console.log(req.params.id);
        console.log(req.body);

        res.status(204).json();
    })

    secured.put('/problems/:id/tests', (req, res) => {
        console.log(`Set new tests for the problem {expected, actual}`);
        console.log(req.params.id);
        console.log(req.body);

        res.status(204).json();
    })

    secured.delete('/problems/:id', (req, res) => {
        console.log(`Deletes a problem, only for the creator`);
        console.log(req.params.id);

        res.status(204).json();
    })
}