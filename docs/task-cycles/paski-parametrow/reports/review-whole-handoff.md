# Handoff — review of the whole change — task `paski-parametrow`

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator. The orchestrator's answers are never that person's approval. You ask no human; questions go back to the orchestrator in your report (status `questions`).

## What you review and where
- Worktree (your working directory): `the root of the task's worktree`, branch `task/paski-parametrow`. `.the-way` is at `b502011f`, equal to the gitlink.
- Method of your stage: `.the-way/task-cycle/review/SKILL.md` (`review-change`), the review of the whole change — read it whole, then `whole_change.md` and the other files of the method when the step that names them comes.
- Range: base `51667231eafb32db53eaaf662f07e728323aa2ba` (the task's base) to head `51e2a43a` (`git rev-parse HEAD` must show a SHA that starts so; on a mismatch ask which range to review). Compute the diff yourself.
- You are read-only: you change no file of the repository. Write your report to `.runs/task-cycles/paski-parametrow/reports/review-whole-report.md`; its first line is `PASS <sha>` or `FAIL <sha>` (or `questions`). The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); if the harness refuses the write, return the report whole as your answer. The report ends with **Unread material** and **Searches not found or unclear** (`none` is an answer) and names, for each blocking finding, the slice it comes from or that it comes from none, and its mark `Contradiction: yes` or `no` against the settlements of the task. Minor findings within the task are listed in the report, each in your words, with its place in the code, apart from those you mark outside the task's scope.
- Your directory for working copies: `.runs/review-whole/`. No handoff here tells you to run the product's gate (no bare `npm test`): the gate is the orchestrator's (the full run waits for a signal and is not yours); a focused check (`npm test -- <one file>`) is yours where a finding needs it.
- `cycle.md` and the other files of the cycle's record directory are not yours to read unless this handoff names them.

