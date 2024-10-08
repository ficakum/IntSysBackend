export enum ModelConstants {
  USER = 'users',
  TRACK = 'tracks',
  GROUP = 'groups',
  TRACK_INFORMATION = 'track_informations',
}

export const WinstonLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

export enum WinstonColors {
  ERROR = 'red',
  WARN = 'yellow',
  INFO = 'green',
  HTTP = 'magenta',
  DEBUG = 'white',
}

export enum ValidatorConstants {
  GROUP_NAME_MIN = 3,
  GROUP_NAME_MAX = 12,
  GROUP_GREATER = -1,
  GROUP_MAX_MEMBERS = 20,
  USER_NAME_MIN = 2,
  USER_NAME_MAX = 30,
  TRACK_DURATION_MIN = 1,
}

export enum ValidatorMessages {
  BASE = 'should be a type of',
  EMPTY = 'cannot be empty field',
  EMAIL = 'must be in email format',
  MIN = 'should have a minimum length of',
  MAX = 'should have a maximum length of',
  GREATER = 'should be greater than',
  INTEGER = 'should be integer',
  REQUIRED = 'is a required field',
  VALID = 'should have values',
  LENGTH = 'should be long',
}

export enum ValidatorKeys {
  BASE = 'base',
  EMPTY = 'empty',
  EMAIL = 'email',
  MIN = 'min',
  MAX = 'max',
  GREATER = 'greater',
  INTEGER = 'integer',
  REQUIRED = 'required',
  VALID = 'valid',
  LENGTH = 'length',
}

export enum ValidatorTypes {
  DATE = 'date',
  NUMBER = 'number',
  STRING = 'string',
  BOOL = 'bool',
}

export enum EventType {
  PLAYLIST = 'PLAYLIST',
  CURRENT_TRACK = 'CURRENT_TRACK',
}

export enum TrackState {
  SCHEDULED = 'SCHEDULED',
  FINISHED = 'FINISHED',
  PLAYING = 'PLAYING',
}

export enum TrackEventState {
  FINISHED = 'FINISHED',
  CONTINUE = 'CONTINUE',
}
