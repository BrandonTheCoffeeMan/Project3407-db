const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify (
            token,
            process.env.JWT_SECRET || 'foo',
            (error, decodedToken) => {
                if (error) {
                    res.status(401).json({
                        message: 'Token is not verified'
                    })
                } else {
                    req.user = decodedToken
                    next()
                }
            }
        )
    } else {
        res.status(400).json({
            message: 'No token has been provided'
        })
    }
}