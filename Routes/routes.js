const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser')

const userControl = require('../Controllers/user')
const verifyToken = require('../Controllers/verifyToken')
const rumahControl = require('../Controllers/rumah')
const developControl = require('../Controllers/developer')
const kprControl = require('../Controllers/kpr')
const frontControl = require('../Controllers/frontend')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//API USER
// routes.post('/user-api-logout', verifyToken.verifyToken, userControl.logout)
// routes.get('/user-api-cek', verifyToken.verifyToken, userControl.cekToken)
// routes.post('/user-api-delete', userControl.del)

// API USER
routes.post('/user/register', userControl.new) // for register new user
routes.post('/user/auth', userControl.login) // for login user
routes.get('/user/profile', verifyToken.verifyToken, userControl.profile) // for get profil user with JWT
routes.get('/user', verifyToken.verifyToken, userControl.list) //for get list all user

// API RUMAH
routes.post('/house', verifyToken.verifyToken, rumahControl.newRumah) //for post new house
routes.get('/house', rumahControl.listRumah) //get all list rumah (small data)
routes.get('/house/:id/detail', rumahControl.detailRumah) //get detail rumah
routes.post('/house/:id/update', verifyToken.verifyToken, rumahControl.updateRumah) // update data
routes.get('/house/image/:id', rumahControl.getSingleImage) //get image

//API DEVELOPER
routes.post('/developer', verifyToken.verifyToken, developControl.newDev) //add new develop
routes.get('/developer', verifyToken.verifyToken, developControl.listDev) //get all developer

//API KPR
routes.post('/upload/formkpr', verifyToken.verifyToken, kprControl.uploadFormKPR)
routes.post('/upload/ektp', verifyToken.verifyToken, kprControl.uploadEktp)
routes.post('/upload/foto', verifyToken.verifyToken, kprControl.uploadFoto)
routes.post('/upload/rk', verifyToken.verifyToken, kprControl.uploadRk)
routes.post('/upload/slip', verifyToken.verifyToken, kprControl.uploadSlip)
routes.post('/kpr', verifyToken.verifyToken, kprControl.newKPR)
routes.get('/kpr', verifyToken.verifyToken, kprControl.getKPR)
routes.get('/info', verifyToken.verifyToken, kprControl.infoKPR)
routes.get('/info/:id', verifyToken.verifyToken, kprControl.infoKPRperson)
routes.post('/kpr/flag', verifyToken.verifyToken, kprControl.flagKPR)
routes.get('/kpr/formkpr/:id', verifyToken.verifyToken, kprControl.getFormKPR)
routes.get('/kpr/ektp/:id', verifyToken.verifyToken, kprControl.getKTP)
routes.get('/kpr/slip/:id', verifyToken.verifyToken, kprControl.getSlip)
routes.get('/kpr/rk/:id', verifyToken.verifyToken, kprControl.getRK)
routes.get('/kpr/foto/:id', verifyToken.verifyToken, kprControl.getFoto)

//FOR API DOKUMENTASI
routes.get('/', frontControl.vHome)
routes.get('/apidok/kpr', frontControl.vKpr)
routes.get('/apidok/house', frontControl.vHouse)

module.exports = routes