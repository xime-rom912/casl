const express = require('express');
const bcrypt = require('bcrypt');
const async = require('async');
const User = require('../models/user');


// RESTFULL => GET, POST, PUT, PATCH, DELETE 
// Modelo = (Una estructura de datos que representa una enditidad del mundo real)
function list(req, res, next) {
  User.find().populate('_profiles').then(objs => res.status(200).json({
    message: 'Lista de usuarios del sistema',
    obj:objs
  })).catch(ex => res.status(500).json({
    message: 'No se pudo consultar la informacion de los usuarios',
    obj: ex
  }));
};

function index(req, res, next){
  const id = req.params.id;
  User.findOne({"_id":id}).populate("_profiles").then(obj => res.status(200).json({
    message: `Usuario almacenado con ID ${id}`,
    obj:obj
  })).catch(ex => res.status(500).json({
    message: `No se pudo consultar la informacion del usuario con ID ${id}`,
    obj: ex
  }));
}

function create(req, res, next){
  let name = req.body.name;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;
  let profiles = req.body.profiles;

  async.parallel({
    salt:(callback) =>{
      bcrypt.genSalt(10, callback);
    }
  }, (err, result) =>{
    bcrypt.hash(password,result.salt,(err, hash)=>{
      let user = new User({
        name:name,
        lastName:lastName,
        email:email,
        profiles: profiles,
        password:hash,
        salt:result.salt
      });
    
      user.save().then(obj => res.status(200).json({
        message: 'Usuario creado correctamente',
        obj: obj
      })).catch(ex => res.status(500).json({
        message: 'No se pudo almacenar el usuario',
        obj: ex
      }));
    });
  });
  
  
}

function replace(req, res, next){
  const id = req.params.id;
  let name = req.body.name ? req.body.name: "";
  let lastName = req.body.lastName ? req.body.lastName: "";
  let email = req.body.email ? req.body.email: "";
  let profiles = req.body.email ? req.body.profiles: "";
  let password = req.body.password ? req.body.password: "";

  let user = new Object({
    _name: name,
    _lastName:lastName,
    _email: email,
    _profiles:profiles,
    _password:password
  });
  User.findOneAndUpdate({"_id":id},user).then(obj => res.status(200).json({
    message: "Usuario remplazado correctamente",
    obj:obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo remplazar el usuario",
    obj: ex
  }));
}

function edit(req, res, next){
  let id = req.params.id;
  let name = req.body.name;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let profiles = req.body.profiles;
  let password = req.body.password;


  let user = new Object();

  if(name){
    user._name = name;
  }

  if(lastName){
    user._lastName = lastName;
  }

  if(email){
    user._email = email;
  }

  if(profiles){
    user._profiles = profiles;
  }
  if(password){
    user._password = password;
  }
  User.findOneAndUpdate({"_id":id},user).then(obj => res.status(200).json({
    message: "Usuario actualizado correctamente",
    obj:obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo actualizar el usuario",
    obj: ex
  }));
}

function destroy(req, res, next){
  const id = req.params.id;
  User.remove({"_id":id}).then(obj => res.status(200).json({
    message: "Usuario eliminado correctamente",
    obj:obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo eliminar el usuario",
    obj: ex
  }));
}

module.exports = {
    list, index, replace, create, edit, destroy
}

