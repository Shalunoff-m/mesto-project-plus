import { Request, Response } from 'express';
import Cards from '../models/cards';

export const likeCard = (req: any, res: Response) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Cards.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  ).then(((newCard) => {
    res.send(newCard);
  })).catch(() => {
    res.send({
      error: 'Что-то не получилось',
    });
  });
};

export const dislikeCard = (req: any, res: Response) => Cards.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
).then(((newCard) => {
  res.send(newCard);
  // [ ] Дописать обработчик ошибки
}));

export const deleteCard = (req:Request, res:Response) => {
  const { cardId } = req.params;
  Cards.findByIdAndDelete(cardId).then(() => {
    res.send({ process: 'Успешно удалено' });
    // [ ] Дописать обработчик ошибки
  });
};

export const createCard = (req:any, res:Response) => {
  const data = req.body;
  const { _id } = req.user;
  Cards.create({ ...data, owner: _id }).then((card) => {
    res.send(card);
    // [ ] Дописать обработчик ошибки
  });
};

export const getAllCards = (req:Request, res:Response) => {
  Cards.find({}).then((allCards) => {
    res.send(allCards);
    // [ ] Дописать обработчик ошибки
  });
};
