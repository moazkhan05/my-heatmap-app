import express, { Application, request, response } from 'express';
import dotenv from 'dotenv';
import apiRoutes from './src/routes';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cors());
console.log('Starting the application...');

const mongoURI = process.env.MONGO_URI || '';
const maxRetries = 3;
let currentRetries = 0;

const connectWithRetry = () => {
  console.log(`MongoDB connection attempt ${currentRetries + 1} of ${maxRetries}`);
  mongoose.connect(mongoURI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.log(`Mongoose connection error: ${err}`);
      currentRetries += 1;
      if (currentRetries < maxRetries) {
        console.log(`Retrying MongoDB connection in 5 seconds...`);
        setTimeout(connectWithRetry, 5000);
      } else {
        console.log('Could not connect to MongoDB after multiple attempts. Exiting...');
        process.exit(1);
      }
    });
};

// Start the initial MongoDB connection attempt
connectWithRetry();

// Routes
app.use('/healthcheck', ()=> response.send('good'));
app.use('/api', apiRoutes);

export default app;
