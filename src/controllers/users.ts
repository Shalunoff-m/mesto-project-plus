import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { STATUS_BAD_REQUEST, STATUS_NOT_FOUND } from '../helpers/status-code';
import CustomError from '../helpers/customError';
import Users from '../models/users';

const updateUserById = (userId:string, updateData:any, res:Response, next: NextFunction) => {
  Users.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new CustomError('Пользователь не найден', 404);
      }
      res.send(updatedUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CustomError(`Ошибка валидации: ${err.message}`, 400));
      } else {
        next(err);
      }
    });
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  Users.findById(id).then((user) => {
    if (!user) {
      throw new CustomError('Такого пользователя нет', STATUS_NOT_FOUND);
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
  //  [x] Здесь нужен метод хеширования пароля

  const { password, ...data } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => Users.create({ ...data, password: hash })
      .then((user) => {
        res.send(user);
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CustomError(`Ошибка валидации: ${err.message}`, STATUS_BAD_REQUEST));
      } else {
        next(err);
      }

      next(err);
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  // [ ] Нужно дописать отправку токена
  const { email, password } = req.body;

  return Users.findUserByCredentials(email, password)
    .then((user) => {
      res.send({ message: 'Всё верно!' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CustomError(`Ошибка валидации: ${err.message}`, 400));
      } else {
        next(err);
      }
    });
};

export const updateUser = (req:any, res:Response, next:NextFunction) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  if (!name || !about) {
    throw new CustomError('Введены не все данные', STATUS_BAD_REQUEST);
  }

  updateUserById(_id, { name, about }, res, next);
};

export const updateAvatar = (req:any, res:Response, next:NextFunction) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  if (!avatar) {
    throw new CustomError('Нет данных для обновления', STATUS_BAD_REQUEST);
  }

  updateUserById(_id, { avatar }, res, next);
};
