# Designer report — luki-w-testach-z-przegladu

- Status: **done**
- Spec: `.runs/task-cycles/luki-w-testach-z-przegladu/spec.md`
- Worktree: `the repository's root`, HEAD `0b23580b`; `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, equal to the gitlink. No tracked file changed.

## Questions sent and their answers

None sent. The open choice is settled by the task's wording, the source it cites (loop2#136) and the code, with the smallest reversible reading; no assumption left changes the design, and no reserved choice arises (no language, framework, library, store, login or place to run is chosen: ESLint, `@eslint/js` and `globals` already stand in D-29).

## What the spec settles (To do 16 only)

1. **Scope:** ESLint's `recommended` with `noInlineConfig` and the globals of Node.js reaches every JavaScript file under `.claude/hooks/`, `.claude/skills/loop2-play/` and `.agents/skills/loop2-play/` (today seven files), beside the five parts. Named by directory, not by part and not file by file.
2. **Entries:** D-29 changes (binding sentence, *Scope*, *Rationale*, *Rejected*, the last a reversal of a rejected option for the linter, to be put before the human in the request's description); `eslint-source-rules` changes (sentence, *Part* gains agent-workflow). D-32, `prettier-source-format`, D-28, D-414 and the part map stay.
3. **Keeping the scope:** the ESLint case of `tests/quality/test_source_tool_scope.py` gets a list of its own — the five parts' files plus the files under the three directories, as plain path prefixes — and fails when a directory yields no file; the Prettier and LF cases stay on the five parts. `test_quality_invariants.py` needs no change (it already runs ESLint on `.`).
4. **Repair:** remove the unused `POINTS` in both copies of `compose-state.mjs`; copies stay byte-identical. The play skill is shown working without a real browser: the other scripts keep their bytes, the binding is read nowhere, and after `npm run build` both copies of `compose-state.mjs` print a document `loadSavedGame` loads.
5. **Reversal:** commits of their own for this item; revert returns configuration, test and entries to the five parts.
6. **Guideline:** `guidelines/coding.md`, *Linter*, the paragraph on the patterns of `eslint.config.mjs`, by the method of `the-way-maintain-coding-guidelines`; *Formatter* unchanged.

## Ways weighed and why the rejected ones lost

- (a) the whole part `agent-workflow` — brings in the 22 scene-art scripts and `.claude/agents/`, beyond To do 16.
- (b1) the seven files by name — a second hook script beside the first would pass unchecked, reopening the gap loop2#136 named.
- (b2) the three directories — chosen.
- (c) the hook alone — narrows To do 16 against its wording.
- (d) no change — To do 16 unmet.
- D-32 widened with D-29 — `frames.js` fails Prettier (it wants a `;` after the bare function expression handed to `playwright-cli run-code`), which is the shape change and browser check D-29's and D-32's *Rejected* feared; To do 16 names the linter alone.
- D-32 widened by the hook directory alone — the hook passes Prettier and is LF, but it goes beyond To do 16.

## Verified mechanisms (the planner's facts as hypotheses)

- The planner's probe claimed one report (`POINTS`) under `recommended` "alone". Re-run here: with `recommended` + `noInlineConfig` + `globals.node`, exactly the two `POINTS` reports (one per copy); **without** the globals of Node.js, twelve more `no-undef` reports on `process`, `console`, `Buffer` in the hook, `compose-state.mjs` and `save-frames.mjs`. So the configuration must give these files the globals of Node.js — now part of Decision 3. The planner's count held only with Node.js globals.
- Prettier with D-32's flags: hook, `compose-state.mjs`, `save-frames.mjs` pass; `frames.js` fails, the only difference being a trailing `;`.
- The three play scripts and `SKILL.md` are byte-identical across `.claude/` and `.agents/` (`cmp`); all these files and the hook are `i/lf w/lf`.
- The reason for the code of D-29's scope: `git log -S` on the *Rejected* sentence finds commit `8d211cbe` ("say in D-29, D-32 and their invariants that a test keeps the TS/JS scope of ESLint, Prettier and LF, with deployment in the scope"), merged in loop2#91; that description gives no reason beyond the decision's own sentence, which the spec quotes.
- "Starsze skrypty skilla grania": loop2#136's description reads "the same already holds for the older scripts of the game-playing skill" next to "the new script" (the hook) — older than the hook, of `loop2-play`. Scene-art is out.

## Result of the four checks

1. Placeholder, `TBD` or empty section — none.
2. Contradictions — one fixed: the spec first said Playwright MCP receives `frames.js`'s text from `SKILL.md`; the MCP route uses its own blocks, so the claim was removed. No decision of the task or the foundation is contradicted; D-28's "cover all code" is served, not contradicted.
3. Several independent changes — the spec covers To do 16 alone, which is independent of the task's other sixteen items; Decision 6 keeps it in commits of its own so it can be reverted alone.
4. Two readings — "older scripts of the play skill" settled as the three scripts of `loop2-play` in both copies; "every JavaScript file" of the directories made concrete as the configuration's script extensions, with a TypeScript file there left to fail the scope test on typed rules (N6).

## Reaches beyond the handoff

- `foundations/decisions.md` `### D-28` binding sentence and fields — named by the `decision:` lines of the scope test and by loop2#136's finding; read to check a wider D-29 does not contradict it.
- `### D-30`, `### D-31` read whole (they stood between D-29 and D-32 in the read range) — their scopes already include agent-workflow, a precedent; nothing changed.
- `### D-414` read whole — the hook's decision, to confirm it does not change.
- `foundations/invariants.md` `ruff-source-rules` and `shellcheck-source-rules` (in the read range beside the two named invariants).
- `tests/quality/eslint-rule-sets.mjs` whole, `.gitattributes` whole, `.claude/settings.json` — how the scope test asks ESLint, what keeps LF, how the hook is started.
- `gh pr view 91` (description) and `git show -s 8d211cbe` — the reason of D-29's rejected option, as `design.md` asks for code the choice reshapes.
- `gh pr view 136` (description) — the source To do 16 cites, for the meaning of "starsze skrypty".
- `src/browser/sim/saved-game.ts` (`loadSavedGame` export only), `tests/agent_workflow/test_the_way_pin_hook.py` (existence) — to make the spec's names true.
- The main checkout's `node_modules` (`node_modules of the main checkout`, ESLint 10.12.0, `@eslint/js` 10.0.1, Prettier 3.9.10), used read-only for the probes because the worktree has none.

