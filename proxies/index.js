
const httpProxy = require('express-http-proxy')

exports.userServiceProxy = httpProxy('http://localhost:8080/users');