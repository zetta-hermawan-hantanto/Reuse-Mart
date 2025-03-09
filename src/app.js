// *************** IMPORT LIBRARY ***************
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

// *************** IMPORT MODULES ***************
import { typeDefs, resolvers } from './graphql/index.js';

// *************** IMPORT DATABASE ***************
import ConnectToDatabase from '../database/mongoose.js';

// *************** IMPORT ROUTES ***************
import UserRouter from './routes/user.route.js';

dotenv.config();

ConnectToDatabase();

const app = express();

app.use('/user', UserRouter);

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(expressMiddleware(server));

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);
