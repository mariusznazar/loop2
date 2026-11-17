PASS

# Spec review: luki-w-testach-z-przegladu (To do 16 only)

- Reviewer: `write-spec`, variant review. I did not write the spec, and this is the first review (there is no earlier reviewed copy).
- Spec: `.runs/task-cycles/luki-w-testach-z-przegladu/spec.md`. Frozen task: `.runs/task-cycles/luki-w-testach-z-przegladu/task.md`.
- Worktree: `the repository's root`, HEAD `0b23580bb4f643dfb52c66a7d6a27b1b8d60a5b1`. `.the-way` is at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, which matches the gitlink. No tracked file was changed, and `git status` is clean.

## Findings that would make the build go wrong

None. I found no requirement of To do 16 that the spec drops or changes, no behaviour it invents, no contradiction with the task, the foundation or itself, and no place where the builder would have to guess in a way that changes the build.

## What I verified, and how

I ran these probes with the main checkout's `node_modules` (ESLint 10.12.0, Prettier 3.9.10), resolved from the worktree through its parent directories, in `.runs/spec-review/`:

- **Today's configuration gives these files no rules.** `eslint --print-config .claude/hooks/the-way-pin-check.mjs` returns `rules {}`, no globals, and `noInlineConfig: true`, because the global `linterOptions` entry already reaches them. `tests/quality/eslint-rule-sets.mjs`, run on the hook, `frames.js` and the `.agents/` copy of `compose-state.mjs`, returns `received` with 0 rules and `expected` with 64 rules, so ESLint's dot-directories are not skipped. An ESLint case of the scope test that lists these files is therefore red today and names them. Decision 4's "seen red first" is achievable.
- **The extended configuration gives two reports in the whole repository.** I took the real `eslint.config.mjs`, added `recommended` and `globals.node` for the three directories, and ran it on `.` as the gate does: `--max-warnings 0` with an empty suppressions file. Exactly two reports came back, `compose-state.mjs:18:7 'POINTS' … (no-unused-vars)`, one in each copy. Nothing else in the repository changes. With the same configuration, all seven files meet the published rule sets with 0 unmet rules, using the logic of the scope test's `unmet_rules`. So the `test_quality_invariants.py` ESLint case goes red on `POINTS` and only on `POINTS`, as Decision 4 asks.
- **Without the Node.js globals, `no-undef` reports appear**, so Decision 3's inclusion of `globals.node` is needed (see Note 1 for the count).
- **Prettier with D-32's flags** passes the hook, `compose-state.mjs` and `save-frames.mjs`. It fails `frames.js`, and the only difference is a `;` after the closing `}` (line 13). This matches the spec.
- **Copies and line endings.** `cmp` shows the three play scripts and `SKILL.md` are byte-identical across `.claude/skills/loop2-play/` and `.agents/skills/loop2-play/`. `git ls-files --eol` shows `i/lf w/lf` for all of them and for the hook.
- **Counts.** `.claude/hooks/` holds one file, and each copy of the play skill holds three scripts, so seven files in all. The scene-art skill holds 11 `.mjs` files per copy, 22 in total, as N3 and the table of Decision 1 say. The planner's "13" counted other files.
- **Nothing else depends on `POINTS`.** It occurs only on line 18 of the two copies of `compose-state.mjs`.
- **Quotations are faithful.** D-29's binding sentence, *Scope*, the "Changing the rule set…" sentence and *Rejected* are quoted correctly. So are D-32's identical scope and *Rejected*, D-28's sentence and its *Scope* (which includes agent-workflow), and `eslint-source-rules` (sentence and *Part*). Commit `8d211cbe` carries the subject the spec quotes. loop2#136's description reads "the new script … the same already holds for the older scripts of the game-playing skill", which supports reading the item as `loop2-play` and not scene-art.
- **The changes named for these entries are the ones needed and no more.** D-29 changes its binding sentence, *Scope*, *Rationale* and *Rejected*. `eslint-source-rules` changes its sentence and *Part*. The *Linter* paragraph of `guidelines/coding.md` changes. D-32, `prettier-source-format`, D-28, D-414 and the part map stay as they are. The part map lists no decisions per part, so N5 holds. D-28's "cover all code" is served by a wider D-29 and not contradicted. D-83's rule against reproducing pattern syntax is kept, because the constant uses plain path prefixes.
- **The chosen reading meets To do 16 without widening it.** It covers the session-start hook and the older play scripts, and only the linter, as the item names. Decision 2's argument for leaving the formatter out stands on the verified `frames.js` result.
- **The real-browser question of D-29's *Rejected* is answered by evidence.** ESLint reports nothing on `frames.js` (verified), so its shape does not change. The only shape change, the Prettier `;`, is left out by Decision 2. The one code change, removing a binding that ESLint itself reports as read nowhere, is shown by running both copies of `compose-state.mjs` and loading the result with `loadSavedGame`.
- **"Left to the maker" holds no hidden design choice.** It covers the form of the patterns, the constant's name and the docstring wording, where the `POINTS` comment goes, an optional `decision:` line, and the slice order, which is bounded by Decision 6.
- **The change of D-29 is within what the task carries.** The foundation step (`.the-way/task-cycle/skill/foundation_step.md`) raises a human question only for a change "beyond what the accepted task document … carries" (WAY-30). To do 16 itself names D-29 and the play skill's scripts, so the change is carried by the accepted task. The spec additionally puts the change and the reversal of the rejected option before the human in the request, which is more than the method requires and not a conflict.

