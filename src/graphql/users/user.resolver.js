// *************** IMPORT MODULES ***************
import UserModel from './user.model.js';

// *************** IMPORT HELPERS ***************
import UserHelper from './user.helper.js';

// *************** IMPORT VALIDATOR ***************
import UserValidator from './user.validator.js';

// *************** QUERY ***************
/**
 * The function `GetUserById` retrieves a user by their ID if they have an active status.
 * @param _ - The underscore (_) in the function parameters typically represents a placeholder for a
 * parameter that is not being used within the function. In this case, the underscore (_) is used as a
 * placeholder for a parameter that is not being utilized in the `GetUserById` function.
 * @returns The function `GetUserById` is returning the user object that is found by the provided
 * `userId` and has a status of 'active'. If no user is found, it throws an error with the message
 * 'User not found'.
 */
async function GetUserById(_, { userId }) {
  try {
    // *************** Validate user id
    UserValidator.ValidateUserId({ userId });

    // *************** Find user by id and status active
    const user = await UserModel.findOne({ _id: userId, status: 'active' });
    if (!user) throw new Error('User not found');

    return user;
  } catch (error) {
    console.log(error.stack);
    throw new Error(error.message);
  }
}

// *************** MUTATION ***************
/**
 * The function `Register` is an asynchronous function that registers a new user by validating input
 * parameters, checking if the user already exists, hashing the password, and creating a new user
 * account in the database.
 * @param _ - The underscore (_) in the function parameters typically represents a placeholder for a
 * variable that is not going to be used within the function. In this case, it seems like the first
 * parameter of the `Register` function is not being used in the function body. It's a common
 * convention to use an underscore (_)
 * @returns the newly created user data if the registration process is successful.
 */
async function Register(_, { firstName, lastName, email, password }) {
  try {
    // *************** Validate parameters of register
    UserValidator.ValidateRegisterInput({ firstName, lastName, email, password });

    // *************** Check is user exist using email
    const isUserExist = (await UserModel.findOne({ email, status: 'active' }).select('_id').lean()) ? true : false;
    if (isUserExist) throw new Error('Email have used by another account');

    // *************** Hash password using bcrypt
    const hashedPassword = await UserHelper.HashPasswordUser({ password });
    if (!hashedPassword) throw new Error('Error when hashing password of user');

    const newUserData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
      address: [],
      status: 'active',
      role: 'buyer',
      balance: 0,
      phone_number: '',
    };

    // *************** Create user based data that constructed
    const newUser = await UserModel.create(newUserData);
    if (!newUser) throw new Error('Error when creating account for user');

    return newUser;
  } catch (error) {
    console.log(error.stack);
    throw new Error(error.message);
  }
}

/**
 * The function `Login` handles user login by validating input, checking user existence and password,
 * and generating a JWT token.
 * @param _ - The underscore (_) in the function parameters typically represents a placeholder for a
 * variable that is not going to be used within the function body. In this case, it seems like the
 * underscore (_) is used as a placeholder for a variable that is not being utilized in the `Login`
 * function.
 * @returns A JWT token is being returned after a user successfully logs in.
 */
async function Login(_, { email, password }) {
  try {
    // *************** Validate parameters of login
    UserValidator.ValidateLoginInput({ email, password });

    // *************** Check is user exist using email
    const user = await UserModel.findOne({ email, status: 'active' }).select('_id password').lean();
    if (!user) throw new Error('Email or password is invalid');

    // *************** Check is password of user is same
    const isPasswordSame = UserHelper.ComparePasswordUser({ passwordInput: password, passwordUser: user.password });
    if (!isPasswordSame) throw new Error('Email or password is invalid');

    // *************** Generate jwt token
    const token = UserHelper.GenerateTokenJWT({ userId: user._id });
    if (!token) throw new Error('Error when generate token');

    return token;
  } catch (error) {
    console.log(error.stack);
    throw new Error(error.message);
  }
}

// *************** EXPORT MODULES ***************
export default {
  Query: {
    GetUserById,
  },
  Mutation: {
    Register,
    Login,
  },
};
