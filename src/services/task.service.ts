import { StatusType, Task } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

const createTask = async (
  title: string,
  description: string,
  status: StatusType,
  userId: number
): Promise<Task> => {
  return prisma.task.create({
    data: {
      title,
      description,
      status,
      user_id: userId
    }
  });
};

const getTasks = async (userId: number): Promise<any> => {
  console.log({ userId });
  return prisma.task.findMany({
    where: {
      user_id: userId
    },
    orderBy: {
      updated_at: 'desc'
    }
  });
};

const updateTask = async (
  taskId: number,
  updateBody: Partial<Task>,
  userId: number
): Promise<Task> => {
  const task = await prisma.task.findFirst({
    where: {
      id: Number(taskId),
      user_id: userId
    }
  });
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  return prisma.task.update({ where: { id: Number(taskId) }, data: updateBody });
};

const deleteTask = async (taskId: number, userId: number): Promise<void> => {
  const task = await prisma.task.findFirst({
    where: {
      id: Number(taskId),
      user_id: userId
    }
  });
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  await prisma.task.delete({ where: { id: Number(taskId) } });
};

export default {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};
