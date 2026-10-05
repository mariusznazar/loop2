# Check author — invariant checks for app-skeleton, correction 1

Pinned the-way verified: `git -C .the-way rev-parse HEAD` = `96c52488752701ffa321ca69c0c2aa2dd3e46d2d`
= the gitlink `git ls-files --stage -- .the-way` records.

Isolation kept: I read only README.md, package.json, package-lock.json (package names and
versions), tsconfig.browser.json, tsconfig.server.json, .gitignore, foundations/ (all five files
were still empty skeletons when read) and `.the-way/` (gate/run_tests.py docstring, invariants
template sections Method and Test, WAY-61, WAY-65, WAY-69). To choose the runtime fingerprint for
Express I also read third-party code under `node_modules/express` and `node_modules/router` (not
the product's). I opened nothing under src/, tests/ (other than tests/invariants/), dist/,
scripts/, docs/, and no git history or diff. I did not write the deliberate breaks (WAY-69).

## Files written

- `C:\Storage\repos\loop2-skeleton\tests\invariants\loop2_invariant_support.py` — shared support,
  no expected values: repository root, `npm` via `shutil.which`, commands with timeouts and
  process-tree kill (`taskkill /T /F` on Windows, process group elsewhere), a temporary copy of the
  working tree (files `git ls-files --cached --others --exclude-standard` lists, minus `.the-way`
  and `.runs`, with the real `node_modules` linked in as a junction), one `npm run build` copy
  shared by the run and removed at exit, the server started by `npm start` in that copy (fails at
  once when 127.0.0.1:3000 is already taken; fails after 30 s without a connection or when the
  process exits; always killed with its tree), HTTP requests with a 10 s timeout, and the list of
  deployment files the repository holds.
- `C:\Storage\repos\loop2-skeleton\tests\invariants\test_account_server_runtime.py`
- `C:\Storage\repos\loop2-skeleton\tests\invariants\test_account_server_typecheck.py`
- `C:\Storage\repos\loop2-skeleton\tests\invariants\test_account_server_express_http.py`
- `C:\Storage\repos\loop2-skeleton\tests\invariants\test_browser_view_framework.py`
- `C:\Storage\repos\loop2-skeleton\tests\invariants\test_loop2_api_error_route.py`

Each test cites its invariant by `# invariant: <identifier>/1` on its own line inside the method
body. The real working tree is never written: every build, typecheck and server start runs in a
temporary copy.

## 1. account-server-runtime/1

Sentence: The account and save server's TypeScript source and deployment use Node.js major
version 24.

Reading: "the TypeScript source uses Node 24" = the project declares Node 24 as its engine and
the server's TypeScript is checked against Node 24's type definitions; "deployment uses Node 24"
= every deployment file that names a Node version or Node image names 24.

Tests:
- `test_package_engines_admit_only_node_24` — package.json `engines.node` admits major 24 and
  no other (accepted forms: `24`, `24.x`, `^24.a.b`, `~24.a`, `24.a.b`, `>=24 <25`; `>=24`, `||`,
  `*` fail as not limited to one major).
- `test_lockfile_root_engines_admit_only_node_24` — same for package-lock.json's root entry.
- `test_node_type_definitions_are_major_24` — `@types/node` in package.json and as locked is 24.
- `test_server_compilation_uses_node_type_definitions` — tsconfig.server.json `types`, where set,
  contains `node`.
- `test_deployment_files_name_only_node_24` — each deployment file's Node mentions (Docker
  `FROM node:<tag>` / distroless `nodejs<N>`, YAML `image: node:<tag>`, `node-version`,
  `NODE_VERSION`, `.nvmrc`, `.node-version`, `.tool-versions`) are major 24; a Dockerfile naming
  no Node image fails ("cannot be told"); an untagged `node` image or `node:lts` fails.

Literals: `EXPECTED_MAJOR = 24`; the deployment file name patterns in the support module.

With no deployment file (today): the deployment test passes on the declarations alone —
`engines.node` is what a Node platform reads when no other file names a version. Stated in the
module docstring.

Not covered: which Node actually runs the server on any machine; a deployment defined outside the
repository.

## 2. account-server-typecheck/1

Sentence: The account and save server's TypeScript types are checked before deployment.

