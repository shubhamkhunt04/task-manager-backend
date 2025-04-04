import Joi from 'joi';
import { password } from './custom.validation';

const register = {
  body: Joi.object().keys({
    username: Joi.string().required().min(3).max(30),
    password: Joi.string().required().custom(password)
  })
};

const login = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
};

export default {
  register,
  login
};
