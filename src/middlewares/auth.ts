import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { InternalServerError, NotAuhorizedError } from '../helpers/customError';

export const JWT_SECRET = 'a6aae1b22ee98c24a000f48427f60ee7';

const auth = (req: any, res: Response, next: NextFunction) => {
  // const { authorization } = req.headers;

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   next(new NotAuhorizedError('Необходима авторизация'));
  // }

  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    next(new NotAuhorizedError('Необходима авторизация'));
  }

  return undefined;
};

export default auth;
