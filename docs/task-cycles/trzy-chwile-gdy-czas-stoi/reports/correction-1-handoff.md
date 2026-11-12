# Handoff — a correction for the human's remarks, task trzy-chwile-gdy-czas-stoi

You are the author of the change, resumed for a correction after the human's answers at the request
(pull request 84). Same worktree, delegation and rules as in `reports/author-handoff.md` (no push of
anything anywhere, commit by path, messages in English, do not run the product's full gate).

- Method and variant: `.the-way/task-cycle/change/SKILL.md`, **a correction for the human's remarks**
  (read the file the variant names, whole, when you reach it).
- Base of the correction: head `67bc237b` (`66c9d371` is the last commit with the reviewed tree).

## The human's remarks (they bind; 2026-11-12, in the session that leads the cycle)

The request asked the human four things in "Needed from you" and "Fix or let through". The human's
answers, in his words: „1 i 2 akceptuję w zaproponowanej formie / resztę akceptuję również”.

- Item 1 (watch the three moments in the running game): accepted in the proposed form.
- Item 2 (the colours no source fixes): **accepted in the proposed form** — the cold layer `#2f5fd0` at
  opacity `0.5` and the specks `#b21818` and `#985a3b`, exactly as proposed; no other colour. This is the
  human's choice, made at the request, as the task's acceptance criteria and question 9 provide.
- Items 3 and 4 of "Fix or let through": let through (no correction for them). Items 5 to 11: accepted
  by merging.

## What to correct (only what these remarks touch)

The colours are now chosen by the human, so every place that says they are still **proposed, pending**
or **waiting for his choice** says what is no longer true. Make those places state the choice, and
change nothing else (no colour, no timing, no code path, no test unless a test pins such wording).

1. `src/browser/tokens.css`: the `Source:` comments of `--scene-chill`, `--scene-chill-opacity`,
   `--scene-speck-ember` and `--scene-speck-bronze` say „proposed by the cycle … pending Mariusz's
   choice at its request (question 9 of that task)”. Rewrite each to a source the human fixed: chosen by
   Mariusz at the request of this task on 2026-11-12, accepting the cycle's proposal (question 9 of the
   task); keep the pixel address for the two specks and the description of the colour. Follow the form
   of a source line that `src/browser/AGENTS.md` gives and the pattern of `src/browser/tokens.css:40`;
   the invariant `design-token-sources` reads these lines, run it.
2. Search `foundations/`, `guidelines/styleguide-browser-view.md`, `src/browser/styles.css`,
   `src/browser/sim/data/scene.ts`, `README.md` and `tests/` for wording of the same kind — „pending”,
   „proposed”, „proposal”, „no choice of the human gave”, „waits for” the human's choice, „czeka”,
   „propozycja” — about these four colours. For each hit: if it states that the choice is still to be
   made, correct it to the choice made; if it is a general rule that stays true (for example a rule that
   a colour no choice of the human gave is a violation), leave it. Name each hit and what you did in
   the report. Entries of the foundation that you change are changed through the project skill of their
   element (`the-way-record-decision` for a decision), with the form of the entry kept.
3. The weight of this correction is small; if a hit asks for more than a wording (for example a
   rule that must change), stop and return `questions`.

## Report

`reports/correction-1-report.md` in `.runs/task-cycles/trzy-chwile-gdy-czas-stoi/`: status; commits;
what you changed with `file:line`; the hits you left and why; commands and exit codes of the checks
you ran (at least `design-token-sources`, `design-token-contrast`, `browser-view-token-values`,
`foundation_check.py` if you touched `foundations/`, prettier on the files you touched); your own-work
check; **Unread material**; **Searches not found or unclear** (`none` is an answer). No secrets, no
screenshots, no diffs copied.
