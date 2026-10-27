# Designer report — completed specification

Status: done

Spec: `docs/task-cycles/konta-graczy-i-logowanie/spec.md`
Questions retained: `reports/01-designer-report.md`
Answers: `reports/02-designer-answers.md`

Only ignored cycle artifacts were written. No product, foundation, guideline, test, global skill, vault or server change was made. No cycle.md was read. No tests were run alongside the orchestrator.

## Questions and answers

The initial batch is preserved whole in 01-designer-report.md. Answers are autonomous intermediate decisions, not claimed human approvals.

1. **Startup configuration.** Asked whether to retain unconfigured non-production static startup instead of breaking the literal default-address invariant or silently creating ephemeral account credentials. Orchestrator accepted that mode only with none of the four account settings; partial/invalid explicit settings and every unconfigured production start fail. UI reports account unavailability, never anonymous game. Real account checks use explicit temporary SQLite/keys and HTTPS for browser cookies. Cost: local default server does not provide working accounts until configured; alternative ephemeral defaults conceal loss and mandatory defaults break an existing invariant.
2. **Mutation testing gap.** Asked to restore the already adopted mental-mutation obligation without adopting a tool or inventing an exemption. Accepted. The missing computational-part tool/parts settlement remains reported as unresolved existing guideline work. Cost: the request cannot claim complete template compliance; unrelated simulation tooling/audit would widen this task and settle a choice the task did not authorize.
3. **Provisional hashing profile.** Asked to prepare 65536 KiB, timeCost 3, parallelism 1, hashLength 32, two active operations, no queue, while leaving final target verification blocked. Accepted with local image measurement at 512 MiB and mandatory human exact-deployed-image measurement. Cost: profile may need correction/redeployment; pretending it was measured would fabricate acceptance, while awaiting executable measurement before writing its executable would make progress impossible.
4. **Character/format semantics.** Asked to use Unicode code points, untouched password content, ECMAScript trim/lowercase, exactly one @ and nonempty sides, no dot/DNS restriction, 16 KiB JSON. Accepted. Cost: code points differ from user-perceived graphemes but are stable/testable; UTF-16 units reject some valid-length emoji passwords, and strict native email validation exceeds the task.
5. **Email failure collection window.** Follow-up sent by message: task specifies 15-minute lock after five failures but no collection window. Recommended rolling 15-minute collection, lock starting at failure five, success clearing pre-lock email failures but not IP history, rolling IP windows and in-flight reservations. Accepted in answers item 5. Cost: spaced failures can avoid email lock; alternative lifetime accumulation retains stale failures and fills bounded maps indefinitely. Existing thresholds and exact refusal text remain unchanged.

No design-changing unanswered assumption remains. Actual host measurements/settings are evidence pending in the implementation cycle, not guessed answers.

## Alternatives and resulting design

- **Persistence:** file SQLite/versioned initialization/short transactions chosen; MemoryStore/in-memory account DB violates durability; ORM/driver/framework and destructive migration machinery add scope. A single driver-owning unit and Store adapter keep SQL and package callbacks distinct.
- **Session:** project SQLite Store and regenerated opaque identifiers chosen, as required. Stateless tokens/second signing layer rejected because they duplicate the selected library and complicate revocation. Normal requests touch existing rows only; concurrent touch cannot recreate logout.
- **Proxy:** explicit private-tunnel policy, one-hop protocol trust and canonical CF-Connecting-IP chosen. Arbitrary forwarded-chain trust permits spoofing. Fixed Docker IP/subnet adds coordination. The topology and real Cloudflare headers require separate actual-route evidence; forged local headers alone prove neither.
- **Input/Origin:** small explicit endpoints and JSON object validation chosen. Native strict email validation and schema/client framework add restrictions/dependencies beyond this task. Expected origin is configured, never chosen from Host.
- **Limits:** bounded in-memory histories/reservations plus one process hash gate chosen. Active-lock eviction would make overload bypass limits; unbounded queues defeat the memory bound; durable counters were explicitly rejected in task.
- **UI:** auth wrapper around existing game with disposal chosen. Starting a hidden game before identity would keep timers/program state alive and complicate logout. Full app rewrite adds regression risk; new design tokens have no approved source.
- **Evidence:** actual isolated image measurement plus manual local/public journey chosen. Heap-only memory readings miss native allocations; running extra measurement in the live app risks unbounded combined load. Local measurements cannot establish Mikrus acceptance.

