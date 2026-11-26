# Handoff — executor of slice 9 — task `paski-parametrow`

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator. The orchestrator's answers are never that person's approval. You ask no human; questions go back to the orchestrator in your report (status `questions`).

## Where you work and what you make
- Worktree (your working directory): `the root of the task's worktree`, branch `task/paski-parametrow`, HEAD at the start of your work `8836c61a`. `.the-way` is at `b502011f`, equal to the gitlink; `node_modules` is installed in the worktree.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md`, variant "a slice, or the retry of a slice" — read it whole, then `.the-way/task-cycle/change/slice.md` as it gives; read other files it names only when their step comes.
- You make slice 9 of the plan below, and only it. Commit on the branch, by path (`git add <path>…`, never `-A`, `.` or `commit -a`), in English; the commit message has the form of the repository's earlier commits (`type: :emoji: text`).
- Your directory for working copies: `.runs/executor-9-2/`.
- You replace an earlier executor of this slice (`executor-9`), whose session was cut off before it returned: it left no commit, no report and nothing in the screenshots repository (the branch `loop2/paski-parametrow` does not exist there yet), only a directory of working files, `.runs/executor-9/` (`compose.mjs`, `send-*.js`, `state-*.json`, `local.log`, `old/` and `new/` with PNG files, `crop-*.png`). Its files are unreviewed and the screenshots in them are not yours to trust: take your own, look at each yourself, and use the scripts only as hints for composing a state. Before you return, remove `.runs/executor-9/` as well as your own directory, by the full path written out in the command, and say so in the report. Do not count this as a retry; you are the slice's executor at the class the plan sets.
- Report path: `.runs/task-cycles/paski-parametrow/reports/executor-9-2-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); if the harness still refuses the write, return the report whole as your answer. The report ends with **Unread material** and **Searches not found or unclear** (`none` is an answer), holds each check with its command and exit code, your own-work check as the method gives it, and names every departure from the task's answers and from the plan with its reason.
- Run no full gate (no bare `npm test`): the checks of the slice are focused (`npm test -- <one file>` runs exactly one Node or Python test file). The full gate is the orchestrator's.
- Frozen task: `.runs/task-cycles/paski-parametrow/task.md`; the plan: `.runs/task-cycles/paski-parametrow/plan.md` — read in them the passages the slice's *Read* names; `cycle.md` and the other agents' handoffs and reports are not yours unless named here.
- The foundation entries of the task are already written (commit `7308e0bd`): D-337, the new D-450, D-311, D-178, D-39, D-40, D-42, D-44, D-04 and the invariant `design-token-contrast`; read each entry your slice's *Read* names as it stands now, whole. Current ranges (the plan's line ranges of `foundations/decisions.md` are stale; these hold):
D-4: foundations/decisions.md:59-217
D-337: foundations/decisions.md:10966-11078
D-450: foundations/decisions.md:11299-11355
D-311: foundations/decisions.md:10678-10818
D-178: foundations/decisions.md:7224-7256
D-39: foundations/decisions.md:5012-5038
D-40: foundations/decisions.md:5039-5057
D-41: foundations/decisions.md:5058-5072
D-42: foundations/decisions.md:5073-5089
D-43: foundations/decisions.md:5090-5104
D-44: foundations/decisions.md:5105-5123
D-45: foundations/decisions.md:5124-5138
D-47: foundations/decisions.md:5154-5168
D-48: foundations/decisions.md:5169-5183
D-38: foundations/decisions.md:4997-5011
D-265: foundations/decisions.md:4396-4443
D-395: foundations/decisions.md:4769-4783
D-396: foundations/decisions.md:5551-5571
D-407: foundations/decisions.md:4784-4800
D-421: foundations/decisions.md:4863-4877
D-279: foundations/decisions.md:5520-5550
D-317: foundations/decisions.md:11915-12005
D-322: foundations/decisions.md:12148-12218
D-57: foundations/decisions.md:6309-6324
D-58: foundations/decisions.md:6325-6340
D-59: foundations/decisions.md:6341-6354
D-60: foundations/decisions.md:6355-6370
D-387: foundations/decisions.md:6627-6645
D-175: foundations/decisions.md:7139-7163
D-377: foundations/decisions.md:7496-7511
D-136: foundations/decisions.md:5987-6017
D-130: foundations/decisions.md:5780-5807
D-18: foundations/decisions.md:316-341
D-125: foundations/decisions.md:7846-7873
D-133: foundations/decisions.md:5911-5946
D-201: foundations/decisions.md:7463-7482
D-324: foundations/decisions.md:10819-10839
D-334: foundations/decisions.md:10840-10895
D-335: foundations/decisions.md:10896-10928
D-336: foundations/decisions.md:10929-10965
D-368: foundations/decisions.md:11171-11209
D-369: foundations/decisions.md:11210-11232
D-370: foundations/decisions.md:11233-11260
D-371: foundations/decisions.md:11261-11279
D-385: foundations/decisions.md:11280-11298
D-418: foundations/decisions.md:1678-1692
D-419: foundations/decisions.md:1693-1707

  Invariants (`foundations/invariants.md`): `browser-view-token-values` 478, `browser-view-focus-outline` 488, `design-token-contrast` 498, `design-token-sources` 508, `application-build-kitchen-sink` 518 — each to the next `##`.
