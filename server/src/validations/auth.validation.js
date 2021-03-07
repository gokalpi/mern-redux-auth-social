import Joi from 'joi';

import validateRequest from '../utils/validateRequest.js';

export function loginValidation(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6).max(20).required(),
  });

  // validate request body against schema
  validateRequest(req, next, schema);
}

export function registerValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().trim().email().min(5).max(100).required(),
    password: Joi.string().trim().min(6).max(50).required(),
  });

  // validate request body against schema
  validateRequest(req, next, schema);
}
