import { createApp } from './app.js';

const host = '127.0.0.1';
const port = 3000;

const server = createApp().listen(port, host);

server.once('listening', () => {
  console.log(`Loop: http://${host}:${port}`);
});

server.once('error', (error: NodeJS.ErrnoException) => {
  console.error(`Loop could not start on ${host}:${port}: ${error.code ?? ''} ${error.message}`);
  process.exitCode = 1;
});
