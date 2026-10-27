FAIL

# Independent specification review

Reviewed `docs/task-cycles/konta-graczy-i-logowanie/spec.md` against the whole frozen task, the dispatched foundation entries, guidelines and designer answers. No product or specification file was changed. One contradiction needs resolution before implementation.

## R1 — Reconcile mandatory account configuration with the unconditional default-start invariant

Locations:

- `docs/task-cycles/konta-graczy-i-logowanie/spec.md:106`
- `docs/task-cycles/konta-graczy-i-logowanie/spec.md:108`
- `foundations/invariants.md:504`
- `tests/invariants/test_account_server_default_address.py:44`

The spec requires: “Production requires all settings, validates before readiness and has no generated-key/in-memory/MemoryStore fallback. Partial/invalid explicit configuration fails everywhere.” It then says: “Non-production with none of those four settings preserves the existing static/developer startup and default-address invariant.”

The existing invariant says, in full:

> The account and save server started with neither `LOOP2_LISTEN_HOST` nor `LOOP2_LISTEN_PORT` set either prints its readiness line `Loop: http://127.0.0.1:3000` or exits with a non-zero code and a message naming `127.0.0.1:3000` as an address already in use.

These cannot both remain true. Start with no listen variables and no account settings but with `NODE_ENV=production`: the spec requires a configuration refusal, while the invariant permits only readiness or an occupied-address failure. A non-production start with partial account configuration creates the same contradiction. Retaining the unconfigured developer mode preserves one useful case, but does not preserve the invariant's entire stated domain. The current invariant test inherits the parent environment except the two listen variables, so the discrepancy is also capable of changing its outcome with the runner environment; it is not merely a difference in terminology.

The builder must otherwise guess whether to retain a false foundation statement, weaken mandatory configuration, or silently narrow the existing test. Each is a material wrong outcome: the first misstates the guarantee, the second breaks the fail-closed design, and the third changes test coverage without settling its requirement.

Resolve in the spec which startup configurations the address guarantee covers, and include the corresponding `account-server-default-address` amendment in Foundation entries through the invariant skill. Recommended reading: retain mandatory configuration failure and the existing default address; make the default-address guarantee conditional on a startup configuration eligible to run, explicitly including the wholly unconfigured non-production mode. Require the single default-address test to establish that precondition rather than inherit arbitrary account settings, while separate startup checks prove missing/partial/invalid production configuration refuses readiness. No new default-address test is needed, preserving D-49's single exception. This needs an autonomous clarification of the spec/foundation contract, not a change to the user's account requirements.

Question for the orchestrator/designer: which explicit precondition will the default-address invariant and its existing test use so that configuration refusal and the address guarantee are both true?

## Remaining scope assessment

All 18 task items and K1–K13 have a design route. The spec keeps the current tunnel rather than the historical task Context, preserves the new game's empty team and initial Program group, and leaves saved game, reset, mail delivery and account blocking to their assigned tasks. It names the fully assigned projected entries without claiming future saved-game persistence or target-host measurement already happened.

The unit boundaries and interfaces are sufficient to plan the change. The Store's explicit non-resurrection and expiry requirements, response-before-persistence prohibition, bounded hashing/counter reservations, exact Origin, proxy topology and configured origin prevent the important guesses that would otherwise change authorization. A maker still has to implement and test those contracts; this review does not certify package integration or an actual deployment.

The existing mutation-guideline gap does not create a second spec finding. The pinned template requires mental mutation in a part for which no mutation tool is adopted (template lines 218–219). No tool is adopted here. The spec restores that applicable duty and explicitly preserves the unresolved tool/parts adoption gap rather than inventing a permanent exclusion. That gap must remain visible in the request. This conclusion is based on the present template and current scope, not the prior tunnel review. No tool execution or complete template compliance is claimed.

Local/manual browser work and target acceptance are distinguished correctly. The public registration journey is a server mutation and remains the human's action under D-12; only signed-out inspection is available to the agent. The draft must stay blocked until the human's exact-image measurement and public journey supply their evidence.

## Reads and reaches

Read the project write-spec wrapper and complete pinned `.the-way/task-cycle/spec/SKILL.md`. Read the frozen task whole, spec whole, completed designer report and orchestrator answers. Truncated outputs were followed by smaller reads of the omitted task passages and decisions; no absence was inferred from truncation.

Read all dispatched guideline files whole: `coding.md`, `coding-browser-module.md`, `coding-http-application.md`, `testing.md`, `styleguide-browser-view.md`, plus `src/browser/AGENTS.md`.

Read dispatched foundation entries whole: D-01–D-18, D-23, D-28–D-33, D-36–D-49, D-51, D-53, D-73–D-91; the specified account/build/API/static/deployment/token/test-selection invariants; browser-view, account-server, build-tools, deployment, agent-workflow and product-foundation map entries; and the six specified glossary entries. No whole foundation file was dumped in place of selecting entries.

Reaches beyond the dispatch's named source files:

- `src/server/app.ts`, `src/server/main.ts`, `compose.yaml`, `Dockerfile`: verify the current routing, default-start and private deployment boundaries that the spec changes.
- `src/browser/view/app.ts` and `clock.ts`: verify that delayed game mounting and clock disposal fit the existing game lifecycle.
- `tests/invariants/test_account_server_default_address.py` and `tests/startup.test.mjs`: check the actual preconditions and inherited environment of the startup guarantees underlying R1.
- `.the-way/product-guidelines/testing/template.md`, Mutation testing rule: independently assess the known adoption gap and the proposed mental-mutation duty.
- `.the-way/product-guidelines/reading.md`, whole: establish the route for an existing guideline gap without inventing a waiver or unrelated audit.
- Public [express-session documentation](https://expressjs.com/en/resources/middleware/session/) and [v1.19.0 middleware source](https://raw.githubusercontent.com/expressjs/session/v1.19.0/index.js), read 2026-10-26: check the middleware's rolling-cookie and Store integration assumptions. The package exposes separate touch and save paths; the project's non-resurrection rule therefore remains meaningful implementation work rather than an assumed default guarantee. No private values were sent in the requests.

No vault source, server state, cycle.md or another agent's private reasoning was read.

## Checks and limits

- `git ls-files --stage -- .the-way` — exit 0; recorded gitlink `574a37b9ab9572f876298f4cc10754581222d3f0`.
- `git -C .the-way rev-parse HEAD` — exit 0; same commit.
- `Get-Content -Raw -Encoding UTF8` and smaller selected-entry/chunk reads listed above — exit 0. All `rg -n` discovery/anchor reads — exit 0.
- Full task/spec/guideline/foundation comparison is a document review, not a product test. R1 is a concrete contradiction of proposed behavior, not a claim that a not-yet-written implementation was executed.
- `npm test`, image measurement, browser checks and target-host checks — not run by this reviewer. The dispatch's baseline results are not attributed to this review.

Return boundary: independent specification review only. No plan, slice, implementation, foundation edit or next-stage dispatch performed.
