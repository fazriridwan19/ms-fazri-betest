import Joi from "joi";

const createUserValidation = Joi.object({
  name: Joi.string().required(),
  identityNumber: Joi.string().required(),
  accountNumber: Joi.string().required(),
  emailAddress: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const updateUserValidation = Joi.object({
  identityNumber: Joi.string().required(),
  name: Joi.string().optional(),
  emailAddress: Joi.string().optional(),
  password: Joi.string().required().optional(),
});

const loginUserValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const identityNumberValidation = Joi.string().required();
const accountNumberValidation = Joi.string().required();
const usernameValidation = Joi.string().required();

export {
  createUserValidation,
  updateUserValidation,
  loginUserValidation,
  identityNumberValidation,
  accountNumberValidation,
  usernameValidation,
};