- Names the entries gave the five new roles: `satiety-fill`, `chill-zone` (also the bluish frame), `safe-zone`, `scale-marker`, `warming-frame` (the amber frame; named so because `outline` is the CSS property kept for keyboard focus, D-47).
- Rulings of the orchestrator that bind you: (1) the task is the human's accepted text, so where it says the agent chooses a value of a role, you choose it and write it with its `Source:` in `src/browser/tokens.css`, naming it in the report so the request can show it for the human's veto; (2) reduced motion and the standing of game time are handled in CSS alone where possible (D-04 lets the view read the reduced-motion setting only for the scene; if your slice cannot do without reading it in TypeScript, return `questions`); (3) a killing blow while game time stands: the marker appears and stands still at its first frame, going on when time goes on; (4) the explanation on a click and the blow marker are the decisions D-450, the rest of the body row D-337.
- The tests the plan leaves failing at the base of this slice: none, save that `python -B .the-way/elements/common/foundation_check.py` prints one line about `design-token-contrast` having a changed sentence while its test is unchanged, which slice 1 resolves.

## Additions of the orchestrator to the slice
- Reading rule: read every file and decision your *Read* names, whole; list as unread only what you could not read, with the reason. The styleguide you change is read whole (all of it), since you write a rule in its form and a list in its rule.
- What the earlier slices made (code is the source; commits `7308e0bd` entries; `503afd92` roles and values in `src/browser/tokens.css` with the styleguide's Roles table and contrast rule; `8bc77a31` shared button kind `value-cell`; `2a0811aa` kitchen-sink; `2cfee2ed` and `3107f6f7` component and pure functions; `d5dcff73` cells, bars, scale, frame; `a7a0108a` and `8836c61a` the explanation; `bb600781` pulse and blow marker). Read besides the plan's *Read* the decisions D-450, D-311, D-39, D-40, D-42, D-44, D-337 as they now stand (current ranges above), and the code of `src/browser/view/body-row-cells.tsx`, `src/browser/view/body-blow.ts`, `src/browser/run-screen.css` (the body row's rules about lines 625–790 and the motion rules the slice-8 executor added beside them) so that the rule you write says what the code does and points to values instead of writing them.
- Open points from the slices that the rule and the exception list must carry: the styleguide's list „Kontrolki odstępujące od tej listy stanów” has no entry for the cell kind of the shared button (its tor stands in `highlight`, the colour of a button's background under the pointer; D-40, D-44); the cells stand in two pairs and break into two rows of two where four do not fit, with no threshold of width; the shared look of the cell, with the colours of its fills, stands in `src/browser/styles.css` (the kitchen-sink page links only that file), the rules of the row in `run-screen.css`; the resting roles of the name (`text-label`) and the number (`text`) were chosen by the slice-2 executor because D-40 does not name them.
- The departures from the task's answers and plan that your report must gather (*To do* 9; each executor's report is `reports/executor-<n>-report.md`, `reports/foundation-report.md`; read those you need, they are named here for that purpose and no other): values of the five roles and of the dim opacity chosen by the slice-1 executor with their sources (in `src/browser/tokens.css`); the fill colours of the cell placed in `styles.css`; no rule in the `@media (width < 1280px)` block since the row wraps by itself; the zone border follows `BALANCE.body.chilledBelow`; the killing-blow marker sums the creature's strike damage, not the health lost (e.g. „−14 · wilk” at 8,65 lost); the number keeps its unit („82 %”); the shake ±4 px, the text rising 12 px, the pulse curve `ease-in-out`; the scale's marker also moves smoothly over 500 ms; bars animate after „Restart”; the dark marker merges with the gap between zones near 35 and 39 °C; the amber frame at a fire was not seen in the browser (the default program builds no fire; compose a state with a fire for one of your screenshots if the skill's „Compose a game state” allows); the phone measurement flags `div.world-area` (content 330 > box 318, the 12 px of the scene place's negative margin) with the body row hidden too — say whether it stands at the base commit `51667231` (check it by a working copy of your own directory, if you can, with `npm ci`).
- The old Loop's screenshots of 31 October: the folder `rozpoznanie_mvp2/zrzuty` lies beside the definition of the project; resolve it from `~/.the-way/locations.json`, the key `projects` under `loop2`; the two files are `loop_06_przejscie_ekran.png` and `loop_11_run_w_ruchu.png`. No path of the author's notes enters a file of the repository or your report (name the folder as „the folder `rozpoznanie_mvp2/zrzuty` beside the project's definition”). Take loop2's screenshots at 1600 × 1000 at the start of a map run and with a value below its threshold, in states as near the old ones as the game allows (the old: Skraj lasu, start with full values; and temperature 36,1 °C, satiety 14 %, health 90, „głoduje”), and the body row at 360 px in the phone layout. Push all of them, as `.claude/skills/loop2-play/SKILL.md` „Show a screenshot to the human” and D-418, D-419 give, to `mariusznazar/screenshots` in the directory `loop2/paski-parametrow/` on the branch `loop2/paski-parametrow`, with the `gh` account of the owner of that repository, never on `main`; the report names each file's link with its commit, ready to be embedded with `?raw=true`, and pairs the old and the new. Show a screenshot only after you have looked at it yourself and found it shows what you claim; name in the report what each one shows and what you see on it (for example the marker's visibility near a zone edge). The screenshots never enter this repository or the record.
- Write nothing but `guidelines/styleguide-browser-view.md` in the repository (`git status --short` must show nothing else of yours).


