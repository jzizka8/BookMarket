import express from 'express';
import { config as configEnvVariables } from 'dotenv';
import cors from 'cors';
import { env } from 'process';
import type { ApiResponse } from './controllers/types';
import userRouter from './routes/user';
import categoryRouter from './routes/category';
import bookRouter from './routes/book';
import invoiceRouter from './routes/invoice';

configEnvVariables();
const app = express();
const port = env['PORT'] ?? 3000;

// CORS middlware
app.use(cors());

// JSON middleware
app.use(express.json());

// parse URL encoded strings
app.use(express.urlencoded({ extended: true }));

app.use(bookRouter);
app.use(categoryRouter);
app.use(invoiceRouter);
app.use(userRouter);

// No route was taken - 404 - Resource (API endpoint) not found.
app.use((_req, res) => {
  const response: ApiResponse<{}> = {
    status: 'failure',
    data: {},
    error: 'No matching endpoint was found.',
  };

  return res.status(404).send(response);
});

if (env['NODE_ENV'] !== 'test') {
  app.listen(port, () => {
    console.log(
      `[${new Date().toISOString()}] RESTful API is listening on port ${port}`,
    );
  });
}

export default app;