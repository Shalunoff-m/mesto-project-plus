import { Router } from 'express';
import { getUserById, getAllUsers, createUser } from '../controllers/users';
import Users from '../models/users';

const users = Router();

users.get('/', getAllUsers);
users.get('/:id', getUserById);
users.post('/', createUser);

users.patch('/me', (req:any, res) => {
  // [x] Дописать контроллер обновления профиля
  const { _id } = req.user;
  const newData = req.body;
  Users.findByIdAndUpdate(_id, { ...newData }, { new: true, runValidators: true })
    .then((updatedUser) => {
      res.send(updatedUser);
    });
});

users.patch('/me/avatar', (req:any, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  Users.findByIdAndUpdate(_id, { avatar }, { new: true })
    .then((updatedAvatar) => {
      res.send(updatedAvatar);
    });
  // [x] Дописать контроллер обновления аватарки
});

export default users;
