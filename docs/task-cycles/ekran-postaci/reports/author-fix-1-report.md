done

# Author report — fix 1 of the review of the whole change, task `ekran-postaci`

Variant: the fix of a review's findings (`.the-way/task-cycle/change/SKILL.md`, `fix.md`). Findings:
`reports/fix-1-findings.md` (two Minor findings within the task, review `PASS 1e21575d…`).

## Commits and range

Range `1e21575d248ef294a45953175c7301ec18d63d57..7a10eaf0`:

| Commit | Message (start) |
|---|---|
| `7344349b` | refactor: give CAMP its description back by moving CHARACTER_FIGURE with its comment below CAMP … (D-445, D-389) |
| `7a10eaf0` | style: draw the track of the practice bar of a tree in text-disabled … (D-40) |

Files: `src/browser/sim/data/scene.ts` (+13 −13, moved block only), `src/browser/character-screen.css`
(track rule and its comment), `foundations/decisions.md` (D-40: one binding sentence, the *Verification*
clause, the *Rationale*), `guidelines/styleguide-browser-view.md` (Roles rows `highlight` and
`text-disabled`, the paragraph of tracks in "Every background with its text", the rule "The screen
Postać": *Good*, *Bad* and the bar's item), `tests/view/character-screen.test.mjs` (the role case and
its D-40 quotation).

## Findings

1. **`scene.ts`, the comment of `CAMP` stood over `CHARACTER_FIGURE` — fixed** as the reviewer named:
   `CHARACTER_FIGURE` with its own comment now stands below `CAMP`, so the band's comment is again
   directly over `export const CAMP`. No value changed. Check: Prettier, ESLint, typecheck (below), and
   `tests/view/camp-picture.test.mjs` and `tests/view/scene.test.mjs` — 0.

