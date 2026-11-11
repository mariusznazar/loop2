# Return step report — repo-na-zrzuty

**Status:** done. One commit on `task/repo-na-zrzuty`, from head `95ecb61`: `3a8b2b4` (foundation only, `foundations/decisions.md`, +2 / -2). Nothing pushed.

## Return step

- **Foundation compared with code:**
  - D-357 against the skill `loop2-play` (both copies): place, branch `loop2/<cycle>`, directory `loop2/<cycle>/`, link to a commit with `?raw=true`, never to a branch or `raw.githubusercontent.com`, nothing in the repository of loop2 — matches. One thing was in the skill and not in the decision: how the directory of a cycle is named (the skill says "named as the cycle's directory under `.runs/task-cycles/`"). It binds later cycles and the links they make, so the decision now says "named as the directory of the cycle's own record" and the branch "the name of that directory" (corrected, commit `3a8b2b4`).
  - D-358 against the skill: the owner's `gh` account, no step of the human, pushed by the agent itself — matches; the skill's "never to `main`" is D-357's.
  - D-359 against the skill and the facts: the rule (MCP only from a session started in the worktree of the cycle) matches the skill's first sentence of its MCP part. Its rationale said the CLI "keeps the default session apart", but the fact it rests on, `playwright-cli-sessions-per-workspace`, no longer speaks of the default session (the review's split) — corrected to "keeps the sessions of each workspace apart from those of every other" (commit `3a8b2b4`).
  - The facts `playwright-mcp-persistent-profile`, `playwright-cli-workspace-directory`, `playwright-cli-sessions-per-workspace`, `screenshots-repository-visibility`: each compared with the text that cites it (D-359, D-357, the skill's MCP part); the sentences are the ones the sources give and no dependant says more than they do. The visibility of `mariusznazar/screenshots` was read as public on 2026-11-11 (`gh api`), the same day the entry was written; not re-read.
  - The decisions the task names: D-254 (unchanged; D-359 narrows it by `Relations`; its "the evidence in the request" and "a Playwright test left in the repository" still match the skill); the-way's WAY-316, WAY-317, WAY-319 (and WAY-219, WAY-318): the skill puts no screenshot file in the repository or the record, embeds from the product's place, shows only screenshots, says "looked at and not shown" when the push fails, closes the browser at the end — matches.
  - The search of the foundation: the product's decisions and invariants hold no other sentence on screenshots, on the `loop2-play` skill or on Playwright MCP besides D-254 (`grep -i "screenshot\|loop2-play\|worktree\|playwright mcp"`); D-255 (checks on an account made on the local start) already makes the skill's "only made-up accounts" true, so that reminder in the skill is no new rule. The part map of the touched parts: `agent-workflow` (files `.claude/**`, `.agents/**`, trust boundary none) and `product-foundation` (`foundations/**`) match the files changed; the External-context row of the repository for screenshots stands (its being outside the task is the review's Minor 5, left to the request's list).
- **Decisions written or changed:** D-357, D-358, D-359 written by the change; D-357 and D-359 corrected by this step (`3a8b2b4`). D-254 not edited.
- **Invariants written or changed:** none (the task, the decisions and the human set no rule that a commit can break and a test can see).
- **Environment facts:** none beyond those the change wrote (`playwright-mcp-persistent-profile`, `playwright-cli-workspace-directory`, `playwright-cli-sessions-per-workspace`, `screenshots-repository-visibility`). Considered and not written: that GitHub shows an image embedded by `blob/<commit>/<path>?raw=true`. It rests only on the precedent of PR #67, which D-357 quotes in *Based on* as a past event; no page of GitHub says it, so no source for a fact exists (a model's memory is no source).
- **Glossary terms:** none. "Task cycle" and "worktree" are used as the process and git use them; no sentence of the new entries reads differently for a reader who takes the field's meaning, and the-way's own glossary and decisions use "task cycle" without an entry (WAY-95).
- **Part-map changes:** none in this step (the External-context row for `mariusznazar/screenshots` was written by the change).
- **Projected entries written whole or in part:** none (the task carries none).
- **Rows of *Settlements to record* written:**

| Row | Entry |
|---|---|
| 1 | D-357 |
| 2 | D-358 |
| 3 | D-359 (narrows D-254; D-254 not edited) |
| 4 | `playwright-mcp-persistent-profile` |
| 5 | `playwright-cli-workspace-directory` and `playwright-cli-sessions-per-workspace` (the one entry of the first writing, `playwright-cli-workspace-sessions`, was split in the fix of the review's Minor 3; it never reached the main branch) |

Entries the cycle wrote that no row carries (for the request's item 6, marked `the cycle's`): `screenshots-repository-visibility`; the External-context row of the part map; in D-357 the branch `loop2/<cycle>` and the naming of the cycle's directory after the cycle's own record.

## Choices that bind after the merge (WAY-36)

- The branch of a cycle `loop2/<cycle>` and the naming of its directory: written into D-357 (the first by the fix, the second by this step), since both bind every later cycle. No exclusion of an entry for them in the task. The detail of the commands (clone in `.runs/screenshots/`, `switch ... || switch -c ...`) stays in the skill: it is a way of doing, no rule a decision needs.

## Not done, by the handoff

The review's unfixed findings (Minor 4 of the review of the whole change, Minor A and B of the review of the fix, Minor 5) are not fixed and no entry is written for them; they stand for the request's list.

## Checks (command -> exit code)

- `python -B .the-way/elements/common/foundation_check.py` -> `0 errors`, exit 0, after the corrections.
- `npm test -- tests/agent_workflow/test_loop2_play_skill.py` -> exit 0 (8 tests OK). The skill is not touched in this step; the run shows the copies still equal.
- Not run: the full `npm test`.

## Own-work check

Requirement most likely missed by this step: that after the corrections no entry says what the skill does not and the skill says nothing the entries contradict. Check: reread D-357, D-358, D-359 and the skill's two parts (screenshot and MCP) side by side after the edit; `grep -n "default session"` in `foundations/` finds none now; the foundation check and the skill's test pass (above). A case left unchecked: a link to a commit that lies only on a non-default branch of the real repository (needs a push; out of scope), as in the earlier reports.

## Unread material

- `review-whole-report.md`, `review-fix-report.md`: not read; the handoff gives their unfixed findings by name and the return step needs only the foundation and the code. The text of Minor A and Minor B of the review of the fix is therefore unknown to me; nothing in this step touches what they may concern, which I cannot state.
- From the earlier reports, still unread: most of the invariants file and the glossary entries (the glossary was searched for the words used; no entry applies), the examples of the elements, the `projected.md` files, `first_map.md`, the glossary and invariant element skills.

## Searches not found or unclear

- A page of GitHub that says an image embedded by `blob/<commit>/<path>?raw=true` renders in a description: not found; the form rests on the precedent of PR #67.
- Whether Minor A and Minor B of the review of the fix touch an entry this step compares: not known (reports not read); the handoff says not to fix them.
