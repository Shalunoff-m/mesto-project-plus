import { Router } from 'express';

const users = Router();

users.get('/', (req, res) => {
  res.send({
    answer: 'GET запрос успешно реализован',
  });
});

users.post('/', (req, res) => {
  const { text } = req.body;
  const answerText = `${text}, вот что ты прислал ублюдок`;

  res.send({
    'answer-text': answerText,
  });
});

export default users;
