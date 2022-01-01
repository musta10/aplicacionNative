'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "clave-secreta-token9999"

exports.authenticated = function ( req, res, next) {
        // COMPROBAR AUTORIZACION
         if(!req.headers.authorization) {
            return res.status(403).send({
                mensaje: "la peticion no tiene la cabecera de authorization"
            })
         }
        // LIMPIAR EL TOKEN QUITAR ""
        var token = req.headers.authorization.replace(/['"]+/g, '');

        // DECODIFICAR EL TOKEN
        try {
            var payload = jwt.decode(token, secret);

            // COMPROBAR EXPIRACION TOKEN
            if(payload.exp <= moment().unix()){
                return res.status(404).send({
                    mensaje: "EL Token Ha Expirado"
                })
            }

        } catch(ex){
            return res.status(404).send({
                mensaje: "EL Token No Es Valido"
            })
        }

        

        // ADJUNTAR USUARIO IDENTIFICADO A LA REQUEST
        req.user = payload;
    
    next();
}