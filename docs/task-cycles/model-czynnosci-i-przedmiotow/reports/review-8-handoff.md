# Handoff -- reviewer of slice 8 (`review-change`)

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; nothing it answers is that person's approval. You ask no human; a question goes back to the orchestrator in your return as `questions`.

## Where you work

- Worktree (your working directory): `the root of the task's worktree` -- branch `task/model-czynnosci-i-przedmiotow`. The pinned the-way is the worktree's `.the-way` (`19e5774aed6d1d628042e23deccc110ed9f112c0`). You are READ-ONLY: you change no file of the worktree except your report; you commit nothing.
- Your method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole; this is the review of a slice (not the whole change, not a fix): you read what this handoff names. Do not call a skill; read the files.
- What you review: **slice 8**, the range `760def64fcb1dd3d34a07cdd8f596db00f8ecf36..1351e3a1e9392852085ecc40949d04f07ebe6804` (base..head); compute the diff yourself with `git diff 760def64fcb1dd3d34a07cdd8f596db00f8ecf36..1351e3a1e9392852085ecc40949d04f07ebe6804` and `git log 760def64fcb1dd3d34a07cdd8f596db00f8ecf36..1351e3a1e9392852085ecc40949d04f07ebe6804`, and confirm that `git rev-parse HEAD` is `1351e3a1e9392852085ecc40949d04f07ebe6804` before you go on.
- The author's report (a set of claims to verify, not evidence): `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/executor-8-report.md`.
- Your directory for working copies: `.runs/review-8/` (directly under the ignored `.runs/` of the worktree).
- Report path (full report; the file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it): `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/review-8-report.md`; its FIRST line is `PASS <sha>` or `FAIL <sha>` (the head you reviewed) or `questions`. It holds the review's graded findings, the checks you ran with command and exit code, the reaches beyond this handoff, **Unread material**, **Searches not found or unclear** (each `none` where nothing) and the line on the working copies.
- `cycle.md` and the other files of `.runs/task-cycles/model-czynnosci-i-przedmiotow/` -- other agents' handoffs, reports and findings -- are not yours to read, except those this handoff names.
- Answers of step 4: trust boundary **yes** (`src/browser/sim/saved-game.ts`, `src/browser/sim/previous-programs.ts`, `assets/icons/**`, `src/browser/view/judging-cache.ts`): check crafted input at the boundary files this slice touches. Irreversible operation **no**. This slice's risk: trust boundary — `assets/icons/**`.
- **The gate.** Never run `npm test` with no argument and never run the whole of the tests or `node --test` over a folder of tests: that is the full gate, and its run waits for a signal the orchestrator holds. The focused checks of the slice's *Checks* are `npm test -- <one file>` (it runs exactly one Node or Python test file); you may run those and other single files, the typecheck, ESLint and Prettier on the changed files, but nothing of the whole gate.
- Where the slice leaves a test failing that a later slice owns (its section says which), that is no finding of this slice; a failure the section does not name is.
- You judge the slice against the passages of the task the handoff gives, not the plan alone; the grades and the scope are yours.


