# Design-stage report

Actor: design subagent, inherited model. Stage: Superpowers 6.4.1 brainstorming; architectural path. Product worktree: `C:/Storage/repos/loop2-skeleton`. Process pin verified against gitlink and checkout: `271222203981b5cedd2fcbf3451b60362cc3e4d4`. Product base observed: `3342d43`.

## Inputs and scope

Read the frozen `docs/task-cycles/app-skeleton/task.md`, product `AGENTS.md`, every product foundation file, installed brainstorming skill, pinned task-cycle skill, pinned decision and part-map skill adapters and bodies, shared foundation way of working, WAY-01, WAY-03 and WAY-125. Read the Obsidian rulebook before the named project source; the initially truncated section was reread separately. Read relevant source decisions and invariants in `definicja_mvp_loop2.md`, approval line and gate record. Relevant source is approved 2026-10-04; task is ready for cycle, source-only. No project-plan work imported.

Architectural classification: repository has no runnable application or existing flow to modify. Task-cycle requires a written spec regardless. No visual question arose: a blank page and build commands do not benefit from a visual companion.

## Exchanges before drafting

Designer to orchestrator: "Design brief: developer gets blank DOM-rendered TS page served by single Express 5 / Node24 TS server, API misses never HTML, reproducible install/build/typecheck/run instructions; accounts/storage/game/deploy excluded. Approach recommendation A: single npm package, separate browser/server tsconfigs, tsc emits browser ES modules and server JS, tiny Node build script copies static HTML; npm run dev builds then serves (manual restart/rebuild documented). Lowest dependencies; cost: no HMR and future asset bundling may replace build script. B: Vite browser build + tsc server, better future assets/watch but new bundler dependency and dev-server topology. C: workspace packages, strongest separable boundaries but package orchestration unnecessary for two tiny entries. Provisional stage question: approve A and this brief for spec drafting under delegation? Also propose API policy 404 JSON {\"error\":\"Not found\"} for /api and /api/* all methods, ahead of static middleware; unknown non-API returns ordinary 404 with no SPA fallback."

Orchestrator: "Provisional orchestrator go-ahead: minimal approach single package, separate browser/server tsconfigs, tsc outputs + Node copy script for HTML if you recommend; no extra bundler unless evidence. Blank page exact task; unknown API JSON 404 all methods; unknown non-API ordinary 404, no SPA fallback, localhost dev. These are provisional choices for PR not human foundation approval. Finish spec and full report; identify minimum necessary foundation approval (prefix and initial part map/invariant acceptance), cite precise rules. Do not implement. Prepare concise autonomous-choice table alternatives/cost. We will independently review blocker and spec then plan a resumable blocked request if confirmed."

Orchestrator further confirmed: "Yes, explicitly provisional orchestrator approval of approach A, brief and proposed API policy under user's delegated cycle, not human approval. Record preceding and this exchange before drafting spec. No implementation."

## Autonomous choices

| Choice | Alternative | Cost if wrong / cost of alternative |
|---|---|---|
| Single package, separate TS compilation targets | Workspaces | Later package separation moves scripts/config; workspaces now add orchestration without distinct releases. |
| tsc plus HTML copy script | Vite | Future assets may need bundler migration; Vite now adds dependency/dev topology. |
| Build then serve for dev, manual restart | Watch/HMR | Slower edits but no task requirement for watch; watch adds lifecycle tooling and races. |
| Empty DOM-created main element | Static-only empty HTML | Small DOM module proves task requirement; static-only does not exercise TypeScript rendering. |
| API 404 JSON error, all methods, also /api | Default Express HTML 404 | Error envelope may change with later API work; default HTML violates required API separation. |
| No non-API SPA fallback | Fallback to index for every path | Future client routing needs explicit addition; catch-all now risks masking missing assets/API errors. |
| Bind local server to loopback | All network interfaces | Remote-device development needs deliberate change; unnecessary exposure otherwise. |

