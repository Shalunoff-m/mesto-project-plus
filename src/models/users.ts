import mongoose from 'mongoose';
import validator from 'validator';

interface IUser{
  email: string,
  password: string,
  name: string,
  about: string,
  avatar: string,
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email:string) {
        return validator.isEmail(email);
      },
      message: (props) => `${props.value} не является действительным адресом электронной почты!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(url:string) {
        return validator.isURL(url);
      },
      message: (props) => `${props.value} не является ссылкой на изображение`,
    },

  },
});

export default mongoose.model<IUser>('user', userSchema);