Working copies (the first paragraph of "Working copies" of the cycle's skill, word for word):

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## The slice (the plan's section, copied word for word)

### Slice 8 — The icons of „Opatrz” and of the bandage, with their credits

- **Goal:** `assets/icons/bandage-roll.svg` and `assets/icons/first-aid-kit.svg` come from game-icons.net as the
  other icons came — from the source repository at the commit `ICON_SOURCE_COMMIT` of
  `src/browser/view/credits.ts` names where they stand there, otherwise from their pages — changed as the others
  were (no background, a light shape), each title and page confirmed at download against Foundation entries rows
  15 and 16, and each file passing the checks of `icon-file-content`. `ICON_CREDITS` holds a credit of each: the
  author as the source names the contributor, the page, and the change made. `tests/invariants/test_icon_credits.py`
  writes out the two titles (and authors, where it writes authors out), and `tests/view/icons.test.mjs` takes the
  order of the section as the data now give it: the items, the bandage among them, then the two campfires, the
  actions' icons one line each, „Opatrz” bringing `bandage-roll`, then the wolf and the packs. The files are
  untrusted input. After this slice the tests of the credits and of the screens that draw them pass again. The
  report sorts each changed file as one-time for the model or for the bandage alone (*To do* 14; icons stand
  beside the count).
- **Change:** `assets/icons/bandage-roll.svg` · `assets/icons/first-aid-kit.svg` · `src/browser/view/credits.ts` ·
  `tests/invariants/test_icon_credits.py` · `tests/view/icons.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-scene-art/SKILL.md` ·
  `src/browser/view/credit-lines.ts` · `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:36-41` To do,
  item 7 · `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:258-262` Decision 3 — The verb with a target,
  unit 8 · `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:373-375` Trust boundary — crafted input ·
  `foundations/decisions.md:4870-4921` D-27 · `foundations/invariants.md:319-352` icon-file-content, icon-credits
  as row 14 changes it, loop2-container-icons · Foundation entries rows 15, 16 · `foundations/part_map.md:3-32`
  browser-view
- **Model:** same — two untrusted files from outside and their credits, which a failure of the icon checks would force to be redone
- **Risk:** trust boundary — `assets/icons/**`
- **Checks:** `npm test -- tests/view/icons.test.mjs` · `npm test -- tests/invariants/test_icon_credits.py` ·
  `npm test -- tests/invariants/test_icon_file_content.py` · `npm test -- tests/view/account-screen.test.mjs` ·
  `npm test -- tests/view/headquarters-screen.test.mjs`
- **Depends on:** Slice 7 · Foundation entries rows 14, 15, 16

## Passages the slice's *Read* names (copied word for word; the file and the lines stand in the heading)

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:36-41` To do,
  item 7

```text
7. Edytor programu oferuje „Wytwórz” i „Opatrz” w wyborze czynności i po wyborze prowadzi do pola celu, jak przy „Zbierz” (D-306); przy czynności stoją jej czas i cena (D-293, D-363), a reguła, której nie da się wykonać, podaje powód (D-310). Szczegóły (pytanie 6):
   - Grupa w wyborze czynności: „Opatrz” staje w grupie „Żywność i walka”, obok „Zjedz — jagoda”; „Wytwórz” staje w nowej, piątej grupie „Wytwarzanie”; „Wytwórz — ognisko” zostaje w grupie „Ogień”.
   - Ikony: „Wytwórz” ma ikonę młotka, tę samą co „Wytwórz — ognisko” (`claw-hammer`); „Opatrz” dostaje ikonę zwoju bandaża (`bandage-roll`), a przedmiot opatrunek ikonę apteczki (`first-aid-kit`) — obie z game-icons.net, ze wzmianką w sekcji „Autorzy grafiki” (D-27).
   - Cena i czas: cena czynności z celem stoi przy każdym celu w wyborze celu i przy wybranej czynności: „Wytwórz — Opatrunek (2 mchy)”, „Opatrz — Opatrunek (1 opatrunek)”. Czynność, której czas daje cel, pokazuje go przy każdym celu w wyborze celu, obok ceny: „Opatrunek (2 mchy)” i obok „10 min” (pytanie 9). Komórka „Wytwórz” w wyborze czynności nie ma ani ceny, ani czasu, bo oba daje przepis celu; komórka „Opatrz” ma swój czas, bez ceny.
   - Słowa: wiersz reguły, wiersz „Teraz” i kronika piszą „Wytwórz — Opatrunek” i „Opatrz — Opatrunek”, jak „Zbierz — Patyk” (D-334, D-340). Powody, gdy reguły nie da się wykonać: „brakuje 2 × mech” przy „Wytwórz — Opatrunek”, „brakuje 1 × opatrunek” i „zdrowie pełne” przy „Opatrz — Opatrunek”, a gdy prawdziwe są oba, reguła podaje „zdrowie pełne”, tak jak „ognisko już płonie” stoi przed „brakuje 2 × patyk” (pytanie 11); w minutach napaści reguła z którąkolwiek z nich jest zwykłą regułą z powodem „trwa walka” (D-309).
   - Scena: przy obu czynnościach mag stoi tam, gdzie stał, jak przy „Zjedz — jagoda”; scena nie dostaje nowego obrazka ani efektu.
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:258-262` Decision 3 — The verb with a target,
  unit 8

```text
8. **The scene and the credits** (`src/browser/view/scene-picture.ts`, `credit-lines.ts`,
   `credits.ts`). The mage stays where it stands at both verbs (D-318); both kinds join the hand-written
   set of the actions whose end takes pieces out of the backpack (`USES_BACKPACK`), so the effect of a
   gathering is not read from a net change. The credits name the two new icons once each; the items'
   icons come from the items' rows.
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:373-375` Trust boundary — crafted input

```text
- `assets/icons/**`: `bandage-roll` and `first-aid-kit` come from game-icons.net, untrusted, and pass the
  checks every icon passes (invariants `icon-file-content`, `icon-credits`, `loop2-container-icons`);
  their titles are read from their pages at download and recorded as facts.
```

## Foundation entries to read, each whole, by their address in the worktree as it stands now

The foundation step moved `foundations/decisions.md` and `foundations/invariants.md`; the ranges below are the current ones and hold where they differ from the plan's. An entry runs from its heading to the next heading. The decisions and invariants the plan names:

- `foundations/decisions.md:4870-4922` D-27
- `foundations/invariants.md:319-330` icon-file-content
- `foundations/invariants.md:331-342` icon-credits
- `foundations/invariants.md:343-353` loop2-container-icons
- the entries the plan's *Foundation entries* rows name that your section names as changed ("as row N changes it") are written already by the foundation step (commit `ed70970a`); read them as they stand. The new decision „How does an action name what it acts on?” is **D-443**.

- `foundations/part_map.md:3-32`
  browser-view

## Guideline files and instruction files to read, each whole

- `guidelines/coding.md`
- `guidelines/testing.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/AGENTS.md`
- `guidelines/coding.md` is the general coding guideline (it holds the kinds index); `guidelines/testing.md` is read whole before you write or change a test.

## Files the slice changes (read the diff and each changed file as far as the review needs)

- `assets/icons/bandage-roll.svg`
- `assets/icons/first-aid-kit.svg`
- `src/browser/view/credits.ts`
- `tests/invariants/test_icon_credits.py`
- `tests/view/icons.test.mjs`

## Other files of code and tests to read (whole, or in the range named)

- `src/browser/view/credit-lines.ts`


## What you return

The first line of your report (`PASS <sha>`, `FAIL <sha>` or `questions`), the report path; no check result beyond the checks you ran, named in the report.
