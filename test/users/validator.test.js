// *************** IMPORT MODULES ***************
import UserValidator from '../../src/graphql/users/user.validator.js';

const testCases = [
  { input: { userId: '60d5ec4f9e7f9b3d84399a6b' }, validatorName: 'ValidateUserId' },
  { input: { password: 'password123' }, validatorName: 'ValidatePasswordUser' },
  { input: { passwordInput: 'password123', passwordUser: 'password123' }, validatorName: 'ValidateComparePasswordUserInput' },
  {
    input: { firstName: 'john', lastName: 'doe', email: 'john_doe@gmail.com', password: 'password123' },
    validatorName: 'ValidateRegisterInput',
  },
  { input: { email: 'hermawan.hant@gmail.com', password: 'password123' }, validatorName: 'ValidateLoginInput' },
];

// *************** Run test for validator of user
testCases.map(({ input, validatorName }) => {
  UserValidator[validatorName]({ ...input });
});
