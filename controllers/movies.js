const { dir } = require('async');
const express = require('express');
const Movie = require('../models/movie');

// RESTFULL => GET, POST, PUT, PATCH, DELETE 
// Modelo = (Una estructura de datos que representa una enditidad del mundo real)
function list(req, res, next) {
  Movie.find().then(objs => res.status(200).json({
    message: 'Lista de peliculas del sistema',
    obj:objs
  })).catch(ex => res.status(500).json({
    message: 'No se pudo consultar la informacion de las peliculas',
    obj: ex
  }));
};

function index(req, res, next){
  const id = req.params.id;
  Movie.findOne({"_id":id}).then(obj => res.status(200).json({
    message: `Pelicula almacenada con ID ${id}`,
    obj:obj
  })).catch(ex => res.status(500).json({
    message: `No se pudo consultar la informacion de la pelicula con ID ${id}`,
    obj: ex
  }));
}

function create(req, res, next){
  let director = new Map();
  let actors = new Array();
  const genre = req.body.genre;
  const title = req.body.title;
  const directorLastName = req.body.directorLastName;
  var actorsLastName = req.body.actorsLastName;
  const directorName = req.body.directorName;
  var actorsName = req.body.actorsName;
  director.set(directorName, "name");
  director.set(directorLastName, "lastName");
  actors.push(actorsName,actorsLastName);
  let movie = new Movie({
    genre:genre,
    title:title,
    director:director,
    actors:actors,
    directorLastName:directorLastName,
    actorsLastName:actorsLastName,
    directorLastName:directorLastName,
    actorsLastName:actorsLastName,
    directorName:directorName,
    actorsName:actorsName
  });

  movie.save().then(obj => res.status(200).json({
    message: 'Pelicula creada correctamente',
    obj: obj
  })).catch(ex => res.status(500).json({
    message: 'No se pudo almacenar la pelicula',
    obj: ex
  }));
}

function replace(req, res, next){
  const id = req.params.id;
  let director = new Map();
  let actors = new Array();
  let genre = req.body.genre ? req.body.genre: "";
  let title = req.body.title ? req.body.title: "";
  let directorLastName = req.body.directorLastName ? req.body.directorLastName: "";
  let actorsLastName = req.body.actorsLastName ? req.body.actorsLastName: "";
  let directorName = req.body.directorName ? req.body.directorName: "";
  let actorsName = req.body.actorsName ? req.body.actorsName: "";
  director.set(directorName, "name");
  director.set(directorLastName, "lastName");
  actors.push(actorsName,actorsLastName);
  
  let movie = new Object({
    _genre: genre,
    _title:title,
    _director:director,
    _actors:actors,
    _directorLastName:directorLastName,
    _directorName:directorName,
    _actorsLastName:actorsLastName,
    _actorsName:actorsName
  });
  Movie.findOneAndUpdate({"_id":id},movie).then(obj => res.status(200).json({
    message: "Pelicula remplazada correctamente",
    obj:obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo remplazar la pelicula",
    obj: ex
  }));
}

function edit(req, res, next){
  const id = req.params.id;
  let director = new Map();
  let actors = new Array();
  const genre = req.body.genre;
  const title = req.body.title;
  const directorLastName = req.body.directorLastName;
  const actorsLastName = req.body.actorsLastName;
  const actorsName = req.body.actorsName;
  const directorName = req.body.directorName;

  let movie = new Object();

  if(genre){
    movie._genre = genre;
  }

  if(title){
    movie._title = title;
  }

  if(directorLastName){
    movie._directorLastName = directorLastName;
    director.set(directorLastName, "lastName");
  }

  if(actorsLastName){
    movie._actorsLastName = actorsLastName;
    actors.push(actorsLastName);
  }
  if(actorsName){
    movie._actorsName = actorsName;
    actors.push(actorsName);
  }

  if(directorName){
    movie._directorName = directorName;
    director.set(directorName, "name");
  }
  
    movie._director = director;
    movie._actors = actors;
  Movie.findOneAndUpdate({"_id":id},movie).then(obj => res.status(200).json({
    message: "Pelicula actualizada correctamente",
    obj:obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo actualizar la pelicula",
    obj: ex
  }));
}

function destroy(req, res, next){
  const id = req.params.id;
  Movie.remove({"_id":id}).then(obj => res.status(200).json({
    message: "Pelicula eliminada correctamente",
    obj:obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo eliminar la pelicula",
    obj: ex
  }));
}

module.exports = {
    list, index, replace, create, edit, destroy
}

