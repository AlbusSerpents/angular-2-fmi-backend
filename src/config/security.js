const userService = require('./../services/users.service');

exports.filter = async (req, res, next) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [username, password] = new Buffer(b64auth, 'base64').toString().split(':')

    const login = await userService.findByCredentials({ username, password }, req.db);

    if (login.error) {
        res.status(login.error.status).json({ code: login.error.code });
    } else {
        req.authenticatedUser = login.id;
        return next();
    }
}
