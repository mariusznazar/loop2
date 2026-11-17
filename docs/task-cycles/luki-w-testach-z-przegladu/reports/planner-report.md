# Planner report — luki-w-testach-z-przegladu

- Status: **returned** — an open design choice (method `plan-task`, section 2). No plan was written.
- Plan: none (`.runs/task-cycles/luki-w-testach-z-przegladu/plan.md` not written).
- Size report: none (`plan-size.md` not written; `slice_size.py` not run, since there is no plan to measure).
- Worktree: `the repository's root`, HEAD `0b23580bb4f643dfb52c66a7d6a27b1b8d60a5b1`; `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, as the handoff names. No tracked file changed.

## The open design choice — To do 16 needs a revision of D-29 that no row of *Settlements to record* carries

### What the task asks

To do 16 (`task.md:48`): "Reguły lintera JavaScript (D-29) obejmują skrypt hooka startu sesji w `.claude/hooks/` i starsze skrypty skilla grania — dziś nie sprawdza ich żadna reguła, a hook biegnie u każdego przy starcie sesji (loop2#136, „Fix or let through” 2, Minor 2)".

### Where it collides with the foundation

1. **D-29's binding sentence and Scope** (`foundations/decisions.md:446-459`) name the parts the rules reach: "Every application, script and test TypeScript and JavaScript file of browser-view, simulation, account-server, build-tools and deployment passes local pinned ESLint 10.12.0 …", **Scope:** browser-view, simulation, account-server, build-tools, deployment. The hook `.claude/hooks/the-way-pin-check.mjs` and the play skill's scripts `.claude/skills/loop2-play/{compose-state.mjs,frames.js,save-frames.mjs}` and their copies under `.agents/skills/loop2-play/` belong to the part `agent-workflow` (`foundations/part_map.md:126-143`, `.claude/**`, `.agents/**`), which D-29 leaves out.
2. **D-29's *Rejected* names exactly the play skill's scripts:** "the whole repository — the scripts of the play skill would need fixes in two copies, an exception, or a change of the shape of one of them and a check of the skill in a real browser, a risk and work with no gain for the game". D-32 (`foundations/decisions.md:490-504`, Prettier and LF) carries the same scope and the same rejected option word for word.
3. **The test and the guideline follow that scope:** `tests/quality/test_source_tool_scope.py:25` `SCOPE_PARTS = ("browser-view", "simulation", "account-server", "build-tools", "deployment")` drives all three of its checks (ESLint, Prettier, `.gitattributes` LF) from one list; `guidelines/coding.md:37-40` says the patterns of `eslint.config.mjs` cover "każdy plik TS/JS części z zakresu D-29".
4. **The source of the item said so itself.** The description of loop2#136 (read with `gh pr view 136`) gives the finding O-1: "D-29 and D-32 name only browser-view, simulation, account-server, build-tools and deployment … So the change complies with D-29 … D-29's *Rejected* names the play skill's scripts … A decision on JS of agent-workflow, or an extension of D-29 and D-32 to `.claude/hooks/**`, is a task of its own", and its item 2 of *Fix or let through*: "fixing it means changing the rules for JavaScript, which only a human may decide".

So To do 16 cannot be made without a revision of D-29 (its binding sentence or Scope, and its *Rejected*), and possibly of D-32. The task's *Settlements to record* hold three rows (the `destroy` departure, `sprite-credits`, the `express-session` fact) and none of them is this revision; the task's *Decisions in play* do not name D-29 either. By section 2 of the method that is an entry the change needs beyond the rows of *Settlements to record*: an open design choice, so no plan.

### What the code shows today (to size the ways)

- `eslint --print-config .claude/skills/loop2-play/frames.js` gives `"rules": {}` — the files are reached by no rule set.
- The three play scripts are byte-identical in `.claude/skills/loop2-play/` and `.agents/skills/loop2-play/` (checked with `cmp`).
- A probe with `@eslint/js` `recommended` and `noInlineConfig` alone (a temporary config in `.runs/planner/`, since removed) on the hook and the three play scripts reported one error: `.claude/skills/loop2-play/compose-state.mjs:18:7 'POINTS' is assigned a value but never used (no-unused-vars)` — so the play scripts need a fix in both copies; the hook reported nothing (as loop2#136's reviewer also found). The probe applied no typed rules (none of these files is TypeScript) and no Prettier.
- The newer scripts of the skill `loop2-scene-art` (13 files in each of `.claude/skills/loop2-scene-art/` and `.agents/skills/loop2-scene-art/`) are equally unlinted; To do 16 says "starsze skrypty skilla grania" and does not name them.

### The ways open

| Way | What it changes | What it costs / leaves |
|---|---|---|
| a. D-29 adds the part `agent-workflow` to its scope | Binding sentence and Scope of D-29; its *Rejected* entry on the play skill's scripts falls; `eslint.config.mjs` reaches `.claude/**` and `.agents/**`; `test_source_tool_scope.py` gets a scope of ESLint apart from that of Prettier/LF (or D-32 widens too) | Brings in the 26 scene-art files too, beyond what To do 16 names; fixes in two copies of each skill; D-29's own rejected reason (a check of the skill in a real browser after a change of its scripts) has to be answered |
| b. D-29 names the files: the session-start hook and the play skill's scripts in both copies | D-29's binding sentence gains a file-level addition beside the five parts; *Rejected* reworded so the play scripts are no longer rejected; the scope test gets those files beside `SCOPE_PARTS`, for ESLint alone or for all three tools | Matches To do 16 exactly; leaves scene-art scripts (and any later agent-workflow script) outside, the gap loop2#136 named staying for them; fix of `POINTS` in both copies of `compose-state.mjs` |
| c. D-29 adds only `.claude/hooks/**` | Same as (b) with the hook alone | Narrows To do 16 against its wording; the play skill's scripts stay rejected; needs the human or the task's author to accept the narrowing |
| d. No revision; To do 16 goes back to its author | Nothing | The hook that runs at every session start stays unlinted; the task's acceptance of To do 16 is unmet |

A sub-question each of (a)-(c) must answer: **does D-32 (Prettier and LF) widen with D-29?** The task names D-29 only; loop2#136's finding named both; the one scope test checks the three tools from one list, so widening D-29 alone splits that list.

A second sub-question: **who accepts the revision.** D-29 says "Changing the rule set takes a human-accepted change of this decision"; widening the scope does not change the rule set, but it reverses a rejected option, and loop2#136 told the human that "only a human may decide". The orchestrator holds the delegation for intermediate choices; whether this one falls inside it is the orchestrator's call, and I note that the source of the item called it the human's.

**Proposed answer, with evidence:** way (b), with D-32 widened by the same file list. Reason: (b) is the narrowest revision that meets the wording of To do 16; the hook runs on every reader's machine (D-414), which is the risk the item names; widening D-32 with it keeps `test_source_tool_scope.py` on one list, and loop2#136 found that Prettier already passes on the hook. Cost if wrong: the scene-art scripts stay unlinted until a task of their own, and a later reader may take the file list of D-29 for an arbitrary choice unless its rationale names why those files and no others.

## What else the reading found (for the spec and for the plan that follows it)

None of these is an open design choice; they are notes so the later plan does not start from zero.

- **No rule of size.** `guidelines/coding.md` holds no section "Size of a function and a file", and no decision of loop2 holds one (searched `decisions.md` and the guidelines for "rule of size", "WAY-365", "size rule", "rozmiar", "threshold"). The size bullet of the method therefore asks nothing; no moving slice is needed.
- **D-73 departure (settlement 1).** D-73's binding sentence lists ten departures and `guidelines/testing.md:10-11` names them ("jego dziesięć odstępstw"); the new departure changes D-73's list, the count in `testing.md`, the *Doubles* of the integration recipe (`testing.md:373`) and the item 6 row the handoff names. This is how to make settlement 1, not a new choice.
- **To do 5 (`sprite-credits`).** The facts it needs stand: `pixel-crawler-terms` ("ask for no credit"), `lpc-wolf-licence`, `smoke-fire-particle-licence`; `invariants.md` `sprite-credits` is `Method: review` and rests on them. `assets/sprites/` holds 18 PNG files flat; `tests/view/icons.test.mjs` has `PACK_LINES` (two lines: dust and wolf). The test belongs to `browser-view` (`tests/view/**`), so its slice needs `guidelines/styleguide-browser-view.md`. The trust-boundary row of `assets/sprites/` in `testing.md:175` is about `sprite-file-content` (D-273) and stays.
- **To do 7, conditional choices.** The memory limit of 512 MiB is a decision (`decisions.md:2198`, within D-231's area, and `compose.yaml` `mem_limit`), so a repair of `test_running_container_has_one_listening_node_process` that raises the limit would be a decision change; a repair of the Docker "settings file in use" failure may touch `scripts/docker_gate.py` (D-390). A plan should make such a slice return to the orchestrator if its established cause needs a foundation change, instead of changing it.
- **Trust boundaries the slices will reach:** `src/server/**`, `deploy/**`, `compose.yaml`, `src/browser/sim/saved-game.ts`, `assets/sprites/**` (part map); `scripts/docker_gate.py` is no listed boundary file of build-tools (its boundary list is `package-lock.json`, `scripts/audit_dependencies.py`, `scripts/kitchen-sink.mjs`, `scripts/local-start.mjs`).

## Reaches beyond the handoff

- `gh pr view 136` (the description of loop2#136), to read the finding behind To do 16 — the task cites it as its source.
- `foundations/decisions.md:490-504` D-32 whole, because D-29's scope and rejected option are repeated there and the scope test reads both from one list.
- `.runs/orchestrator/index.md` searched for "hook", "D-29", "D-32", "play skill" (D-30, D-31, D-414 headings and binding sentences read there as a locator).
- `tests/quality/test_source_tool_scope.py:1-75`, `eslint.config.mjs` whole, `foundations/invariants.md` `sprite-credits` (lines 1298-1304), `foundations/environment_facts.md` `pixel-crawler-terms`, `lpc-wolf-licence` and the source of the smoke pack's licence, `tests/view/icons.test.mjs` around `PACK_LINES`.

## Guidelines found missing or uncertain

- `guidelines/coding.md` holds no rule of size; the handoff's point 7 asked to read it — there is nothing to read (see above).
- `guidelines/coding.md:37-40` ties the ESLint patterns to "części z zakresu D-29"; it will need the same revision as D-29.

## Order of work and the styleguide

Not applicable: no plan was written and the styleguide was not read.

## Working copies

- `.runs\planner\` held a temporary ESLint configuration (`eslint-probe.config.mjs`) and its output (`eslint-probe.txt`, the one error quoted above). Removed with the directory before returning; nothing remains.

## Questions still open

1. Which way settles To do 16 — (a), (b), (c) or (d) above — and does D-32 widen with D-29? Proposed: (b) with D-32 widened by the same file list. Evidence above.
2. Is the revision of D-29 within the orchestrator's delegation, or does it need the human's acceptance, as loop2#136 told the human? Proposed: the orchestrator decides, noting D-29's sentence on human acceptance covers the rule set, while this revision reverses a rejected option.

**Unread material:**
- `guidelines/testing.md` read whole; `guidelines/coding.md` read whole; `foundations/part_map.md` and `foundations/glossary.md` read whole; frozen task read whole; `.the-way/task-cycle/plan/SKILL.md` read whole.
- D-73, D-74, D-75, D-76, D-77, D-78, D-79, D-81, D-82, D-83, D-84, D-85 read whole. D-163, D-235 read whole except for their *Rationale*/*Rejected* lines (D-163 read whole; D-235 read to its *Origin*, its rationale not read). D-112 read whole. D-29 and D-32 read whole. D-271 read only its binding sentence (lines 4848-4863), not its fields. D-273 read to its *Verification*, not its rationale. D-382 read whole.
- Not read, since the plan was not written: the questions of *Testing discipline* and *The gate, test tools and the local start*; the invariants of items 5 (except `sprite-credits`), 8-12, 14 and 15; the environment facts of items 11 and 14; the kind files `guidelines/coding-<kind>.md`; `guidelines/styleguide-browser-view.md`; `.the-way/product-guidelines/reading.md`; the tests and code the handoff names to cut slices (`tests/transport.test.mjs`, `tests/http.test.mjs`, `tests/account-mail.test.mjs`, `tests/sim/*`, `tests/view/**` beyond `icons.test.mjs` around `PACK_LINES`, `tests/invariants/*`, `tests/deploy/*`, `.claude/hooks/**` beyond its first 20 lines, `.claude/skills/loop2-play/**`).

**Searches not found or unclear:**
- A rule of size in `guidelines/coding.md` or a decision on it — not found (searched "rule of size", "WAY-365", "size rule", "rozmiar", "threshold", "próg" in `guidelines/`, and "rule of size", "function … lines/length", "WAY-365" in `foundations/decisions.md`).
- A decision that puts the session-start hook or the skills' scripts under ESLint or Prettier — not found (searched "pin-check", ".claude/hooks", "SessionStart", "hook of Claude Code", "the-way-pin" in `foundations/`; D-414 covers the hook's behaviour, not its linting).
- Whether "starsze skrypty skilla grania" includes the scene-art scripts — unclear; read as the three scripts of `loop2-play`, the older skill, against the newer `loop2-scene-art`.
