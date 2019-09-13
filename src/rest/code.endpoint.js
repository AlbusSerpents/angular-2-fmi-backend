const code = require('./../services/code.service');
const networking = require('./../shared/networking.utils');

module.exports = (secured) => {
    secured.post('/run', async (req, res) => {
        const result = await code.run(req.body);
        networking.makeResponse(result, res, 200);
    })
}