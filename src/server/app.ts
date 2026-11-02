import express from "express";
import type { Express, ErrorRequestHandler, Request } from "express";
import { fileURLToPath } from "node:url";
import session from "express-session";
import type { AccountPolicy } from "./account-policy.js";
import {
  accountRoutes,
  sessionCookieName,
  sessionCookieScope,
} from "./account-routes.js";
import type { AccountRuntime } from "./configuration.js";
import { writeFailure } from "./log-line.js";
import type { LineFields } from "./log-line.js";
import { clientAddress, trustProxy } from "./transport.js";

// The built game, found next to the compiled server (dist/server -> dist/public),
// so the app serves the same files whatever the working directory is.
const publicDirectory = fileURLToPath(new URL("../public/", import.meta.url));

// Only the stored session names the account, and a request with none names none.
function sessionFields(request: Request): LineFields {
  const accountId: unknown = request.session?.accountId;
  return typeof accountId === "string" ? { accountId } : {};
}

export function createApp(
  runtime: AccountRuntime | null = null,
  policy?: AccountPolicy,
): Express {
  const app = express();

  if (runtime) {
    app.set("trust proxy", trustProxy(runtime.configuration.proxyMode));
    const sessions = session({
      name: sessionCookieName,
      secret: runtime.configuration.secrets,
      store: runtime.store,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        ...sessionCookieScope,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      },
    });
    app.use((request, response, next) => {
      const address = clientAddress(request, runtime.configuration.proxyMode);
      response.locals.accountClientAddress = address;
      // Internal health probes and public files work without proxy metadata.
      // Such requests must not load, authorize or renew an account session.
      if (!address) {
        next();
        return;
      }
      response.setHeader("Cache-Control", "no-store");
      // The library reports a store that failed as the response ends, through
      // this `next`, wherever the request has got to. Past the last layer the
      // error would reach Express's own handler, which prints its stack and
      // message, so it stops here. An answer already ended stays whole.
      sessions(request, response, (error?: unknown) => {
        if (error && response.headersSent) {
          writeFailure(
            "session",
            "app.sessions",
            error,
            sessionFields(request),
          );
          if (!response.writableEnded) response.destroy();
          return;
        }
        next(error);
      });
    });
  }

  app.use(accountRoutes(runtime, policy));

  app.use("/api", (_request, response) => {
    response.status(404).json({ error: "Not found" });
  });

  app.use(express.static(publicDirectory));

  const errors: ErrorRequestHandler = (
    error: unknown,
    request,
    response,
    next,
  ) => {
    let status = 500;
    if (error && typeof error === "object" && "type" in error) {
      if (error.type === "entity.too.large") status = 413;
      else if (
        error.type === "encoding.unsupported" ||
        error.type === "charset.unsupported"
      )
        status = 415;
      else if (
        error.type === "entity.parse.failed" ||
        error.type === "entity.verify.failed"
      )
        status = 400;
    }
    // A refused body is an expected refusal.
    if (status === 500)
      writeFailure("request", "app.errors", error, sessionFields(request));
    // A route's error after its answer began. Handed on with its error, Express
    // would print the stack and message the line above leaves out.
    if (response.headersSent) {
      response.destroy();
      next();
      return;
    }
    response.setHeader("Cache-Control", "no-store");
    response.status(status).json({
      error: status === 500 ? "Account service failed" : "Invalid request body",
    });
  };
  app.use(errors);

  return app;
}
