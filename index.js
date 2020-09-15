var http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');

const jwt =  require('jsonwebtoken')

const userServiceProxy = httpProxy('http://localhost:8080/users');

//
function verifyJWT(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token,"0a632dd5db81ece3ba9eaf3a52886027"
                    , function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      //req.userId = decoded.id;
      next();
    });
}

// Proxy request
app.get('/users', verifyJWT, (req, res, next) => {
  userServiceProxy(req, res, next);
})

app.use(logger('dev'));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var server = http.createServer(app);
server.listen(8081);
