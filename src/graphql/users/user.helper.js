// *************** IMPORT LIBRARY ***************
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserValidator from './user.validator';

/**
 * The function `HashPasswordUser` hashes a user's password using bcrypt with error handling.
 * @returns The function `HashPasswordUser` returns the hashed password of the user generated using
 * bcrypt.
 */
async function HashPasswordUser({ password }) {
  try {
    // *************** Validate parameters
    UserValidator.ValidatePasswordUser({ password });
    
    // *************** Hash password of user using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
  } catch (error) {
    console.log(error.stack);
    throw new Error(error.message);
  }
}

/**
 * The function `ComparePassword` uses bcrypt to compare a user input password with a stored hashed
 * password.
 * @returns The function `ComparePassword` is returning the result of comparing the `passwordInput`
 * with the `passwordUser` using bcrypt's `compareSync` method. It will return `true` if the passwords
 * match, and `false` if they do not match.
 */
function ComparePasswordUser({ passwordInput, passwordUser }) {
  // *************** Validate parameters
  UserValidator.ValidateComparePasswordUserInput({ passwordInput, passwordUser });

  // *************** Check if password is same between password input and password user
  const isPasswordSame = bcrypt.compareSync(passwordInput, passwordUser);
  return isPasswordSame;
}

/**
 * The function GenerateTokenJWT generates a JSON Web Token (JWT) with a specified expiration time.
 * @returns A JSON Web Token (JWT) is being returned by the function GenerateTokenJWT. The JWT is
 * signed with the userId payload, using the SECRET_KEY stored in the environment variables, and has an
 * expiration time of 1 day (24 hours).
 */
function GenerateTokenJWT({ userId }) {
  // *************** Validate parameters
  UserValidator.ValidateUserId(userId);

  // *************** Generate token jwt
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1d' });
  return token;
}

const UserHelper = {
  HashPasswordUser,
  ComparePasswordUser,
  GenerateTokenJWT,
};

// *************** EXPORT MODULES ***************
export default UserHelper;
