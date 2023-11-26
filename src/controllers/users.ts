import { NextFunction, Request, Response } from 'express';
import Users from '../models/users';

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  Users.findById(id).then((user) => {
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
    next(err);
  });
};

export const updateUser = (req:any, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const newData = req.body;
  Users.findByIdAndUpdate(_id, { ...newData }, { new: true, runValidators: true })
    .then((updatedUser) => {
      res.send(updatedUser);
    }).catch((err) => {
      next(err);
    });
};

export const updateAvatar = (req:any, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  Users.findByIdAndUpdate(_id, { avatar }, { new: true })
    .then((updatedAvatar) => {
      res.send(updatedAvatar);
    }).catch((err) => {
      next(err);
    });
};
