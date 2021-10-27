const express = require('express');
const Member = require('../models/member');

// RESTFULL => GET, POST, PUT, PATCH, DELETE 
// Modelo = (Una estructura de datos que representa una enditidad del mundo real)
function list(req, res, next) {
  Member.find().then(objs => res.status(200).json({
    message: 'Lista de miembros del sistema',
    obj:objs
  })).catch(ex => res.status(500).json({
    message: 'No se pudo consultar la informacion de los miembros',
    obj: ex
  }));
};

function index(req, res, next){
  const id = req.params.id;
  Member.findOne({"_id":id}).then(obj => res.status(200).json({
    message: `Miembro almacenado con ID ${id}`,
    obj:obj
  })).catch(ex => res.status(500).json({
    message: `No se pudo consultar la informacion del miembros con ID ${id}`,
    obj: ex
  }));
}

function create(req, res, next){
  var address = new Map();
  const name = req.body.name;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  const status = req.body.status;
  const addressCity = req.body.addressCity;
  const addressCountry = req.body.addressCountry;
  const addressNumber = req.body.addressNumber;
  const addressState = req.body.addressState;
  const addressStreet = req.body.addressStreet;
  address.set(addressCity, "City");
  address.set(addressCountry, "Country");
  address.set(addressNumber, "Number");
  address.set(addressState, "State");
  address.set(addressStreet, "Street");

  let member = new Member({
    name:name,
    lastName:lastName,
    address:address,
    phone:phone,
    status:status,
    addressCity:addressCity,
    addressCountry:addressCountry,
    addressNumber:addressNumber,
    addressState:addressState,
    addressStreet:addressStreet
  });

  member.save().then(obj => res.status(200).json({
    message: 'Miembro creado correctamente',
    obj: obj
  })).catch(ex => res.status(500).json({
    message: 'No se pudo almacenar el miembro',
    obj: ex
  }));
}

function replace(req, res, next){
  const id = req.params.id;
  var address = new Map();
  let name = req.body.name ? req.body.name: "";
  let lastName = req.body.lastName ? req.body.lastName: "";
  let phone = req.body.phone ? req.body.phone: "";
  let status = req.body.status ? req.body.status: "";
  let addressCity = req.body.addressCity ? req.body.addressCity: "";
  let addressCountry = req.body.addressCountry ? req.body.addressCountry: "";
  let addressNumber = req.body.addressNumber ? req.body.addressNumber: "";
  let addressState = req.body.addressState ? req.body.addressState: "";
  let addressStreet = req.body.addressStreet ? req.body.addressStreet: "";
  address.set(addressCity, "City");
  address.set(addressCountry, "Country");
  address.set(addressNumber, "Number");
  address.set(addressState, "State");
  address.set(addressStreet, "Street");

  let member = new Object({
    _name: name,
    _lastName:lastName,
    _address:address,
    _phone: phone,
    _status:status,
    _addressCity:addressCity,
    _addressCountry:addressCountry,
    _addressNumber:addressNumber,
    _addressState:addressState,
    _addressStreet: addressState
  });
  Member.findOneAndUpdate({"_id":id},member).then(obj => res.status(200).json({
    message: "Miembro remplazado correctamente",
    obj:obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo remplazar el miembro",
    obj: ex
  }));
}

function edit(req, res, next){
  var address = new Map();
  const id = req.params.id;
  const name = req.body.name;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  const status = req.body.status;
  const addressCity = req.body.addressCity;
  const addressCountry = req.body.addressCountry;
  const addressNumber = req.body.addressNumber;
  const addressState = req.body.addressState;
  const addressStreet = req.body.addressStreet;

  

  let member = new Object();

  if(name){
    member._name = name;
  }

  if(lastName){
    member._lastName = lastName;
  }

  if(phone){
    member._phone = phone;
  }

  if(status){
    member._status = status;
  }

  if(addressCity){
    member._addressCity = addressCity;
    address.set(addressCity, "City");
  }

  if(addressCountry){
    member._addressCountry = addressCountry;
    address.set(addressCountry, "Country");
  }

  if(addressNumber){
    member._addressNumber = addressNumber;
    address.set(addressNumber, "Number");
  }

  if(addressState){
    member._addressState = addressState;
    address.set(addressState, "State");
  }

  if(addressStreet){
    member._addressStreet = addressStreet;
    address.set(addressStreet, "Street");
  }
  
  Member.findOneAndUpdate({"_id":id},member).then(obj => res.status(200).json({
    message: "Miembro actualizado correctamente",
    obj:obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo actualizar el miembro",
    obj: ex
  }));
}

function destroy(req, res, next){
  const id = req.params.id;
  Member.remove({"_id":id}).then(obj => res.status(200).json({
    message: "Miembro eliminado correctamente",
    obj:obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo eliminar el miembro",
    obj: ex
  }));
}

module.exports = {
    list, index, replace, create, edit, destroy
}

