import mongoose from 'mongoose';

import config from '../configs/env.config';

export async function connect(): Promise<void> {
  await mongoose.connect(config.MONGODB_CONNECTION + '/' + config.MONGODB_NAME);
}

export async function disconnect(): Promise<void> {
  await mongoose.disconnect();
}
