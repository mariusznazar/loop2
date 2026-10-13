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
  tests/invariants/test_account_server_occupied_address.py
- **Depends on:** browser-view · build-tools
- **Failure modes:**
  - the listening port it is given is not a whole number from 1 to 65535 — the server process exits with a non-zero code without its readiness line, and loop2 does not start — low — not detected
  - its listening address is already in use — the server process exits with a non-zero code without its readiness line, and loop2 does not start — low — detected by account-server-occupied-address
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
  tests/invariants/test_application_package_layout.py
- **Depends on:** browser-view · account-server
- **Failure modes:** none
- **Trust boundary:** package-lock.json

## agent-workflow

The part directs and records the work performed on this repository.

- **Files:** AGENTS.md
  CLAUDE.md
  .agents/**
  .claude/**
  .gitmodules
  .the-way
  tests/agent_workflow/**
- **Depends on:** product-foundation · deployment
- **Failure modes:** none
- **Trust boundary:** none

## product-foundation

The part holds the product's foundation.

- **Files:** foundations/**
- **Depends on:** none
- **Failure modes:** none
- **Trust boundary:** none

## deployment

The part builds the application into the loop2 container and deploys a commit of the repository to
the test server.

- **Files:** Dockerfile
  .dockerignore
  compose.yaml
  .gitattributes
  .github/workflows/deploy.yml
  deploy/**
  tests/deploy/**
  tests/invariants/test_loop2_container_isolation.py
  tests/invariants/test_loop2_distinct_address.py
  tests/invariants/test_loop2_one_serving_process_container.py
- **Depends on:** account-server · build-tools
- **Failure modes:**
  - a request through the automation's key carries input other than one commit name, or a commit not on `main` — code the decisions forbid is deployed — high — detected by loop2-deploy-trigger-input
  - the input, the commit, the lock, the reading of memory and disk, the fetch, the checkout, the type check or the build fails — the push is not deployed and loop2 keeps running the previous commit — low — detected by loop2-deploy-keeps-running
  - the new container does not become healthy, or the local request after the switch fails — loop2 is down or broken until a human deploys the previous commit or a revert reaches `main` — high — not detected
  - the installed deploy script differs from its source at the deployed commit — an outdated check of the input runs on until a human reinstalls the script — high — not detected
  - the lock file is gone after the host restarts and cannot be created again — every deployment refuses until a human acts — low — not detected
  - the SSH connection drops while a deployment runs — the deployment stops midway, and loop2 may be left stopped — high — not detected
  - a build exhausts the memory of the host, which has no swap — the kernel can end a process of the old loop game or another workload — high — not detected
  - Cloudflare answers 521 or 522 while the new container starts — players see an error for the seconds of the switch — low — not detected
  - a deployment changes or removes something of another workload on the host — the old loop game or another workload is harmed — high — detected by loop2-container-isolation
- **Trust boundary:** deploy/**

## Criticality scale

1. low — a failure stops a deployment or a start, leaves what runs untouched or is seen at once, and costs a retry or a fix on `main`
2. high — loop2 stays down, wrong code runs on the test server, or another workload on the host is harmed, until a human acts

## External context

| Partner | Direction | What comes in | Updates with the product |
|---|---|---|---|
| HTTP clients | both | untrusted | no |
| npm registry | them → us | untrusted | no |
| GitHub Actions | both | untrusted | no |
| Cloudflare | both | untrusted | no |
| the Mikrus host | both | trusted | no |
| the container image registry | them → us | untrusted | no |
| the GitHub repository the server fetches over its read-only key | them → us | trusted | yes |

## Change paths

| Promise level | What a change at this level may do | What it owes the consumer first |
|---|---|---|

## Files left out on purpose

| File | Why |
|---|---|

## Withdrawn identifiers

| Identifier | Why | Successors |
|---|---|---|
