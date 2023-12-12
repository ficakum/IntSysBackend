import Joi from 'joi';

import { Group } from '../../../models/group.model';
import {
  ValidatorConstants,
  ValidatorKeys,
  ValidatorMessages,
  ValidatorTypes,
} from '../../../constants/constant';
import { messagesConstructor } from '../messages.validator';

const GroupCreateSchemaValidator: Joi.ObjectSchema<Group> = Joi.object<Group>({
  groupName: Joi.string()
    .min(ValidatorConstants.GROUP_NAME_MIN)
    .max(ValidatorConstants.GROUP_NAME_MAX)
    .required()
    .messages(
      messagesConstructor(
        ValidatorTypes.STRING,
        {
          [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
          [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
          [ValidatorKeys.MIN]: `${ValidatorMessages.MIN} ${ValidatorConstants.GROUP_NAME_MIN}`,
          [ValidatorKeys.MAX]: `${ValidatorMessages.MAX} ${ValidatorConstants.GROUP_NAME_MAX}`,
          [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
        },
        'groupName',
      ),
    ),
  currentTrack: Joi.optional(),
  maxMembers: Joi.number()
    .greater(ValidatorConstants.GROUP_GREATER)
    .max(ValidatorConstants.GROUP_MAX_MEMBERS)
    .integer()
    .messages(
      messagesConstructor(
        ValidatorTypes.NUMBER,
        {
          [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.NUMBER}`,
          [ValidatorKeys.GREATER]: `${ValidatorMessages.GREATER} ${ValidatorConstants.GROUP_GREATER}`,
          [ValidatorKeys.MAX]: `${ValidatorMessages.MAX} ${ValidatorConstants.GROUP_MAX_MEMBERS}`,
          [ValidatorKeys.INTEGER]: ValidatorMessages.INTEGER,
        },
        'maxMembers',
      ),
    ),
  membersNum: Joi.number()
    .greater(ValidatorConstants.GROUP_GREATER)
    .integer()
    .messages(
      messagesConstructor(
        ValidatorTypes.NUMBER,
        {
          [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.NUMBER}`,
          [ValidatorKeys.GREATER]: `${ValidatorMessages.GREATER} ${ValidatorConstants.GROUP_GREATER}`,
          [ValidatorKeys.INTEGER]: ValidatorMessages.INTEGER,
        },
        'membersNum',
      ),
    ),
});

export default GroupCreateSchemaValidator;
