import { celebrate, Joi } from 'celebrate';

export const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.base': '"email" должен быть строкой',
      'string.email': '"email" должен быть действительным адресом электронной почты',
      'any.required': '"email" обязательное поле',
    }),
    password: Joi.string().required().messages({
      'string.base': '"password" должен быть строкой',
      'any.required': '"password" обязательное поле',
    }),
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто')
      .messages({
        'string.base': '"name" должно быть строкой',
        'string.min': '"name" должно быть минимум 2 символа',
        'string.max': '"name" не должно превышать 30 символов',
      }),
    about: Joi.string().min(2).max(200).default('Исследователь')
      .messages({
        'string.base': '"about" должно быть строкой',
        'string.min': '"about" должно быть минимум 2 символа',
        'string.max': '"about" не должно превышать 200 символов',
      }),
    avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png').messages({
      'string.base': '"avatar" должно быть строкой',
    }),
  }),
});

export const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.base': '"email" должен быть строкой',
      'string.email': '"email" должен быть действительным адресом электронной почты',
      'any.required': '"email" обязательное поле',
    }),
    password: Joi.string().required().messages({
      'string.base': '"password" должен быть строкой',
      'any.required': '"password" обязательное поле',
    }),
  }),
});

export const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто')
      .messages({
        'string.base': '"name" должно быть строкой',
        'string.min': '"name" должно быть минимум 2 символа',
        'string.max': '"name" не должно превышать 30 символов',
      }),
    about: Joi.string().min(2).max(200).default('Исследователь')
      .messages({
        'string.base': '"about" должно быть строкой',
        'string.min': '"about" должно быть минимум 2 символа',
        'string.max': '"about" не должно превышать 200 символов',
      }),
  }),
});

export const UserGetValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).messages({
      'string.base': '"cardId" должен быть строкой',
      'string.alphanum': '"cardId" неверный формат идентификатора',
      'string.length': '"cardId" не соответствует длине',
    }),
  }),
});

export const updateUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png').messages({
      'string.base': '"avatar" должно быть строкой',
      'string.uri': '"avatar" должно быть действительной ссылкой на изображение',
    }),
  }),
});

export const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.base': '"name" должно быть строкой',
      'string.min': '"name" должно быть минимум 2 символа',
      'string.max': '"name" не должно превышать 30 символов',
    }),
    link: Joi.string().uri().messages({
      'string.base': '"link" должно быть строкой',
      'string.uri': '"link" должно быть действительной ссылкой на изображение',
    }),
  }),
});

export const deleteCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).messages({
      'string.base': '"cardId" должен быть строкой',
      'string.alphanum': '"cardId" неверный формат идентификатора',
      'string.length': '"cardId" не соответствует длине',
    }),
  }),
});

export const likeDislikeCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).messages({
      'string.base': '"cardId" должен быть строкой',
      'string.alphanum': '"cardId" неверный формат идентификатора',
      'string.length': '"cardId" не соответствует длине',
    }),
  }),
});