## Working copies

- `.runs\designer\` held two probe ESLint configurations, their outputs, Prettier's output and a formatted copy of `frames.js`, the `git ls-files --eol` listing, and the descriptions of loop2#91 and loop2#136. Removed with the directory before returning; `git status` is clean.

**Unread material:**
- `.agents/skills/loop2-play/SKILL.md` — not read; `cmp` shows it byte-identical to `.claude/skills/loop2-play/SKILL.md`, which was read whole. Same for the three `.agents/` scripts, read through their `.claude/` twins.
- `tests/quality/test_quality_invariants.py` — read lines 1–79, the whole file as the tool returned it; nothing further.
- `foundations/decisions.md` D-06 read whole; D-29, D-32 whole. No decision is named by D-29's *Verification* (it names only the invariant `eslint-source-rules`).
- The descriptions of loop2#91 and loop2#136 — searched by keywords and read in the hits and their opening, not whole.

**Searches not found or unclear:**
- A decision that names `loop2-play` or the play skill besides D-29 and D-32 — not found (searched `loop2-play|play skill|\.agents/skills` in `foundations/decisions.md`; `\.agents|two copies` in `foundations/`).
- A test that keeps the `.claude/` and `.agents/` copies of `loop2-play` equal — not found (grep for `agents/skills|\.claude/skills` in `tests/` hits only `tests/agent_workflow/test_loop2_scene_art_skill.py`).
- A reason for D-29's "whole repository" rejection beyond its own sentence — not found in commit `8d211cbe` or loop2#91's description.
