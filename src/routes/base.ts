import { Router } from 'express';
import { createUser, login } from '../controllers/users';
import { createUserValidation, loginValidation } from '../middlewares/validation';

const basePath = Router();

basePath.post('/signup', createUserValidation, createUser);
basePath.post('/signin', loginValidation, login);

export default basePath;
