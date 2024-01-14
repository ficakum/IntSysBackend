import mongoose, { Schema, Document, Types, Model } from 'mongoose';

import config from '../configs/env.config';
import { ModelConstants } from '../constants/constant';

import { Track } from './track.model';

export type Group = {
  groupName: string;
  currentTrack: Track['_id'];
  maxMembers: number;
  membersNum: number;
  cluster: number;
} & Document;

const GroupSchema: Schema<Group> = new Schema<Group>(
  {
    groupName: String,
    currentTrack: { type: Types.ObjectId, ref: ModelConstants.TRACK },
    maxMembers: { type: Number, default: config.MAX_MEMBERS_DEFAULT },
    membersNum: { type: Number, default: 0 },
    cluster: { type: Number, default: -1 },
  },
  {
    timestamps: true,
  },
);

const GroupModel: Model<Group> = mongoose.model<Group>(
  ModelConstants.GROUP,
  GroupSchema,
);

export default GroupModel;
