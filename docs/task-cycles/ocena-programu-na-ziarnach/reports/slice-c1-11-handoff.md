# Handoff — the executor of slice 11, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `57ed451a`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 11 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-11/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-c1-11-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- Quotations of decisions in tests: every comment line `// decision: D-n "…"` of a test you write or change must quote, word for word and from the beginning of a sentence, text that stands in a binding sentence of that decision as it stands now (`foundations/decisions.md`; a quotation is no paraphrase). Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after your change and your files must show no error; errors in files you did not change are not yours . Slices 3 and 4 shipped such errors; do not repeat it.
- This is the work of **correction 1** of the open request (the human's remarks, `reports/correction-1-remarks.md`, answered by the reviewed spec `spec.md`; the plan's slices are yours; the first run's plan no longer binds). The foundation step of the correction writes the plan's *Foundation entries* before slice 1: read what it wrote where your *Read* names it. A test that quotes a decision by a comment line `decision:` quotes it word for word from the beginning of a sentence of a binding sentence of the entry as it stands (the foundation check stops at the first field line of an entry); where a decision's sentence the correction changed was quoted by a test your slice changes, the quotation follows the new wording.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- `.runs/task-cycles/ocena-programu-na-ziarnach/reports/walk-report.md:65-65` side observation 2
- the plan's *Foundation entries* row 13, as the foundation step wrote it — find it in `foundations/` by its heading: D-287 — What do Siedziba, the screen Postać and the screen Mapy allow, and say, while a manual map run waits or has ended? (wherever the sentence under the inactive buttons of a row stands, it is a link to the screen of the one open manual map run, `#/postac/{n}/przejscie`)
- `foundations/decisions.md:4522-4593` D-280 (plan: 4497-4567)
- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `src/browser/view/screen-address.ts:141-162`
- `src/browser/view/team-lines.ts:15-22`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 5-5 (reports/correction-1-remarks: remark 3)

3. **„Wejdź” nieaktywne bez drogi powrotnej do otwartego przejścia ręcznego (Fix or let through 3)** — poprawić w tej prośbie, bo ta prośba i tak zmienia ten wiersz „Kto idzie”: zdanie „Wróć do niego i je zakończ” (albo jego część) staje się odnośnikiem do ekranu tego przejścia. Gdy odnośnik już był przed zmianą, a przejście go nie znalazło, prośba to mówi i niczego nie zmienia.

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 11 — the sentence of an open manual map run leads back to it

- **Goal:** first check the base of the first run: `git show c36e2739:src/browser/view/maps-screen.tsx`
  — whether the row of a character in „Kto idzie” held a link to the screen of its open manual map
  run, near the sentence of `runWaitingSentence`. The planner found none in the row there (the sentence
  stood in a plain paragraph, `maps-who-run-note`), while the menu bar held „Wróć do przejścia · {mapa}
  · minuta {m}” to that screen (D-280); the orchestrator keeps this slice only where it settles that
  the remark's link is the one in the row. Where the check finds such a link in the row, change
  nothing, and report that it stood before the change and the walk did not find it. Where it finds
  none: in every row of the card where the sentence stands (the one open manual map run has one screen, so the target is the same in each row; the orchestrator's answer to the planner's question 2), the sentence
  „Przejście na mapie {mapa} jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.” is a
  link to the screen of that map run, the address `screenAddress` of `screen-address.ts` gives for
  `{ kind: "run", characterId }` (`#/postac/{n}/przejscie`, D-281); its text stays `runWaitingSentence`'s (D-287, as the
  Foundation entries changed it). The link keeps the sentence's role, `text-secondary`, and takes
  the look the styleguide gives a link of the screen (the name of a character in „Kto idzie” is
  one); in `guidelines/styleguide-browser-view.md`, rule „The screen Mapy”, the line of the sentence
  of D-287 says that it is a link to the screen of that map run, in the
  same role — no role, value or meaning of a role changes. The failing case comes first in
  `tests/view/maps-screen.test.mjs`: while a manual map run waits and after it ended, every row that holds the sentence
  holds it as a link to that screen, and after
  „Zakończ” none. Read `src/browser/view/maps-screen.tsx` as Slice 6 left it.
- **Change:** `src/browser/view/maps-screen.tsx` · `tests/view/maps-screen.test.mjs` ·
  `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/reports/correction-1-remarks.md:5-5`
  remark 3 · `.runs/task-cycles/ocena-programu-na-ziarnach/reports/walk-report.md:65-65` side
  observation 2 · Foundation entries row 13 · `foundations/decisions.md:4497-4567` D-280 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/screen-address.ts:141-162` · `src/browser/view/team-lines.ts:15-22`
- **Model:** same — raised from `cheaper` by the orchestrator: the first run's `cheaper` executor read little of what its handoff named
- **Risk:** none
- **Checks:** `npm test -- tests/view/maps-screen.test.mjs` (the new case written first, failing) ·
  `npm test -- tests/view/team-lines.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py`
- **Depends on:** Slice 6 · Foundation entries row 13

## Notes of the orchestrator for this slice

- This is remark 3 of the human's remarks of correction 1 (`reports/correction-1-remarks.md`, line 5): „Wejdź” nieaktywne bez drogi powrotnej do otwartego przejścia ręcznego — the sentence „Wróć do niego i je zakończ” (or its part) becomes a link to the screen of that run. The orchestrator's answers (the plan's questions 1 and 2): keep the slice; the menu bar's „Wróć do przejścia · {mapa} · minuta {m}” existed at the base `c36e2739` and the walk missed it (the request will say so); the human's remark asks for the sentence of the row itself to be a link; **the link stands in every row of the card where the sentence stands** (the one open manual map run has one screen, so the target is the same in each row), the whole second sentence „Wróć do niego i je zakończ, żeby wysłać postać.” linked (the foundation step wrote it so in D-287, commit `4d813606`: read D-287 whole as it stands).
- First do the check the plan names: `git show c36e2739:src/browser/view/maps-screen.tsx` — whether the row held a link to the run's screen near the sentence of `runWaitingSentence` (the planner found none: the sentence stood in a plain paragraph `maps-who-run-note`) and whether the first run's change lost one; say in the report what you found. Where a link stood in the row, change nothing and say so.
- The failing case first in `tests/view/maps-screen.test.mjs`: while a manual map run waits and after it ended, every row that holds the sentence holds it as a link to the screen of the run (`screenAddress` of `screen-address.ts` for `{ kind: "run", characterId }`, `#/postac/{n}/przejscie`), and after „Zakończ” none; the link keeps the sentence's role `text-secondary` and takes the look the styleguide gives a link of the screen (the name of a character in „Kto idzie” is one); the styleguide's rule „The screen Mapy”, the line of the sentence of D-287 (the plan's *Change* names `guidelines/styleguide-browser-view.md`): say that it is a link to the screen of that map run, in the same role — no role, value or meaning of a role changes. Read the styleguide whole (the root AGENTS.md requires it for every file of the part).
- UI: inspect your own screenshot of the running game (`.claude/skills/loop2-play/SKILL.md`): a character with an open manual map run, the card of a map: the sentence is a link, a click leads to the run's screen; **push none, keep none**; close the browser (WAY-319). Quote every `// decision:` line word for word from the beginning of a sentence of a binding sentence. No full gate; ESLint, Prettier, typecheck, size rules, the focused checks named.

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
