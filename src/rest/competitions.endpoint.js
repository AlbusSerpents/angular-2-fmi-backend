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

    secured.get('/competitions/:id', (req, res) => {
        console.log(`Get competition's details`)
        console.log(req.params);

        res.status(200).json();
    });

    secured.delete('/competitions/:id', (req, res) => {
        console.log(`Delete a competition`)

        res.status(204).json();
    })

    secured.get('/competitions/:id/standings', (req, res) => {
        console.log(`List the standings of a competition`)

        res.status(200).json();
    })
}