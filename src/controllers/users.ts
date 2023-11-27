import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { BadRequestError, NotFoundError, UserExistError } from '../helpers/customError';
import { STATUS_BAD_REQUEST, STATUS_NOT_FOUND, STATUS_USER_EXIST } from '../helpers/status-code';
import Users from '../models/users';
import { JWT_SECRET } from '../middlewares/auth';

const updateUserById = (userId:string, updateData:any, res:Response, next: NextFunction) => {
  Users.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(updatedUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Ошибка валидации: ${err.message}`));
      } else {
        next(err);
      }
    });
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  Users.findById(userId).then((user) => {
    if (!user) {
      throw new NotFoundError('Такого пользователя нет');
    }

    res.send(user);
  }).catch((err) => {
    next(err);
  });
};

export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  Users.find({}).then((users) => {
    res.send(users);
  }).catch((err) => {
    next(err);
  });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { password, ...data } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => Users.create({ ...data, password: hash })
      .then((user) => {
        res.send(user);
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Ошибка валидации: ${err.message}`));
      }
      if (err.code === 11000) {
        next(new UserExistError(`Такой пользователь уже зарегистрирован: ${err.message}`));
      }

      next(err);
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      // Устанавливаем куку
      res
        .cookie('jwt', token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });

      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Ошибка валидации: ${err.message}`));
      } else {
        next(err);
      }
    });
};

export const updateUser = (req:any, res:Response, next:NextFunction) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  if (!name || !about) {
    throw new BadRequestError('Введены не все данные');
  }

  updateUserById(_id, { name, about }, res, next);
};

export const updateAvatar = (req:any, res:Response, next:NextFunction) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  if (!avatar) {
    throw new BadRequestError('Нет данных для обновления');
  }

  updateUserById(_id, { avatar }, res, next);
};

export const getCurrentUser = (req:any, res:Response, next: NextFunction) => {
  const { _id } = req.user;

  Users.findById(_id).then((curUser) => {
    res.send(curUser);
  }).catch((err) => {
    next(err);
  });
};
