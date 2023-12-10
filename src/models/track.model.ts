import mongoose, {
    //CallbackError,
    Document,
    Model,
    Schema,
    // Types,
  } from 'mongoose';
  
  import { ModelConstants } from '../constants/constant';
  //import { Group } from './group.model';
  
  export type Track = {
    name: string;
    author: string;
    genre: string;
    externalId: string;
    duration: number;
    startTime: Date;
    // group: Group['_id'];
    state: string;
  } & Document;
  
  const TrackSchema: Schema<Track> = new Schema<Track>(
    {
      name: { type: String, required: true},
      author: { type: String, required: true},
      genre: { type: String},
      externalId: {type: String, unique: true},
      duration: {type: Number, min: 1},
      startTime: {type: Date},
      state: {type: String}
    },
    {
      timestamps: true,
    },
  );
  
  /*UserSchema.pre(
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
  );*/
  
  const TrackModel: Model<Track> = mongoose.model<Track>(
    ModelConstants.TRACK,
    TrackSchema,
  );
  
  export default TrackModel;
  