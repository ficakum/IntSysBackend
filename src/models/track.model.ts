import mongoose, { Document, Model, Schema, Types } from 'mongoose';

import { ModelConstants } from '../constants/constant';
import { Group } from './group.model';

export type Track = {
  name: string;
  author: string;
  genre: string;
  externalId: string;
  duration: number;
  startTime: Date;
  group: Group['_id'];
  state: string;
} & Document;

const TrackSchema: Schema<Track> = new Schema<Track>(
  {
    name: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    externalId: { type: String, unique: true },
    duration: { type: Number, min: 1 },
    startTime: { type: Date },
    state: { type: String },
    group: { type: Types.ObjectId, ref: ModelConstants.GROUP },
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
