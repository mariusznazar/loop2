import express from "express";
import type { Express, ErrorRequestHandler } from "express";
import { fileURLToPath } from "node:url";
import session from "express-session";
import type { AccountRuntime } from "./configuration.js";
import { clientAddress, mutationGuards, trustProxy } from "./transport.js";

// The built game, found next to the compiled server (dist/server -> dist/public),
// so the app serves the same files whatever the working directory is.
const publicDirectory = fileURLToPath(new URL("../public/", import.meta.url));

export function createApp(runtime: AccountRuntime | null = null): Express {
  const app = express();

  if (runtime) {
    app.set("trust proxy", trustProxy(runtime.configuration.proxyMode));
    const sessions = session({
      name: "__Host-loop2.sid",
      secret: runtime.configuration.secrets,
      store: runtime.store,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "strict",
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
      sessions(request, response, next);
    });
  }

  const accountPaths = [
    "/api/account",
    "/api/register",
    "/api/login",
    "/api/logout",
  ];
  app.all(accountPaths, (request, response, next) => {
    response.setHeader("Cache-Control", "no-store");
    if (!runtime) {
      response.status(503).json({ error: "Accounts unavailable" });
      return;
    }
    if (!response.locals.accountClientAddress) {
      response.status(403).json({ error: "Invalid request transport" });
      return;
    }
    next();
  });
  if (runtime)
    app.post(
      accountPaths,
      ...mutationGuards(runtime.configuration.publicOrigin),
    );
  app.all(accountPaths, (_request, response) => {
    response.status(503).json({ error: "Accounts unavailable" });
  });

  app.use("/api", (_request, response) => {
    response.status(404).json({ error: "Not found" });
  });

  app.use(express.static(publicDirectory));

  const errors: ErrorRequestHandler = (
    error: unknown,
    _request,
    response,
    next,
  ) => {
    if (response.headersSent) {
      next(error);
      return;
    }
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
    response.setHeader("Cache-Control", "no-store");
    response
      .status(status)
      .json({
        error:
          status === 500 ? "Account service failed" : "Invalid request body",
      });
  };
  app.use(errors);

  return app;
}
