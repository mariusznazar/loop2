import { createApp } from './app.js';

createApp().listen(3000, '127.0.0.1', () => {
  console.log('Loop: http://127.0.0.1:3000');
});
