# App skeleton Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dostarczyć pustą aplikację DOM w TypeScripcie, podawaną przez Express, z powtarzalną instalacją, kompilacją i kontrolą typów.

**Architecture:** Jeden pakiet npm i dwie konfiguracje TypeScript budują moduły przeglądarki oraz serwera. Express oddziela nieznane API od plików publicznych, a skrypt Node koordynuje kompilację bez bundlera.

**Tech Stack:** Node.js 24, Express 5.2.1, TypeScript 6.0.3, @types/express 5.0.6, @types/node 24.19.0; node:test i node:http bez dodatkowej biblioteki testowej.

**Spec:** [Reviewed design](../specs/2026-10-05-app-skeleton-design.md); [frozen task](../../task-cycles/app-skeleton/task.md). Przeczytaj oba przed wykonaniem. Plan zatwierdza prowizorycznie orkiestrator w ramach delegacji; nie jest to zatwierdzenie fundamentu przez człowieka.

## Global Constraints

- „Wiążące ograniczenia źródła to TypeScript i DOM bez biblioteki widoku, Express 5 na Node.js 24 oraz rozdzielenie błędów API od strony HTML.”
- „Nie powstają konta, baza, mechanika gry ani wdrożenie.”
- „Pusta strona nie zawiera demonstracyjnych przycisków, liczników ani ekranu powitalnego.”
- „Repozytorium ma jeden pakiet npm i wspólny plik blokady zależności.”
- „Wyniki trafiają do ignorowanego `dist/public` i `dist/server`.”
- „Dla `/api`, `/api/` oraz każdej ścieżki pod `/api/` serwer zwraca status 404 i JSON `{"error":"Not found"}`.”
- „Dotyczy wszystkich metod, również gdy klient deklaruje przyjmowanie HTML.”
- „Dla HEAD obowiązuje semantyka HTTP: ten sam status i typ odpowiedzi, bez treści.”
- „Nie ma przekierowania dowolnej ścieżki na stronę główną.”
- „Domyślny serwer lokalny nasłuchuje na interfejsie loopback; instrukcja podaje jego adres i sposób zakończenia procesu.”
- „Automatyczne przeładowanie nie jest wymagane.”
- „Istniejące pliki fundamentu nie zawierają wpisów. W tej implementacji pozostają niezmienione”. Nie dodawaj komentarzy powołujących nieistniejące niezmienniki.
- Kod, komentarze i commit po angielsku; instrukcja dla wykonawcy po polsku. Zachowaj istniejące końcówki linii przy zmianie `.gitignore`. Testy i komendy muszą działać w Windows PowerShell oraz na systemach POSIX.

## Review Focus

Pięć przypadków wymagających jawnego sprawdzenia poza podstawową ścieżką GET; wszystkie dostają test w kroku 1:

- HEAD pod API zachowuje JSON Content-Type i 404, ale nie wysyła treści.
- Klient żądający HTML lub używający innej metody nadal dostaje błąd API.
- `/apix` i brakujący zasób dostają zwykłe 404 bez zwrotu strony głównej.
- Surowe i zakodowane przejście do katalogu nadrzędnego nie ujawnia pliku repozytorium.
- Uruchomienie aplikacji z innego katalogu nadal podaje właściwy HTML i moduł JS.
- Zajęty port 3000 kończy proces błędem bez komunikatu gotowości; test zamyka tylko własny serwer blokujący.

---

## Podział plików i jednostki wdrożenia

Jedna jednostka: serwer i strona z działającym zestawem komend. Sama konfiguracja albo sam serwer bez publicznego wyniku nie daje niezależnego produktu do oceny.

| Plik | Odpowiedzialność |
|---|---|
| `package.json`, `package-lock.json` | Jeden pakiet, dokładne zależności, blokada instalacji i komendy |
| `tsconfig.browser.json`, `tsconfig.server.json` | Osobne środowiska DOM i Node oraz katalogi wynikowe |
| `scripts/build.mjs` | Uruchomienie obu kompilacji lub kontroli bez emisji, skopiowanie HTML |
| `src/browser/index.html`, `src/browser/main.ts` | Dokument wejściowy i utworzenie pustego `main` |
| `src/server/app.ts` | Aplikacja HTTP bez otwierania portu |
| `src/server/main.ts` | Nasłuch loopback na porcie 3000 |
| `tests/http.test.mjs` | Rzeczywiste żądania HTTP, granica API i plików |
| `tests/startup.test.mjs` | Zachowanie procesu przy zajętym porcie; test uruchamia podproces i sprząta własny serwer blokujący |
| `.gitignore` | Ignorowanie wyników, zależności i istniejącego zapisu cyklu |
| `README.md` | Uruchomienie świeżej kopii i sprawdzenie wyniku |

