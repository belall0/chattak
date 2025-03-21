import express from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';

import HttpError from './utils/httpError.js';
import globalMiddlewareHandler from './middlewares/errorMiddleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// 404 handler to catch all unknown routes
app.all('*', (req, res, next) => {
  next(new HttpError(`The endpoint you requested (${req.originalUrl}) could not be found.`, 404));
});

// Global error handler to catch all errors during the request-response cycle
app.use(globalMiddlewareHandler);
export default app;
