import express from 'express';
import mongoose from 'mongoose';
import users from './routes/users';

const { PORT = 3000 } = process.env;
const app = express();

// ПОДКЛЮЧАЕМСЯ К БАЗЕ ДАННЫХ
mongoose.connect('mongodb://localhost:27017/mestodb');

// MIDDLEWARES ----------------------------------------------
// ПАРСЕР ДАННЫХ
app.use(express.json());

// РОУТЕРЫ
app.use('/users', users);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
