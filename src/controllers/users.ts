import { NextFunction, Request, Response } from 'express';
import CustomError from '../helpers/customError';
import Users from '../models/users';

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  Users.findById(id).then((user) => {
    if (!user) {
      throw new CustomError('Такого пользователя нет', 404);
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
  const data = req.body;
  Users.create(data).then((user) => {
    res.send(user);
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      next(new CustomError(`Ошибка валидации: ${err.message}`, 400));
    } else {
      next(err);
    }

    next(err);
  });
};

export const updateUser = (req:any, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  if (!name || !about) {
    throw new CustomError('Введены не все данные', 400);
  }

  Users.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new CustomError('Пользователь не найден', 404);
      }

      res.send(updatedUser);
    }).catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CustomError(`Ошибка валидации: ${err.message}`, 400));
      } else {
        next(err);
      }
      next(err);
    });
};

export const updateAvatar = (req:any, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  if (!avatar) {
    throw new CustomError('Нет данных для обновления', 400);
  }

  Users.findByIdAndUpdate(_id, { avatar }, { new: true })
    .then((updatedAvatar) => {
      if (!updatedAvatar) {
        throw new CustomError('Пользователь не найден', 404);
      }

      res.send(updatedAvatar);
    }).catch((err) => {
      next(err);
    });
};
