import { Request, Response } from 'express';
import Cards from '../models/cards';

export const likeCard = (req: any, res: Response) => {
  const { _id } = req.user;
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: _id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then(((newCard) => {
    res.send(newCard);
  }));
};

export const dislikeCard = (req: any, res: Response) => Cards.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
).then(((newCard) => {
  res.send(newCard);
}));

export const deleteCard = (req:Request, res:Response) => {
  // [x] Дописать контроллер
  const { cardId } = req.params;
  Cards.findByIdAndDelete(cardId).then(() => {
    res.send({ process: 'Успешно удалено' });
  });
};

export const createCard = (req:any, res:Response) => {
  const data = req.body;
  const { _id } = req.user;
  Cards.create({ ...data, owner: _id }).then((card) => {
    res.send(card);
  });
  // [x] Дописать контроллер
  /* В теле POST-запроса на создание карточки передайте JSON-объект с двумя полями: name и link. */
};

export const getAllCards = (req:Request, res:Response) => {
  // [x] Дописать контроллер
  Cards.find({}).then((allCards) => {
    res.send(allCards);
  });
};
