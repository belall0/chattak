import connectDB from './src/utils/dbConnection.js';
import app from './src/app.js';

const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV;

const runServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} on ${NODE_ENV} mode`);
  });
};

await runServer();
