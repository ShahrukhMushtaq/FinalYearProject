const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-access-token');
    if (!token) return res.status(401).send({ message: 'Access denied. No token provided', status: 401 })

    try {
        const decode = jwt.verify(token, 'privateKey')
        req.user = decode   // req.user._id
        next()
    } catch (ex) {
        res.status(400).send({ message: 'Invalid token', status: 400 })
    }
}
module.exports = auth;