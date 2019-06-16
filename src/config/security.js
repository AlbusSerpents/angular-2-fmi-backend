exports.filter = (req, res, next) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [username, password] = new Buffer(b64auth, 'base64').toString().split(':')


    const loginUser = { username, password }

    if (user.username === loginUser.username && user.password === loginUser.password) {
        return next();
    } else {
        res.status(401).json({ code: 'ACCESS_DENIED' });
    }
}

// @TODO change this
const user = { username: 'pesho', password: '1234' };