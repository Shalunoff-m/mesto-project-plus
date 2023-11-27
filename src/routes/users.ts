import { Router } from 'express';
import {
  getUserById, getAllUsers, createUser, updateUser, updateAvatar, login, getCurrentUser,
} from '../controllers/users';
import auth from '../middlewares/auth';
import { createUserValidation } from '../middlewares/validation';

const users = Router();

// [x] Нужна валидация на email, password, name, about, avatar
users.post('/signup', createUserValidation, createUser);

// [ ] Нужна валидация на email, password
users.post('/signin', login);

users.get('/', auth, getAllUsers);

// [ ] Нужна валидация на name, about
users.patch('/me', auth, updateUser);

users.get('/me', auth, getCurrentUser);

// [ ] Нужна валидация на id/params
users.get('/:id', auth, getUserById);

// [ ] Нужна валидация на url/avatar
users.patch('/me/avatar', auth, updateAvatar);

export default users;