## The plan's section of slice 9, word for word (`plan.md`)

### Slice 9 — The styleguide's rule of the body row, and the side-by-side for the request

- **Goal:** `guidelines/styleguide-browser-view.md` holds the new rule "The body row of a map run",
  whole, in the form of the rules "The scene of a map run" and "The screen Postać" — its *Decision*
  line with the decisions it restates (D-337, D-311, D-178, D-39, D-40, D-42, D-44, D-04, D-396 and
  those the row's look stands on), *Invariant*, *Good* and *Bad*, and the text of the cells, bars,
  scale, outline, alarm, explanation, blow marker, motion and both layouts as the code of Slices 2 and
  5–8 makes them, its values pointed to and none written; and in the rule "States of shared controls"
  the list „Kontrolki odstępujące od tej listy stanów” holds the button of a cell of the body row with
  its states and its reason: its track stands in `highlight`, the colour of the background of a
  button under the pointer. It is written by the styleguide template's "Writing the file"
  (`.the-way/product-guidelines/styleguide/template.md`): meanings from the decisions, no new meaning.
  The UI is finished before this slice, which changes no screen, so its executor also makes the
  side-by-side of the task's *To do* 8 from the running game, as `.claude/skills/loop2-play/SKILL.md`
  gives in "Show a screenshot to the human": the two screenshots of the old Loop of 31 October,
  `loop_06_przejscie_ekran.png` and `loop_11_run_w_ruchu.png`, from the folder `rozpoznanie_mvp2/zrzuty`
  beside the project's definition (that folder lies beside the file the key `projects` of `loop2` in
  `~/.the-way/locations.json` names, in the author's private notes, so no path of it enters a file of
  the repository), and loop2's screen of a map run in a window of 1600 × 1000 at the start of a map run
  and with a value below its threshold, as near the old states as the game allows, and the body row in
  the phone layout at 360 px; all pushed to `mariusznazar/screenshots` in `loop2/paski-parametrow` on
  the branch `loop2/paski-parametrow` (D-418, D-419), none in the repository. The report names each
  link with its commit, pairs old and new, and says from what of the task's answers the change departed
  and why (*To do* 9), gathered from the reports of Slices 1–8 the orchestrator hands on.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/paski-parametrow/task.md:26-44` To do · Acceptance criteria ·
  `.runs/task-cycles/paski-parametrow/task.md:84-93` Pytanie 6 ·
  `.runs/task-cycles/paski-parametrow/task.md:185-185` Context ·
  `.runs/task-cycles/paski-parametrow/task.md:225-241` Settlements to record ·
  `foundations/decisions.md:10932-10972` D-337 · `foundations/decisions.md:10650-10784` D-311 ·
  `foundations/decisions.md:7204-7228` D-178 · `foundations/decisions.md:5002-5024` D-39 ·
  `foundations/decisions.md:5025-5041` D-40 · `foundations/decisions.md:5057-5071` D-42 ·
  `foundations/decisions.md:5087-5103` D-44 · `foundations/decisions.md:59-207` D-04 ·
  `foundations/decisions.md:5531-5555` D-396 · `foundations/decisions.md:1668-1682` D-418 ·
  `foundations/decisions.md:1683-1697` D-419 ·
  `.the-way/product-guidelines/styleguide/template.md:72-190` What each section carries · Pairs and
  meanings · Writing the file · `.the-way/product-guidelines/template.md:52-133` Rules · Examples ·
  Where in code · Rules of writing · `src/browser/view/controls/react-button.tsx` ·
  `src/browser/view/body-row.ts` · `src/browser/run-screen.css:600-672` ·
  `src/browser/styles.css:299-651` · `.claude/skills/loop2-play/SKILL.md` ·
  `.the-way/task-cycle/change/ui_check.md` · `guidelines/coding.md` · `src/browser/AGENTS.md`
- **Model:** same — it writes the rule the next screens of the run follow and composes the
  side-by-side the acceptance criterion is judged on.
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` ·
  `python -B .the-way/instruction-files/check_instructions.py` ·
  `rg -U "###\s+The\s+body\s+row\s+of\s+a\s+map\s+run" guidelines/styleguide-browser-view.md` ·
  `git status --short` (no screenshot in the repository)
- **Depends on:** Slice 1 · Slice 2 · Slice 6 · Slice 7 · Slice 8

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
