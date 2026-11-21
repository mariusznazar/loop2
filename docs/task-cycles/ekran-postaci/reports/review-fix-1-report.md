PASS 7a10eaf074825de3b7177bb281ff348d8e186059

# Review of fix 1 — task `ekran-postaci`

- Worktree: `.runs/worktrees/ekran-postaci`, branch `task/ekran-postaci`.
- Range: `1e21575d248ef294a45953175c7301ec18d63d57..7a10eaf074825de3b7177bb281ff348d8e186059`, two commits
  (`7344349b`, `7a10eaf0`), 5 files, computed with `git diff` and `git log` on that range;
  `git rev-parse HEAD` gave `7a10eaf074825de3b7177bb281ff348d8e186059`.
- Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md`. The findings file
  (`reports/fix-1-findings.md`) holds two Minor findings within the task and no blocking one, so only a
  new Critical or Important finding in the fix diff would fail this review (WAY-162).
- Route: one author without a plan; no finding comes from a slice.

## The findings of the findings file

1. **`src/browser/sim/data/scene.ts` — `CAMP` lost its doc comment: fixed.** `CHARACTER_FIGURE` with its
   own comment now stands after `CAMP` (`scene.ts:338-349` at the head), and the band's comment
   („The picture band at the top of Siedziba, in the pixels of its picture: …”) stands directly over
   `export const CAMP` again. The move changes no value: the removed and the added block are the same
   lines. Nothing in the file uses `CHARACTER_FIGURE` before its definition; its one user is
   `src/browser/view/character-figure.tsx`. Evidence: the diff of `7344349b`; at the head the order in
   `scene.ts` is doc comment → `export const CAMP` → doc comment → `export const CHARACTER_FIGURE`.

2. **`src/browser/character-screen.css` — the track of the practice bar hardly visible on `panel`:
   fixed.** The track is now `var(--text-disabled)` (`#52525c`, an existing token), the fill still
   `var(--text)`. Measured on the retaken screenshot after a death (practice zero,
   `loop2-postac-po-smierci.png` of commit `3a722f40`, column x = 1200): the track is 4 px of
   rgb(82, 82, 92) on rgb(24, 24, 27), about 2.30:1, where it was about 1.19:1; the filled bar on the
   camp screenshot (x = 1200) is rgb(212, 212, 216). The darker-track, light-fill, no-green look of
   row 9 and item 7 holds. On all three retaken screenshots the empty bars read as a column of tracks,
   as the old Loop's do.

The author contests neither finding.

## Findings of the fix diff

No Critical and no Important finding. Two Minor findings, both within the task:

1. `src/browser/character-screen.css:214`, `foundations/decisions.md` D-40, `guidelines/styleguide-browser-view.md:29`
   — the track takes a role whose meaning is „that this cannot be used now” (D-40) for a thing that is
   neither text nor unavailable. The fix writes this use into the binding sentence of D-40 („its track in
   `text-disabled` and its fill in `text`, though neither is text”), into its *Verification*, into its
   *Rationale* as a cost taken, and into the roles table, so the code does what the entries say and the
   use follows the existing pattern of D-40 (`text` as the fill of the header's bar, `text-strong` as
   icons, each „though it is no text”). The styleguide's rule "Each role in its meaning" asks that a new
   or changed use of a role be a decision approved before the code that uses it; no settlement row of the
   task names `text-disabled`, so the approval is the human's at the request, which the orchestrator
   says will put it there. Graded Minor: what the player sees is a grey track, with no sign of
   unavailability, and the entry agrees with the code; the open point is the human's approval of the
   role's new use.

2. The same track — the visibility the fix gains rests on a role that has no contrast threshold:
   D-42 and the styleguide's rule "Contrast of every pair" give `text-disabled` none, and
   `design-token-contrast` holds no pair of `text-disabled` with `panel`. A later change of
   `text-disabled` toward the panel, which no check stops, would fade the track again with every test
   green. Graded Minor: today's value reads well (2.30:1); the risk is a future change of a token,
   for the human to weigh with point 1 or for a later task to hold with a pair of its own.

