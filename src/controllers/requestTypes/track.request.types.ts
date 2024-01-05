import { Request } from 'express';

import { Track } from '../../models/track.model';
import { TrackInformation } from '../../models/trackInformation.model';

type GetTrackRequestType = Request<{ id: string }, object, object, object>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetTracksRequestType = Request<object, object, object, Map<string, any>>;
type CreateTrackRequestType = Request<object, object, Partial<Track>, object>;
type CreateTrackInfoRequestType = Request<
  object,
  object,
  Partial<TrackInformation>,
  object
>;
type UpdateTrackRequestType = Request<
  { id: string },
  object,
  Partial<Track>,
  object
>;
type UpdateTrackInfoRequestType = Request<
  { id: string },
  object,
  Partial<TrackInformation>,
  object
>;
type DeleteTrackRequestType = Request<{ id: string }, object, object, object>;
type DeleteTrackInfoRequestType = Request<
  { id: string },
  object,
  object,
  object
>;

export type {
  GetTrackRequestType,
  GetTracksRequestType,
  CreateTrackRequestType,
  CreateTrackInfoRequestType,
  UpdateTrackRequestType,
  UpdateTrackInfoRequestType,
  DeleteTrackRequestType,
  DeleteTrackInfoRequestType,
};
