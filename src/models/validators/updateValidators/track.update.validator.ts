import Joi from 'joi';

import { Track } from '../../track.model';

const TrackUpdateSchemaValidator: Joi.ObjectSchema<Track> = Joi.object<Track>({
  group: Joi.optional(),
  trackInformation: Joi.optional(),
});

export default TrackUpdateSchemaValidator;
