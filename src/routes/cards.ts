import { Router } from 'express';
import {
  createCard, deleteCard, dislikeCard, getAllCards, likeCard,
} from '../controllers/cards';
import auth from '../middlewares/auth';
import { createCardValidation, deleteCardValidation, likeDislikeCardValidation } from '../middlewares/validation';

const cards = Router();

cards.get('/', auth, getAllCards);

// [x] Нужна валидация на name, link
cards.post('/', auth, createCardValidation, createCard);

// [x] Нужна валидация на id/params
cards.delete('/:cardId', auth, deleteCardValidation, deleteCard);

// [x] Нужна валидация на id/params
cards.put('/:cardId/likes', auth, likeDislikeCardValidation, likeCard);

// [x] Нужна валидация на id/params
cards.delete('/:cardId/likes', auth, likeDislikeCardValidation, dislikeCard);

export default cards;
