import { createApp } from "./app.js";

const host = process.env.LOOP2_LISTEN_HOST ?? "127.0.0.1";
const rawPort = process.env.LOOP2_LISTEN_PORT ?? "3000";
const port = /^\d+$/.test(rawPort) ? Number(rawPort) : NaN;

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error(
    `Loop could not start: LOOP2_LISTEN_PORT must be an integer from 1 to 65535, got ${JSON.stringify(rawPort)}`,
  );
  process.exit(1);
}

const server = createApp().listen(port, host);

server.once("listening", () => {
  console.log(`Loop: http://${host}:${port}`);
});

server.once("error", (error: NodeJS.ErrnoException) => {
  console.error(
    `Loop could not start on ${host}:${port}: ${error.code ?? ""} ${error.message}`,
  );
  process.exitCode = 1;
});
