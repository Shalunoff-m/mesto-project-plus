import { Router } from 'express';
import {
  createCard, deleteCard, dislikeCard, getAllCards, likeCard,
} from '../controllers/cards';

const cards = Router();

cards.get('/', getAllCards);
cards.post('/', createCard);
cards.delete('/:cardId', deleteCard);
cards.put('/:cardId/likes', likeCard);
cards.delete('/:cardId/likes', dislikeCard);

export default cards;
