const express = require('express');
const { Gender } = require('../db');

function list(req, res, next) {
    Gender.findAll({include:['movie']})
            .then(objects => res.json(objects))
            .catch(err => res.send(err));
};

function index(req, res, next){
  const id = req.body.id;
    Gender.findByPk(id) 
          .then(object => res.json(object))
          .catch(err => res.send(err));
}

function create(req, res, next){
  const description = req.body.description;
  const status = req.body.status;

  let gender = new Object({
    description:description,
    status:status
  });

  Gender.create(gender)
          .then(obj  => res.json(obj))
          .catch(err => res.send(err));
}

function replace(req, res, next){
  const id = req.params.id;
    Gender.findByPk(id) 
          .then(object => {
            const description = req.body.description ? req.body.description :"";
            const status = req.body.status ? req.body.status : null;
            object.update({description:description,status:status})
                  .then(gender => res.json(gender))
                  .catch(err => res.send(err));;
          })
          .catch(err => res.send(err));
}

function edit(req, res, next){
  const id = req.params.id;
  Gender.findByPk(id) 
          .then(object => {
            const description = req.body.description ? req.body.description : object.description;
            const status = req.body.status ? req.body.status : object.status;
            object.update({description:description,status:status})
                  .then(gender => res.json(gender))
                  .catch(err => res.send(err));;
          })
          .catch(err => res.send(err));
}

function destroy(req, res, next){
  const id = req.params.id;
  Gender.destroy({where:{id:id}})
          .then(obj => res.json(obj))
          .catch(err => res.send(err));;
}

module.exports = {
    list, index, replace, create, edit, destroy
}