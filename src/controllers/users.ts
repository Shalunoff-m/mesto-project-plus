import { Request, Response } from 'express';
import Users from '../models/users';

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  Users.findById(id).then((user) => {
    res.send(user);
  }).catch((err) => {
    res.send({ error: err });
  });
};

export const getAllUsers = (req: Request, res: Response) => {
  Users.find({}).then((users) => {
    res.send(users);
  }).catch((err) => {
    res.send({ error: err });
  });
};

export const createUser = (req: Request, res: Response) => {
  const data = req.body;
  Users.create(data).then((user) => {
    res.send(user);
  }).catch((err) => {
    res.send({ error: err });
  });
};

export const updateUser = (req:any, res: Response) => {
  const { _id } = req.user;
  const newData = req.body;
  Users.findByIdAndUpdate(_id, { ...newData }, { new: true, runValidators: true })
    .then((updatedUser) => {
      res.send(updatedUser);
    }).catch((err) => {
      res.send({ error: err });
    });
};

export const updateAvatar = (req:any, res: Response) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  Users.findByIdAndUpdate(_id, { avatar }, { new: true })
    .then((updatedAvatar) => {
      res.send(updatedAvatar);
    }).catch((err) => {
      res.send({ error: err });
    });
};
