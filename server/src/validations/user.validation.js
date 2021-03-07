import Joi from 'joi';

import validateRequest from '../utils/validateRequest.js';

export function createUserValidation(req, res, next) {
  const schema = Joi.object({
    provider: Joi.string(),
    email: Joi.string().trim().email().min(5).max(100).required(),
    password: Joi.string().trim().min(6).max(100).required(),
    name: Joi.string().trim().min(2).max(100).required(),
    avatar: Joi.string(),
    role: Joi.string(),
    googleId: Joi.string(),
    facebookId: Joi.string(),
  });

  // validate request body against schema
  validateRequest(req, next, schema);
}

export function updateUserValidation(req, res, next) {
  const schema = Joi.object({
    provider: Joi.string(),
    email: Joi.string().trim().email().min(5).max(100),
    password: Joi.string().trim().min(6).max(100),
    name: Joi.string().trim().min(2).max(100),
    avatar: Joi.string(),
    role: Joi.string(),
    googleId: Joi.string(),
    facebookId: Joi.string(),
  });

  // validate request body against schema
  validateRequest(req, next, schema);
}
