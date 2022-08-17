const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const userService = require('./user.service');

//user Routes

router.get('/', getAll);
router.get('/:id', getById);
router.get('/', createSchema, create);
router.get('/:id', updateSchema, update);
router.get('/:id', _delete);

//init routes function

function getAll(req, res, next){
  userService.getAll().then(users => res.json(users)).catch(next);
}

function getById(req, res, next){
  userService.getById(res.params.id).then(user => res.json(user)).catch(next);
}

function create(req, res, next){
  userService.create(req.body).then(() => res.json({ message: 'User Created '})).catch(next);
}

function update(req, res, next){
  userService.update(req.params.id, req.body).then(() => res.json({ message: 'User details updated'})).catch(next);
}

function _delete(req, res, next){
  userService.delete(req.params.id).then(() => res.json({ message: 'User details deleted'})).catch(next);
}

//init schema function

function createSchema(req, res, next){
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.email().required(),
    role: Joi.string().valid(Role.Admin, Role.User).required(),
    position: Joi.string().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
  });
  validateRequest(req, next, schema);
}


function updateSchema(req, res, next){
  const schema = Joi.object({
    username: Joi.string().empty(''),
    email: Joi.email().empty(''),
    role: Joi.string().valid(Role.Admin, Role.User).empty(''),
    position: Joi.string().empty(''),
    password: Joi.string().min(8).empty(''),
    confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
  }).with('password', 'confirmPassword');
  validateRequest(req, res, schema);
}

module.exports = router;
