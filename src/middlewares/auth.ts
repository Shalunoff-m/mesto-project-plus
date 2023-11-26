import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import CustomError from '../helpers/customError';

const auth = (req: any, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new CustomError('Необходима авторизация', 401));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  if (!process.env.JWT_SECRET) {
    next(new CustomError('Серверная ошибка', 500));
  }

  try {
    payload = jwt.verify(token, `${process.env.JWT_SECRET}`);
    req.user = payload;
    next();
  } catch (err) {
    next(new CustomError('Необходима авторизация', 401));
  }

  return undefined;
};

export default auth;
