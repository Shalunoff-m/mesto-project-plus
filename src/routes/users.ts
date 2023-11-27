import { Router } from 'express';
import {
  getUserById, getAllUsers, createUser, updateUser, updateAvatar, login, getCurrentUser,
} from '../controllers/users';
import auth from '../middlewares/auth';
import {
  UserGetValidation,
  createUserValidation,
  loginValidation,
  updateUserAvatarValidation,
  updateUserValidation,
} from '../middlewares/validation';

const users = Router();

users.post('/signup', createUserValidation, createUser);
users.post('/signin', loginValidation, login);

// МАРШРУТЫ С АВТОРИЗАЦИЕЙ
users.get('/', auth, getAllUsers);
users.patch('/me', auth, updateUserValidation, updateUser);
users.get('/me', auth, getCurrentUser);
users.get('/:userId', auth, UserGetValidation, getUserById);
users.patch('/me/avatar', auth, updateUserAvatarValidation, updateAvatar);

export default users;
