'use strict'

// REQUIRES
var express = require('express');
var bodyParser = require('body-parser');

// EXPRESS 
var app = express()

// CARGAR ARCHIVOS DE RUTAS
var user_routes = require('./routes/user')

// MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CONFIGURACION CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



// REESCRIBIR RUTAS
app.use('/api', user_routes)


// EXPORTAR MODULO
module.exports = app