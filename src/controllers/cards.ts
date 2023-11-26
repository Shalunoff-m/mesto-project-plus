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
})).catch((err) => {
  res.send({ error: err });
});

export const deleteCard = (req:Request, res:Response) => {
  const { cardId } = req.params;
  Cards.findByIdAndDelete(cardId).then(() => {
    res.send({ process: 'Успешно удалено' });
  }).catch((err) => {
    res.send({ error: err });
  });
};

export const createCard = (req:any, res:Response) => {
  const data = req.body;
  const { _id } = req.user;
  Cards.create({ ...data, owner: _id }).then((card) => {
    res.send(card);
  }).catch((err) => {
    res.send({ error: err });
  });
};

export const getAllCards = (req:Request, res:Response) => {
  Cards.find({}).then((allCards) => {
    res.send(allCards);
  }).catch((err) => {
    res.send({ error: err });
  });
};
