# Coding guidelines — http-application

- **Discipline:** coding
- **Applies to:** account-server

## When to read

Przed dodaniem lub zmianą pliku składającego aplikację HTTP w `src/server/`.
Czytaj również ogólne wytyczne kodowania.

## Files of this kind

| File | Status | Decision |
|---|---|---|
| `src/server/app.ts` | exemplar | D-37@c04bd997 |

## Rules

### HTTP przez Express

- **Decision:** D-02@06e6d3d8
- **Invariant:** account-server-express-http@6b29f5b5
- **Good:** Handler HTTP jest rejestrowany w Express 5.
- **Bad:** Własny handler jest przekazywany bezpośrednio serwerowi Node.js.

Obsługuj trasy i odpowiedzi przez Express 5.

```good account-server-express-http src/server/guideline-route.ts
import express from "express";
export const router = express.Router();
router.get("/health", (_request, response) => {
  response.json({ ok: true });
});
```

```bad account-server-express-http src/server/guideline-route.ts
import { createServer } from "node:http";
export const server = createServer((_request, response) => {
  response.end("ok");
});
```

### Nieznana trasa API

- **Decision:** D-05@db83484a
- **Invariant:** loop2-api-error-route@a6ff5b60
- **Good:** Niepasujące żądanie API otrzymuje błąd JSON.
- **Bad:** Niepasujące żądanie API otrzymuje stronę HTML.

Oddziel obsługę nieznanych tras API od plików gry. Zwracaj odpowiedź błędu API,
a nie HTML gry. Poniższe przypadki zastępują cały moduł aplikacji.

```good loop2-api-error-route src/server/app.ts
import express from "express";
import { fileURLToPath } from "node:url";
export function createApp() {
  const app = express();
  app.use("/api", (_request, response) => {
    response.status(404).json({ error: "Not found" });
  });
  app.use(express.static(fileURLToPath(new URL("../public/", import.meta.url))));
  return app;
}
```

```bad loop2-api-error-route src/server/app.ts
import express from "express";
import { fileURLToPath } from "node:url";
export function createApp() {
  const app = express();
  app.use("/api", (_request, response) => {
    response.status(404).send("<!doctype html><title>Game</title>");
  });
  app.use(express.static(fileURLToPath(new URL("../public/", import.meta.url))));
  return app;
}
```

## Examples

### Tworzenie aplikacji bez otwierania portu

`src/server/app.ts` eksportuje `createApp`, a `src/server/main.ts` uruchamia
nasłuchiwanie. Test może utworzyć aplikację bez uruchamiania procesu serwera.
To przykład ułatwiający testowanie; nie wprowadza dodatkowej kontroli struktury
fabryki ani architektury przyszłych kont, sesji czy zapisu gry.

## Where in code

- `src/server/`
- `src/server/app.ts`
- `src/server/main.ts`
