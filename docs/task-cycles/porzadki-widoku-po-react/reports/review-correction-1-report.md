PASS 370abc76d3362a8496f679008bc84dc0ddd39ad5

# Review of correction 1 — the human's remarks on the open request

Range `3b4cc2a6..370abc76` (`c25e09b1`, `bf0f4bc3`, `370abc76`): 3 files, +17 −12 (`foundations/decisions.md` 8/8, `guidelines/styleguide-browser-view.md` 8/11 with the line wrap, `src/browser/styles.css` 6/4). `git rev-parse HEAD` in the worktree: `370abc76d3362a8496f679008bc84dc0ddd39ad5`. `git diff a9a95479..3b4cc2a6` is empty: the two commits between the reviewed fix and the start of the range add the cycle's record and take it out again, so the tree I reviewed in fix 1 is the base of this range. Bound by `reports/correction-1-remarks.md` (remarks 1 to 3) in place of a findings file. Method: `.the-way/task-cycle/review/SKILL.md` and `fix.md`.

## The remarks

### Remark 1 — fix N1 as the finding says: made

- **D-421, second binding sentence** (`c25e09b1`): `styles.css` now holds "each rule that the elements of several screens need, that cannot be divided without changing its text and that belongs to no part with a stylesheet of its own, as the rules of the credits that name the login card and Siedziba belong to `credits.css`: a rule whose selector list names classes of more than one screen, or the rule of a sentence that several screens draw, which today are, besides those columns, the sentence `trip-warning` and the animation of the frames …". This is the qualification N1 asked for, with the credits named as its example.
  - Against the code: the four rules of `src/browser/credits.css` (lines 12, 21, 26, 32) belong to the part of the credits, which has its own stylesheet, so the criterion leaves them where they stand. The three rules that stand in `styles.css` by the exception each belong to no part with a stylesheet of its own: the columns at `styles.css:237-252`, `trip-warning` at `styles.css:514-518`, and the frames rule with `scene-frames` at `styles.css:625-654`. The "today are" list now says "besides those columns", so with the common layout named earlier in the sentence it gives all three.
- **D-421, third binding sentence:** now "Each screen and every other part that several screens use has a stylesheet of its own …". It no longer reads as if the screens behind the exception had no stylesheet.
- ***Verification*, *Rationale* and *Accepted with it*:**
  - *complies* gains "the rules of the folded credits that name the login card and Siedziba in `src/browser/credits.css`, the stylesheet of that part".
  - The frames example gains "which no part with a stylesheet of its own holds".
  - *Rationale* and *Accepted with it* carry the same qualification.
  - *violates* is unchanged and still agrees: no rule two screens need stands in the stylesheet of one of them.
- **The styleguide** (`guidelines/styleguide-browser-view.md:358-372`, `bf0f4bc3`) says the same thing in Polish, with the same example: „sekcji „Autorzy grafiki”” — the summary the credits draw, `credits-section.tsx:23` — „należą do `src/browser/credits.css`”, and „Dziś to, poza wymienionymi kolumnami, zdanie `trip-warning` i animacja klatek …”.
  - The rule's *Good* line still agrees: the rules of a part two screens use stand in that part's file.
  - The *Bad* line still agrees: a new screen's rules at the end of `styles.css` or in another screen's file; a stylesheet of a screen in a subdirectory; a screen's stylesheet linked by the kitchen-sink page.
  - The first paragraph's „gdy tej samej reguły potrzebują dwa ekrany, część wspólna dostaje własny plik” is read with the exception stated in the paragraph after it, as before.
- **The head comment of `src/browser/styles.css:6-15`** (`370abc76`) carries the same qualification, the same three rules, and "The rules of the credits that name the login card and Siedziba belong to the part credits.css." The change is comment-only: `git diff -U0 3b4cc2a6..370abc76 -- src/browser/styles.css` holds 0 changed lines outside the comment.
- D-421, the styleguide and the comment now say one thing, and it agrees with the code.

### Remark 2 — let through, nothing to make: nothing made

No file in the range touches the recording or the states; the correction report says the same.

### Remark 3 — add the plaque of a discovery to D-40's list in D-43's words, nothing else of D-40: made

- `git diff --word-diff 3b4cc2a6..370abc76 -- foundations/decisions.md` shows one change in D-40: "`tile-revealed`." became "`tile-revealed`, and so does the icon on each plaque of a discovery in the scene, where no text stands beside it either." The added words are D-43's own clause, "and so does the icon on each plaque of a discovery in the scene, where no text stands beside it either". The rest of D-40's entry is untouched.
- The three `decision: D-40` quotations still begin and stand in its sentences:
  - `tests/view/run-header.test.mjs:564`
  - `tests/view/scene.test.mjs:937`
  - `tests/view/world-area.test.mjs:806`

  `foundation_check.py` reports 0 errors.

## New findings in the range

No Critical or Important finding.

**Minor (within the task, does not block):**
- **Where:** `src/browser/styles.css:13-14`, a context sentence the correction left unchanged: "The rules of each other screen and part stand in the stylesheet of that screen or part, which the page links after this one."
- **What is wrong:** placed after the exception, "each other screen" can read as "the screens other than those just named" — Programy, Mapy, Wiedza, Przejście and Siedziba. That suggests their other rules do not stand in their own stylesheets, which they do. It is the same turn of phrase N1 found in D-421, whose sentence the correction rewrote as "Each screen and every other part".
- **Fix:** "The rules of each screen, and of every other part that several screens use, stand in …".

## Checks

| Check | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (head `370abc76`) | 0 | 0 errors |
| `python -B .the-way/instruction-files/check_instructions.py` (head) | 0 | 0 error, 142 warn, 7 info |
| `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/styles.css` (head) | 0 | |
| `git diff -U0 3b4cc2a6..370abc76 -- src/browser/styles.css`, changed lines outside the comment counted | — | 0 |
| `git diff --word-diff 3b4cc2a6..370abc76 -- foundations/decisions.md`, the hunk of D-40 | — | one fragment changed, as remark 3 asks |
| `git grep -n "decision: D-40 " -- tests` | — | 3 quotations, all accepted by the foundation check |
| `git diff a9a95479..3b4cc2a6` | — | empty |
| Not run: the product's full gate, and any test of the product | — | gate reserved to the orchestrator; the range changes no code, selector or declaration (the earlier runs at `a9a95479` stand for the code) |

**The correction report's claims:**
- The foundation check result and prettier on `styles.css`: confirmed.
- Its prettier run on the styleguide (exit 1, the same at `3b4cc2a6`): Markdown lies outside D-32's prettier check, so the result binds nothing.

## Unread material

- `correction-1-remarks.md`: read whole.
- `correction-1-report.md`: read by its headings, its remark sections' first lines and its checks table.
- `correction-1-handoff.md`: not read.
- D-421 and D-40: read whole in the diff.
- `guidelines/styleguide-browser-view.md`: the changed paragraph and its rule (lines 338-372); the rest read in earlier reviews and unchanged by the range.

## Searches not found or unclear

none

## Working copies

- `.runs\review-correction-1\` held only the output of the prettier run. Removed.
- No worktree was made: every check ran read-only in the reviewed worktree.
- The reviewed worktree is unchanged: `git status --short` empty, HEAD `370abc76`.
