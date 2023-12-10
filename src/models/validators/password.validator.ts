import Joi from 'joi';

const PasswordValidator: Joi.StringSchema<string> = Joi.string().regex(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

export default PasswordValidator;
