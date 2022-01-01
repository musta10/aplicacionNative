"use strict"

var express = require('express')
var UserController = require('../controllers/user')

var router = express.Router();
var auth = require('../middlewares/authenticated')


// RUTAS DE USUARIO
router.post('/signup', UserController.saveUser)
router.post('/signin', UserController.login)
router.put('/updateuser', auth.authenticated, UserController.updateuser)
router.get('/users', UserController.getUsers)
router.get('/user/:userId', UserController.getUser)

module.exports = router;