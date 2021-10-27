const express = require('express');
const Copy = require('../models/copy');
const Movie = require('../models/movie');

// RESTFULL => GET, POST, PUT, PATCH, DELETE 
// Modelo = (Una estructura de datos que representa una enditidad del mundo real)
function list(req, res, next) {
  Copy.find().populate('_movie').then(objs => res.status(200).json({
    message: 'Lista de copias del sistema',
    obj:objs
  })).catch(ex => res.status(500).json({
    message: 'No se pudo consultar la informacion de las copias',
    obj: ex
  }));;
}

function index(req, res, next){
  const id = req.params.id;
  Copy.findOne({"_id":id}).populate('_copy').populate('_member').then(objs => res.status(200).json({
    message: 'Lista de copias del sistema',
    obj:objs
  })).catch(ex => res.status(500).json({
    message: 'No se pudo consultar la informacion de las copias',
    obj: ex
  }));
};

function create(req, res, next){
  const format = req.body.format;
  const movie = req.body.movie;
  const number = req.body.number;
  const status = req.body.status;
  
  let copy = new Copy({
    format:format,
    movie:movie,
    number:number,
    status:status
  });

  copy.save().then(obj => res.status(200).json({
    message: 'Copia creada correctamente',
    obj: obj
  })).catch(ex => res.status(500).json({
    message: 'No se pudo almacenar la copia',
    obj: ex
  }));
}

function replace(req, res, next){
  const id = req.params.id;
  let format = req.body.format ? req.body.format: "";
  let movie = req.body.movie ? req.body.movie: "";
  let number = req.body.number ? req.body.number: "";
  let status = req.body.status ? req.body.status: "";

  let copy = new Object({
    _format: format,
    _movie:movie,
    _number:number,
    _status:status
  });
  Copy.findOneAndUpdate({"_id":id},copy).then(obj => res.status(200).json({
    message: "Copia remplazada correctamente",
    obj:obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo remplazar la copia",
    obj: ex
  }));
}

function edit(req, res, next){
  const id = req.params.id;
  const format = req.body.format;
  const movie = req.body.movie;
  const number = req.body.number;
  const status = req.body.status;

  let copy = new Object();

  if(format){
    copy._format = format;
  }

  if(movie){
    copy._movie = movie;
  }

  if(number){
    copy._number = number;
  }

  if(status){
    copy._status = status;
  }
  Copy.findOneAndUpdate({"_id":id},copy).then(obj => res.status(200).json({
    message: "Copia actualizada correctamente",
    obj:obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo actualizar la copia",
    obj: ex
  }));
}

function destroy(req, res, next){
  const id = req.params.id;
  Copy.remove({"_id":id}).then(obj => res.status(200).json({
    message: "Copia eliminada correctamente",
    obj:obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo eliminar la copia",
    obj: ex
  }));
}

module.exports = {
    list, index, replace, create, edit, destroy
}

