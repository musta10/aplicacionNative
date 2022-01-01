'use strict'

var mongoose = require('mongoose');
var app = require('./app')
var port = process.env.PORT || 4000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api-users', {useNewUrlParser: true})
.then( () => {
    console.log('la conexion a la database it is OK');

    // CREAR EL SERVER
    app.listen(port, () => {
        console.log('el servidor http://localhost:4000 esta funcionando');
    })


})
.catch( error => console.log(error));