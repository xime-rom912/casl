const express = require('express');
const { Booking } = require('../db');

function list(req, res, next) {
    Booking.findAll({include:['member','copy']})
            .then(objects => res.json(objects))
            .catch(err => res.send(err));
};

function index(req, res, next){
  const id = req.body.id;
  Booking.findByPk(id) 
          .then(object => res.json(object))
          .catch(err => res.send(err));
}

function create(req, res, next){
  const date = req.body.date;
  const memberId = req.body.memberId;
  const copyId = req.body.copyId;

  let booking = new Object({
    date:date,
    memberId:memberId,
    copyId:copyId,
  });

  Booking.create(booking)
          .then(obj  => res.json(obj))
          .catch(err => res.send(err));
}

function replace(req, res, next){
  const id = req.params.id;
  Booking.findByPk(id) 
          .then(object => {
            const date = req.body.date ? req.body.date :"";
            const memberId = req.body.memberId ? req.body.memberId : "";
            const copyId = req.body.copyId ? req.body.copyId : "";
            object.update({date:date,memberId:memberId,copyId:copyId})
                  .then(booking => res.json(booking));
          })
          .catch(err => res.send(err));
}

function edit(req, res, next){
  const id = req.params.id;
  Booking.findByPk(id) 
          .then(object => {
            const date = req.body.date ? req.body.date : object.date;
            const memberId = req.body.memberId ? req.body.memberId : object.memberId;
            const copyId = req.body.copyId ? req.body.copyId : object.copyId;
            object.update({date:date,memberId:memberId,copyId:copyId})
                  .then(booking => res.json(booking));
          })
          .catch(err => res.send(err));
}

function destroy(req, res, next){
  const id = req.params.id;
  Booking.destroy({where:{id:id}})
          .then(obj => res.json(obj))
          .catch(err => res.send(err));;
}

module.exports = {
    list, index, replace, create, edit, destroy
}
