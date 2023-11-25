import { Request, Response } from 'express';
import User from '../models/users';

const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  User.findById(id).then((user) => {
    res.send(user);
  });
};

const getAllUsers = (req: Request, res: Response) => {
  User.find({}).then((users) => {
    res.send(users);
  }).catch((err) => {
    res.send({
      error: err,
    });
  });
};

const createUser = (req: Request, res: Response) => {
  const data = req.body;
  User.create(data).then((user) => {
    res.send(user);
  }).catch((err) => {
    res.send({ error: err });
  });
};

export { getUserById, getAllUsers, createUser };