No other fault in the diff: the stylesheet comment, D-40, the styleguide's roles rows `highlight` (no
longer naming the track) and `text-disabled`, the paragraph of "Every background with its text" and the
rule "The screen Postać" (*Good*, *Bad*, the bar's item) all name `text-disabled` for the track and `text`
for the fill; a search of the practice bar in `foundations/`, `guidelines/`, `src/browser/` and
`tests/view/` finds no stale mention of `highlight` for it. The changed test case asserts the new role
through the real stylesheet and quotes the new sentence of D-40, which the foundation check holds; the
author reports its failing run with the old rule. D-40's *Rationale* claims `text-disabled` is "the
darkest grey of the roles that stands out from the panel": of the greys above `highlight` in
`src/browser/tokens.css` (`text-disabled` #52525c, `control-border` #71717b, `text-label` #8d8d97,
`text-secondary` #9f9fa9, `text` #d4d4d8) it is the darkest, so the claim holds.

## Declined to judge

- Whether the human accepts `text-disabled` as the track's grey (point 1): the human's, at the request.

## Checks

All in the reviewed worktree; `git status --short` stayed empty.

- `git rev-parse HEAD` — `7a10eaf0…`.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors".
- `npx prettier --check tests/view/character-screen.test.mjs src/browser/character-screen.css src/browser/sim/data/scene.ts` — exit 0.
- `npx eslint tests/view/character-screen.test.mjs src/browser/sim/data/scene.ts` — exit 0.
- `npx tsc -p tsconfig.browser.json --noEmit` — exit 0.
- `node tests/quality/eslint-size-rules.mjs` — exit 0, "0 functions and files over a threshold in 346 files".
- `npm test -- tests/view/character-screen.test.mjs` — exit 0, 15 pass.
- `npm test -- tests/view/camp-picture.test.mjs` — exit 0, 7 pass.
- `npm test -- tests/view/scene.test.mjs` — exit 0, 74 pass.
- `npm test -- tests/invariants/test_design_token_contrast.py` — exit 0, 3 tests.
- `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0, 4 tests.
- Manual: the three retaken screenshots of commit `3a722f40bb90b90b04deb91b686960013cfcf2b2` downloaded
  from the fix report's links (HTTP 200, 1600 × 1000) and looked at; each shows what the report says; the
  track's colour measured with a script of mine (finding 2).
- Token contrast computed by hand from `src/browser/tokens.css`: `text-disabled` on `panel` about 2.30:1,
  `highlight` on `panel` about 1.19:1.

Not run: the full gate and `check_instructions.py` (the handoff forbids the full gate; no instruction file
changed); StrykerJS (the fix changes no simulation value: `scene.ts` only moves a block); real browser
events and focus (D-88; the fix changes no event or focus).

## Reaches

- `src/browser/tokens.css` — the values of the greys, for the contrast and the *Rationale*'s claim.
- A search of mentions of the practice bar in `foundations/decisions.md`, `guidelines/*.md`,
  `src/browser/*.css`, `src/browser/view/*.tsx` and `tests/view/*.mjs`.

## Working copies

- `.runs/worktrees/ekran-postaci/.runs/review-fix-1` — the two diffs of the fix, the
  logs of the checks, the script `column.py` and the three downloaded screenshots. Removed by its full path
  (`rm -rf`); the directory no longer exists.
- `.runs/worktrees/ekran-postaci/.runs/stryker` — the JSON report StrykerJS wrote in
  my review of the whole change (the author's fix report asked whose it was: mine). Removed by its full path.

## Unread material

The findings file, the fix report, the handoff and `fix.md` read whole; the fix diff read whole. Of
D-40 the changed paragraph, *Verification* and *Rationale* read in the diff with their context; D-42
by its binding sentence in my earlier index. No other foundation entry read for this review.

## Searches not found or unclear

none
