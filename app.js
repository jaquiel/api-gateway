/**
 * App initialization
 */
const express = require('express')
const app = express()

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const proxies = require('./proxies');

/**
 * Proxy - requests
 * */
app.get('/users', (req, res, next) => {
    proxies.userServiceProxy(req, res, next);
})
  
app.post('/users', (req, res, next) => {
    proxies.userServiceProxy(req, res, next);
})  

app.post('/auth/signup', (req, res, next) => {
    proxies.authServiceProxy(req, res, next);
})

app.post('/auth/signin', (req, res, next) => {
    proxies.authServiceProxy(req, res, next);
})

app.post('/auth/signout', (req, res, next) => {
    proxies.authServiceProxy(req, res, next);
})


app.use(express.json())


app.use(logger('dev'));
app.use(helmet());
  
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app