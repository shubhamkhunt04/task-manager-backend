import Joi from 'joi';
import { password } from './custom.validation';

const createUser = {
  body: Joi.object().keys({
    username: Joi.string().required().min(3).max(30),
    password: Joi.string().required().custom(password)
  })
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  })
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
      username: Joi.string().min(3).max(30),
      password: Joi.string().custom(password)
    })
    .min(1)
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  })
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
