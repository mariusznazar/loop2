PASS 9dd6ab22621748cb352c6b2c978a7db5512b1b51

# Review 2 — the fix of the Minor findings, task oboz-w-siedzibie

Fix range: `07fd0de35e07ea03bb4e8e706ce221f54be0b801..9dd6ab22621748cb352c6b2c978a7db5512b1b51`, two commits
(`afc40f77`, `9dd6ab22`), 3 files, +45 −31. `git rev-parse HEAD` in the reviewed worktree gave the head given.
Bounded by `reports/findings-1.md` (M1–M4, Minor alone) as `.the-way/task-cycle/review/fix.md` gives.

Counts: new Critical or Important 0 · findings fixed 3 (M1, M3, M4) · remains 1 (M2, contest accepted as
to the method, goes to the request's list) · new Minor 2.

## Each finding of the findings file

- **M1 — fixed.** D-389 *Verification* now reads "the fire in the middle …, the chest and the characters of
  Siedziba beside it" (`foundations/decisions.md:9517-9518`); the styleguide *Good* reads "skrzynką i
  postaciami … obok niego" (`guidelines/styleguide-browser-view.md:792`) and the rule's body names no side.
  No foundation entry or guideline now fixes the sides, so accepting the screenshot no longer accepts a
  layout in them. The comment of `CAMP` (`src/browser/sim/data/scene.ts:307-322`) still describes the
  present sides; I accept the author's reason: it describes the code beside it, binds nothing and changes
  with that code. Evidence: the diff; a search of the two files for "prawej", "lewej", "to its right",
  "to its left" in D-389 and the rule finds none.
- **M2 — remains; the author's contest kept as to the fix.** The evidence holds:
  `.the-way/elements/decisions/template.md:135-140` ("A number stands for the question a decision answers
  … A change to a decision edits its entry in place"), `.the-way/elements/decisions/skill/decide_entry.md:9-10`
  and `.the-way/elements/decisions/skill/SKILL.md:55-56` (a change keeps `<PREFIX>-<NN> — <question>`) give
  no way to change the question of a current decision, and the task (Q5, *Decisions in play*) has the camp's
  pictures enter as a change of D-271. So the title cannot be fixed within the method in this change; the
  finding stays as written, Minor, for the request's list. It is no failure of the fix.
- **M3 — fixed.** The rule „The camp of Siedziba” (`guidelines/styleguide-browser-view.md:788-805`) is now
  one paragraph of instructions ("Rysuj …", "przycinaj …", "Poruszaj …", "Nie daj …"), names no file of the
  code and repeats no sentence of D-389. It still carries every item To do 7 lists: what the camp is made
  of, which characters, where the band stands, its background, the narrower window, the motion and reduced
  motion, no text or click; and "no new role, token value or role meaning". *Decision* gained D-286 and D-280,
  both cited in the body, both current entries (`foundation_check.py` 0 errors).
- **M4 — fixed.** New case "the camp's files hold pixels alone, in the size of the data"
  (`tests/view/scene-picture.test.mjs:1520-1549`, the test at `:1525`): chunk list exactly `IHDR`, `IDAT`, `IEND` for both files,
  sizes 672 × 48 and 26 × 21 (the data's sizes), no clear pixel in the clearing, no half-clear pixel in the
  chest. I saw it fail for the break it names: `chest.png` with a `tEXt` chunk inserted after `IHDR` (in a
  separate worktree), `node --test tests/view/scene-picture.test.mjs` exit 1, that case alone failing.

## New in the fix diff (Minor, for the request's list; neither blocks)

- **N1 — the rule says less than D-389 about readers.** `guidelines/styleguide-browser-view.md:802-803`:
  "Nie daj obozowi … nazwy dla czytników ekranu". D-389 says the camp is "hidden from readers of the screen"
  (and the code sets `aria-hidden="true"`, `src/browser/view/camp.tsx:77`). An element with no accessible
  name is not the same as one hidden from readers: a picture with no `alt` would have no name and still be
  announced. Suggest "ukryj go przed czytnikami ekranu". The test "the camp is a picture …" keeps the code
  right whatever the rule says.
- **N2 — one assertion of the new case cannot fail on today's file.** `tests/view/scene-picture.test.mjs:1539-1543` (message at `:1542`),
  "the clearing has no clear pixel": `camp-clearing.png` is RGB, and `decodePng` gives an RGB pixel the
  alpha 255 (`:817-821`), so the check holds for any RGB file. It would catch a later RGBA re-export with a
  clear pixel, which is its point; worth a word in the comment, nothing more.

## Declined to judge

- The comment of `CAMP` in `scene.ts` describing the sides (see M1): code documentation that follows the
  code, outside what the findings file asks.
- The token rule's paragraph on the camp's geometry, which still names `camp.tsx` and `camp-picture.ts`
  (`guidelines/styleguide-browser-view.md:127-130`): outside M3's range and unchanged by the fix.

## Checks run

| Check | Command or method | Exit / result |
|---|---|---|
| head | `git rev-parse HEAD` in the reviewed worktree | 0, `9dd6ab22…` as given |
| fix diff | `git log` and `git diff 07fd0de3..9dd6ab22` | 0; 2 commits, 3 files, +45 −31 |
| scene-picture tests | `npm test -- tests/view/scene-picture.test.mjs`, in a separate worktree of the head (removed after) | 0; 70 pass, the new case among them |
| new case seen failing | `chest.png` given a `tEXt` chunk in that worktree, then `node --test tests/view/scene-picture.test.mjs` | 1; only "the camp's files hold pixels alone, in the size of the data" fails; file restored, worktree removed |
| Siedziba tests | `npm test -- tests/view/headquarters-screen.test.mjs`, same worktree | 0 |
| foundation | `python -B .the-way/elements/common/foundation_check.py` in the reviewed worktree | 0; 0 errors |
| M2 evidence | read `.the-way/elements/decisions/template.md:130-147`, `skill/decide_entry.md`, `skill/SKILL.md:55-56` | holds, as above |
| reviewed tree | `git status --short` after the checks | clean |

Not run: the full `npm test` (the orchestrator's next step); `tests/quality/test_quality_invariants.py`
(no quality environment here; the author reports exit 0); the container check
`tests/invariants/test_loop2_container_sprites.py` (no Docker daemon, as in review 1; the fix adds no file
to `assets/sprites/`, so the trust boundary is as review 1 found it).

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md`, `skill/decide_entry.md`, `skill/SKILL.md`: to judge the M2
  contest, as the handoff asks.
- `tests/view/scene-picture.test.mjs:762-823` (`decodePng`): to judge what the new case can catch (N2).

## Unread material

none beyond review 1's list; the fix touches no decision, invariant or guideline file beyond those review 1
read whole, and the parts of the record-decision method named above were read whole.

## Searches not found or unclear

- Not found: a rule of the record-decision method for changing the question of a current decision (the
  basis of the M2 contest; consistent with the author's search).
