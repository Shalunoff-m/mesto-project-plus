import mongoose, { Model, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import avatarUrlRegex from '../helpers/regex';

interface IUser extends Document{
  email: string,
  password: string,
  name: string,
  about: string,
  avatar: string,

}

interface IUserModel extends Model<IUser> {
  findUserByCredentials(email:string, password:string): Promise<IUser>;
  toObject(): Record<string, any>
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
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
    select: false,
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
  },
});

userSchema.method('toJSON', function (this: IUser) {
  const obj = this.toObject();
  delete obj.password;
  return obj;
});

userSchema.static('findUserByCredentials', function (email: string, password: string) {
  return this.findOne({ email }).select('+password')
    .then((user: IUser) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    });
});

const UserModel: IUserModel = mongoose.model<IUser, IUserModel>('user', userSchema);
export default UserModel;
