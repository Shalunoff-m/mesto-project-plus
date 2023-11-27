import { Router } from 'express';
import {
  createCard, deleteCard, dislikeCard, getAllCards, likeCard,
} from '../controllers/cards';
import auth from '../middlewares/auth';

const cards = Router();

cards.get('/', auth, getAllCards);

// [ ] Нужна валидация на name, link
cards.post('/', auth, createCard);

// [ ] Нужна валидация на id/params
cards.delete('/:cardId', auth, deleteCard);

// [ ] Нужна валидация на id/params
cards.put('/:cardId/likes', auth, likeCard);

// [ ] Нужна валидация на id/params
cards.delete('/:cardId/likes', auth, dislikeCard);

export default cards;
