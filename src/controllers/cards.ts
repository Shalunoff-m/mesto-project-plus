import { NextFunction, Request, Response } from 'express';
import Cards from '../models/cards';
import { BadRequestError, NotEnoughRightsError, NotFoundError } from '../helpers/customError';

const updateCardLikes = (
  cardId: string,
  userId: string,
  action: string,
  res: Response,
  next: NextFunction,
) => {
  const update = action === 'like'
    ? { $addToSet: { likes: userId } }
    : { $pull: { likes: userId } };

  Cards.findByIdAndUpdate(cardId, update, { new: true })
    .then((updatedCard) => {
      if (!updatedCard) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(updatedCard);
    })
    .catch((err) => {
      next(err);
    });
};

export const likeCard = (req: any, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  updateCardLikes(cardId, _id, 'like', res, next);
};

export const dislikeCard = (req: any, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  updateCardLikes(cardId, _id, 'dislike', res, next);
};

export const deleteCard = (req:any, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Cards.findById(cardId).then((findenCard) => {
    if (findenCard) {
      if (findenCard.owner.toString() === _id) {
        Cards.findByIdAndDelete(cardId).then(() => {
          res.send({ message: 'Успешно удалено' });
        });
      } else {
        throw new NotEnoughRightsError('Вы не владелец карточки');
      }
    } else { throw new NotFoundError('Карточка не найдена'); }
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
      next(new BadRequestError(`Ошибка валидации: ${err.message}`));
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
