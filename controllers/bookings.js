const express = require('express');
const Booking = require('../models/booking');
const Copy = require('../models/copy');
const Member = require('../models/copy');


// RESTFULL => GET, POST, PUT, PATCH, DELETE 
// Modelo = (Una estructura de datos que representa una enditidad del mundo real)
function list(req, res, next) {
  Booking.find().populate('_copy').populate('_member').then(objs => res.status(200).json({
    message: 'Lista de recervaciones del sistema',
    obj:objs
  })).catch(ex => res.status(500).json({
    message: 'No se pudo consultar la informacion de las recervaciones',
    obj: ex
  }));;
}
function index(req, res, next){
  const id = req.params.id;
  Booking.findOne({"_id":id}).populate('_copy').populate('_member').then(objs => res.status(200).json({
    message: 'Lista las recervaciones del sistema',
    obj:objs
  })).catch(ex => res.status(500).json({
    message: 'No se pudo consultar la informacion de las recervaciones',
    obj: ex
  }));
}

function create(req, res, next){
  const copy = req.body.copy;
  const member = req.body.member;
  const date = req.body.date;
  
  let booking = new Booking({
    copy:copy,
    member:member,
    date:date
  });

  booking.save().then(obj => res.status(200).json({
    message: 'Recervacion creada correctamente',
    obj: obj
  })).catch(ex => res.status(500).json({
    message: 'No se pudo almacenar la recervacion',
    obj: ex
  }));
}

function replace(req, res, next){
  const id = req.params.id;
  let copy = req.body.copy ? req.body.copy: "";
  let member = req.body.member ? req.body.member: "";
  let date = req.body.date ? req.body.date: "";

  let booking = new Object({
    _copy: copy,
    _member:member,
    _date:date
  });
  Booking.findOneAndUpdate({"_id":id},booking).then(obj => res.status(200).json({
    message: "Recervacion remplazado correctamente",
    obj:obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo remplazar la recervacion",
    obj: ex
  }));
}

function edit(req, res, next){
  const id = req.params.id;
  const copy = req.body.copy;
  const member = req.body.member;
  const date = req.body.date;

  let booking = new Object();

  if(copy){
    booking._copy = copy;
  }

  if(member){
    booking._member = member;
  }

  if(date){
    booking._date = date;
  }
  Booking.findOneAndUpdate({"_id":id},booking).then(obj => res.status(200).json({
    message: "Recervacion actualizada correctamente",
    obj:obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo actualizar la recervacion",
    obj: ex
  }));
}

function destroy(req, res, next){
  const id = req.params.id;
  Booking.remove({"_id":id}).then(obj => res.status(200).json({
    message: "Recervacion eliminada correctamente",
    obj:obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo eliminar la recervacion",
    obj: ex
  }));
}

module.exports = {
    list, index, replace, create, edit, destroy
}

