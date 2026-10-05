# Part map

## browser-view

The part draws the game's screens in the browser.

- **Files:** src/browser/**
  tests/invariants/test_browser_view_framework.py
- **Depends on:** none
- **Failure modes:** none
- **Trust boundary:** none

## account-server

The part is the account and save server: it serves the built game and handles the HTTP requests sent to it.

- **Files:** src/server/**
  tests/http.test.mjs
  tests/startup.test.mjs
  tests/invariants/test_account_server_express_http.py
  tests/invariants/test_loop2_api_error_route.py
  tests/invariants/test_loop2_one_serving_process.py
- **Depends on:** browser-view · build-tools
- **Failure modes:** none
- **Trust boundary:** src/server/**

## build-tools

The part installs dependencies, checks types and builds and launches the application.

- **Files:** package.json
  package-lock.json
  tsconfig.browser.json
  tsconfig.server.json
  scripts/build.mjs
  .gitignore
  README.md
  tests/invariants/loop2_invariant_support.py
  tests/invariants/test_account_server_runtime.py
  tests/invariants/test_account_server_typecheck.py
  tests/invariants/test_application_build_output.py
- **Depends on:** browser-view · account-server
- **Failure modes:** none
- **Trust boundary:** package-lock.json

## agent-workflow

The part directs and records the work performed on this repository.

- **Files:** AGENTS.md
  .agents/**
  .claude/**
  .gitmodules
  .the-way
- **Depends on:** product-foundation
- **Failure modes:** none
- **Trust boundary:** none

## product-foundation

The part holds the product rules and the map of its responsibilities.

- **Files:** foundations/**
- **Depends on:** none
- **Failure modes:** none
- **Trust boundary:** none

## Criticality scale

## External context

| Partner | Direction | What comes in | Updates with the product |
|---|---|---|---|
| HTTP clients | both | untrusted | no |
| npm registry | them → us | untrusted | no |

## Change paths

| Promise level | What a change at this level may do | What it owes the consumer first |
|---|---|---|

## Files left out on purpose

| File | Why |
|---|---|

## Withdrawn identifiers

| Identifier | Why | Successors |
|---|---|---|
