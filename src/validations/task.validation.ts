import Joi from 'joi';

const createTask = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required()
  })
};

const updateTask = {
  params: Joi.object().keys({
    id: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      status: Joi.string()
    })
    .min(1)
};

const deleteTask = {
  params: Joi.object().keys({
    id: Joi.number().integer()
  })
};

export default {
  createTask,
  updateTask,
  deleteTask
};