## The task and the cycle's answers
- Frozen task, read whole: `.runs/task-cycles/paski-parametrow/task.md`. Plan, read whole: `.runs/task-cycles/paski-parametrow/plan.md` (9 slices and *Foundation entries*; its line ranges of `foundations/decisions.md` are stale — find a decision by its identifier).
- No spec (no open design choice). Route: planned slices, one after another, none with a review of its own (no slice names a trust boundary or an operation that cannot be undone): **you judge every slice**, and the foundation entries of the plan.
- Two questions at start: the change touches no trust boundary; it holds no operation that cannot be undone (the screenshots are pushed by the slice's agent to the public screenshots repository on a branch of its own, never `main`, as D-418 and D-419 settle — that is a settled route).
- The task did not move the pin. No Minor or out-of-scope findings of slice reviews exist, since no slice had a review.
- The criterion the human will judge the request on is the acceptance criterion of the task: the parameters of a character on the screen of a map run must read at least as well as in the old Loop. Judge the change against it, with the screenshots below.

## The ranges (each slice's range; none had its own review)
| Slice | Range | Change |
|---|---|---|
| Foundation entries | `51667231..7308e0bd` (the entries agent) | `foundations/decisions.md`, `foundations/invariants.md` |
| 1 | `7308e0bd..503afd92` | `src/browser/tokens.css`, `tests/invariants/test_design_token_contrast.py`, `guidelines/styleguide-browser-view.md` |
| 2 | `503afd92..8bc77a31` | `react-button.tsx`, `styles.css`, `shared-controls.test.mjs` |
| 3 | `8bc77a31..2a0811aa` | kitchen-sink samples and `kitchen-sink.css` |
| 4 | `2a0811aa..2cfee2ed` | `world-area.tsx`, `body-row-cells.tsx`, `world-area.test.mjs`, `body-row-cells.test.mjs` |
| 5 | `2cfee2ed..3107f6f7` | `body-row.ts`, `body-blow.ts` and their tests |
| 6 | `3107f6f7..d5dcff73` | `run-screen.css`, `body-row-cells.tsx`, `body-row-cells.test.mjs` |
| 7 | `d5dcff73..a7a0108a`, repair `a7a0108a..8836c61a` | `body-row-cells.tsx`, `run-screen.css`, `body-row-explanation.test.mjs` |
| 8 | `a7a0108a..bb600781` | `run-screen.css`, `body-row-cells.tsx`, `world-area.tsx`, `body-row-motion.test.mjs`, and one `export` in `scene-picture.ts` |
| 9 | `8836c61a..51e2a43a` | `guidelines/styleguide-browser-view.md` |

## Reports of the agents that made the change (claims to verify, not evidence)
In `.runs/task-cycles/paski-parametrow/reports/`: `foundation-report.md` (the agent of the plan's *Foundation entries*; slice 1 had no review of its own, so this report is given with the executor's), `executor-1-report.md` … `executor-8-report.md` (the repair of slice 7 stands as an addendum at the end of `executor-7-report.md`), `executor-9-2-report.md` (an earlier executor of slice 9 was lost before it returned; the report is of the one that made the slice). Read each.

## Mismatches and open points that the mechanical checks passed on, for you to judge
- Foundation entries: the agent's Unread material — the binding sentences only of D-125, D-133, D-265, D-395, D-396, D-407, D-421, D-57; D-322, D-317 left to their *Verification*; the *Relations* lines of the derived decisions. Marks `the cycle's` for D-39, D-44, D-450 are left to the request (the human accepts them at the merge). D-04: reduced motion only in CSS. A paragraph of D-44 of its own was accepted.
- Slice 1: the values of the five roles and the dim opacity were chosen by the executor with a `Source:` each (ruling: the task, accepted by the human as a whole, is the settlement; the request shows them for the human's veto). It read D-337/D-450 only by their search lines.
- Slice 2: the fill colours of the cell stand in `styles.css`, not `run-screen.css` as the plan's Choices said (the kitchen-sink page links only `styles.css`); no rule added in the `@media (width < 1280px)` block (the `.button` rule covers 48 px); the resting roles of the name (`text-label`) and the number (`text`) chosen by the executor; Unread: styleguide lines 700–1633, `task.md:161-224`.
- Slice 3: the first return was repaired once (report outside the worktree, decisions D-44, D-45, D-39, D-40, D-269 unread, no sample of the scale form of the cell, a console error undiagnosed); the second return was accepted; the styleguide's exception list had no entry for the cell kind (slice 9 writes it).
- Slice 4: the moved range was lines 561–768 at the base; the new cases render `BodyRowCells` alone with assertions unchanged; helpers duplicated across two test files; the function-and-file-size and node-test-selection invariants were not run by the executor (the full gate covers them).
- Slice 5: the zone border is tied to `BALANCE.body.chilledBelow`, not a constant; `temperatureZones()` added; **the marker of a killing blow sums the creature's strike `damage`, not the health actually lost** (e.g. „−14 · wilk” at 8,65 lost); the number keeps its unit („82 %”); Unread: styleguide 741–1192 and 1399–1599 by choice.
- Slice 6: no rule in the `@media (width < 1280px)` block (the row wraps by itself); the scale's marker also moves over 500 ms; class `holds-marker` for slice 8; `bodyCells` and `bodyValues` of `body-row.ts` are now unused (left, a test holds them); concerns: bars animate after „Restart” (not counted as a first draw), the dark marker merges with the gap between zones near 35 and 39 °C, the amber frame at a fire was not seen in the browser by it.
- Slice 7: the desktop check was at 1600 × 1000, not 1280 × 720; no `aria-controls` from the button to the explanation (needs a prop on the shared button); `foundation_check` was not in its checks and later found five wrong quotations in its test file, repaired at `8836c61a`; Unread: part of the styleguide, part of `task.md`, part of `styles.css`, verification of D-04.
- Slice 8: one `export` added to `standingOf` in `scene-picture.ts`, outside its *Change* list (the body row reads the scene's own standing); shake ±4 px, the text rising 12 px, pulse curve `ease-in-out` chosen by the executor; not checked in the browser: 8× and 16×, a second blow replacing the first, a marker held in the pause; Unread: several decisions and parts of the styleguide.
- Slice 9: Unread — D-47, D-395 not read; D-317, D-322 only their statements; `run-screen.css` before line 590 and `styles.css` outside 299–651; `tokens.css` values taken from slice 1's report; `walkthrough.md` not read (no behaviour changed). **Its finding for you to judge:** the dark marker of the temperature scale is a 2 px line in the middle of the grey safe zone, and at 37,0 °C and 36,1 °C it looks like one more gap between zones (a probe in its report: the gaps are 1 px of `panel`, the marker 2 px of `page`); it bears on the acceptance criterion. It saw the amber frame at a fire (screenshot 03). Not seen by anyone: the blow marker in a browser; the blow text over the temperature cell in the phone layout's two rows of two. The phone measurement flags (`div.world-area` content 330 > box 318 and two more) stand at the base commit `51667231` too, measured by slice 9's executor.
- Known open points of the whole: tests of the explanation and the motion run in jsdom (frame assertions are limited there); no `aria-controls`; nothing reads the styleguide in a test.

## Screenshots (for the criterion; they never enter the repository or the record)
Fetched by you into `.runs/review-whole/` if you wish to look (an image view, `gh api`, `curl`); link prefix: `https://github.com/mariusznazar/screenshots/blob/97922f0683a59447f3bc50f72ca89088d356e7aa/loop2/paski-parametrow/<file>?raw=true`, files: `loop_06_przejscie_ekran.png` (old Loop, start), `loop2_01_start_1600x1000.png` (new, start), `loop_11_run_w_ruchu.png` (old, a value below its threshold), `loop2_02_below_threshold_1600x1000.png` (new), `loop2_03_fire_and_explanation_1600x1000.png`, `loop2_04_phone_360_below_threshold.png`, `loop2_05_phone_360_explanation_open.png`. Slice 9's report says what each shows and what its agent saw; look yourself before you rely on it. Remove what you fetched before you return.

## Reading
You select your own foundation and guidelines by the method (the parts the change touches: browser-view, with `guidelines/styleguide-browser-view.md` whole, `guidelines/coding.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`). The decisions of the task's *Decisions in play* — D-337, the new D-450, D-311, D-178, D-39, D-40, D-42, D-44, D-04 and the invariant `design-token-contrast` — are written in this change itself: judge that each says what the task settles and that the code and the rule of the styleguide say what they say.

## Working copies — copied word for word from the cycle's skill
An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.
