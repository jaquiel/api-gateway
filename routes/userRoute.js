
const routes = require('express').Router()

const httpProxy = require('express-http-proxy')
const userServiceProxy = httpProxy('http://localhost:8080');

// Proxy request
routes.get('/users', (req, res, next) => {
    userServiceProxy(req, res, next);
  })
  
routes.post('/users', (req, res, next) => {
    userServiceProxy(req, res, next);
  })

module.exports = routes