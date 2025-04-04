import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { authService, userService, tokenService } from '../services';
import exclude from '../utils/exclude';

const register = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await userService.createUser(username, password);
  const userWithoutPassword = exclude(user, ['password', 'created_at', 'updated_at']);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user: userWithoutPassword, tokens });
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.loginUserWithUsernameAndPassword(username, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

export default {
  register,
  login
};
