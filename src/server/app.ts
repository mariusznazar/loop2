import express, { type Express } from 'express';
import { fileURLToPath } from 'node:url';

export function createApp(): Express {
  const app = express();
  app.use('/api', (_request, response) => {
    response.status(404).json({ error: 'Not found' });
  });
  const publicDirectory = fileURLToPath(new URL('../public/', import.meta.url));
  app.use(express.static(publicDirectory));
  app.use((_request, response) => {
    response.status(404).type('text/plain').send('Not found');
  });
  return app;
}
