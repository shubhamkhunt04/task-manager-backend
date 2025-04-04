import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import taskService from '../services/task.service';
import { User } from '@prisma/client';

const createTask = catchAsync(async (req, res) => {
  const { title, description, status } = req.body;
  const task = await taskService.createTask(title, description, status, (req.user as User).id);
  res.status(httpStatus.CREATED).send(task);
});

const getTasks = catchAsync(async (req, res) => {
  const result = await taskService.getTasks((req.user as User).id);
  res.send(result);
});

const updateTask = catchAsync(async (req, res) => {
  console.log('params', req.params);
  const task = await taskService.updateTask(req.params.id, req.body, (req.user as User).id);
  res.send(task);
});

const deleteTask = catchAsync(async (req, res) => {
  await taskService.deleteTask(req.params.id, (req.user as User).id);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};
