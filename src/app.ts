import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import basePath from './routes/base';
import users from './routes/users';
import cards from './routes/cards';
import { requestLogger, errorLogger } from './middlewares/logger';
import { NotFoundError } from './helpers/customError';

dotenv.config();
// Дефолтные настройки порта и базы
const PORT = 3000;
const DB_URI = 'mongodb://localhost:27017/mestodb';

const app = express();

// ПОДКЛЮЧАЕМСЯ К БАЗЕ ДАННЫХ
if (DB_URI) {
  mongoose.connect(DB_URI).then(() => {
    console.log('Database connected successfully!');
  }).catch((err) => {
    console.log('Database connected error', err);
  });
} else {
  console.log('Database connected error');
}

// MIDDLEWARES ----------------------------------------------
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

// РОУТЕРЫ
app.use('/', basePath);
app.use('/users', users);
app.use('/cards', cards);
app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

// ЛОГЕР ОШИБОК
app.use(errorLogger);

// ОБРАБОТЧИКИ ОШИБОК----------------------------------------
// ОБРАБОТЧИК CELEBRATE
app.use(errors());

// ЦЕНТРАЛЬНЫЙ ОБРАБОТЧИК
app.use((err: any, req:Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

export default app;
