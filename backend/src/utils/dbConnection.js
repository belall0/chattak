import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DATABASE_URI = process.env.DATABASE_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI, {
      timeoutMS: 1000,
    });
    console.log('Connected to the database successfully');
  } catch (error) {
    console.log('Error connecting to the database:', error.message);
  }
};

export default connectDB;
