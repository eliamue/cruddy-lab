import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import rapperController from './controllers/rappers.js';
import vocalistController from './controllers/vocalists.js';
import dancerController from './controllers/dancers.js';
import visualController from './controllers/visuals.js';
import leaderController from './controllers/leaders.js';
import maknaeController from './controllers/maknaes.js';

const app = express();

app.use(express.json());

app.use('/api/v1/rappers', rapperController);
app.use('/api/v1/vocalists', vocalistController);
app.use('/api/v1/dancers', dancerController);
app.use('/api/v1/visuals', visualController);
app.use('/api/v1/leaders', leaderController);
app.use('/api/v1/maknaes', maknaeController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
