import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import routes from './routes/index.routes';
import Logger from './customs/Logger.classes';
import WebError from './customs/WebError.classes';

const logger = new Logger();
const app = express();

app.use(cors());
app.use(express.json());

app.use((request: Request, _response: Response, next: NextFunction) => {
  logger.start(request.method, request.url);
  return next();
});

app.use(routes);

app.use((_request: Request, response: Response, next: NextFunction) => {
  const { httpStatusCode } = response.locals;

  logger.end(httpStatusCode);
  return next();
});

app.use((_request: Request, response: Response, next: NextFunction) => {
  const { error, responseBody, httpStatusCode } = response.locals;

  if (error) {
    return next(error);
  }

  return response.status(httpStatusCode).json(responseBody);
});

app.use((error: WebError, _request: Request, response: Response, next: NextFunction) => {
  if (!error.message) {
    return next();
  }

  response.status(error.status || 404);
  return response.json({ error: error.message || 'Not Found' });
});

export default app;
