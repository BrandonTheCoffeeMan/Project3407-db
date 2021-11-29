const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('./users-model');
const jwt = require('jsonwebtoken');
const auth = require('./users-auth')

function generateToken(user) {
    const payload = {
        username: user.username,
        id: user.usier_id
    }

const options = {
    expiresIn: '1d'
}

return jwt.sign(payload, process.env.JWT_SECRET || 'foo', options)
}

router.post('/register', (req, res) => {
    const user = req.body
    const hash = bcrypt.hashSync(user.password, 12)
    user.password = hash
    User.add(user)
        .then(id => {
            const token = generateToken(id)
            res.status(200).json({
                id: id[0],
                message: `A user has registered to Project3407 with an id of ${id}`,
                token
            })
        })
        .catch(error => {
            res.status(401).json({
                message: error.message
            })
        })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body
    User.findByUsername(username)
        .then(user => {
            if ( user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({
                    id: user.id,
                    message: `Welcome back to Project3407 ${user.username}!`,
                    token
                })
            } else {
                res.status(401).json({
                    message: 'Invalid login credentials, the email you entered does not have an associated account.'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: error.message + 'Nice job!'
            })
        })
})

router.get('/', (req, res) => {
    User.getAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            })
        })
})

router.get('/id', auth, (req, res) => {
    const { id } = req.params
    user.findById(id)
        .then((user) => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(400).json({
                    message: `A user with the associated id ${id} does not exist in the database.`
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            })
        })
})

module.exports = router