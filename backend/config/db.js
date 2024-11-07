import mongoose from 'mongoose';
import { ENV_VARS } from './envVars.js'; // Import the envVars file

export const connectDB = async () => {
  try {
    // Use MONGO_URI from ENV_VARS
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log successful connection
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB: ' + error.message);
    process.exit(1); // Exit process with failure code
  }
};
