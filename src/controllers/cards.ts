import { NextFunction, Request, Response } from 'express';
import Cards from '../models/cards';
import CustomError from '../helpers/customError';

export const likeCard = (req: any, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Cards.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  ).then(((newCard) => {
    if (!newCard) {
      throw new CustomError('Карточка не найдена', 404);
    }

    res.send(newCard);
  })).catch((err) => {
    next(err);
  });
};

export const dislikeCard = (req: any, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Cards.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    { new: true },
  ).then(((newCard) => {
    if (!newCard) {
      throw new CustomError('Карточка не найдена', 404);
    }

    res.send(newCard);
  })).catch((err) => {
    next(err);
  });
};

export const deleteCard = (req:Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Cards.findByIdAndDelete(cardId).then((deletedCard) => {
    if (!deletedCard) {
      throw new CustomError('Карточка не найдена', 404);
    }

    res.send({ message: 'Успешно удалено' });
  }).catch((err) => {
    next(err);
  });
};

export const createCard = (req:any, res: Response, next: NextFunction) => {
  const data = req.body;
  const { _id } = req.user;
  Cards.create({ ...data, owner: _id }).then((card) => {
    res.send(card);
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      next(new CustomError(`Ошибка валидации: ${err.message}`, 400));
    } else {
      next(err);
    }
  });
};

export const getAllCards = (req:Request, res: Response, next: NextFunction) => {
  Cards.find({}).then((allCards) => {
    res.send(allCards);
  }).catch((err) => {
    next(err);
  });
};
