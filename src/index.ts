import express, { Express } from 'express';
import bodyParser from 'body-parser';

import { connect } from './databaseConnections/mongo.connection';
import config from './configs/env.config';
import appRouter from './routers/app.router';
import errorHandler from './handlers/error.handler';
import morganMiddleware from './utils/morgan.logger';
import cronService from './services/cron.service';

const app: Express = express();

async function start(): Promise<void> {
  await connect();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  cronService.startCronSchedules();

  app.use(morganMiddleware);
  app.use('/v1', appRouter);
  app.use(errorHandler);

  app.listen(config.PORT);
}

start();
