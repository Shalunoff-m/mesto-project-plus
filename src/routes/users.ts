import { Router } from 'express';
import {
  getUserById, getAllUsers, createUser, updateUser, updateAvatar,
} from '../controllers/users';

const users = Router();

users.get('/', getAllUsers);
users.get('/:id', getUserById);
users.post('/', createUser);
users.patch('/me', updateUser);
users.patch('/me/avatar', updateAvatar);

export default users;
