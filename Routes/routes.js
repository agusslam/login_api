const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser')
const userControl = require('../Controllers/user')
const verifyToken = require('../Controllers/verifyToken')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//API USER
// routes.get('/user-api-get', userControl.home)
routes.get('/user-api-get', verifyToken.verifyToken, userControl.userData2)
routes.post('/user/register', userControl.new)
// routes.post('/user-api-delete', userControl.del)

// API USER
routes.post('/user/auth', userControl.login)
routes.post('/user-api-logout', verifyToken.verifyToken, userControl.logout)
routes.get('/user-api-cek', verifyToken.verifyToken, userControl.cekToken)

//FRONTEND
routes.get('/user-view', userControl.vIndex)
routes.get('/user-login', userControl.vLogin)

module.exports = routes