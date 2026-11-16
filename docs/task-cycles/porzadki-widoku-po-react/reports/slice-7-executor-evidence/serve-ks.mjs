// Working copy of slice 7: a static server over dist/kitchen-sink/ on port 8765.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".png": "image/png" };
const root = join(process.cwd(), "dist", "kitchen-sink");
createServer(async (request, response) => {
  const path = new URL(request.url, "http://x").pathname;
  try {
    const body = await readFile(join(root, path === "/" ? "index.html" : path));
    response.writeHead(200, { "Content-Type": types[extname(path === "/" ? "x.html" : path)] ?? "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404);
    response.end("not found");
  }
}).listen(8765, "127.0.0.1");