## Non-blocking notes (they do not change the build)

1. **The `no-undef` count in *Constraints* is wrong** (spec line 77). The spec says "twelve further `no-undef` reports". My probe without the Node.js globals found 23: 3 in the hook, 2 in each copy of `compose-state.mjs` and 8 in each copy of `save-frames.mjs`. That is 13 for the hook plus one copy, and 23 for all seven files. The conclusion, that the files need `globals.node`, still holds. No step asks the builder to reproduce the count.
2. **The first bullet of *Constraints* calls the change of D-29 "one the cycle adds"** (spec lines 55–57). It is true that *Decisions in play* do not list D-29. But To do 16 names "Reguły lintera JavaScript (D-29)" itself, so the accepted task document carries the change. Marking the entry `the cycle's` and putting it before the human is harmless either way.

## Reaches beyond the handoff

- `foundations/part_map.md`, lines 1–30 and 120–154: whether the part map lists decisions per part, and that agent-workflow claims `.claude/**` and `.agents/**`, for N5 and Decision 4.
- `tests/invariants/loop2_invariant_support.py`, `listed_files` and `file_owners`: what "tracked or would-be-tracked" means in Decision 4.
- `tests/quality/test_quality_invariants.py`, whole: the ESLint run the spec says needs no change.
- `foundations/decisions.md` D-30 and D-31, and the invariants `ruff-source-rules` and `shellcheck-source-rules`. These were read only because they stood in the ranges I read.
- `.the-way/task-cycle/skill/foundation_step.md`, whole, and `.the-way/task-cycle/skill/SKILL.md`, lines 95–124: whether changing D-29 outside *Settlements to record* needs the human (WAY-30).
- `git show -s 8d211cbe` and `git log -S` on the *Rejected* sentence: the commit the spec cites.
- `gh pr view 136`, description searched for "older scripts", "new script", "hooks/**" and "only a human": the source of To do 16.
- A grep of the worktree, excluding `.runs`, `.the-way` and `node_modules`, for `POINTS`, `loop2-play/` and `.claude/hooks`: what depends on the files.
- `.claude/settings.json` was seen only through that grep hit (line 10).
- The main checkout's `node_modules` (`node_modules of the main checkout`), used read-only for the probes.

## Working copies

- `.runs\spec-review\` held two probe ESLint configurations, a copy of `eslint-rule-sets.mjs` pointed at the probe configuration, an empty suppressions file, the ESLint outputs, Prettier's formatted `frames.js`, and the description of loop2#136. I removed the whole directory before returning. I made no git worktree or clone, and `git status` of the worktree is clean.

**Unread material:** none. I read these whole: the handoff, the frozen task, the spec, `.the-way/task-cycle/spec/SKILL.md`, `.the-way/task-cycle/spec/review.md`, `AGENTS.md`, `guidelines/coding.md`, D-29, D-32, D-28 and D-414, the invariants `eslint-source-rules` and `prettier-source-format`, `eslint.config.mjs`, `tests/quality/test_source_tool_scope.py`, `tests/quality/eslint-rule-sets.mjs`, the one file of `.claude/hooks/`, the `.claude/skills/loop2-play/` files (`SKILL.md` and three scripts), and both reports. I did not read the `.agents/skills/loop2-play/` files as text; `cmp` shows each is byte-identical to its `.claude/` twin, which I read whole.

**Searches not found or unclear:** none.
