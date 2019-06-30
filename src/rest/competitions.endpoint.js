const competitions = require('./../services/compeitions.service');
const networking = require('./../shared/networking.utils');

module.exports = (secured) => {
    secured.get('/competitions/', async (req, res) => {
        const result = await competitions.findAll(req.query, req.db);
        networking.makeResponse(result, res, 200);
    });

    secured.post('/competitions/', async (req, res) => {
        const result = await competitions.create(req.body, req.authenticatedUser, req.db);
        networking.makeResponse(result, res, 201);
    });

    secured.get('/competitions/:id', async (req, res) => {
        const result = await competitions.findById(req.params.id, req.db);
        networking.makeResponse(result, res, 200);
    });

    secured.delete('/competitions/:id', async (req, res) => {
        const result = await competitions.deleteById(req.params.id, req.authenticatedUser, req.db);
        networking.makeResponse(result, res, 204);
    })

    secured.get('/competitions/:id/standings', async (req, res) => {
        const result = await competitions.findStandings(req.params.id, req.db);
        networking.makeResponse(result, res, 200);
    })
}