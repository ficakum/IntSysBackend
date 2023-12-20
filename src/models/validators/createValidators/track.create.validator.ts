import Joi from 'joi';

import { Track } from '../../track.model';

const TrackCreateSchemaValidator: Joi.ObjectSchema<Track> = Joi.object<Track>({
  group: Joi.optional(),
  trackInformation: Joi.optional(),
});

export default TrackCreateSchemaValidator;
