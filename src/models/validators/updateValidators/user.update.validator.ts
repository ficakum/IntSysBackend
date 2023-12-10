import Joi from 'joi';

import { User } from '../../user.model';
import {
  ValidatorConstants,
  ValidatorKeys,
  ValidatorMessages,
  ValidatorTypes,
} from '../../../constants/constant';
import { messagesConstructor } from '../messages.validator';

const UserUpdateSchemaValidator: Joi.ObjectSchema<User> = Joi.object<User>({
  userName: Joi.string()
    .min(ValidatorConstants.USER_NAME_MIN)
    .max(ValidatorConstants.USER_NAME_MAX)
    .messages(
      messagesConstructor(
        ValidatorTypes.STRING,
        {
          [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
          [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
          [ValidatorKeys.MIN]: `${ValidatorMessages.MIN} ${ValidatorConstants.USER_NAME_MIN}`,
          [ValidatorKeys.MAX]: `${ValidatorMessages.MAX} ${ValidatorConstants.USER_NAME_MAX}`,
          [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
        },
        'roomName',
      ),
    ),
  groupName: Joi.string()
    .min(ValidatorConstants.USER_NAME_MIN)
    .max(ValidatorConstants.USER_NAME_MAX)
    .messages(
      messagesConstructor(
        ValidatorTypes.STRING,
        {
          [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
          [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
          [ValidatorKeys.MIN]: `${ValidatorMessages.MIN} ${ValidatorConstants.USER_NAME_MIN}`,
          [ValidatorKeys.MAX]: `${ValidatorMessages.MAX} ${ValidatorConstants.USER_NAME_MAX}`,
          [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
        },
        'roomName',
      ),
    ),
  // group: Joi.optional(),
  password: Joi.optional(),
  email: Joi.string()
    .email()
    .messages(
      messagesConstructor(
        ValidatorTypes.STRING,
        {
          [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
          [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
          [ValidatorKeys.EMAIL]: ValidatorMessages.EMAIL,
        },
        'email',
      ),
    ),
});

export default UserUpdateSchemaValidator;