Reading: the sentence is about a check, so the method feeds made-up input (WAY-61). In a
temporary copy, the literal below is appended to every `.ts`/`.mts`/`.cts` file (not `.d.ts`)
under `src/server` — appending to every file avoids having to know which file is the entry:

```ts
// Appended by the invariant check account-server-typecheck/1.
const invariantCheckDeliberateTypeError: number = "not a number";
void invariantCheckDeliberateTypeError;
```

"Before deployment", with no deployment file, is read as "before the build a deployment would run
produces anything to start".

Tests:
- `test_typecheck_command_rejects_server_type_error` — `npm run typecheck` exits 0 on an
  unchanged copy (control) and non-zero on the copy with the error.
- `test_build_refuses_server_type_error` — `npm run build` exits 0 on an unchanged copy and
  leaves `dist/server/main.js` (the file `npm start` runs); with the error it exits non-zero and
  leaves no `dist/server/main.js`.
- `test_no_deployment_route_left_unread` — fails while any deployment file exists, on purpose:
  this check does not read deployment files, so once one appears the check must be extended to
  show that its route runs the type check first.

Literals: the type-error text, `src/server`, `dist/server/main.js`.

Not covered: a deployment outside the repository, or one that skips `npm run build`. The test
asserts on exit codes, not on the compiler's wording, so it does not prove the non-zero exit came
from the type error rather than from some other effect of appending text; the unchanged-copy
control narrows that to the appended lines.

## 3. account-server-express-http/1

Sentence: The account and save server handles its HTTP routes and responses through Express 5.

Reading: Express 5 is the runtime dependency, no other HTTP server framework is, the server
source goes through Express and not through a raw Node handler, and at run time requests pass
through Express 5's router.

Tests:
- `test_runtime_dependency_on_express_5` — package.json `dependencies.express` admits only
  major 5; package-lock.json locks major 5.
- `test_installed_express_is_5` — `node_modules/express/package.json` is major 5.
- `test_no_other_http_framework_dependency` — no runtime dependency is in the other-frameworks
  list.
- `test_server_source_imports_express` — some `.ts` file under `src/server` imports `express`.
- `test_server_source_uses_no_other_http_framework` — no `src/server` file imports a listed
  framework.
- `test_server_source_gives_node_http_no_handler_of_its_own` — no `createServer(<function>)` and
  no `.on("request", …)` in `src/server` (`createServer(app)` is allowed).
- `test_every_probe_is_dispatched_by_express_router` — starts the built server with
  `DEBUG=router` and `DEBUG_COLORS=no`; for `GET /`, `GET /invariant-check-no-such-page` and
  `GET /api/invariant-check-no-such-route` the server's stderr must show
  `router dispatching <METHOD> <path>` — the debug line of the `router` package Express 5
  dispatches through (`node_modules/router/index.js:154`). Express 4 logs under
  `express:router`, which the pattern does not accept.

Literals: major 5; other frameworks: fastify, koa, @koa/router, koa-router, @hapi/hapi, hapi,
restify, polka, hono, @hono/node-server, @nestjs/core, micro, h3, sails, @feathersjs/feathers,
connect, @tinyhttp/app, elysia, itty-router, @adonisjs/core, loopback, @loopback/core, total.js,
derby, meteor; the three probes; the `DEBUG` values.

Not covered: routes the probes do not reach; a handler that writes to Node's raw response after
Express dispatches to it ("responses" is covered only as far as the request goes through the
router); HTTP served by a second process. The source scan reads text, not a syntax tree.

## 4. browser-view-framework/1

Sentence: The browser view uses TypeScript and browser APIs to render its screens, with no UI
framework in its code or runtime dependencies.

Reading: "uses TypeScript" = the browser source holds TypeScript and no other code format;
"browser APIs" = the browser compilation includes the DOM library and the source refers to
`document`; "no UI framework in its code" = no listed framework imported or loaded by the source,
and the built output loads only its own files and holds no framework marker; "runtime
dependencies" = package.json `dependencies` and package-lock.json entries not marked `dev`.

