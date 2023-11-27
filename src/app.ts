import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import users from './routes/users';
import cards from './routes/cards';
import { requestLogger, errorLogger } from './middlewares/logger';

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
app.use('/users', users);
app.use('/cards', cards);

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
