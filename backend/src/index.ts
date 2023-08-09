import express from 'express';
import { config as configEnvVariables } from 'dotenv';
import cors from 'cors';
import { env } from 'process';
import cookieParser from 'cookie-parser';
import type { ApiResponse } from './controllers/types';
import bookRouter from './routes/book';
import orderRouter from './routes/order';
import session from './middleware/sessionMiddleware';
import authRouter from './routes/auth';

declare module 'express-session' {
  interface SessionData {
    user: { username: string };
  }
}

configEnvVariables();
const app = express();
const port = env['PORT'] ?? 3000;

// CORS middleware
app.use(
  cors({
    origin: 'http://192.168.0.13:5173',
    credentials: true,
  })
);

// JSON middleware
app.use(express.json());

app.use(cookieParser());
app.use(session());

// parse URL encoded strings
app.use(express.urlencoded({ extended: true }));

app.use(bookRouter);
app.use(orderRouter);
app.use('/auth', authRouter);

// No route was taken - 404 - Resource (API endpoint) not found.
app.use((_req, res) => {
  const response: ApiResponse<object> = {
    status: 'failure',
    data: {},
    error: 'No matching endpoint was found.',
  };

  return res.status(404).send(response);
});

/* eslint-disable no-console */
if (env['NODE_ENV'] !== 'test') {
  app.listen(port, () => {
    console.log(
      `[${new Date().toISOString()}] RESTful API is listening on port ${port}`
    );
  });
}

export default app;