Tests:
- `test_browser_source_holds_typescript_and_no_other_code` — `src/browser` has at least one
  `.ts`/`.mts`/`.cts` file and no `.js .mjs .cjs .jsx .tsx .vue .svelte .astro .marko .riot
  .coffee .elm .dart .hbs .handlebars .ejs .pug .njk` file.
- `test_browser_compilation_uses_dom_and_source_refers_to_document` — tsconfig.browser.json
  `lib`, where set, contains DOM; some browser `.ts` file names `document`.
- `test_no_ui_framework_in_runtime_dependencies` — package.json `dependencies` and non-dev lock
  entries hold no listed framework.
- `test_browser_source_imports_no_ui_framework` — no import, `require`, dynamic import or
  `<script src>` in `src/browser` names a listed framework (by package name, or as a URL path
  segment with `@version` stripped), and no framework marker appears there.
- `test_built_page_loads_only_its_own_code_and_no_framework` — after `npm run build` in a copy,
  `dist/public` holds JS and HTML; every `<script src>` names no scheme or host; every module
  specifier in its JS and HTML is relative or root-relative; no framework marker appears.

Literals: the framework list (react, react-dom, preact, vue, @vue/runtime-dom, @vue/runtime-core,
svelte, @sveltejs/kit, solid-js, @angular/core, @angular/platform-browser, lit, lit-html,
lit-element, @lit/reactive-element, mithril, inferno, hyperapp, alpinejs, htmx.org, ember-source,
@builder.io/qwik, @stencil/core, backbone, knockout, riot, marko, petite-vue, @preact/signals,
next, nuxt, @remix-run/react, astro, uhtml, hyperhtml, million, van, vanjs-core,
@hotwired/stimulus, @hotwired/turbo, aurelia, @aurelia/runtime-html, cycle, @cycle/dom, elm);
the markers (`__REACT_DEVTOOLS_GLOBAL_HOOK__`, `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED`,
`__VUE_PROD_DEVTOOLS__`, `__VUE_OPTIONS_API__`, `__PREACT_DEVTOOLS__`, `ngDevMode`,
`litHtmlVersions`, `litElementVersions`, `reactiveElementVersions`, `__svelte`, `_$HY`,
`Alpine.start`, `htmx.config`); the extension lists. jQuery is left out as a DOM utility, not a UI
framework.

Not covered: a framework missing from the list; a framework copied in under another name leaving
none of the markers; whether the page renders in a real browser (no browser runs). A `.tsx` file
counts as a framework format (JSX), not as allowed TypeScript.

## 5. loop2-api-error-route/1

Sentence: An unmatched `/api/` request receives an API error response, never the built game's
HTML page.

Reading: an unmatched `/api/` request = a request whose path begins with `/api/` and names no
route; an API error response = status 400–599, `Content-Type` `application/json` or `*+json`,
body parsing as JSON; the built game's HTML page = each HTML file `npm run build` places in
`dist/public` (compared side, read from the run).

Tests:
- `test_root_serves_the_built_page` — control: `GET /` returns 200 with the bytes of one of the
  built HTML files, so the comparison below is made against the page the server really serves.
- `test_unmatched_api_requests_receive_json_errors_not_the_page` — 6 paths × 3 methods × 3 Accept
  headers = 54 subtests; each response must not equal any built HTML file, not start with
  `<!doctype`/`<html`, not declare `text/html`/`application/xhtml+xml`, have status 400–599, a
  JSON media type and a JSON body.

Literals: paths `/api/`, `/api/invariant-check-no-such-route`,
`/api/invariant-check-no-such-route/deeper/still`, `/api/invariant-check-no-such-route?page=1`,
`/api/index.html`, `/api/main.js` (the last two look like the page's own files, to catch a static
or fallback handler mounted over `/api/`); methods GET, POST (body `{}` as JSON), DELETE; Accept:
a browser navigation value, `application/json`, none.

Not covered: `/api` without the trailing slash; dot segments and encoded slashes; other methods
and headers; a page served under a name other than an HTML file of `dist/public`.

## Run

Command, from `C:\Storage\repos\loop2-skeleton`:

    python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl

Exit code: **0**. unittest: `Ran 22 tests in 18.820s — OK`.

Verdicts read from `.runs/invariant-tests.jsonl` (no null lines):

