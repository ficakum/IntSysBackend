import Joi from 'joi';

import { Track } from '../../track.model';
import {
  ValidatorKeys,
  ValidatorMessages,
  ValidatorTypes,
} from '../../../constants/constant';
import { messagesConstructor } from '../messages.validator';

const TrackUpdateSchemaValidator: Joi.ObjectSchema<Track> = Joi.object<Track>({
  name: Joi.string()
    .required()
    .messages(
      messagesConstructor(
        ValidatorTypes.STRING,
        {
          [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
          [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
          [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
        },
        'name',
      ),
    ),
  group: Joi.optional(),
  author: Joi.string()
    .required()
    .messages(
      messagesConstructor(
        ValidatorTypes.STRING,
        {
          [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
          [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
          [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
        },
        'author',
      ),
    ),
});

export default TrackUpdateSchemaValidator;
