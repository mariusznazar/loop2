# Report — executor of slice 7: the scene: the wolf's run in through a pause and a resumption

**Status:** done

## Commits

- `cac04185766066e163fed8049f57d17a171daf67` — test: :white_check_mark: add the case of the wolf's run in through a pause and a resumption within its 300 ms, ... (range base `1f21cf914fcff94475e8e77c599091a1ec607a33`).

## Files changed

- `tests/view/scene.test.mjs`: +31 / -0 (one new case, placed after the case "the wolf runs in from the right edge at the reading whose events carry the attack, and stands at once at any other"). No product code changed.

## The case

"a pause and a resumption within the 300 ms of the wolf's run in keep the run, and only the end of its animation ends it". Steps: scene mounted on a waiting state; drawn on `inCombat()` with the `ATTACK` event (precondition: the wolf has `data-entering`); drawn again with `paused: true` and no events (asserts `data-standing="paused"`, the same wolf element, `data-entering` still set); drawn with `paused: false` (asserts `data-standing="going"`, same element, `data-entering` still set); `endAnimation(wolf)` (asserts `data-entering` gone). The break it catches (named before writing): removing `|| drawing.standing === "paused"` from the condition of `entering` in `src/browser/view/scene.tsx`, a bug, not a deliberate decision (D-316: the wolf runs in; D-322: the pause holds all motion of the scene, and a wolf that loses its run at the pause jumps to its place instead of being held on its way). Expected values are literals (attribute present / absent) from the foundation entries, not computed by the code under test.

## Checks (each with command and exit code)

| Check | Command | Exit |
|---|---|---|
| build | `npm.cmd run build` | 0 |
| focused, new case in place, product as it stands | `npm.cmd test -- tests/view/scene.test.mjs` | 0 (74 pass, 0 fail) |
| focused, **red**: the half `drawing.standing === "paused"` removed from `entering` (`(drawing.standing === "going" \|\| drawing.standing === "paused")` replaced by `drawing.standing === "going"`, in `src/browser/view/scene.tsx`) | `npm.cmd test -- tests/view/scene.test.mjs` | 1 (73 pass, 1 fail: the new case only, `Error: the run is held, not over: expected a true value, got false`) |
| restore | `git checkout -- src/browser/view/scene.tsx`, then `git diff --exit-code -- src` | 0 (empty diff: restored byte for byte) |
| focused, **green** after restore | `npm.cmd test -- tests/view/scene.test.mjs` | 0 (74 pass, 0 fail) |
| format | `npx.cmd prettier --check tests/view/scene.test.mjs` | 0 |
| lint | `npx.cmd eslint tests/view/scene.test.mjs` | 0 |
| slice check | `git status --short -- src` | empty (and `git status --short` is empty for the whole worktree after the commit) |

The full suite and `gate_times.py` were not run (the orchestrator's alone). `foundation_check.py` and `check_instructions.py` were not run (not in the slice's checks; the new comment lines quote the two decision passages the neighbouring cases already quote word for word).

## Own-work check (section 3)

- Requirement most likely not met: the case must fail for the named reason alone — the half `paused` removed — and not for another (for example, the pause dropping the effect or rebuilding the wolf's element, or the case passing vacuously because the run is only visible through CSS that jsdom does not read).
- Check: assertions at the pause are of the same element and of `data-entering` (an attribute the scene writes itself, which jsdom shows; the stylesheet rules for `[data-entering]` sit inside `@media (prefers-reduced-motion: no-preference)`, which jsdom does not read, so the case asserts the attribute and not the computed animation). The red run above fails at the assertion `"the run is held, not over"`, the first assertion that follows the pause, which is the assertion this change is meant to carry; every other case of the file (73) stays green with the half removed.
- Showed: red with the half removed (exit 1, only the new case), green restored (exit 0).
- Mutation in the head: removing the `going` half instead would fail the case at its precondition and the existing run-in case; a key of the wolf element that changes at the pause would fail the "same element" assertion; a run that is not ended by the end of its own animation would fail the last assertion. Not caught by this case: the end of the run at the resumption (`resumed` taking `entering` away at `paused: false`) is caught by the "goes on" assertion.

## Reaches beyond the handoff

- `src/browser/run-screen.css` (grep of `data-entering` and `scene-creature`, lines 639-744, 1203-1252, 1420-1427): to see whether the run's frames are readable on jsdom. They are not (inside `@media`), so the case reads the attribute. Reason: the choice of what the case asserts.

## Working copies

None made. Logs of my runs stood in `.runs/executor-7-*.log` (ignored by git); removed before returning.

## Plan / code mismatches

None. One note: the plan's range for `foundations/invariants.md` and the decisions differ from the handoff's current ranges; I read the handoff's current ranges.

## Choices

- Placed the case beside the existing run-in case (the file's cases of the run in), as the slice says. Rejected: a case at the end of the file; cost if wrong: only the reading order.
- Asserted the attribute and the element identity, not the computed `animation-play-state`, because jsdom reads no rule inside the media query (see the reach above). Cost if wrong: the case does not cover the stylesheet's holding of the run at the pause; the existing case "at the stop at a discovery ..." and "every stop holds every animation of the scene" cover the stop's CSS.

## Problems observed

- A hook of the session (`rules-on-demand`) refused the first call of a script and of a `git commit` once each, asking for the rules files to be read; both calls were repeated unchanged afterwards. No effect on the work.

**Unread material:** `guidelines/styleguide-browser-view.md` — read lines 1-607 of 1166 (roles, token rules, controls, menu bar); the remainder (screens' rules) not read: this slice changes a test, no screen or style. Everything else the handoff names was read whole: `tests/view/scene.test.mjs` (all 2889 lines before the change), `src/browser/view/scene.tsx`, `tests/view/page-document.mjs`, `guidelines/testing.md` (all 495 lines), `guidelines/coding.md`, D-316, D-322, `document-test-memory-limit`, `foundations/part_map.md:3-31`, the handoff's passage of the task (To do 2), `make-change/SKILL.md` and `slice.md`.

**Searches not found or unclear:** none
