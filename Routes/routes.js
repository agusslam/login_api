const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser')
const userControl = require('../Controllers/user')
const verifyToken = require('../Controllers/verifyToken')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//API USER
routes.post('/user-api-logout', verifyToken.verifyToken, userControl.logout)
routes.get('/user-api-cek', verifyToken.verifyToken, userControl.cekToken)
// routes.post('/user-api-delete', userControl.del)

// API USER
routes.post('/user/register', userControl.new) // for register new user
routes.post('/user/auth', userControl.login) // for login user
routes.get('/user/profile', verifyToken.verifyToken, userControl.profile) // for get profil user with JWT
routes.get('/user', verifyToken.verifyToken, userControl.list) //for get list all user

module.exports = routes