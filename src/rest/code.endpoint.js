const code = require('./../services/code.service');
const networking = require('./../shared/networking.utils');

module.exports = (secured) => {
    secured.post('/run', (req, res) => {
        const result = code.run(req.body);
        networking.makeResponse(result, res, 200);
    })
}