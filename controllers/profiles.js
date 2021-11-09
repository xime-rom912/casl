const express = require('express');
const Profile = require('../models/Profile');


// RESTFULL => GET, POST, PUT, PATCH, DELETE 
// Modelo = (Una estructura de datos que representa una enditidad del mundo real)
function list(req, res, next) {
  Profile.find().then(objs => res.status(200).json({
    message: 'Lista de perfiles del sistema',
    obj:objs
  })).catch(ex => res.status(500).json({
    message: 'No se pudo consultar la informacion de los perfiles',
    obj: ex
  }));;
}
function index(req, res, next){
  const id = req.params.id;
  Profile.findOne({"_id":id}).then(objs => res.status(200).json({
    message: 'Lista de perfiles del sistema',
    obj:objs
  })).catch(ex => res.status(500).json({
    message: 'No se pudo consultar la informacion de los perfiles',
    obj: ex
  }));
}

function create(req, res, next){
  const description = req.body.description;
  const status = req.body.status;
  const permissions = req.body.permissions;

  let profile = new Profile({
    description:description,
    status:status,
    permissions:permissions
  });

  profile.save().then(obj => res.status(200).json({
    message: 'Perfil creado correctamente',
    obj: obj
  })).catch(ex => res.status(500).json({
    message: 'No se pudo almacenar el perfil',
    obj: ex
  }));
}

function replace(req, res, next){
  const id = req.params.id;
  const description = req.body.description ? req.body.description: "";
  const status = req.body.status ? req.body.status: "";
  const permissions = req.body.permissions ? req.body.permissions: "";

  let profile = new Object({
    _description:description,
    _status:status,
    _permissions:permissions
  });
  Profile.findOneAndUpdate({"_id":id},profile).then(obj => res.status(200).json({
    message: "Perfil remplazado correctamente",
    obj:obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo remplazar el perfil",
    obj: ex
  }));
}

function edit(req, res, next){
  const id = req.params.id;
  const description = req.body.description;
  const status = req.body.status;
  const permissions = req.body.permissions;

  let profile = new Object();

  if(description){
    profile._description = description;
  }

  if(status){
    profile._status = status;
  }

  if(permissions){
    profile._permissions = permissions;
  }
  Profile.findOneAndUpdate({"_id":id},profile).then(obj => res.status(200).json({
    message: "Perfil actualizada correctamente",
    obj:obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo actualizar el perfil",
    obj: ex
  }));
}

function destroy(req, res, next){
  const id = req.params.id;
  Profile.remove({"_id":id}).then(obj => res.status(200).json({
    message: "Perfil eliminada correctamente",
    obj:obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo eliminar el perfil",
    obj: ex
  }));
}

module.exports = {
    list, index, replace, create, edit, destroy
}