The two-slot profile and the 80% memory margin are explicit engineering candidates, not human-selected final performance or measured deployment facts. Slot count/profile are revisited on measurement; target invariant remains unchecked until evidence.

## Requirement coverage

| Frozen To do | Spec location and consequence |
|---|---|
| 1 | API registration plus browser flow: immediate session and headquarters without approval/verification. |
| 2 | Credential section: exact range, code-point interpretation, trim/lowercase, loose shape, duplicate text. |
| 3 | Browser initial/session-check/forms states, no game/program until identity confirmed. |
| 4 | Login and restore-session requests, generic failure text, headquarters on reload. |
| 5 | Header logout, own session destroy and game disposal. |
| 6 | GET account/logout authorization, direct refusal, unknown API JSON contract preserved. |
| 7 | express-session custom Store, host-only Secure/HttpOnly cookie, rolling 30-day expiry, independent browsers. |
| 8 | Explicit Argon2id candidate and both local/target-image measurement. |
| 9 | Real node:sqlite file in own named volume, ownership and replacement checks. |
| 10 | Exact thresholds, bounded maps, in-flight reservations and hash concurrency, required limitation message. |
| 11 | Strict cookie, exact Origin and JSON-only mutation guards. |
| 12 | K10 future mail decision only; no premature mail code or monthly quota. |
| 13 | File format/path, real host ownership/mode, Compose grant, private backup, rotation retirement window. |
| 14 | Private tunnel transport adapter, scheme/client header semantics and actual-route evidence. |
| 15 | Shared control waiting/error/password variants and kitchen-sink samples; D-44/styleguide route. |
| 16 | Both deployment skill copies, named volume path, secret operations and data-preserving rollback. |
| 17 | Five first-kind classifications, first-file exemplar/index routes, existing HTTP/browser and deferred kinds retained. |
| 18 | Authorization/refusal table, invariant test with real HTTP, fail-once evidence and testing skill route. |

K1–K13 all have foundation rows. All ten wholly assigned projected invariants and the three wholly assigned decisions are named. Partial projected entries keep their task 16/17/19/21 writers; no future saves, blocking, reset or backup claim. D-12/D-16 access-review return is kept in a binding review/return field, not lost in revised rationale. D-17/loop2-host-sharing retain tunnel grant and gain only own account volume/session grant.

Acceptance remains real registration → headquarters → logout → login at the public HTTPS address after human deployment, plus exact deployed-image hash/verify measurement. These have not happened in this design stage.

## Reads and reaches

Read the project write-spec wrapper and its actual pinned `.the-way/task-cycle/spec/SKILL.md` whole; verified gitlink/HEAD. Read whole frozen task (split reads after tool output truncation), complete coding, http-application, browser-module, testing and browser styleguide files and src/browser/AGENTS.md.

Read complete dispatched decisions by selected sections: D-01–D-18, D-23, D-28–D-33, D-36–D-49, D-51/D-53, D-73–D-91. D-18/D-23/D-90/D-91 protect current game integration. A selected contiguous read also included D-34/D-35; they reinforced leaving simulation/data exemplars alone. Truncated selected output was reread in smaller batches; no truncation was treated as absence.

Read the dispatched account/build/static/deployment/token/test-selection invariants whole, plus account-server-default-address and account-server-occupied-address after the orchestrator follow-up. Read selected part-map entries browser-view/account-server/build-tools/deployment/agent-workflow/product-foundation and requested glossary terms. No whole foundation file was dumped indiscriminately.

Linked facts read whole: node-24-support-schedule, node-listen-port-zero, cloudflare-tunnel-transport, cloudflare-tunnel-token-file, compose-file-secret-permissions and cloudflared-image-identity. They constrain runtime, ephemeral ports and preserving the established tunnel secret setup.

Additional reaches and reasons:

- `.the-way/product-guidelines/reading.md`, project maintain-testing wrapper, pinned testing skill/template and common guideline template: route the missing Mutation testing rule correctly. Skill was consulted for its contract, not run as a new task/refinement or used to settle a new tool.
- Project loop2-deploy skill and both setup/secrets and troubleshooting references, whole: preserve actual token grants, human-only operations, installed-script constraints and rollback across old transport.
- `src/server/app.ts`, `main.ts`, `compose.yaml`, `Dockerfile`: current route/static/startup boundaries and secret/volume integration points.
- `src/browser/view/app.ts`, `clock.ts`, `controls/text-field.ts`: current newGame boot, missing clock disposal and shared input extension.
- `tests/http.test.mjs`, `tests/startup.test.mjs` and selective README/default-address/helper searches: existing unknown-API and startup expectations, actual HTTP evidence and avoiding fixed test ports.
- `tsconfig.server.json`, `scripts/build.mjs`, `package.json`: build ownership, deployable measurement placement and existing test/package discipline.

