import httpStatus from 'http-status';

import * as UserService from '../services/user.service.js';

export const getCurrentUser = (req, res) => {
  try {
    console.log('getCurrentUser - req.user', req.user);

    const currentUser = req.user.toJSON();
    res.send({ ...currentUser });
  } catch (err) {
    const message = process.env.NODE_ENV === 'production' ? 'Something went wrong.' : err.message;
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message });
  }
};

export const login = (req, res) => {
  if (req.user) {
    const token = req.user.generateJWTToken();
    res.send({
      ...req.user.toJSON(),
      token,
    });
  }
};

export const loginSuccess = (req, res) => {
  console.log('loginSuccess - User', req.user);
  if (req.user) {
    const token = req.user.generateJWTToken();
    res.send({
      ...req.user.toJSON(),
      token,
    });
  } else {
    res.status(httpStatus.UNAUTHORIZED).send({
      success: false,
      message: 'user authentication has been failed.',
    });
  }
};

export const loginFailed = (req, res) => {
  res.status(httpStatus.UNAUTHORIZED).send({
    success: false,
    message: 'user authentication has been failed.',
  });
};

export const logout = (req, res) => {
  try {
    console.log('logging out');
    req.logout();
    res.send(false);
  } catch (err) {
    const message = process.env.NODE_ENV === 'production' ? 'Something went wrong.' : err.message;
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message });
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserService.getUserByEmail(email);
    if (existingUser) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: 'Email is in use' });
    }

    const newUser = await UserService.createUser({
      provider: 'email',
      name,
      email,
      password,
      role: 'USER',
    });

    res.status(httpStatus.CREATED).send(newUser);
  } catch (err) {
    return next(err);
  }
};
