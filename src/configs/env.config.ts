import * as dotenv from 'dotenv';

import Logger from '../utils/winston.logger';

dotenv.config();

type IConfig = {
  MONGODB_CONNECTION: string;
  MONGODB_NAME: string;
  PORT: number;
  MAX_MEMBERS_DEFAULT: number;
  PLAYLIST_RATE_LIMIT: number;
  cron: {
    CRON_TRACK: string;
  };
  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: number;
  JWT_REFRESH_TOKEN_EXPIRATION: number;
  PASSWORD_HASH_ROUNDS: number;
};

if (
  !process.env.MONGODB_CONNECTION ||
  !process.env.MONGODB_NAME ||
  !process.env.MAX_MEMBERS_DEFAULT ||
  !process.env.PLAYLIST_RATE_LIMIT ||
  !process.env.CRON_TRACK ||
  !process.env.JWT_SECRET ||
  !process.env.JWT_EXPIRATION_TIME ||
  !process.env.JWT_REFRESH_TOKEN_EXPIRATION ||
  !process.env.PASSWORD_HASH_ROUNDS
) {
  Logger.error('Environment variables missing');

  process.exit(1);
}

const config: IConfig = {
  MONGODB_CONNECTION: process.env.MONGODB_CONNECTION,
  MONGODB_NAME: process.env.MONGODB_NAME,
  PORT: Number(process.env.PORT) || 3001,
  MAX_MEMBERS_DEFAULT: Number(process.env.MAX_MEMBERS_DEFAULT),
  PLAYLIST_RATE_LIMIT: Number(process.env.PLAYLIST_RATE_LIMIT),
  cron: {
    CRON_TRACK: process.env.CRON_TRACK,
  },
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION_TIME: Number(process.env.JWT_EXPIRATION_TIME),
  JWT_REFRESH_TOKEN_EXPIRATION: Number(
    process.env.JWT_REFRESH_TOKEN_EXPIRATION,
  ),
  PASSWORD_HASH_ROUNDS: Number(process.env.PASSWORD_HASH_ROUNDS),
};

export default config;
