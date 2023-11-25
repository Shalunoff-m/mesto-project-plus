import { Router } from 'express';
import findUser from '../controllers/users';

const users = Router();

users.get('/', (req, res) => {
  res.send({
    answer: 'GET запрос успешно реализован',
  });
});

users.get('/:id', findUser);

users.post('/', (req, res) => {
  const { text } = req.body;
  const answerText = `${text}, вот что ты прислал ублюдок`;

  res.send({
    'answer-text': answerText,
  });
});

export default users;
