// *************** IMPORT LIBRARY ***************
import mongoose from 'mongoose';
import Joi from 'joi';

const objectId = mongoose.isValidObjectId;
const passwordPattern = new RegExp('^[a-zA-Z0-9]{3,30}$');

/**
 * The function ValidateUserId checks if the user id is a valid object id and throws an error if
 * it is not.
 */
function ValidateUserId({ userId }) {
  // *************** Validate user id
  if (!objectId(userId)) throw new Error('User ID is not valid');
}

/**
 * The function `ValidatePasswordUser` uses Joi to validate a user's password based on a specified
 * pattern.
 */
function ValidatePasswordUser({ password }) {
  const schema = Joi.object().keys({
    password: Joi.string().trim().pattern(passwordPattern).required(),
  });

  const { error } = schema.validate({ password });
  if (error && error.message) throw new Error(error.message);
}

/**
 * The function `ValidateComparePasswordUserInput` validates password input and password user using a
 * Joi schema.
 */
function ValidateComparePasswordUserInput({ passwordInput, passwordUser }) {
  const schema = Joi.object().keys({
    // *************** Validate password input
    passwordInput: Joi.string().trim().pattern(passwordPattern).required(),

    // *************** Validate password user
    passwordUser: Joi.string().trim().required(),
  });

  const { error } = schema.validate({ passwordInput, passwordUser });
  if (error && error.message) throw new Error(error.message);
}

/**
 * The function `ValidateLoginInput` uses Joi schema to validate email and password inputs for a login
 * form in JavaScript.
 */
function ValidateLoginInput({ email, password }) {
  const schema = Joi.object().keys({
    // *************** Validate email of user
    email: Joi.string().trim().lowercase().email().required(),

    // *************** Validate password of user
    password: Joi.string().trim().required(),
  });

  const { error } = schema.validate({ email, password });
  if (error && error.message) throw new Error(error.message);
}

/**
 * The function `ValidateRegisterInput` uses Joi validation to ensure that the provided user
 * registration input for first name, last name, email, and password meets specified criteria.
 */
function ValidateRegisterInput({ firstName, lastName, email, password }) {
  const schema = Joi.object().keys({
    // *************** Validate first name of user
    firstName: Joi.string().trim().required(),

    // *************** Validate last name of user
    lastName: Joi.string().trim().allow('').required(),

    // *************** Validate email of user
    email: Joi.string().trim().lowercase().email(),

    // *************** Validate password of user
    password: Joi.string().trim().pattern(passwordPattern).required(),
  });

  const { error } = schema.validate({ firstName, lastName, email, password });
  if (error && error.message) throw new Error(error.message);
}

const UserValidator = { ValidateUserId, ValidateRegisterInput, ValidateLoginInput, ValidatePasswordUser, ValidateComparePasswordUserInput };

// *************** EXPORT MODULES ***************
export default UserValidator;
