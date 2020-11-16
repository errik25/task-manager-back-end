const jwt = require('jsonwebtoken')

async function log(req, res, next) {
    const message = (new Date).toLocaleString() + ' ' + req.method + req.originalUrl
    console.log(message)
    next()
}

module.exports = log;
