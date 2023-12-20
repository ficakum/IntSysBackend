import mongoose, { Document, Model, Schema, Types } from 'mongoose';

import { ModelConstants } from '../constants/constant';
import { Group } from './group.model';
import { TrackInformation } from './trackInformation.model';

export type Track = {
  trackInformation: TrackInformation['_id'];
  startTime: Date;
  group: Group['_id'];
  state: string;
} & Document;

const TrackSchema: Schema<Track> = new Schema<Track>(
  {
    trackInformation: {
      type: Types.ObjectId,
      ref: ModelConstants.TRACK_INFORMATION,
    },
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
