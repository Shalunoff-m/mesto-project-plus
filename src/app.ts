import express from 'express';
import mongoose from 'mongoose';

const { PORT = 3000 } = process.env;
const app = express();

// ПОДКЛЮЧАЕМСЯ К БАЗЕ ДАННЫХ
mongoose.connect('mongodb://localhost:27017/mestodb');

// MIDDLEWARES ----------------------------------------------
// ПАРСЕР ДАННЫХ
app.use(express.json());

app.get('/', (req, res) => {
  res.send({
    answer: 'GET запрос успешно реализован',
  });
});

app.post('/', (req, res) => {
  const { text } = req.body;
  const answerText = `${text} вот что ты прислал ублюдок`;

  res.send({
    'answer-text': answerText,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
