// *************** IMPORT LIBRARY ***************
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

// *************** IMPORT TYPEDEFS ***************
import userTypedef from './users/user.typedef.js';

// *************** IMPORT RESOLVERS ***************
import userResolver from './users/user.resolver.js';

const typeDefs = mergeTypeDefs([userTypedef]);
const resolvers = mergeResolvers([userResolver]);

// *************** EXPORT MODULES ***************
export { typeDefs, resolvers };
