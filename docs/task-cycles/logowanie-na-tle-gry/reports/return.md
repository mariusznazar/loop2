# Return step — task `logowanie-na-tle-gry`

**Status:** done — the return step writes nothing; no commit. Head stays `03ab360`.

Read: `.the-way/task-cycle/skill/return_step.md`, `foundation_step.md`, the Minor findings of
`reports/whole-review.md` (M1–M3), the record template's *Return step*.

## Return step (record items)

- **Foundation compared with code:** each entry below compared with the code at `03ab360`; none
  no longer matches, so nothing is corrected.
  - Written or changed by the change:
    - `pixel-crawler-terms` — the only pack file used, `Terms.txt`, read again: the four passages
      stand word for word.
    - D-271 — the picture is `assets/sprites/login-backdrop.png` and nothing else is in that
      directory. It comes from Pixel Crawler alone (`compose.py` `SOURCES`). `npm run build`
      copies it into `dist/public/sprites/`, the directory the server serves. The file's chunks
      are only `IHDR`, `IDAT`, `IEND` (checked again), git mode `100644`.
    - D-272 — the picture stands only on `.account-card-screen`. The card is solid `panel`. Every
      text of that screen is in the card (`states.json`: no background image on the waiting screens
      or the game).
    - D-273 and `sprite-file-content` (method review) — the filter is `.png` by name and only
      `scripts/build.mjs` calls it. The meaning matches `guidelines/testing.md`.
    - D-96 "one card on a picture of the game".
    - D-73 lists D-273.
    - Part map `browser-view`: `assets/sprites/**` in *Files* and *Trust boundary*. No tracked
      `src/browser/*.tsx` exists, so that pattern stays out. `foundation_check.py` gives 0 errors.
    - *External context* holds the Pixel Crawler row.
  - Named by the task or found by the search:
    - D-27, D-46, `icon-file-content`, `font-file-provenance` and `loop2-container-icons` — the icon
      and font copies are unchanged in `copyStaticFiles`.
    - D-45, D-269, `preview-server-access` and `application-build-kitchen-sink` —
      `scripts/kitchen-sink.mjs` is unchanged, and the page gets no sprite.
    - D-43 and `browser-view-token-values` — `url()`, a percentage and `calc(-1 * var(--space-l))`;
      the test passed in the gate.
    - D-262 and D-261 — the card stands alone, and the sentence stays in the card.
    - D-86 and `public-file-access` — the sprite is inside `dist/public`.
    - `application-build-output`.
    - D-76 — its reading is what D-273 cites.
    - D-87 — "this exclusion does not cover the safety of external icons or fonts" stays true. The
      safety of sprites is kept by D-273's review, not by image comparison.
  - The part map of the touched parts: `build-tools` (its responsibility "builds and launches the
    application" covers the copy) and `deployment` ("builds the application into the loop2
    container") still describe the code. Their files and boundaries are unchanged.
- **Decisions written or changed:** none in this step (the foundation step wrote D-271, D-272 and
  D-273, and changed D-96 and D-73; the fix changed D-273).
- **Invariants written or changed:** none in this step. No rule set by the task, a decision or the
  human is left without its entry. `loop2-container-sprites` is task 20's: the code makes no part of
  it true.
- **Environment facts:** none in this step. The only source outside the product the change rests on
  is the pack's terms, already `pixel-crawler-terms`. The CSS behaviour of a percentage
  `background-position` with `cover` underlies the 1280 px condition of question 8. That condition
  is a settlement of the task, not of a decision or invariant, so no entry would name such a fact,
  and a fact stands only while one does.
- **Glossary terms:** none. "sprite", "pack" and "picture of the game" are used in their usual
  meanings, and no glossary term is used against its entry.
- **Part-map changes:** none in this step (the foundation step changed `browser-view` and
  *External context*).
- **Projected entries written whole or in part:** none in this step. The foundation step wrote:
  - whole: `pixel-crawler-terms`, `sprite-file-content` and `browser-view (changed)` (without
    `src/browser/*.tsx`, question 7);
  - in part: D-96, D-271 („Where do the scene's pictures come from?”) and D-272 („Where may a picture
    of the game stand?”).
  - `loop2-container-sprites` is not written, as the task gives.
- **Rows of *Settlements to record* written:** none in this step. C1 was written as D-273 in the
  foundation step and corrected by the fix.

## Choices that bind after the merge, kept out of the foundation

These stay rows of the questions table, not entries:

- The placement of the fire and the mage at 17.5 % of the picture, tied to the stylesheet's
  `background-position: 17.5% 50%`, which the code's comment states.
- The picture's resolution and the composition, and the composing script kept outside the
  repository (Q1).

The 1280 px condition of question 8 is the task's settlement. Among the candidates for
*Settlements to record*, only C1 was accepted, so writing question 8 as a decision would go against
that choice.

## For the orchestrator (outside the product)

- **M2:** D-271 as written ("The scene's pictures and the picture of the game behind the login card
  …") is wider than the projected entry in `definicja_mvp2_loop2.md:328-336`. The vault is not mine
  to write. Carrying the sentence back to the projected entry, or into the plan's note for task 20,
  is the orchestrator's or the human's step. Without it, task 20 writing from the projection could
  drop the login picture from D-271.
- **M1 and M3** are the review's Minor findings for the request, unchanged by this step.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors".
- `git ls-tree -r HEAD assets/sprites` → one file, mode `100644`.
- PNG chunk names of `assets/sprites/login-backdrop.png` → `IDAT`, `IEND`, `IHDR`.
- Not run: the full gate (the cycle's; it passed on `03ab360`, `reports/gate-1.log`).

## Searches not found or unclear

- The record template's *Return step* names no place for choices that bind after the merge but stay
  rows of the questions table; I listed them in their own section of this report.
- Whether D-87's carve-out ("does not cover the safety of external icons or fonts") should also name
  sprites was unclear. I found it still true as it stands and changed nothing (see *Foundation
  compared with code*).

## Commits

None. With nothing committed, the step has no range for a fresh reviewer.
