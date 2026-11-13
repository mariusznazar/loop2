PASS be0e0babb9d5ff1baa366ac149f7a977af4fd1a5

# Review 3 — the return step's range, task oboz-w-siedzibie

Range: `9dd6ab22621748cb352c6b2c978a7db5512b1b51..be0e0babb9d5ff1baa366ac149f7a977af4fd1a5`, one commit
(`be0e0bab`), one file, `guidelines/styleguide-browser-view.md`, 1 line changed (+1 −1). `git rev-parse HEAD`
in the reviewed worktree gave `be0e0babb9d5ff1baa366ac149f7a977af4fd1a5`, the head given. Context range
`2b4d760c..be0e0bab`: seven commits (`e05f7b2b` … `be0e0bab`), read by `git log`; reviews 1 and 2 PASS.

The change, `guidelines/styleguide-browser-view.md:802-803`, rule „The camp of Siedziba”:

- before: „Nie daj obozowi tekstu, kontrolki, reakcji na kliknięcie ani nazwy dla czytników ekranu i nie rób w nim błysku;”
- after: „Nie daj obozowi tekstu, kontrolki ani reakcji na kliknięcie, ukryj go przed czytnikami ekranu i nie rób w nim błysku;”

## Findings

### Critical

none

### Important

none

### Minor

none

Judged and found right:

- **Against the task.** To do 4 (`task.md:32`): the camp „jest ukryty przed czytnikami ekranu”. To do 7
  (`task.md:35`): the rule says „że nie ma na niej tekstu ani reakcji na kliknięcie”. The new sentence says
  both, and now says what To do 4 requires instead of the weaker „no name for screen readers”, which a
  picture with no `alt` would meet while still being announced (review 2, N1).
- **Against the foundation.** D-389 (`foundations/decisions.md:9509-9510`): „a picture, not a control, taking
  no click and no key, hidden from readers of the screen, with no text on it or over it”; its *Verification*
  (`:9523`): „no link, button, field, text or name for a reader in the camp”. The rule now restates D-389's
  binding words neither more broadly nor without a qualification (WAY-263): text, control, click, hidden
  from readers, no flash. „Kontrolki” covers „no key” (a control is what takes the keyboard, rule Visible
  focus, `:146`).
- **Against the code.** `src/browser/view/camp.tsx:77` sets `aria-hidden="true"` on the band's root, and
  `:83` gives its background `alt=""`; no handler, `tabIndex` or `role` in the file. The test
  `tests/view/headquarters-screen.test.mjs:531-535` asserts `aria-hidden="true"` on `.camp` and no
  focusable or role-bearing element in it, so the rule and the code it describes are tied by a test.
- **Against the template** (`.the-way/product-guidelines/template.md:82-88`, WAY-168, WAY-312): the new
  words are an instruction to the author („ukryj go”), carry no rationale and list no state; the rule's
  heading, fields and *Decision* list (D-389 first) are unchanged.
- **The return step's report** (`reports/return-report.md`): its claim that D-389 matches the code was
  checked where this range rests on it — `aria-hidden`, `alt=""`, no handler (above), and the motion's
  standing under reduced motion (`src/browser/styles.css:2431-2435`: the camp's frames animate only
  under `prefers-reduced-motion: no-preference`). Its claim that no other entry or rule still says the
  weaker wording holds: a search of `guidelines/`, `foundations/`, `README.md` and the camp's view files for
  „czytnik”, „screen reader”, „readers of the screen”, „name for a reader” found only D-389's *Verification*
  (`:9523`) and the changed line.

## Declined to judge

- The rule „The scene of a map run” (`guidelines/styleguide-browser-view.md:626-627`) says nothing about
  screen readers, though the scene's code also sets `aria-hidden` (`tests/view/scene.test.mjs:396`): it
  belongs to D-321's scene, not to this task.
- Review 2's N2 (`tests/view/scene-picture.test.mjs:1539-1543`) and M2 (D-271's title), left by the return
  step for the request's list: outside this range, which touches neither.
- The `dead-path` warnings of `check_instructions.py` at `guidelines/styleguide-browser-view.md:540` and
  `:548` (`#/mapy`, a route of the screen Mapy, not a path): rule „The screen Mapy”, untouched by the task.

## Checks

- `git rev-parse be0e0bab HEAD` — both `be0e0babb9d5ff1baa366ac149f7a977af4fd1a5`, exit 0.
- `git diff 9dd6ab22621748cb352c6b2c978a7db5512b1b51..be0e0bab` and `git log --oneline 2b4d760c..HEAD` — exit 0;
  one file, one line, as given.
- `git -C .the-way rev-parse HEAD` = `55afa8e57aa1b83c77108576a36642722e0dda15` = `git ls-files --stage -- .the-way`
  — the pinned the-way, exit 0.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, „0 errors”.
- `python -B .the-way/instruction-files/check_instructions.py .` — exit 0, „0 error, 124 warn, 7 info”; for the
  changed file only the two `dead-path` warnings at `:540` and `:548` (outside the change, above) and its size.
- `git status --short` after the checks — empty; the reviewed worktree is unchanged.
- Manual: read of `src/browser/view/camp.tsx:70-112`, `tests/view/headquarters-screen.test.mjs:527-540`,
  `src/browser/styles.css` `.camp` rules and the reduced-motion block (`:2431-2435`) against the rule and D-389.
- Not run: `npm test` and the focused `tests/view/headquarters-screen.test.mjs` — the range changes no code or
  test, so no test tells it apart from a broken change; the full gate is the orchestrator's run.

## Reaches beyond the dispatch

- `.the-way/task-cycle/review/SKILL.md` (the method) and `.the-way/product-guidelines/template.md:72-97` — to
  judge the rule's wording against the template (WAY-170).
- `reports/review-2-report.md` N1, N2 — the finding this range answers.
- `src/browser/view/camp.tsx`, `src/browser/view/headquarters.tsx` (camp lines), `src/browser/styles.css`
  (camp and reduced-motion rules), `tests/view/headquarters-screen.test.mjs:527-540` — to check that the
  rule and D-389 say what the code does.

## Unread material

none — `task.md`, D-389 (`foundations/decisions.md:9495-9529`), `guidelines/styleguide-browser-view.md`
(all 967 lines), `reports/return-report.md` and `review-3-handoff.md` read whole; `review-1-report.md` not
opened (its PASS taken from the handoff), since this range touches nothing it judged; `review-2-report.md`
read for its first line and its findings N1 and N2 only.

## Searches not found or unclear

none
