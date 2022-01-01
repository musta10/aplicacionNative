"use strict";

var validator = require("validator");
var User = require("../models/user");
var bcrypt = require("bcrypt-node");
// const { param } = require("../routes/user");
var jwt = require("../services/jwt");

var controller = {
  saveUser: function (req, res) {
    // RECOGER DATOS
    var params = req.body;
    // VALIDAR DATOS CON EXPRESSVALIDATOR
    var validate_username = !validator.isEmpty(params.username);
    var validate_email =
      !validator.isEmpty(params.email) && validator.isEmail(params.email);
    var validate_password = !validator.isEmpty(params.password);
    // console.log(validate_username, validate_email, validate_password);

    if (validate_username && validate_email && validate_password) {
      //  CREAR OBJETO DEL USUARIO
      var user = new User();

      // ASIGNAR VALORES AL OBJETO
      user.username = params.username;
      user.email = params.email.toLowerCase();
      user.role = "ROLE_USER";
      user.image = null;

      // SI EL USUARIO EXISTE
      User.findOne({ email: user.email }, (err, issetUser) => {
        if (err) {
          return res.status(500).send({
            mensaje: "Error al comprobar el usuario",
          });
        }
        if (!issetUser) {
          // SI NO EXISTE USUARIO

          // CIFRAR PASSWORD
          bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;

            // GUARDAR USUARIOS
            user.save((err, userSaved) => {
              if (err) {
                return res.status(500).send({
                  mensaje: "Error al guardar el usuario",
                });
              }
              if (!userSaved) {
                return res.status(400).send({
                  mensaje: "El usuario no se ha guardado",
                });
              }
              //DEVOLVER LA RESPUESTA
              return res.status(200).send('éxito')
                // status: "success",
                // user: userSaved,
              
            }); // CLOSE SAVEUSER
          }); // CLOSE BCRYPT
        } else {
          return res.status(500).send("esta cuenta ya existe",);
        }
      });
    } else {
      return res.status(200).send("La validacion de los datos es incorrecta, vuelve a intentarlo");
    }
  },

  login: function (req, res) {
    // RECOGER LOS PARAMETROS DE LA PETICION
    var params = req.body;
    // VALIDAR LOS DATOS
    var validate_email =
      !validator.isEmpty(params.email) && validator.isEmail(params.email);
    var validate_password = !validator.isEmpty(params.password);

    if (!validate_email || !validate_password) {
      return res.status(200).send({
        mensaje: "Los Datos Son Incorrectos, envialos bien",
      });
    }

    // BUSCAR USUARIOS QUE CONINCIDEN
    User.findOne({ email: params.email.toLowerCase() }, (err, user) => {
      if (err) {
        return res.status(500).send({
          mensaje: "Error al intentar identificarse",
        });
      }
      if (!user) {
        return res.status(404).send({
          mensaje: "El Usuario No Existe",
        });
      }
      // CHECK EMAIL Y PASSWORD BCRYPT
      bcrypt.compare(params.password, user.password, (err, check) => {
        // SI ES CORRECTO
        if (check) {
          // GENERAR EL TOKEN JWT
          if (params.gettoken) {
            //DEVOLVER LOS DATOS DEL USUARIO
            return res.status(200).send({
              token: jwt.createToken(user),
            });
          }

          //DEVOLVER LOS DATOS
          return res.status(200).send({
            // status: "Accses",
            user
          });
        } else {
          return res.status(200).send("Los Datos No Son Correctos");
        }
      });
    });
  },

  updateuser: function (req, res) {
    // CREAR MIDDLEWARE PARA COMPROBAR EL TOKEN
    // RECOGER LOS DATOS DEL USUARIO
    var update = req.body;
    //VALIDAR DATOS
    var validate_username = !validator.isEmpty(update.username);
    var validate_email =
      !validator.isEmpty(update.email) && validator.isEmail(update.email);

    delete update.password;
    // BUSCAR Y ACTUALIZAR EN LA DB
    var userId = req.user.sub;
    // console.log(userId);
    User.findOneAndUpdate(
      { _id: userId },
      update,
      { new: true },
      (err, userUpdated) => {
          if(err) {
            return res.status(500).send({
                status: 'error',
                mensaje: 'Error al actualizar usuario',
              });
          }
          if(!userUpdated){
            return res.status(500).send({
                status: 'error',
                mensaje: 'Nose ha Actualizado el usuario',
              });
          }
        // DEVOLVER UNA RESPUESTA
        return res.status(200).send({
          status: 'Success',
          user: userUpdated
        });
      }
    );
  },

  // METHODE GET USERS ALL
  getUsers: function (req, res)  {
    User.find().exec((err, users) =>{
      if(err || !users){
          return res.status(404).send({
            status: "error",
            mensaje: "Not Users Found"
          })
      } 
      return res.status(200).send({
        status: "success",
        users
      });
    });
  },
  // GET ONE USER
  getUser: function (req, res) {
    var userId = req.params.userId;
    User.findById(userId).exec((err, user) =>{
      if(err || !user){
        return res.status(404).send({
          status: "error",
          mensaje: "No User Found"
        })
    } 
    return res.status(200).send({
      status: "success",
      user
    });
    })
    
  }
};

module.exports = controller;