| Invariant | pass lines | fail lines |
|---|---|---|
| account-server-runtime/1 | 5 | 0 |
| account-server-typecheck/1 | 3 | 0 |
| account-server-express-http/1 | 7 | 0 |
| browser-view-framework/1 | 5 | 0 |
| loop2-api-error-route/1 | 2 | 0 |

After the run: port 3000 free, no server process left, no temporary copy left, the real tree
unchanged apart from `tests/invariants/` (the `foundations/` changes in `git status` are the other
agent's).

## Questions, with proposed answers

1. **Deployment files that do not exist yet.** Runtime check: passes on the declarations alone
   when there are none, and reads any that appear. Typecheck check: fails as soon as a deployment
   file appears, until the check is extended. Is failing on a new deployment file acceptable,
   given it will stop that later task until someone rewrites this check? *Proposed: yes — a silent
   pass would vouch for a route nobody has read; the task that adds deployment owes the check's
   extension.*
2. **`data:` lines.** None written. The files the checks read (package.json, package-lock.json,
   tsconfigs, sources, built output) are what the invariants are about — the compared side — not
   recorded outputs, and WAY-69 rejects a `data:` line for each file a verdict leans on.
   *Proposed: none needed.*
3. **The support module is part of every check's input.** `loop2_invariant_support.py` decides
   the port, the copy, the deployment file patterns and the server's start. The break author
   should receive it together with the test files, as "the files the check reads" (WAY-69).
   *Proposed: hand it over with the checks; treat it as an invariant test file for WAY-03.*
4. **`/api` without the slash.** README promises 404 JSON for `/api` too, but the sentence names
   `/api/` requests. *Proposed: leave it out of this invariant; if the human wants it bound, a new
   version of the sentence names it.*
5. **Error status range.** The check accepts any 400–599 status, not only 404, because the
   sentence says "API error response". *Proposed: keep.*
6. **Express runtime fingerprint.** The dispatch check depends on the `router` package's debug
   namespace and wording; a later Express 5 release could change them and fail the check loudly.
   *Proposed: accept; the failure would be visible and points straight at the cause.*
7. **`.tsx` and the framework list.** `.tsx` counts as a framework format; jQuery is not a UI
   framework. *Proposed: keep both readings unless the human says otherwise.*

## After code review

Review read: `docs/task-cycles/app-skeleton/reports/correction-1/code-review-checks.md`. Same
isolation as before; only `tests/invariants/` edited; nothing committed.

### Changes

- **Important 1 — every named Node version must be 24**
  (`tests/invariants/test_account_server_runtime.py`). A new `key_values` reads every value a
  YAML/TOML key holds: a scalar, each element of a flow list `[24, 22]`, and each item of a block
  list. Keys read: `node-version`, `node_version`, `NODE_VERSION`. A `${{ matrix.<key> }}` value
  makes the check also read that matrix key (e.g. `node: [24, 22]`). A `node-version-file` is
  followed and its content read; one naming `package.json` is skipped, because the tests above
  already check `engines.node`. A `.tool-versions` line has each of its versions read. In
  Dockerfiles, every FROM line is read with `ARG`/`ENV` defaults filled in (`node:${NODE_MAJOR}`).
  I tried it on made-up text: the 22 and 18 elements of a matrix and a list are now reported. The
  docstring says so.
- **Important 2 — browser API evidence and DOM lib**
  (`tests/invariants/test_browser_view_framework.py`). The old test is split in two:
  - `test_browser_compilation_declares_the_dom_library`: tsconfig.browser.json
    `compilerOptions.lib` must be present and hold `DOM` (any case). An absent `lib` now fails.
  - `test_browser_source_renders_through_document_in_code`: comments are removed and the text of
    string and template literals is emptied (`code_only`). At least one browser `.ts` file must
    then hold `document.<member>` for a member in the literal `DOM_RENDERING_MEMBERS`
    (createElement, createElementNS, createTextNode, createDocumentFragment, getElementById,
    getElementsByClassName, getElementsByTagName, querySelector, querySelectorAll, body, head,
    documentElement, append, prepend, replaceChildren, adoptNode, importNode).
  - Tried on made-up text: a comment, a string and a template literal no longer satisfy it, and
    real code does. Both rules are in the docstring, including what is lost: code inside `${...}`
    of a template literal is emptied too.
- **Minor 1 — leaked server process** (`tests/invariants/loop2_invariant_support.py`).
  - `kill_tree` no longer returns early when npm has exited. On Windows it first lists the
    descendants of the started process by the parent id Windows records (kept after the parent
    exits), counting only processes created since the start. It then kills the root, if alive,
    and each descendant with `taskkill /T /F`. On POSIX it always kills the process group.
  - `Server.stop` now fails loudly if port 3000 is still held 15 s after the kill. It stays
    silent only on the error path of a failed start, so it does not hide that error.
  - Tried: a node child that outlived its exited parent is killed (kill_tree took 0.9 s).
- **Minor 2 — removed** the meaningless `assertGreaterEqual(status, 100)` in
  `test_account_server_express_http.py` (one line, safe).
- **Minor 4 — docstring wording** "on the commit being checked" changed to "in the working tree
  being checked" in the three docstrings that said it (one line each). The checks read the working
  tree.

### Left as they are, and why

- **Minor 3** (router debug-line dependence): accepted by the orchestrator (Q6) and noted in the
  request.
- **Minor 5** (IMPORT_SPECIFIER can match prose; pattern duplicated in two files): neither is a
  one-line fix. Moving the pattern changes the helper both tests read. The false failure is rare
  and loud.
- **Minor 6** (document the deployment tripwire in the invariant's notes): the note belongs in
  `foundations/invariants.md`, outside my write boundary. It goes to the request (Q1).
- **Minor 7** (run time): acceptable per the review. The added Windows process listing adds about
  1 s per command; the run took 27.6 s.

### Run after the changes

    python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl

Exit code: **0**. unittest: `Ran 23 tests in 27.557s — OK`. The record holds no null lines.

| Invariant | pass lines | fail lines |
|---|---|---|
| account-server-runtime/1 | 5 | 0 |
| account-server-typecheck/1 | 3 | 0 |
| account-server-express-http/1 | 7 | 0 |
| browser-view-framework/1 | 6 | 0 |
| loop2-api-error-route/1 | 2 | 0 |

After the run: port 3000 free, no `loop2-*` temporary directory left. The tree differs only in
`tests/invariants/` (four files changed).

The changed tests were not re-broken. The browser-view-framework test split and the stricter
deployment parsing are new checking logic; the break author may want to re-run the breaks for
`browser-view-framework/1` and `account-server-runtime/1`.

## After panel

Panel settlement read: `docs/task-cycles/app-skeleton/reports/correction-1/panel-settlement-ab.md`,
fixes 9 and 10 only. Same isolation; only `tests/invariants/` edited; nothing committed.

### Changes

- **Fix 9** — the typecheck tripwire gets its own list of deployment files.
  - `tests/invariants/loop2_invariant_support.py` gains `VERSION_PIN_NAMES` (`.nvmrc`,
    `.node-version`, `.tool-versions`) and `deployment_route_files()`: the deployment files less
    those version pins. CI workflows stay on the list.
  - `test_account_server_typecheck.py::test_no_deployment_route_left_unread` now uses
    `deployment_route_files()`, and its module docstring says version-pin files do not count.
  - `test_account_server_runtime.py` still uses `deployment_files()`, so it keeps reading the
    version pins.
- **Fix 10** — `body`, `head` and `documentElement` are removed from `DOM_RENDERING_MEMBERS` in
  `test_browser_view_framework.py`. The members left are createElement, createElementNS,
  createTextNode, createDocumentFragment, getElementById, getElementsByClassName,
  getElementsByTagName, querySelector, querySelectorAll, append, prepend, replaceChildren,
  adoptNode and importNode.

### Run

    python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl

Exit code: **0**. unittest: `Ran 23 tests in 27.070s — OK`. The record holds no null lines.

| Invariant | pass lines | fail lines |
|---|---|---|
| account-server-runtime/1 | 5 | 0 |
| account-server-typecheck/1 | 3 | 0 |
| account-server-express-http/1 | 7 | 0 |
| browser-view-framework/1 | 6 | 0 |
| loop2-api-error-route/1 | 2 | 0 |

After the run: port 3000 free, no `loop2-*` temporary directory left. The tree differs only in
`tests/invariants/`.
