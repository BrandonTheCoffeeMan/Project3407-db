const db = require('../../data/db-config');

function add(user) {
    return db('users').insert(user, 'user_id')
}

function findById(id) {
    return db('users').where('user_id', id).first()
}

function findByUsername(username) {
    return db('users').where({username}).first()
}

function getAll() {
    return db('users').select('user_id', 'username')
}

module.exports = {
    add,
    findById,
    findByUsername,
    getAll
}