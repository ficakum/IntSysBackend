export type ItemsPage<T> = {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
};

export type TrackEvent = {
  id: string;
  name: string;
  timeOffset: number;
  externalId: string;
};

export type PlaylistEvent = {
  playlist: {
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