All are provisional implementation choices, not new human-approved foundation entries. Existing approved source chooses DOM TypeScript, Express 5, Node24 and one serving process.

## Foundation dependency assessment

The whole current product foundation is empty of entries; there are no collisions. The task introduces first executable browser/server parts and a trust boundary from HTTP requests to static files. No irreversible operation is needed. Unknown failure modes retain highest sharpness until assessed; do not invent numeric severity.

Exact constraints:

- `.the-way/foundations/decisions.md:6`, WAY-01: "A task that sets out to change the foundation makes that change in its foundation step, and the code follows".
- `.the-way/task-cycle/skill/SKILL.md:101`: before dependent implementation run foundation step whenever changing a foundation entry or invariant test; lines 109–110: "Establish the required acceptance before the dependent code proceeds".
- `.the-way/task-cycle/skill/SKILL.md:72`: "only a human can approve a binding foundation entry".
- `.the-way/elements/decisions/skill/SKILL.md:21`: empty log requires asking human for product prefix. Projected exception expressly ends at transcription: lines 63–64 say task writing entry into log asks for prefix.
- `.the-way/elements/part-map/skill/SKILL.md:50`: "Failure modes come from the human"; lines 80–82 require human acceptance of the first part.
- `.the-way/elements/common/way_of_working.md:140`: projected readiness approval approves wording. It does not provide unknown fields. Relevant source entries still have Scope/Relations unresolved, and invariants have Method unresolved.
- `.the-way/task-cycle/skill/SKILL.md:19`: when human-reserved decision prevents required code, prepare blocked draft request. WAY-125 restates that boundary.

These restrictions prevent writing binding entries with invented authority. They do not establish that this source-only task must write those entries before code. The initial designer inference that first browser/server code necessarily selected the changes route was challenged by the orchestrator and withdrawn after reading `.the-way/project-level/task/skill/SKILL.md:78`–82: "For source-only use, do not claim that assignment merely because the wording informs the task." The task template repeats at line 84 that source-only use does not assign that work.

Revised interpretation, confirmed to orchestrator: use unchanged binding foundation during implementation, constrained by the approved source. Step 11 explicitly permits new part-map/invariant/decision proposals with no binding file change, followed by panel and PR human review. Human prefix and first-part acceptance are prerequisites to writing those binding entries, not prerequisites to compiling a skeleton consistent with approved source. Do not fabricate a code blocker from a self-assigned transcription task. Retain highest sharpness and baseline map failure; do not describe the foundation gate as passed.

If binding transcription is later required, necessary human input includes product prefix and first-map judgments/acceptance. Invariant-test changes may be accepted by the panel or human under WAY-03, so no separate human test approval is necessarily needed. Existing accepted invariant tests are absent; ordinary behavioral tests in the skeleton do not modify one.

Source invariant `loop2-api-error-route/1` and `browser-view-framework/1` directly apply. `account-server-runtime/1` and `account-server-express-http/1` apply to server. The deployment portion of runtime/typecheck and container portion of one-process invariants cannot be claimed verified: deployment/container are outside task scope. Full projected decisions also reference broader absent decisions, e.g. game-state responsibility and public HTTPS address. Do not transcribe a broad future-state decision as a completed current skeleton without resolving its scope and dependent entries via element skills.

Alternatives considered: importing projected entries now invents an assignment and brings wider future functionality/relations into scope; declaring a blocker because those optional entries lack metadata unnecessarily stops authorized code. Keeping them as source constraints and preparing required return-step proposals is the supported minimal path. A blocked draft request is necessary only if a required binding change emerges, not merely because this product starts with empty foundation files.

## Output and boundary

Spec: `docs/superpowers/specs/2026-10-05-app-skeleton-design.md`. No code, dependencies, foundation files or commits written. No writing-plans invocation. Self-review checks completeness, consistency, scope and requirement ambiguity; independent spec review and provisional written-spec go-ahead belong to orchestrator before next stage. No execution checks claimed. Foundation proposal drafting/guards/panel belong to dedicated element work, not this read-only design investigation.
