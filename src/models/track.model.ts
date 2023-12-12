import mongoose, {
  Document,
  Model,
  Schema,
  // Types,
} from 'mongoose';

import { ModelConstants, ValidatorConstants } from '../constants/constant';
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
    name: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    externalId: { type: String, unique: true },
    duration: { type: Number, min: ValidatorConstants.TRACK_DURATION_MIN },
    startTime: { type: Date },
    state: { type: String },
  },
  {
    timestamps: true,
  },
);

const TrackModel: Model<Track> = mongoose.model<Track>(
  ModelConstants.TRACK,
  TrackSchema,
);

export default TrackModel;
