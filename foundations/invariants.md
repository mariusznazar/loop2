# Invariants

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
- **Derives from:** TODO — "What serves the built game and account requests in the container?", projected in C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md
- **Part:** every
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