### Task 1: Uruchamialny szkielet i jego granice HTTP

**Files:** Create wszystkie powyższe poza `.gitignore`; Modify `.gitignore`; Test `tests/http.test.mjs`, `tests/startup.test.mjs`.

**Interfaces:**
- Consumes: brak wcześniejszego kodu aplikacji; Node 24 i npm.
- Produces: `createApp(): Express` w `src/server/app.ts`, bez efektu otwarcia portu; `dist/server/main.js` jako wejście procesu; `dist/public/index.html` i `dist/public/main.js`; komendy opisane poniżej.

- [ ] **Step 1: Napisz testy HTTP przed implementacją.** Utwórz `tests/http.test.mjs`:

```js
import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { request } from 'node:http';
import { once } from 'node:events';
import { mkdtemp, readFile, rmdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createApp } from '../dist/server/app.js';

let server;
let port;
let temporaryDirectory;
const originalDirectory = process.cwd();
const expectedHtml = await readFile(new URL('../dist/public/index.html', import.meta.url), 'utf8');
const expectedScript = await readFile(new URL('../dist/public/main.js', import.meta.url), 'utf8');

before(async () => {
  temporaryDirectory = await mkdtemp(join(tmpdir(), 'loop2-http-'));
  // Construct the app away from the repository to exercise its static root.
  process.chdir(temporaryDirectory);
  try {
    server = createApp().listen(0, '127.0.0.1');
    await once(server, 'listening');
    port = server.address().port;
  } finally {
    process.chdir(originalDirectory);
  }
});

after(async () => {
  if (server?.listening) {
    await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
  if (temporaryDirectory) await rmdir(temporaryDirectory);
});

function send(path, method = 'GET', headers = {}) {
  return new Promise((resolve, reject) => {
    // The path option preserves dot segments; do not replace with a URL or fetch.
    const outgoing = request({ hostname: '127.0.0.1', port, path, method, headers, agent: false }, incoming => {
      let body = '';
      incoming.setEncoding('utf8');
      incoming.on('data', chunk => { body += chunk; });
      incoming.on('end', () => resolve({ status: incoming.statusCode, headers: incoming.headers, body }));
      incoming.on('error', reject);
    });
    outgoing.on('error', reject);
    outgoing.setTimeout(5000, () => outgoing.destroy(new Error('HTTP test timeout')));
    outgoing.end();
  });
}

test('serves the built HTML and JavaScript from another working directory', async () => {
  const html = await send('/');
  assert.equal(html.status, 200);
  assert.match(html.headers['content-type'], /^text\/html/);
  assert.equal(html.body, expectedHtml);
  assert.match(html.body, /<script type="module" src="\/main\.js"><\/script>/);
  const script = await send('/main.js');
  assert.equal(script.status, 200);
  assert.match(script.headers['content-type'], /(?:text|application)\/javascript/);
  assert.equal(script.body, expectedScript);
});

test('API keeps its JSON error across paths, methods, queries and HTML negotiation', async () => {
  for (const path of ['/api', '/api/', '/api/missing/nested', '/api/missing?view=html']) {
    for (const method of ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD']) {
      const response = await send(path, method, { Accept: 'text/html' });
      assert.equal(response.status, 404, `${method} ${path}`);
      assert.match(response.headers['content-type'], /^application\/json/);
      if (method === 'HEAD') assert.equal(response.body, '');
      else assert.deepEqual(JSON.parse(response.body), { error: 'Not found' });
    }
  }
});

test('ordinary missing routes and files do not become the home page or API', async () => {
  for (const path of ['/apix', '/missing.js', '/unknown/page']) {
    const response = await send(path);
    assert.equal(response.status, 404, path);
    assert.doesNotMatch(response.headers['content-type'], /application\/json/);
    assert.notEqual(response.body, expectedHtml);
  }
});

test('raw and encoded traversal cannot expose files outside dist/public', async () => {
  for (const path of [
    '/package.json', '/tsconfig.server.json', '/src/server/app.ts', '/.git/config',
    '/../package.json', '/../../package.json',
    '/%2e%2e/%2e%2e/package.json', '/..%2f..%2fpackage.json',
    '/..%5c..%5cpackage.json', '/%252e%252e/%252e%252e/package.json',
    '/%E0%A4%A',
  ]) {
    const response = await send(path);
    assert.ok([400, 403, 404].includes(response.status), `${path}: ${response.status}`);
    assert.doesNotMatch(response.body, /"dependencies"|"compilerOptions"|export function createApp|\[core\]/);
    assert.notEqual(response.body, expectedHtml);
  }
});
```

