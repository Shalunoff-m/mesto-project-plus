import mongoose, { Model, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { NotFoundError } from '../helpers/customError';
import avatarUrlRegex from '../helpers/regex';

interface IUser extends Document{
  email: string,
  password: string,
  name: string,
  about: string,
  avatar: string,

}

interface IUserModel extends Model<IUser> {
  findUserByCredentials(this: Model<IUser>, email:string, password:string): Promise<IUser>;
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
    validate: {
      validator(v:string) {
        return validator.isURL(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
});

function toJSONWithRemovedPassword(this: IUser) {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

userSchema.method('toJSON', toJSONWithRemovedPassword);

async function findUserByCredentials(
  this: Model<IUser>,
  email: string,
  password: string,
): Promise<IUser> {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new NotFoundError('Неправильные почта или пароль');
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new Error('Неправильные почта или пароль');
  }

  return user;
}

userSchema.static('findUserByCredentials', findUserByCredentials);

const UserModel: IUserModel = mongoose.model<IUser, IUserModel>('user', userSchema);
export default UserModel;
