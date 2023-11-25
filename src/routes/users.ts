import { Router } from 'express';
import { getUserById, getAllUsers, createUser } from '../controllers/users';

const users = Router();

users.get('/', getAllUsers);
users.get('/:id', getUserById);
users.post('/', createUser);

export default users;
