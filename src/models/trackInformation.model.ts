import mongoose, { Document, Model, Schema } from 'mongoose';

import { ModelConstants } from '../constants/constant';

export type TrackInformation = {
  name: string;
  author: string;
  genre: string;
  externalId: string;
  duration: number;
  popularity: number;
  album_id: string;
  album_name: string;
  album_release_date: string;
  playlist_name: string;
  playlist_id: string;
  playlist_genre: string;
  playlist_subgenre: string;
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  cluster: number;
  audio_link: string;
  vocals_link: string;
  instrumental_link: string;
  album_cover_link: string;
} & Document;

const TrackInformationSchema: Schema<TrackInformation> =
  new Schema<TrackInformation>(
    {
      name: { type: String, required: true },
      author: { type: String, required: true },
      genre: { type: String },
      externalId: { type: String, unique: true },
      duration: { type: Number, min: 1 },
      popularity: { type: Number },
      album_id: { type: String },
      album_name: { type: String },
      album_release_date: { type: String },
      playlist_name: { type: String },
      playlist_id: { type: String },
      playlist_genre: { type: String },
      playlist_subgenre: { type: String },
      danceability: { type: Number },
      energy: { type: Number },
      key: { type: Number },
      loudness: { type: Number },
      mode: { type: Number },
      speechiness: { type: Number },
      acousticness: { type: Number },
      instrumentalness: { type: Number },
      liveness: { type: Number },
      valence: { type: Number },
      tempo: { type: Number },
      cluster: { type: Number },
      audio_link: { type: String },
      vocals_link: { type: String },
      instrumental_link: { type: String },
      album_cover_link: { type: String },
    },
    {
      timestamps: true,
    },
  );

const TrackInformationModel: Model<TrackInformation> =
  mongoose.model<TrackInformation>(
    ModelConstants.TRACK_INFORMATION,
    TrackInformationSchema,
  );

export default TrackInformationModel;
