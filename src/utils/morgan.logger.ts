import morgan, { StreamOptions } from 'morgan';

import Logger from './winston.logger';

const stream: StreamOptions = {
  write: (message: string) => Logger.info(message),
};

const skip: () => boolean = () => {
  return false;
};

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream,
    skip,
  },
);
export default morganMiddleware;
