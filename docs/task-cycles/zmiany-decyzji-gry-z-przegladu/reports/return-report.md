# Return report — zmiany-decyzji-gry-z-przegladu

**Status:** done.

**Commits:** `no commit`. Head stays `dd0e6cb6`; the worktree is clean (`git status --short` empty). Nothing needed correction or writing, as each item below shows.

## Checks

| Command | Exit code |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (run on the head `dd0e6cb6`, no change made after) | 0 (`0 errors`) |

Not run: `npm test` (the orchestrator's). No test read or changed, so `guidelines/testing.md` was not read.

## Foundation compared with code

Each entry compared with the code of the base worktree (the head `dd0e6cb6` changes no code but one comment). The result is "nothing no longer matched" for each.

| Entry | Compared with | Result |
|---|---|---|
| D-369 (and the guideline rule, the comment of `SAVED_GAME_VERSION`) | `src/browser/sim/run-record.ts:14-22` (`MINUTE_KINDS` = keys of `ACTIONS` without a combat effect, plus `"wait"`, `"combat"`); `src/browser/sim/saved-game.ts:987` (`fields(read.minutesByAction, MINUTE_KINDS)`) | matches |
| D-346, D-383 | `src/browser/view/chronicle.ts:124-125` (`let tab = "chronicle"; let filter = "all"` in `createChronicle`); `git grep` for `localStorage`/`sessionStorage` in `src/browser/view`: no hit, so no pick is kept through a reload | matches |
| `streak-program-change` | `src/browser/sim/programs.ts:581` (`const zeroed = !mapRunEnded(run) && ruleContentChanged;`); `switchProgram` throws on an ended map run (`programs.ts:720-745`); the test `tests/invariants/test_streak_program_change.py` ran green (exit 0, 5 tests) in the first stage | matches |
| D-120 | `src/browser/sim/data/skills.ts` (`campfireCrafting`: "Wytwarzanie ogniska", `craftCampfire`, `feedCampfire`); `src/browser/sim/data/actions.ts` (label "Wytwórz — ognisko", "Wędruj"); `tests/sim/repertoire.test.mjs:77,147` (`OPEN_TO_ALL = ["wander", "walkTo", "walkToCampfire"]`) | matches |
| D-186, D-179, D-180 | `src/browser/view/trip-lines.ts:88-100` ("Wyniesie" line from `run.bringPlan` against `run.copy.program.tripPlan.bring`); `src/browser/sim/programs.ts:720-770` (`switchProgram` takes a fresh copy, the snapshot `bringPlan` stays); `src/browser/view/program-panel.tsx:635` (the trip plan view only for `mode === "programs"`) | matches |
| D-311, D-282 | `src/browser/styles.css:253-262` (one column `"world" "program" "tabs"`), `:279` (`@media (min-width: 1074px)` two columns) | matches |
| D-367 | `src/browser/view/scene.tsx:612-625` (`if (drawing === null || started)` clears the shown effect; a stopped scene after a death keeps it) | matches |
| D-136, and the 25 other places of item 8 | wording only; the places were classified by their context in the first stage (`author-report.md`) | matches (no code reading) |
| D-393 | `.claude/skills/loop2-play/SKILL.md:240` (`page.setViewportSize({ width: 1280, height: 720 })`, the page area); `src/browser/styles.css` comments (1280 px, 720 px, 1074 px as page widths); `git grep -i -E "safari|webkit|firefox|chromium"` in `foundations`, `guidelines`, `README.md`, `AGENTS.md`, `src/browser/AGENTS.md` and the skill `loop2-play`: no use that contradicts the set or the window | matches |
| Glossary `loop` | `git grep -i -w loops?` over all tracked files outside `decisions.md`: the uses outside code identifiers are the previous game (`environment_facts.md:61`, `invariants.md:107, 1290`), the literal readiness line `Loop: <address>` and `loop clock`; the one earning-loop use (`loop-practice-payment`) was corrected in the first stage | matches |
| `loop-practice-payment` | `tests/sim/loop.test.mjs:878, 924, 952` cite the identifier; the sentence changed by one word | matches |
| *Decisions in play* of the task (D-206, D-343, D-379, D-180, D-282, D-131, D-136) | read whole in the first stage; D-206, D-131, D-343, D-379, D-180, D-282 are not changed | match |
| Part map: `product-foundation`, `simulation`, `agent-workflow` | `foundations/**`, `src/browser/sim/**` (`saved-game.ts` as the trust boundary: the diff is the comment alone), `guidelines/**`, `src/browser/AGENTS.md`, `.claude/**` all fall in the entries' *Files*; no file was added, moved or removed | no change needed |

## Entries of the return step

- **Decisions written or changed:** none in this step (D-369, D-346, D-383, D-120, D-186, D-179, D-311, D-367, D-136, D-393 and the item-8 places stand as the change wrote them).
- **Invariants written or changed:** none in this step (`streak-program-change` is row 3 and `loop-practice-payment` the one-word correction, both from the change).
- **Environment facts:** none. Judged by the return step's rule ("each source outside the product that the change rests on and the foundation does not hold, as a fact where the template's section 'Which facts are written' asks for one"):
  - The claim in D-393's *Rejected*, that the Playwright in use does not install WebKit on this computer, is no citation that D-393 rests on. The rule of the template is "a fact entry for every citation that, once it stopped being true, would call the decision into question". If WebKit began to install, the set of D-393 (Safari outside it) would stand, because the exclusion of Safari is the human's choice, and the claim stands only as the cost kept beside a rejected way ("Firefox added to the way an agent plays the game in a browser"), a past event of the kind the template says is quoted, not written as a fact. D-393's *Based on* reads `none`, and the template says "what is not yet known, or the decider's own motive, is no source outside the product".
  - A fact needs a source ("a fact without a source is not written", WAY-80): the claim's only sources in the task are the review note and a question's *Not chosen* line, not an address with a passage nor a reading run on this host. A reading run for it (`playwright install webkit` or a listing of installed browsers) would test a claim that no sentence of the foundation depends on.
  - The other outside sources the change rests on are already held or are no citations: Playwright with Chromium for the agent's checks (facts `playwright-cli-*`, `playwright-mcp-persistent-profile` stand in the file, and D-393 names the practice only as an accepted cost), and the release lines of Chrome, Edge and Firefox (a choice of the human, not a finding about the world).
  - Recorded as a judgement, not a deferral: the reviewer marked "D-393's missing *Based on* fact" outside the task, and my reading by the rule gives the same answer for a different reason (the decision does not rest on it).
- **Glossary terms:** none new. `loop` was written in the change (row 2). A word of D-393 that might take an entry under WAY-95: "page area" ("the area of the page inside the browser's window") — D-393's second sentence defines it where it first stands, and a reader who knows the field reads it as the viewport, the same thing; "window" there is the browser's window, and the end-of-run window of D-311/D-368 always carries its qualifier, as before the change. No term used against its entry was found.
- **Part-map changes:** none.
- **Projected entries written whole or in part:** none (the task is no project's task).
- **Rows of *Settlements to record* written:** row 1 — D-393; row 2 — glossary `loop`; row 3 — `streak-program-change` (all three written in the change, none missed).
- **A choice that binds after the merge:** none further. The one the change takes outside the task's rows — which decisions keep their meaning below the smallest window — stands in D-393's binding sentence (the fix of the review). The orchestrator's autonomous choice of D-136 stands in the decision's text.

## Left to the request's list (the reviewer's scope; not fixed, not entries)

By the handoff: the docstring of `tests/invariants/test_streak_program_change.py` quoting the old sentence; the glossary template's rule for the carrier of *Not* (`earning loop` holds the word `loop`); the gap in D-136's binding sentence ("not ended"); bare "loop" in code comments (for example the comments of `src/browser/sim/loop.ts`, which mean the earning loop); D-393's missing *Based on* fact (above: judged an entry the return step need not write); the new Minor of the review of the fix, D-393's named list omits D-349 and D-370.

None of these is an entry the return step must write by its own rule: a docstring and code comments are no foundation entries; the template rule and D-136's sentence are outside the task and the reviewer's scope.

## Unread material

- `.the-way/task-cycle/record_template.md`: read only the *Return step* section (lines 161-179) and the lines around it by search, not the file whole; the handoff names the section.
- `.the-way/elements/environment-facts/template.md`: read the first 80 lines (to "The sentence"); the rest (the sentence rules, catalogues, changing a fact) stayed unread because no fact was written.
- `.the-way/elements/environment-facts/skill/`: `SKILL.md`, `decide_entry.md`, `draft.md`, `write.md` read; `read.md` and `projected.md` not (no entry written, projected mode does not apply).
- `reports/review-whole-report.md` and `reports/review-fix-report.md`: not opened; their content reached me through `findings-1.md`, the handoff and the coordinator's messages.
- The decisions D-62, D-370 and others compared by the first stage's reading; not re-read for this step.

## Searches not found or unclear

none