2. **The track of the practice bar hardly seen on the area's `panel` (about 1.19:1) — fixed within the
   task's settlement.** The track now stands in `text-disabled` (#52525c, an existing token, no new
   value): about 2.30:1 against `panel` (#18181b), where `highlight` (#27272a) gave about 1.19:1; the fill
   stays `text` (#d4d4d8), about 5.2:1 against the new track. The bar keeps what row 9 settled — a
   darker track, a light fill, no green — and differs from the header's bar only in the grey of its
   track. D-40's sentence now reads: „The bar of the practice of a tree on the screen Postać has a darker
   track and a light fill with no green, as the bar of a requirement that is not met has, its track in
   `text-disabled` and its fill in `text`, though neither is text, and the points of that tree to spend
   stand beside it in `text-strong`.” Its *Rationale* names the cost accepted: `text-disabled` stands at a
   track, which is no text and nothing that cannot be used now. The styleguide's `text-disabled` row
   says it also stands as that track; the `highlight` row no longer names it. The contrast test and the
   token tests pass (no new pair: `text-disabled` has no threshold under D-42). Seen in the browser:
   computed track colour rgb(82, 82, 92); on the three retaken screenshots the empty tracks of a new
   character read as a column of bars, as loop's do.
   This entry change is the cycle's (no settlement row gives `text-disabled`); the request should put it
   before the human with the D-40 sentence above.

## Checks (command — exit code)

- `npx prettier --check tests/view/character-screen.test.mjs src/browser/character-screen.css src/browser/sim/data/scene.ts` — 0
- `npx eslint tests/view/character-screen.test.mjs src/browser/sim/data/scene.ts` — 0 (also `npx eslint src/browser/sim/data/scene.ts` before the first commit — 0)
- `npm run typecheck` — 0 (twice, after each fix)
- `node tests/quality/eslint-size-rules.mjs` — 0 ("0 functions and files over a threshold in 346 files")
- `python -B .the-way/elements/common/foundation_check.py` — 0 ("0 errors")
- Failing run of the changed role case, with the track rule set back to `var(--highlight)`: `npm test -- tests/view/character-screen.test.mjs` — 1 (only „the bar of a tree has its track in text-disabled …” failed); rule restored, `git diff` shows only the intended line.
- `npm test -- tests/view/character-screen.test.mjs` — 0 (15 pass)
- `npm test -- tests/invariants/test_design_token_contrast.py` — 0
- `npm test -- tests/invariants/test_browser_view_token_values.py` — 0
- `npm test -- tests/invariants/test_design_token_sources.py` — 0
- `npm test -- tests/view/camp-picture.test.mjs` — 0
- `npm test -- tests/view/scene.test.mjs` — 0
- `npm run build` — 0 (for the screenshots)
- Not run: the full gate (the orchestrator's, by the user's instruction); `check_instructions.py` (no instruction file changed).

## Own-work check

Requirement the fix most likely fails: row 9 — the bar still looks like the bar of an unmet
requirement (darker track, light fill, no green) and the screen's text says what it shows. Check: in
Chromium (local start, session `ekran-postaci-fix`, 1600 × 1000) the computed track colour
rgb(82, 82, 92) is darker than the fill rgb(212, 212, 216) and lighter than the area rgb(24, 24, 27);
no green anywhere in the row; D-40, the styleguide and the stylesheet comment all name `text-disabled`
for the track, and the foundation check holds the test's quotation of D-40. Result: holds.

## Choices

- **Track in `text-disabled`** — chosen: an existing token, the darkest grey of the roles that reads on
  `panel`, keeping "darker track, light fill". Rejected: `page` (#09090b) as the track — darker, but about
  1.12:1 on `panel`, worse than now; `control-border` (#71717b, about 3.7:1) — reads well, but it means
  "this can be clicked or typed into", and its grey stands too near the fill; an outline of the track in
  `divider` — the same value as `highlight`, nothing gained; a thicker bar — the same contrast ratio; a
  new token for tracks — a new value, the human's decision (would have stopped the fix). Cost of the
  choice: one more use of a text role at something that is no text, written into D-40 as its other such
  uses are; undone by one CSS line and the sentences.
- **Finding 1**: `CHARACTER_FIGURE` moved below `CAMP` (the reviewer's second way); rejected moving it
  above the band's comment — it would stand between `SCENE_PROPS`' block and the band's, away from the
  band it borrows from.

## Screenshots (retaken: the three of the screen Postać)

New commit `3a722f40bb90b90b04deb91b686960013cfcf2b2` on branch `loop2/ekran-postaci` of
`mariusznazar/screenshots`, replacing the files by the same names, no force-push (parent `2bd7b8dc`):

- After a death, practice zero, trees folded: `https://github.com/mariusznazar/screenshots/blob/3a722f40bb90b90b04deb91b686960013cfcf2b2/loop2/ekran-postaci/loop2-postac-po-smierci.png?raw=true`
- In the camp with a tree open: `https://github.com/mariusznazar/screenshots/blob/3a722f40bb90b90b04deb91b686960013cfcf2b2/loop2/ekran-postaci/loop2-postac-oboz-drzewo.png?raw=true`
- In an earning loop with „+1 pkt czeka w pętli”: `https://github.com/mariusznazar/screenshots/blob/3a722f40bb90b90b04deb91b686960013cfcf2b2/loop2/ekran-postaci/loop2-postac-petla.png?raw=true`

The old Loop's screenshot and the solved-map run's stay at the first commit `2bd7b8dc…`
(`loop-postac-31-pazdziernika.png`, `loop2-przejscie-rozwiazanej-mapy.png`). Each new shot was looked at
before the push: no address, password or token in it.

Side observation: opening `#/postac/1` by typing the address (Playwright `goto`) put keyboard focus on
the screen's host, which showed the focus ring around the whole screen; I took it off (`blur`) before the
shot. The focus on a screen opened by a change of screen predates this task (`focus()` of the screen) and
is outside its scope; a click on a name, the player's way, shows no ring.

## Unread material

none — the findings file, the handoff, `fix.md` and the code the findings name were read whole.

## Searches not found or unclear

- No token in the styleguide is given for a track other than `highlight`; the track's new grey borrows a
  text role, which the request should name to the human.
- `.runs/stryker/` stands in the worktree; it is not mine (I ran no mutation tool) and I left it.

## Working copies

`.runs/worktrees/ekran-postaci/.runs/author-fix-1` (logs, the composed state and
its compose and send scripts, the three screenshots, the clone of `mariusznazar/screenshots`) and
`.runs/worktrees/ekran-postaci/.playwright-cli` (the session files Playwright CLI
wrote) — both removed by their full paths. The browser session `ekran-postaci-fix` closed; the local start
stopped ("Local starts stopped: 1"). Nothing kept in `reports/` beside this report.