- [ ] **Step 2: Sprawdź gotowość uruchomienia testów.** Uruchom `node --test tests/http.test.mjs`. Oczekiwany niezerowy kod: brak `dist/server/app.js`. To wyłącznie brak przygotowania środowiska, nie dowód czerwonego testu TDD. Właściwy dowód niezaliczonych asercji HTTP powstaje w kroku 4b.

- [ ] **Step 3: Dodaj pakiet i konfiguracje.** `package.json`:

```json
{
  "name": "loop2",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "engines": { "node": "24.x" },
  "scripts": {
    "typecheck": "node scripts/build.mjs --check",
    "build": "node scripts/build.mjs",
    "start": "node dist/server/main.js",
    "dev": "npm run build && npm start",
    "test": "npm run build && node --test tests/http.test.mjs tests/startup.test.mjs"
  },
  "dependencies": { "express": "5.2.1" },
  "devDependencies": {
    "@types/express": "5.0.6",
    "@types/node": "24.19.0",
    "typescript": "6.0.3"
  }
}
```

`tsconfig.browser.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022", "DOM"],
    "types": [],
    "strict": true,
    "noEmitOnError": true,
    "rootDir": "src/browser",
    "outDir": "dist/public"
  },
  "include": ["src/browser/**/*.ts"]
}
```

`tsconfig.server.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    "types": ["node"],
    "strict": true,
    "noEmitOnError": true,
    "rootDir": "src/server",
    "outDir": "dist/server"
  },
  "include": ["src/server/**/*.ts"]
}
```

Dopisz `node_modules/` i `dist/` do `.gitignore`, zachowując `.runs/`. Uruchom `npm install` raz dla wygenerowania `package-lock.json`, potem `npm ci` dla sprawdzenia odtwarzalności. Nie dodawaj bundlera, watchera, bibliotek widoku ani przeglądarkowych bibliotek testowych.

- [ ] **Step 4: Dodaj skrypt kompilacji.** `scripts/build.mjs`:

```js
import { spawnSync } from 'node:child_process';
import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const compiler = fileURLToPath(new URL('node_modules/typescript/bin/tsc', root));
const checkOnly = process.argv.includes('--check');

for (const config of ['tsconfig.browser.json', 'tsconfig.server.json']) {
  const result = spawnSync(process.execPath, [compiler, '-p', config, ...(checkOnly ? ['--noEmit'] : [])], {
    cwd: fileURLToPath(root),
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (!checkOnly) {
  await mkdir(new URL('dist/public/', root), { recursive: true });
  await copyFile(new URL('src/browser/index.html', root), new URL('dist/public/index.html', root));
}
```

Nie używaj `shell: true`, `tsc.cmd` ani ręcznej sklejki poleceń. Wyniki nie są automatycznie czyszczone; w tym małym szkielecie nie ma migracji nazw wynikowych plików. Nie dodawaj niepotrzebnego skryptu kasującego katalogi.

- [ ] **Step 4a: Przygotuj minimalną kompilowalną aplikację bez obsługi żądań.** Utwórz `src/server/app.ts`:

```ts
import express, { type Express } from 'express';

export function createApp(): Express {
  return express();
}
```

Utwórz `src/browser/main.ts`:

```ts
export {};
```

Utwórz `src/browser/index.html`:

```html
<!doctype html>
<html lang="pl"><head><title>Loop</title></head><body></body></html>
```

Ten etap przygotowuje wyłącznie importowalne moduły i pliki potrzebne uruchomieniu testów. Nie dodawaj jeszcze tras, statycznego katalogu ani modyfikacji DOM.

