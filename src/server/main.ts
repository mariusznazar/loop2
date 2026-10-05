import { createApp } from './app.js';

createApp().listen(3000, '127.0.0.1', error => {
  if (error) {
    console.error(`Failed to start Loop at http://127.0.0.1:3000: ${error.message}`);
    process.exitCode = 1;
    return;
  }

  console.log('Loop: http://127.0.0.1:3000');
});
