const express = require('express');

// RESTFULL => GET, POST, PUT, PATCH, DELETE 
// Modelo = (Una estructura de datos que representa una enditidad del mundo real)
function list(req, res, next) {
    res.send('Lista de usuarios del sistema');
  };

function index(req, res, next){
  res.send(`Usuario del sistema un ID = ${req.params.id}`);
}

function create(req, res, next){
  const name = req.body.name;
  const lastname = req.body.lastName;
  res.send(`Crear un usuario nuevo con nombre ${name} y apellido ${lastname}`);
}

function replace(req, res, next){
  res.send(`Remplanzo un usuario con ID = ${req.params.id} por otro.`);
}

function edit(req, res, next){
  res.send(`Remplazo las propiedades del usuario con ID = ${req.params.id}`);
}

function destroy(req, res, next){
  res.send(`Elimino un usario con ID = ${req.params.id}`);
}

module.exports = {
    list, index, replace, create, edit, destroy
}

