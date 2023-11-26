import { Router } from 'express';
import {
  getUserById, getAllUsers, createUser, updateUser, updateAvatar, login, getCurrentUser,
} from '../controllers/users';
import auth from '../middlewares/auth';

const users = Router();

users.post('/signup', createUser);
users.post('/signin', login);

users.get('/', auth, getAllUsers);
users.patch('/me', auth, updateUser);
users.get('/me', auth, getCurrentUser);
users.get('/:id', auth, getUserById);
users.patch('/me/avatar', auth, updateAvatar);

export default users;
