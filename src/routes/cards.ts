import { Router } from 'express';
import {
  createCard, deleteCard, dislikeCard, getAllCards, likeCard,
} from '../controllers/cards';
import auth from '../middlewares/auth';
import { createCardValidation, deleteCardValidation, likeDislikeCardValidation } from '../middlewares/validation';

const cards = Router();

cards.get('/', auth, getAllCards);
cards.post('/', auth, createCardValidation, createCard);
cards.delete('/:cardId', auth, deleteCardValidation, deleteCard);
cards.put('/:cardId/likes', auth, likeDislikeCardValidation, likeCard);
cards.delete('/:cardId/likes', auth, likeDislikeCardValidation, dislikeCard);

export default cards;
