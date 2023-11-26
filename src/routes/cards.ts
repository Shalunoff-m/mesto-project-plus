import { Router } from 'express';
import {
  createCard, deleteCard, dislikeCard, getAllCards, likeCard,
} from '../controllers/cards';
import auth from '../middlewares/auth';

const cards = Router();

cards.get('/', auth, getAllCards);
cards.post('/', auth, createCard);
cards.delete('/:cardId', auth, deleteCard);
cards.put('/:cardId/likes', auth, likeCard);
cards.delete('/:cardId/likes', auth, dislikeCard);

export default cards;
