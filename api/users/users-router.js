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
    const rounds = process.env.HASH_ROUNDS || 12
    const hash = bcrypt.hashSync(user.password, rounds)
    user.password = hash
    User.add(user)
        .then(id => {
            const token = generateToken(id)
            res.status(200).json({
                id: id[0],
                message: `Welcome to Project3407, your incremented id is ${id}. We will use this to populate your data across the platform. Be sure to read our privacy policy to avoid disruptions. Thanks for joining Project3407.`,
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
    const { email, password } = req.body
    User.findByEmail(email)
        .then(user => {
            if ( user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({
                    id: user.user_id,
                    email: user.email,
                    username: user.username,
                    handle: user.tag,
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
                message: error.message
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