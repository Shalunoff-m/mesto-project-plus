import { Router } from 'express';
import {
  getUserById, getAllUsers, createUser, updateUser, updateAvatar, login,
} from '../controllers/users';

const users = Router();

users.get('/', getAllUsers);
users.get('/:id', getUserById);
users.post('/signup', createUser);
users.post('/signin', login);
users.patch('/me', updateUser);
users.patch('/me/avatar', updateAvatar);

export default users;
