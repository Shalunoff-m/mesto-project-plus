import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CustomError from './helpers/customError';
import users from './routes/users';
import cards from './routes/cards';
import { STATUS_INTERNAL_SERVER_ERROR } from './helpers/status-code';

dotenv.config();

const { PORT = 3000, DB_URI } = process.env;
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

app.use((req: any, res: Response, next: NextFunction) => {
  req.user = {
    _id: '65632e242f7a6635a7129675',
  };

  next();
});

// РОУТЕРЫ
app.use('/users', users);
app.use('/cards', cards);

// ОБРАБОТЧИК ОШИБОК
app.use((err: any, req:Request, res: Response) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ message: err.message });
  }

  res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

export default app;
