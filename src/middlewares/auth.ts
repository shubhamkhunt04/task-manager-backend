import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/ApiError';
import config from '../config/config';
import prisma from '../client';
import { User } from '@prisma/client';

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwt.secret) as { id: number };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
    }
    req.user = user as User;
    next();
  } catch (error) {
    next(new ApiError(httpStatus.UNAUTHORIZED, 'Invalid authentication token'));
  }
};

export default auth;
