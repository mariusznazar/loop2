import { createApp } from "./app.js";
import { openAccountRuntime, StartupFailure } from "./configuration.js";
import {
  installLastResort,
  ReasonedFailure,
  writeFailure,
} from "./log-line.js";

installLastResort("main");

const host = process.env.LOOP2_LISTEN_HOST ?? "127.0.0.1";
const rawPort = process.env.LOOP2_LISTEN_PORT ?? "3000";
const port = /^\d+$/.test(rawPort) ? Number(rawPort) : NaN;

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  writeFailure(
    "Loop could not start: LOOP2_LISTEN_PORT must be an integer from 1 to 65535",
    "main.start",
    new ReasonedFailure("INVALID_LISTEN_PORT"),
    { listen: rawPort },
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
      writeFailure("server-listen", "main.listen", error, {
        listen: `${host}:${port}`,
      });
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
  // Only a sentence of the code's own stands in the line: any other error's
  // message may quote a value.
  if (error instanceof StartupFailure)
    writeFailure(error.message, "main.start", error.cause ?? error);
  else writeFailure("server-start", "main.start", error);
  process.exitCode = 1;
}
