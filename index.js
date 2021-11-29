const server = require('./api/server')

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Project3407 Database is running on http://localhost:${PORT}`)
})