- [ ] **Step 4b: Udowodnij czerwone asercje zachowania.** Uruchom `npm run build`, następnie `node --test tests/http.test.mjs`. Build ma zakończyć się powodzeniem. Testy muszą otworzyć serwer i wykonać rzeczywiste żądania: test strony ma nie przejść przez status 404 zamiast 200, a test API przez HTML Content-Type zamiast JSON. Zapisz te konkretne błędy asercji jako dowód TDD RED. Błąd importu, konfiguracji lub otwarcia portu wymaga naprawy przygotowania i ponowienia; nie zastępuje niezaliczonej asercji. Testy ochrony plików oraz zwykłych 404 mogą już przechodzić na pustej aplikacji.

- [ ] **Step 5: Zastąp pliki przygotowawcze pustą stroną z modułem DOM.** `src/browser/index.html`:

```html
<!doctype html>
<html lang="pl">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Loop</title>
  </head>
  <body>
    <script type="module" src="/main.js"></script>
  </body>
</html>
```

`src/browser/main.ts`:

```ts
const main = document.createElement('main');
document.body.append(main);
```

- [ ] **Step 6: Zastąp pustą aplikację obsługą żądań i dodaj wejście serwera.** `src/server/app.ts`:

```ts
import express, { type Express } from 'express';
import { fileURLToPath } from 'node:url';

export function createApp(): Express {
  const app = express();
  app.use('/api', (_request, response) => {
    response.status(404).json({ error: 'Not found' });
  });
  const publicDirectory = fileURLToPath(new URL('../public/', import.meta.url));
  app.use(express.static(publicDirectory));
  app.use((_request, response) => {
    response.status(404).type('text/plain').send('Not found');
  });
  return app;
}
```

`src/server/main.ts`:

```ts
import { createApp } from './app.js';

createApp().listen(3000, '127.0.0.1', error => {
  if (error) {
    console.error(`Failed to start Loop at http://127.0.0.1:3000: ${error.message}`);
    process.exitCode = 1;
    return;
  }

  console.log('Loop: http://127.0.0.1:3000');
});
```

- [ ] **Step 7: Uruchom zielone testy.** Kolejno `npm run typecheck`, `npm run build`, `node --test tests/http.test.mjs`, `node --test tests/startup.test.mjs`, następnie `npm test`. Oczekiwane: oba środowiska typów bez błędów, HTML i JS w `dist/public`, serwer w `dist/server`, cztery testy HTTP i test startu przechodzą, a wszystkie procesy testowe kończą się bez pozostawionych nasłuchów. Po naprawie błędów powtórz tylko dotknięte kontrole.

- [ ] **Step 8: Sprawdź, że błędy obu części zatrzymują komendy.** Zapisz poniższy jednorazowy skrypt jako `.runs/task-cycles/app-skeleton/check-errors.mjs` i uruchom go z głównego katalogu repo przez `node .runs/task-cycles/app-skeleton/check-errors.mjs`. Nie commituj go jako kodu produktu. Każdy plik próbny jest tworzony wyłącznie przez `wx`, sprzątany w `finally`; skrypt nie zmienia istniejących źródeł.

```js
import assert from 'node:assert/strict';
import { writeFile, unlink } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

for (const directory of ['browser', 'server']) {
  const probe = `src/${directory}/type-error-probe.ts`;
  await writeFile(probe, 'const invalid: number = "invalid";\n', { flag: 'wx' });
  try {
    for (const args of [['scripts/build.mjs', '--check'], ['scripts/build.mjs']]) {
      const result = spawnSync(process.execPath, args, { encoding: 'utf8' });
      assert.equal(result.error, undefined);
      assert.notEqual(result.status, 0);
      assert.match(result.stdout + result.stderr, /TS2322/);
    }
  } finally {
    await unlink(probe);
  }
}
console.log('Both compiler failure paths passed.');
```

Po próbach ponownie wykonaj `npm run typecheck` i `npm test`. `dev` używa `&&`, więc błąd builda nie uruchamia `start`. Potwierdź dodatkowo podczas jednej próby błędu `npm run dev`: oczekuj zakończenia bez komunikatu nasłuchu, zanim usuniesz próbny plik. Nie pozostawiaj uszkodzonych źródeł ani procesu.

- [ ] **Step 9: Dodaj instrukcję `README.md`.** Treść:

```markdown
# Loop

Minimalna aplikacja TypeScript: pusta strona utworzona przez DOM oraz serwer Express 5.

Wymagania: Node.js 24.x i dostarczony z nim npm. Wszystkie polecenia wykonuj w głównym katalogu repozytorium.

