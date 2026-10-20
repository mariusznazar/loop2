import express from "express";
import type { Express, Request, Response } from "express";
import { fileURLToPath } from "node:url";

// The built game, found next to the compiled server (dist/server -> dist/public),
// so the app serves the same files whatever the working directory is.
const publicDirectory = fileURLToPath(new URL("../public/", import.meta.url));

export function createApp(): Express {
  const app = express();

  // No API route exists yet: every /api, /api/ and /api/... request gets a JSON 404,
  // never the game's page.
  app.use("/api", (_request: Request, response: Response) => {
    response.status(404).json({ error: "Not found" });
  });

  app.use(express.static(publicDirectory));

  return app;
}
