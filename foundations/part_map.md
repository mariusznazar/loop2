# Part map

## browser-view

The part draws the game's screens in the browser, and the kitchen-sink page that shows their shared controls, roles and tiles in every state.

- **Files:** src/browser/*.ts
  src/browser/*.css
  src/browser/index.html
  src/browser/view/**
  src/browser/kitchen-sink/**
  assets/icons/**
  assets/fonts/**
  tests/view/**
  tests/invariants/test_browser_view_framework.py
  tests/invariants/test_icon_file_content.py
  tests/invariants/test_icon_credits.py
  tests/invariants/test_terrain_drawing_numbers.py
  tests/invariants/test_browser_view_token_values.py
  tests/invariants/test_browser_view_focus_outline.py
  tests/invariants/test_design_token_contrast.py
  tests/invariants/test_design_token_sources.py
- **Depends on:** simulation
- **Trust boundary:** assets/icons/**
  assets/fonts/**

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
  tests/invariants/test_program_closed_lists.py
  tests/invariants/test_walk_feasibility.py
  tests/invariants/test_program_world_reference.py
  tests/invariants/test_map_run_layout.py
  tests/invariants/test_minute_span_split.py
- **Depends on:** none
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
  tests/invariants/test_account_server_default_address.py
- **Depends on:** browser-view · simulation · build-tools
- **Trust boundary:** src/server/**

## build-tools

The part installs dependencies, checks code quality and types, audits introduced dependency versions and builds and launches the application, and builds and serves the browser view's kitchen-sink page on the developer's machine.

- **Files:** /package.json
  /package-lock.json
  tsconfig.browser.json
  tsconfig.server.json
  tsconfig.kitchen-sink.json
  scripts/**
  tests/quality/**
  eslint.config.mjs
  prettier.config.mjs
  ruff.toml
  requirements-quality.in
  requirements-quality.txt
  .gitignore
  README.md
  tests/invariants/loop2_invariant_support.py
  tests/invariants/test_account_server_runtime.py
  tests/invariants/test_account_server_typecheck.py
  tests/invariants/test_application_build_output.py
  tests/invariants/test_application_package_layout.py
  tests/invariants/test_application_build_kitchen_sink.py
- **Depends on:** browser-view · simulation · account-server · product-foundation
- **Trust boundary:** package-lock.json
  scripts/audit_dependencies.py
  scripts/kitchen-sink.mjs

## agent-workflow

The part directs and records the work performed on this repository.

- **Files:** AGENTS.md
  CLAUDE.md
  .agents/**
  .claude/**
  .gitmodules
  .the-way
  tests/agent_workflow/**
  guidelines/**
  src/browser/AGENTS.md
- **Depends on:** product-foundation · deployment
- **Trust boundary:** none

## product-foundation

The part holds the product's foundation.

- **Files:** foundations/**
- **Depends on:** none
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
  tests/invariants/test_loop2_container_icons.py
  tests/invariants/test_loop2_deploy_trigger_input.py
  tests/invariants/test_loop2_deploy_keeps_running.py
  tests/invariants/test_loop2_host_sharing.py
- **Depends on:** browser-view · account-server · build-tools
- **Trust boundary:** deploy/**

## External context

| Partner | Direction | What comes in |
|---|---|---|
| HTTP clients | both | untrusted |
| npm registry | both | untrusted |
| Python Package Index | them → us | untrusted |
| GitHub Actions | both | untrusted |
| Cloudflare | both | untrusted |
| the Mikrus host | both | trusted |
| the container image registry | them → us | untrusted |
| the GitHub repository the server fetches over its read-only key | them → us | trusted |
| game-icons.net | them → us | untrusted |
| github.com/vercel/geist-font | them → us | untrusted |

## Files left out on purpose

| File | Why |
|---|---|

## Withdrawn identifiers

| Identifier | Why | Successors |
|---|---|---|
