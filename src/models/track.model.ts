import mongoose, { Document, Model, Schema, Types } from 'mongoose';

import { ModelConstants, TrackState } from '../constants/constant';
import { Group } from './group.model';
import { TrackInformation } from './trackInformation.model';

export type Track = {
  trackInformation: TrackInformation['_id'];
  startTime: number;
  group: Group['_id'];
  state: string;
} & Document;

const TrackSchema: Schema<Track> = new Schema<Track>(
  {
    trackInformation: {
      type: Types.ObjectId,
      ref: ModelConstants.TRACK_INFORMATION,
    },
    startTime: { type: Number },
    state: { type: String, default: TrackState.SCHEDULED },
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
