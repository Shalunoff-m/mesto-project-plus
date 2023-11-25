import { Request, Response } from 'express';
import User from '../models/users';

const findUser = (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  User.findOne({
    name: id,
  }).then((user) => {
    res.send(user);
  });
};

export default findUser;
