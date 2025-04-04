import httpStatus from 'http-status';
import tokenService from './token.service';
import userService from './user.service';
import ApiError from '../utils/ApiError';
import { User } from '@prisma/client';
import prisma from '../client';
import { encryptPassword, isPasswordMatch } from '../utils/encryption';
import { AuthTokensResponse } from '../types/response';
import exclude from '../utils/exclude';

const loginUserWithUsernameAndPassword = async (
  username: string,
  password: string
): Promise<Omit<User, 'password'>> => {
  const user = await userService.getUserByUsername(username, [
    'id',
    'username',
    'password',
    'created_at',
    'updated_at'
  ]);
  console.log({ check: await isPasswordMatch(password, user?.password as string) });
  if (!user || !(await isPasswordMatch(password, user.password as string))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return exclude(user, ['password']);
};

export default {
  loginUserWithUsernameAndPassword,
  isPasswordMatch,
  encryptPassword
};
