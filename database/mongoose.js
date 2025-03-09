// *************** IMPORT CORE ***************
import mongoose from 'mongoose';

/**
 * The function `ConnectToDatabase` connects to a MongoDB database using Mongoose ORM in a Node.js
 * application.
 */
const ConnectToDatabase = async () => {
  try {
    // *************** Connect to mongodb use mongoose orm
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to database');
  } catch (error) {
    console.log(error.stack);
    throw new Error('Unable to connect to database');
  }
};

export default ConnectToDatabase;
