# Part map

## Criticality scale

TODO — human assessment required; no degrees have been assigned.

## External context

| Partner | Direction | What comes in | Updates with the product |
|---|---|---|---|
| HTTP clients | both | untrusted | no |

## Change paths

| Promise level | What a change at this level may do | What it owes the consumer first |
|---|---|---|

## Files left out on purpose

| File | Why |
|---|---|

## browser-page

The part creates the page in the browser.

- **Files:** src/browser/**
- **Depends on:** none
- **Failure modes:** TODO — the human has not supplied failures, damage, severity or detection.
- **Trust boundary:** none

## server-http

The part serves the built page and handles HTTP requests.

- **Files:** src/server/**
  tests/http.test.mjs
  tests/startup.test.mjs
- **Depends on:** browser-page
- **Failure modes:** TODO — the human has not supplied failures, damage, severity or detection.
- **Trust boundary:** src/server/app.ts

## build-tools

The part installs dependencies, checks types and builds and launches the application.

- **Files:** package.json
  package-lock.json
  tsconfig.browser.json
  tsconfig.server.json
  scripts/build.mjs
  .gitignore
  README.md
- **Depends on:** browser-page · server-http
- **Failure modes:** TODO — the human has not supplied failures, damage, severity or detection.
- **Trust boundary:** none

## agent-workflow

The part directs and records the work performed on this repository.

- **Files:** AGENTS.md
  .agents/**
  .claude/**
  .gitmodules
  .the-way
  docs/superpowers/**
  docs/task-cycles/**
- **Depends on:** product-foundation
- **Failure modes:** TODO — the human has not supplied failures, damage, severity or detection.
- **Trust boundary:** none

## product-foundation

The part holds the product rules and the map of its responsibilities.

- **Files:** foundations/**
- **Depends on:** none
- **Failure modes:** TODO — the human has not supplied failures, damage, severity or detection.
- **Trust boundary:** none

## Withdrawn identifiers

| Identifier | Why | Successors |
|---|---|---|
