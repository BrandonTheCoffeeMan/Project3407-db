// Imports
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const server = express();

// Router
const auth = require('./users/users-auth')
const authRouter = require('./users/users-router')

// Middleware
server.use(helmet());
server.use(cors({
    origin: '*'
}));
server.use(express.json()) // Formats database data into a readable JSON format for the frontend

// Initial Server Response
server.get('/', (req, res) => {
    res.send('Welcome to the official Project3407 database!')
})

// Endpoints
server.use('/api', authRouter)

module.exports = server;