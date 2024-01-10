export type ItemsPage<T> = {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
};

export type TrackEvent = {
  id: string;
  infoId: string;
  name: string;
  timeOffset: number;
  externalId: string;
  audio_link: string;
  vocals_link: string;
  instrumental_link: string;
  album_cover_link: string;
};

export type PlaylistEvent = {
  playlist: {
    id: string;
    name: string;
  }[];
};

export type TerminationEvent = {
  message: string;
};

export type Tokens = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
};
