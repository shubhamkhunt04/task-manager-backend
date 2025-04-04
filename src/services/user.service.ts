import { User, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';
import { encryptPassword } from '../utils/encryption';

const createUser = async (username: string, password: string, name?: string): Promise<User> => {
  if (await getUserByUsername(username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }
  return prisma.user.create({
    data: {
      username,
      password: await encryptPassword(password)
    }
  });
};

const getUserByEmail = async <Key extends keyof User>(
  username: string,
  keys: Key[] = ['id', 'email', 'name', 'password', 'created_at', 'updated_at'] as Key[]
): Promise<Pick<User, Key> | null> => {
  return prisma.user.findUnique({
    where: { username },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<User, Key> | null>;
};

const getUserByUsername = async <Key extends keyof User>(
  username: string,
  keys: Key[] = ['id', 'username', 'password', 'created_at', 'updated_at'] as Key[]
): Promise<Pick<User, Key> | null> => {
  return prisma.user.findUnique({
    where: { username },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<User, Key> | null>;
};

export default {
  createUser,
  getUserByEmail,
  getUserByUsername
};
