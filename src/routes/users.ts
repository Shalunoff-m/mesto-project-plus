import { Router } from 'express';
import {
  getUserById, getAllUsers, createUser, updateUser, updateAvatar, login,
} from '../controllers/users';
import auth from '../middlewares/auth';

const users = Router();

users.post('/signup', createUser);
users.post('/signin', login);

users.get('/', auth, getAllUsers);
users.get('/:id', auth, getUserById);
users.patch('/me', auth, updateUser);
users.patch('/me/avatar', auth, updateAvatar);

export default users;
