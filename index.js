const http = require('http');
const express = require('express')
const app = express()

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const proxies = require('./proxies');

const jwt =  require('jsonwebtoken')

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
app.get('/users', (req, res, next) => {
  proxies.userServiceProxy(req, res, next);
})

app.post('/users', (req, res, next) => {
  proxies.userServiceProxy(req, res, next);
})

app.use(logger('dev'));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var server = http.createServer(app);
server.listen(8081);