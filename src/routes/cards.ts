import { Router, Request, Response } from 'express';
import Cards from '../models/cards';

const cards = Router();

const getAllCards = (req:Request, res:Response) => {
  // [x] Дописать контроллер
  Cards.find({}).then((allCards) => {
    res.send(allCards);
  });
};

const createCard = (req:any, res:Response) => {
  const data = req.body;
  const { _id } = req.user;
  Cards.create({ ...data, owner: _id }).then((card) => {
    res.send(card);
  });
  // [x] Дописать контроллер
  /* В теле POST-запроса на создание карточки передайте JSON-объект с двумя полями: name и link. */
};

const deleteCard = (req:Request, res:Response) => {
  // [x] Дописать контроллер
  const { cardId } = req.params;
  Cards.findByIdAndDelete(cardId).then(() => {
    res.send({ process: 'Успешно удалено' });
  });
};

cards.get('/', getAllCards);
cards.post('/', createCard);
cards.delete('/:cardId', deleteCard);

//  Это можно дописать попозже немного
cards.put('/:cardId/likes', () => {
/* Каждый пользователь может поставить только один лайк карточке.
 Поэтому массив лайков должен состоять из уникальных значений.
 Для этого нужно добавлять пользователя в массив, только если его там ещё нет.
 В MongoDB такая логика реализуется специальными операторами:

$addToSet, чтобы добавить элемент в массив, если его там ещё нет;
$pull, чтобы убрать. */

  // [ ] Дописать контроллер поставить лайк карточке
});
cards.delete('/:cardId/likes', () => {
  // [ ] Дописать контроллер убрать лайк с карточки
});

export default cards;
