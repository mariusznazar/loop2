import { createApp } from "./app.js";
import { openAccountRuntime } from "./configuration.js";

const host = process.env.LOOP2_LISTEN_HOST ?? "127.0.0.1";
const rawPort = process.env.LOOP2_LISTEN_PORT ?? "3000";
const port = /^\d+$/.test(rawPort) ? Number(rawPort) : NaN;

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error(
    `Loop could not start: LOOP2_LISTEN_PORT must be an integer from 1 to 65535, got ${JSON.stringify(rawPort)}`,
  );
  process.exit(1);
}

try {
  const runtime = await openAccountRuntime(process.env);
  try {
    const server = createApp(runtime).listen(port, host);
    server.once("listening", () => {
      console.log(`Loop: http://${host}:${port}`);
    });
    server.once("error", (error: NodeJS.ErrnoException) => {
      runtime?.close();
      console.error(
        `Loop could not start on ${host}:${port}: ${error.code ?? ""}`,
      );
      process.exitCode = 1;
    });
    server.once("close", () => runtime?.close());
    const stop = () => {
      const deadline = setTimeout(() => server.closeAllConnections(), 5000);
      deadline.unref();
      server.close(() => {
        clearTimeout(deadline);
        runtime?.close();
      });
    };
    process.once("SIGTERM", stop);
    process.once("SIGINT", stop);
  } catch (error) {
    runtime?.close();
    throw error;
  }
} catch (error) {
  console.error(
    `Loop could not start: ${error instanceof Error ? error.message : "Account startup failed"}`,
  );
  process.exitCode = 1;
}
