import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import CustomError from '../helpers/customError';
import { STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_AUTHORIZED } from '../helpers/status-code';

const auth = (req: any, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new CustomError('Необходима авторизация', STATUS_NOT_AUTHORIZED));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  if (!process.env.JWT_SECRET) {
    next(new CustomError('На сервере произошла ошибка', STATUS_INTERNAL_SERVER_ERROR));
  }

  try {
    payload = jwt.verify(token, `${process.env.JWT_SECRET}`);
    console.log(payload);
    req.user = payload;
    next();
  } catch (err) {
    next(new CustomError('Необходима авторизация', STATUS_NOT_AUTHORIZED));
  }

  return undefined;
};

export default auth;
