# Handoff — executor of slice 14 (`make-change`, a slice)

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; nothing it answers is that person's approval. You ask no human; a question goes back to the orchestrator in your return as `questions`.

## Where you work

- Worktree (your working directory): `the root of the task's worktree` — branch `task/model-czynnosci-i-przedmiotow`. **Your base** (the head of the branch when you start): `f8ad4bd332e2cc39956d4e9ac5914a6b64648011`; commit only on this branch; never reset it, never rebase, never touch another worktree. The pinned the-way is the worktree's `.the-way` (`19e5774aed6d1d628042e23deccc110ed9f112c0`).
- Your method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole; your variant is **"a slice, or the retry of a slice"**: read `.the-way/task-cycle/change/slice.md` whole as that row gives. Read `.the-way/task-cycle/change/ui_check.md` only if the slice changes a user interface (the slices that touch `src/browser/view/` do not need a screenshot unless their section says so) — a state check by code and tests is what the plan asks. Do not call a skill; read the files.
- Your stage and its boundary: make **only this slice** (its section below), run its focused checks, commit, and return. Nothing of another slice; no foundation entry beyond what this section names; no change of the plan or the spec (a disagreement of the plan and the code is `slice.md`'s case).
- Your directory for working copies: `.runs/executor-14/` (directly under the ignored `.runs/` of the worktree).
- Report path (full report; the file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it): `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/executor-14-report.md`; its first line is yours (status). It holds what `make-change` section 6 gives: the checks with their command and exit code, the own-work check, the reaches beyond this handoff, **Unread material**, **Searches not found or unclear** (each `none` where nothing), and the line on the working copies.
- `cycle.md` and the other files of `.runs/task-cycles/model-czynnosci-i-przedmiotow/` — other agents' handoffs, reports and findings — are not yours to read, except those this handoff names.
- Answers of step 4: trust boundary **yes** (`src/browser/sim/saved-game.ts`, `src/browser/sim/previous-programs.ts`, `assets/icons/**`, `src/browser/view/judging-cache.ts`); irreversible operation **no**. This slice's risk: none.
- **The gate.** Never run `npm test` with no argument and never run the whole of the tests or `node --test` over a folder of tests: that is the full gate, and its run waits for a signal the orchestrator holds. The focused checks named in the section's *Checks* are `npm test -- <one file>` (it runs exactly one Node or Python test file); run only those and the typecheck, ESLint and Prettier on the files you change. Before you return also run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` and make sure that no error it lists comes from a file you changed (a `decision:` or `invariant:` line in a test must quote exact words that begin a binding sentence of the entry as the log holds it now; the listed errors of other files and the one of `tests/view/rule-editor.test.mjs` for Slice 15 are not yours). Never skip a hook or a check. Commit by path (`git add <path> …`), never `git add -A`, `git add .` or `git commit -a`; the message in English, the first line in the style of the repository's commits (type, emoji, what and why).
- Where the slice leaves a test failing that a later slice owns (the section says which), do not change that test and do not make it pass by code of this slice that the section does not give; name it in your report.
- **Sorting of the changed files (the task's *To do* 14; your section may say 'the report sorts each changed file').** The request's cost table counts files of code and of tests the trial changed, in two parts: (1) **one-time for the model of actions and items** -- a file changed so that any later item of the same sort can be a row of data (types, the module of targets, the program check, the repertoire, the editor's logic and its panel, the scene's branches, the instrument's description and trace, the invariant tests that write kinds or lists out by hand, the saved game's version) and the tests of that shape; (2) **the bandage alone** -- a file changed for the bandage itself (its row, words, recipe and healing numbers, its tests, its revelation). A file changed for both counts in (1). Icons, foundation entries and guideline files stand beside and are outside the count. In your report give a table of each file you changed with its added/removed lines and its part, (1) or (2), with one sentence of the reason where it is not obvious.
- The size rule of D-425 (200 lines of code for a function, 800 for a file, comments and blank lines not counted) binds every file you change: run `node tests/quality/eslint-size-rules.mjs` on the tree before you return, and name the result.

Working copies (the first paragraph of "Working copies" of the cycle's skill, word for word):

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Your slice (the plan's section, copied word for word)

### Slice 14 — The rule panel, the rule's row, „Teraz” and the chronicle show the verb with its target

- **Goal:** spec Decision 3 unit 7, what the panel and the row draw. In `src/browser/view/rule-panel.tsx` a pick
  in the target field of an item verb changes the rule's target through the function Slice 13 added; the action
  field, closed, shows „Wytwórz — Opatrunek (2 mchy)” or „Opatrz — Opatrunek (1 opatrunek)” with the time of one
  carrying out beside it; the cells of the target pick of „Wytwórz” show the time of each target beside it,
  „10 min” (D-293, D-363 as rows 7 and 6 change them). In `src/browser/view/rule-list.tsx` the row of the rule shows
  „Wytwórz — Opatrunek” and its time, taken from the target, and no price. `RulePanelView` and the function Slice 4
  moved out stay under the limit of D-425. A new test file `tests/view/item-verb-panel.test.mjs`, written on the
  document imitation as `tests/view/rule-editor.test.mjs` is, holds these. `tests/view/now-lines.test.mjs` and
  `tests/view/chronicle-entries.test.mjs` show „Teraz” and the chronicle writing „Wytwórz — Opatrunek” and „Opatrz
  — Opatrunek” in the row's words (D-334, D-340). The report sorts each changed file as one-time for the model or
  for the bandage alone (*To do* 14).
- **Change:** `src/browser/view/rule-panel.tsx` · `src/browser/view/rule-list.tsx` ·
  `tests/view/item-verb-panel.test.mjs` · `tests/view/now-lines.test.mjs` · `tests/view/chronicle-entries.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `tests/view/rule-editor.test.mjs:1-168`
  helpers · `tests/view/rule-editor.test.mjs:1527-1660` the pick's groups, prices and the action field's value ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:36-41` To do, item 7 ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:244-257` Decision 3 — The verb with a target, unit 7 ·
  `foundations/decisions.md:9286-9304` D-293, as row 7 changes it · `foundations/decisions.md:9894-9905` D-363, as
  row 6 changes it · `foundations/decisions.md:9672-9715` D-306 · `foundations/decisions.md:10498-10552` D-334 ·
  `foundations/decisions.md:10937-10964` D-340 · `foundations/decisions.md:841-858` D-425 ·
  `foundations/part_map.md:3-32` browser-view
- **Model:** same — the panel's focus and commit behaviour with a verb whose target and price change
- **Risk:** none
- **Checks:** first the failing cases of the action field's value and of the target cells' times; then
  `npm test -- tests/view/item-verb-panel.test.mjs` · `npm test -- tests/view/now-lines.test.mjs` ·
  `npm test -- tests/view/chronicle-entries.test.mjs` · `npm test -- tests/quality/test_function_and_file_size.py`
- **Depends on:** Slices 4, 13 · Foundation entries rows 6, 7

## Passages the slice's *Read* names (copied word for word; the file and the lines stand in the heading)

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:36-41` To do, item 7

```text
7. Edytor programu oferuje „Wytwórz” i „Opatrz” w wyborze czynności i po wyborze prowadzi do pola celu, jak przy „Zbierz” (D-306); przy czynności stoją jej czas i cena (D-293, D-363), a reguła, której nie da się wykonać, podaje powód (D-310). Szczegóły (pytanie 6):
   - Grupa w wyborze czynności: „Opatrz” staje w grupie „Żywność i walka”, obok „Zjedz — jagoda”; „Wytwórz” staje w nowej, piątej grupie „Wytwarzanie”; „Wytwórz — ognisko” zostaje w grupie „Ogień”.
   - Ikony: „Wytwórz” ma ikonę młotka, tę samą co „Wytwórz — ognisko” (`claw-hammer`); „Opatrz” dostaje ikonę zwoju bandaża (`bandage-roll`), a przedmiot opatrunek ikonę apteczki (`first-aid-kit`) — obie z game-icons.net, ze wzmianką w sekcji „Autorzy grafiki” (D-27).
   - Cena i czas: cena czynności z celem stoi przy każdym celu w wyborze celu i przy wybranej czynności: „Wytwórz — Opatrunek (2 mchy)”, „Opatrz — Opatrunek (1 opatrunek)”. Czynność, której czas daje cel, pokazuje go przy każdym celu w wyborze celu, obok ceny: „Opatrunek (2 mchy)” i obok „10 min” (pytanie 9). Komórka „Wytwórz” w wyborze czynności nie ma ani ceny, ani czasu, bo oba daje przepis celu; komórka „Opatrz” ma swój czas, bez ceny.
   - Słowa: wiersz reguły, wiersz „Teraz” i kronika piszą „Wytwórz — Opatrunek” i „Opatrz — Opatrunek”, jak „Zbierz — Patyk” (D-334, D-340). Powody, gdy reguły nie da się wykonać: „brakuje 2 × mech” przy „Wytwórz — Opatrunek”, „brakuje 1 × opatrunek” i „zdrowie pełne” przy „Opatrz — Opatrunek”, a gdy prawdziwe są oba, reguła podaje „zdrowie pełne”, tak jak „ognisko już płonie” stoi przed „brakuje 2 × patyk” (pytanie 11); w minutach napaści reguła z którąkolwiek z nich jest zwykłą regułą z powodem „trwa walka” (D-309).
   - Scena: przy obu czynnościach mag stoi tam, gdzie stał, jak przy „Zjedz — jagoda”; scena nie dostaje nowego obrazka ani efektu.
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:244-257` Decision 3 — The verb with a target, unit 7

```text
7. **The editor** (`src/browser/view/program-editor.ts`, `rule-panel.tsx`, `rule-list.tsx`). The action
   pick holds „Wytwórz” in the group „Wytwarzanie” and „Opatrz” in „Żywność i walka” right after
   „Zjedz — jagoda”; a pick of either moves on to the field of the action's target (D-306), whose pick
   holds the verb's targets the Understanding holds, the held target included where it does not, each
   cell named by the item's name, capitalised, with its price in brackets, „Opatrunek (2 mchy)”,
   „Opatrunek (1 opatrunek)”, and, for „Wytwórz”, its time beside it, „10 min”. The cell „Wytwórz” of
   the action pick shows no price and no time; the cell „Opatrz” shows its time and no price. The value
   of the action field shows the verb, its target and the price, „Wytwórz — Opatrunek (2 mchy)”,
   „Opatrz — Opatrunek (1 opatrunek)”, with the time beside it; the rule's row shows „Wytwórz —
   Opatrunek” and „Opatrz — Opatrunek” and the time, no price (D-363), and „Teraz” and the chronicle
   take the row's words (D-334, D-340). A verb none of whose targets the Understanding holds stands
   greyed in the pick with „nie znasz jeszcze celu”, as „Idź” does (D-289). Changing the action to a
   verb with an item target takes the first of its known targets in the data's order, and does nothing
   where none is known, as today for a resource.
```

## Foundation entries to read, each whole, by their address in the worktree as it stands now

The foundation step moved `foundations/decisions.md` and `foundations/invariants.md`; the ranges below are the current ones and hold where they differ from the plan's. An entry runs from its heading to the next heading. The decisions and invariants the plan names:

- `foundations/decisions.md:9347-9380` D-293
- `foundations/decisions.md:9987-10003` D-363
- `foundations/decisions.md:9765-9809` D-306
- `foundations/decisions.md:10595-10650` D-334
- `foundations/decisions.md:11034-11062` D-340
- `foundations/decisions.md:841-859` D-425
- the entries the plan's *Foundation entries* rows name that your section names as changed ("as row N changes it") are written already by the foundation step (commit `ed70970a`); read them as they stand. The new decision „How does an action name what it acts on?” is **D-443**.

- `foundations/part_map.md:3-32` browser-view

## Guideline files and instruction files to read, each whole

- `guidelines/coding.md`
- `guidelines/testing.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/AGENTS.md`
- `guidelines/coding.md` is the general coding guideline (it holds the kinds index); `guidelines/testing.md` is read whole before you write or change a test.

## Files you change (the slice's *Change*; read each whole before you change it; a file that does not exist yet you create)

- `src/browser/view/rule-panel.tsx`
- `src/browser/view/rule-list.tsx`
- `tests/view/item-verb-panel.test.mjs`
- `tests/view/now-lines.test.mjs`
- `tests/view/chronicle-entries.test.mjs`

## Other files of code and tests to read (whole, or in the range named)

- `tests/view/rule-editor.test.mjs`
- Ranges the plan names (find them again by the name beside them where the file changed): `tests/view/rule-editor.test.mjs:1-168`
  helpers; `tests/view/rule-editor.test.mjs:1527-1660` the pick's groups, prices and the action field's value

## What you return

Status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. Commit everything of the slice before you return; leave the worktree clean.
