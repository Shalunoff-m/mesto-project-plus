import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import CustomError from './helpers/customError';
import users from './routes/users';
import cards from './routes/cards';

const { PORT = 3000 } = process.env;
const app = express();

// ПОДКЛЮЧАЕМСЯ К БАЗЕ ДАННЫХ
mongoose.connect('mongodb://localhost:27017/mestodb');

// MIDDLEWARES ----------------------------------------------
app.use(express.json());

app.use((req: any, res: Response, next: NextFunction) => {
  req.user = {
    _id: '656248255bb6a1a102d01fd1',
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

  res.status(500).send({ message: 'Судя по всему, какая-то ошибка сервера' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
