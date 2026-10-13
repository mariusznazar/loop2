# Part map

## browser-view

The part draws the game's screens in the browser.

- **Files:** src/browser/*.ts
  src/browser/index.html
  src/browser/view/**
  assets/icons/**
  tests/view/**
  tests/invariants/test_browser_view_framework.py
  tests/invariants/test_icon_file_content.py
  tests/invariants/test_icon_credits.py
- **Depends on:** simulation
- **Failure modes:** none
- **Trust boundary:** assets/icons/**

## simulation

The part computes the game: the game state, the map run, the character's program and the passing of game time, from the game's data.

- **Files:** src/browser/sim/**
  tests/sim/**
  tests/invariants/test_map_run_repeatability.py
  tests/invariants/test_simulation_randomness.py
  tests/invariants/test_action_in_progress.py
  tests/invariants/test_player_map_run_pace.py
  tests/invariants/test_simulation_isolation.py
  tests/invariants/test_simulation_inputs.py
  tests/invariants/test_content_identifiers.py
  tests/invariants/test_program_rule_pick.py
  tests/invariants/test_exploring_reveal.py
  tests/invariants/test_move_reach.py
  tests/invariants/test_walk_target.py
  tests/invariants/test_map_run_tiles.py
  tests/invariants/test_restart_seed.py
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
- **Depends on:** browser-view · simulation · build-tools
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
  tests/invariants/test_application_package_layout.py
- **Depends on:** browser-view · simulation · account-server
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
- **Depends on:** product-foundation
- **Failure modes:** none
- **Trust boundary:** none

## product-foundation

The part holds the product's foundation.

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
| game-icons.net | them → us | untrusted | no |

## Change paths

| Promise level | What a change at this level may do | What it owes the consumer first |
|---|---|---|

## Files left out on purpose

| File | Why |
|---|---|

## Withdrawn identifiers

| Identifier | Why | Successors |
|---|---|---|
