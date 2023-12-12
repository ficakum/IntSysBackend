import winston, { Logform, transports, Logger } from 'winston';

import { WinstonLevels, WinstonColors } from '../constants/constant';

const level = (): string => {
  return 'info';
};

winston.addColors(WinstonColors);

const format: Logform.Format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.splat(),
  winston.format.printf((info) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
  }),
);

const winstonTransports: (
  | transports.ConsoleTransportInstance
  | transports.FileTransportInstance
)[] = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
];

const logger: Logger = winston.createLogger({
  level: level(),
  levels: WinstonLevels,
  format,
  transports: winstonTransports,
});

export default logger;
