import mongoose, {
  CallbackError,
  Document,
  Model,
  Schema,
  Types,
} from 'mongoose';

import { ModelConstants } from '../constants/constant';
import { hashPassword } from '../utils/helper.methods';

import { Group } from './group.model';

export type User = {
  userName: string;
  email: string;
  password: string;
  group: Group['_id'];
} & Document;

const UserSchema: Schema<User> = new Schema<User>(
  {
    userName: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    group: { type: Types.ObjectId, ref: ModelConstants.GROUP },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre(
  /save/,
  async function (next: (err?: CallbackError | undefined) => void) {
    const user: User = this as unknown as User;
    if (!user.password) return next();

    try {
      user.password = await hashPassword(user.password);

      return next();
    } catch (error) {
      return next(error as CallbackError);
    }
  },
);

UserSchema.pre(
  'findOneAndUpdate',
  async function (next: (err?: CallbackError | undefined) => void) {
    const user: User | null = this.getUpdate() as unknown as User;
    if (!user || !user.password) return next();

    try {
      user.password = await hashPassword(user.password);

      return next();
    } catch (error) {
      return next(error as CallbackError);
    }
  },
);

const UserModel: Model<User> = mongoose.model<User>(
  ModelConstants.USER,
  UserSchema,
);

export default UserModel;