## Pierwsze uruchomienie

1. `npm ci` — instalacja według pliku blokady.
2. `npm run typecheck` — kontrola typów przeglądarki i serwera bez emisji plików.
3. `npm run build` — kompilacja obu części i skopiowanie HTML do `dist/public`.
4. `npm start` — uruchomienie zbudowanego serwera.
5. Otwórz http://127.0.0.1:3000. Strona ma być pusta.

`npm start` wymaga wcześniejszego builda. Serwer nasłuchuje lokalnie na porcie 3000; zakończ go przez Ctrl+C.

## Praca lokalna i sprawdzenie

`npm run dev` buduje aplikację i uruchamia serwer. Nie obserwuje plików: po edycji zatrzymaj proces przez Ctrl+C i ponów komendę.

`npm test` buduje aplikację i wykonuje testy HTTP oraz test błędu startu przy zajętym porcie 3000.

W narzędziach przeglądarki sprawdź, że `document.querySelector('main')` zwraca pusty element, `/main.js` ładuje się bez błędu, a konsola nie zawiera błędów wykonania. Sama pusta strona nie dowodzi wykonania modułu.

Nieznane `/api`, `/api/` i ścieżki pod `/api/` otrzymują 404 JSON. Pozostałe brakujące ścieżki otrzymują zwykłe 404. Serwer podaje wyłącznie `dist/public`.

Kod przeglądarki jest w `src/browser`, kod serwera w `src/server`. Kompilacje mają osobne konfiguracje typów; zależności i plik blokady są wspólne. Konta, baza, mechanika gry i wdrożenie nie należą do tego szkieletu.
```

- [ ] **Step 10: Sprawdź instrukcję i rzeczywistą przeglądarkę.** Uruchom kolejno komendy pierwszego uruchomienia dokładnie z README, sprawdź GET `/` i GET `/api/unknown`, zakończ proces, następnie uruchom `npm run dev` i zakończ go po sprawdzeniu. Orkiestrator sprawdza w prawdziwej przeglądarce pusty widok, istniejący pusty `main`, poprawne załadowanie modułu i brak błędów konsoli; nie zastępuj tego testem ciągów znaków ani nową zależnością. Zapisz wyniki i niewykonane kontrole osobno.

- [ ] **Step 11: Przygotuj jeden commit jednostki po przeglądzie diffu.** Sprawdź `git diff --check`, jawnie dodaj tylko pliki tej jednostki:

```text
git add .gitignore package.json package-lock.json tsconfig.browser.json tsconfig.server.json scripts/build.mjs src/browser/index.html src/browser/main.ts src/server/app.ts src/server/main.ts tests/http.test.mjs tests/startup.test.mjs README.md
git commit -m "feat: add runnable TypeScript application skeleton"
```

Nie commituj tutaj specu, planu, zamrożonego zadania ani raportów; orkiestrator utrwali je po ocenach zgodnie z procesem. Zwróć jednostkę do niezależnego przeglądu; nie scalaj.

## Granica przekazania i pozostałe kontrole procesu

Wykonawca zwraca kod, wyniki testów, diff i decyzje do orkiestratora. Ten prowadzi niezależne przeglądy oraz krok powrotu do fundamentu; propozycje pozostają poza wiążącymi plikami. Pusta mapa części nie daje zaliczenia przypisań, brak kontroli wdrożenia jest poza zakresem. Ten plan kończy etap planowania przed instalacją i implementacją.

Wersje sprawdzono w oficjalnym rejestrze npm 2026-10-05: [Express](https://registry.npmjs.org/express/5.2.1), [TypeScript 6](https://registry.npmjs.org/typescript/6.0.3), [typy Express](https://registry.npmjs.org/@types%2fexpress/5.0.6), [typy Node 24](https://registry.npmjs.org/@types%2fnode/24.19.0). TypeScript 7.0.2 jest obecnym `latest`; wybór 6.0.3 utrzymuje prosty kompilator JS bez natywnych zależności platformowych kosztem późniejszego osobnego sprawdzenia aktualizacji. Dokumentacja odniesienia: [Express 5](https://expressjs.com/en/5x/api/), [opcje TypeScript](https://www.typescriptlang.org/tsconfig/), [node:test](https://nodejs.org/docs/latest-v24.x/api/test.html), [node:http](https://nodejs.org/docs/latest-v24.x/api/http.html).
