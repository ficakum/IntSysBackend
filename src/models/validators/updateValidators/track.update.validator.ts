import Joi from 'joi';

import { Track } from '../../track.model';
import {
  ValidatorKeys,
  ValidatorMessages,
  ValidatorTypes,
} from '../../../constants/constant';
import { messagesConstructor } from '../messages.validator';

const TrackUpdateSchemaValidator: Joi.ObjectSchema<Track> = Joi.object<Track>({
  name: Joi.string().messages(
    messagesConstructor(
      ValidatorTypes.STRING,
      {
        [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
        [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
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
  genre: Joi.string().messages(
    messagesConstructor(
      ValidatorTypes.STRING,
      {
        [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
        [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
      },
      'genre',
    ),
  ),
  externalId: Joi.string().messages(
    messagesConstructor(
      ValidatorTypes.STRING,
      {
        [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
        [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
      },
      'externalId',
    ),
  ),
});

export default TrackUpdateSchemaValidator;
