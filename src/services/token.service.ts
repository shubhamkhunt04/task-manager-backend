import jwt from 'jsonwebtoken';
import moment, { Moment } from 'moment';
import config from '../config/config';
import { AuthTokensResponse } from '../types/response';

const generateToken = (userId: number, expires: Moment, secret = config.jwt.secret): string => {
  const payload = {
    id: userId,
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix()
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user: { id: number }): Promise<AuthTokensResponse> => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate()
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate()
    }
  };
};

export default {
  generateToken,
  generateAuthTokens
};
