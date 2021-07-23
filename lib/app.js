import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
const app = express();
import rapperController from './controllers/rappers.js';
import vocalistController from './controllers/vocalists.js';

app.use(express.json());

app.use('/api/v1/rappers', rapperController);
app.use('/api/v1/vocalists', vocalistController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
