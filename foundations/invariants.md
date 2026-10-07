# Invariants

Before running an invariant Method in a fresh checkout, run `npm ci` from the repository root.

## account-server-runtime/1

The account and save server's TypeScript source and deployment use Node.js major version 24.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-01@e57a4766
- **Part:** every
- **Correction:** none

## account-server-typecheck/1

The account and save server's TypeScript types are checked before deployment.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-01@e57a4766
- **Part:** every
- **Correction:** none

## account-server-express-http/1

The account and save server handles its HTTP routes and responses through Express 5.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-02@06e6d3d8
- **Part:** every
- **Correction:** none

## browser-view-framework/1

The browser view uses TypeScript and browser APIs to render its screens, with no UI framework in its code or runtime dependencies.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-03@fb5aa3b0
- **Part:** every
- **Correction:** none

## loop2-api-error-route/1

An unmatched `/api/` request receives an API error response, never the built game's HTML page.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-05@e11aec4d
- **Part:** every
- **Correction:** none

## loop2-one-serving-process/1

One Express 5 process serves both the built game and `/api/` requests.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-05@e11aec4d
- **Part:** every
- **Correction:** none

## application-build-output/1

Building the application compiles both the browser and the server TypeScript configurations.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-06@094e6fa7
- **Part:** build-tools · browser-view · account-server
- **Correction:** none

## application-package-layout/1

The browser and server use a single shared npm package and lockfile, with no separate application package for either side.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-06@094e6fa7
- **Part:** build-tools · browser-view · account-server
- **Correction:** none

## application-build-layout/1

The browser and server have distinct TypeScript compilation configurations and output directories.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-06@094e6fa7
- **Part:** build-tools · browser-view · account-server
- **Correction:** none

## public-file-boundary/1

The server serves static files only from the built public directory, whatever working directory its process starts in.

- **Method:** foundations/public_file_boundary_assessment.md
- **Rests on:** none
- **Derives from:** none
- **Part:** account-server · build-tools
- **Correction:** none

## account-server-occupied-address/1

When the account and save server's listening address is already in use, the server process exits with a non-zero code without printing its readiness line `Loop: <address>`.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** none
- **Part:** account-server · build-tools
- **Correction:** none

## Withdrawn identifiers

| Identifier | Why | Successors |
|---|---|---|

## Quarantined invariants

| Identifier | Version | Until |
|---|---|---|

## Recovered invariants

| Identifier | Version | Searched | Found |
|---|---|---|---|
| public-file-boundary | 1 | searched: foundations/decisions.md; README.md; src/server/app.ts; tests/http.test.mjs; their git history (11c7cbb, 3af85d1); 5928e7b:docs/task-cycles/app-skeleton/reports/correction-1/return/proposal-pl.md, part C; PR #3 U4 | found: README.md, local work and verification; tests/http.test.mjs, foreign-working-directory and traversal tests; 5928e7b:docs/task-cycles/app-skeleton/reports/correction-1/return/proposal-pl.md, part C, public-file-boundary/1 |
| account-server-occupied-address | 1 | searched: foundations/decisions.md; README.md; src/server/main.ts; tests/startup.test.mjs; their git history (11c7cbb, de3ceb3, 3af85d1); 5928e7b:docs/task-cycles/app-skeleton/reports/correction-1/return/proposal-pl.md, part C; PR #3 U4 and U7 | found: tests/startup.test.mjs, occupied-port exit and readiness assertions; 5928e7b:docs/task-cycles/app-skeleton/reports/correction-1/return/proposal-pl.md, part C, account-server-occupied-address/1 |