The frozen task carries the relevant approved definition/projected entries and plan assignment passages, so no vault source was read or written. Historical tunnel prerequisite labels were reconciled using the dispatched merged-base facts, not treated as unresolved prerequisites.

## External primary sources fetched

Fetched only public unauthenticated documentation, without private paths, names, access values or personal accounts in queries/headers. Read date: 2026-10-26.

- [express-session 1.19.0 documentation](https://expressjs.com/en/resources/middleware/session/): session cookie/store options, touch contract, rolling expiration and ordered secret keys. These support using the library rather than reimplementing those mechanics. Lockfile/API compatibility still needs implementation verification.
- [Express 5 behind proxies](https://expressjs.com/en/guide/behind-proxies/): trust policy must match topology and blindly accepting forwarding is unsafe. This supports explicit mode/topology, not a claim of actual host observation.
- [Cloudflare request headers, updated 2026-10-09](https://developers.cloudflare.com/fundamentals/reference/http-headers/): canonical CF-Connecting-IP, appended X-Forwarded-For, overwritten X-Forwarded-Proto, Worker/Pseudo IPv4 caveats. Actual tunnel configuration remains unchecked.
- [node-argon2 options](https://github.com/ranisalt/node-argon2/wiki/Options): explicit Argon2id options and generated salts. The candidate profile/concurrency is our engineering choice, not a benchmark result. The wiki's explanatory claim about memory per thread is not used as a substitute for measurement.
- [Node.js 24.17.0 SQLite API](https://nodejs.org/download/release/v24.17.0/docs/api/sqlite.html): built-in database/statement interface, sufficient to identify the storage boundary. No assumption about unavailable newer-node APIs was made.

## Four final spec checks

1. **Placeholders/empty sections:** PASS by full reread. Pending deployment evidence is explicitly identified as pending, not represented by a placeholder or invented value.
2. **Contradictions:** PASS by reread against task/foundation selection. Preserve current tunnel; default developer startup remains possible; production is fail-closed; cookies stay Secure locally too; no arbitrary strict email format; K2 does not settle future unsaved progress; no new mail/save/blocking behavior.
3. **Independent changes:** the task intentionally spans account runtime, browser gate, durable deployment and required guideline/foundation upkeep. These are one end-to-end account capability, not split unrelated features. Mutation-tool adoption/simulation audit remains outside and explicitly unresolved; no broader refactor is requested.
4. **Ambiguous requirements:** resolved code-point length, email parsing, rate collection windows, threshold reservations, exact API ownership, session expiry equality, rotation retirement, startup mode, proxy identity and target-vs-local evidence. Actual host observations remain acceptance work, not a hidden implementation guess.

## Checks and command outcomes

- `git ls-files --stage -- .the-way` — exit 0; gitlink 574a37b9ab9572f876298f4cc10754581222d3f0.
- `git -C .the-way rev-parse HEAD` — exit 0; same pin.
- Initial combined read tried guessed `.the-way/elements/write-spec/skill/SKILL.md` — exit 1; no file existed there. Corrected to wrapper's actual `.the-way/task-cycle/spec/SKILL.md`, full read exit 0. No alternate process copy was used.
- Subsequent `Get-Content -Raw -Encoding UTF8`, selected-section PowerShell reads and `rg -n` discovery reads — exit 0. Truncated outputs were reread selectively.
- First long here-string write of spec was rejected by Windows process creation (os error 206, command length); no shell process/file mutation occurred. Spec was then written successfully using apply_patch, followed by a full Get-Content reread exit 0. Initial question report write exit 0.
- `npm test` — not run by designer, per dispatch; no test pass claimed. Foundation check/build/image/target/browser checks not run in design stage.
- Final `git status --short` and `git diff --stat` — exit 0, both empty: no tracked product changes. Ignored spec/report exist (29,457 and 14,838 bytes at that check).
- `rg -n '^## ' docs/task-cycles/konta-graczy-i-logowanie/spec.md` — exit 0; all six required headings present. `rg -n '\b(TODO|TBD|FIXME)\b'` on spec produced no matches (ripgrep's expected no-match exit 1); full-read placeholder check above remains the substantive check. The combined final inspection command ended exit 0. No other agent's baseline is attributed to this designer.
