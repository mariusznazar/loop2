# Report 11 — slice 9 (make-change): the body row in cells, with the minutes of the needs

**Status:** done

Base: `cb0212e4e6b1e60771e95160deea2b1794a1fb35`. Commit: `730bc50` (one commit, by path).

## Files changed

| File | Added / removed |
|---|---|
| `src/browser/view/body-row.ts` | +60 / -1 |
| `src/browser/view/world-area.tsx` | +25 / -18 |
| `src/browser/styles.css` | +25 / -3 |
| `tests/view/body-row.test.mjs` | +157 / -13 |
| `tests/view/world-area.test.mjs` | +148 / -2 |

All five are the files the slice's *Change* names. Nothing else was touched.

## What was made

- `body-row.ts`: `temperatureNoteText` and `satietyNoteText` (pure; they turn the tagged notes of
  `needNotes` into words and a `danger` flag), `bodyCells(run, map)` (the four values of `bodyValues`
  with the notes of `needNotes` under temperature and satiety, `note: null` under health and nature
  energy). `bodyValues` stays as it was.
- `world-area.tsx`: the body row is `div.body-cells` holding `div.body-cell` per value, each with
  `span.body-value` (as before, `danger` kept) and, where there is a note, `span.body-note` (with
  `danger` for „marznie” and „głoduje”). The map comes from `MAPS[run.mapId]`. The separator `" · "`
  constant and the `p.body-text` are gone.
- `styles.css`: `.body-cells` (flex, wrapping, `--space-l` gap), `.body-cell` (flex column),
  `.body-note` (`--font-size-detail`, `--text-secondary`), `.body-note.danger` (`--danger`). No new
  token, no literal value.

## Checks (command and exit code)

Tests written first, seen failing before the code (stubs of the three new functions returning empty
values in `body-row.ts`, old DOM in `world-area.tsx`):

- `npm test -- tests/view/body-row.test.mjs`: exit 1 before the code (9 cases failed; the cases that
  compare notes and cells failed on `AssertionError`, the ones that read `cells[0].note` stopped on
  `TypeError` because the stub returns no cells), exit 0 after.
- `npm test -- tests/view/world-area.test.mjs`: exit 1 before the code (the four new cases and the
  changed one failed on their assertions), exit 0 after.

After the code, on the committed state:

- `npm test -- tests/view/body-row.test.mjs`: exit 0
- `npm test -- tests/view/world-area.test.mjs`: exit 0
- `npm test -- tests/invariants/test_browser_view_token_values.py`: exit 0
- `npm test -- tests/invariants/test_design_token_contrast.py`: exit 0
- `npm run typecheck`: exit 0
- `npx prettier --check` on the five files: exit 0
- Look at the body row in a running browser (`npm run local`, Playwright CLI by
  `.claude/skills/loop2-play/SKILL.md`): done, see below. `playwright-cli close` and
  `npm run local:stop` ("Local starts stopped: 1") run at the end; `.playwright-cli/` removed.

Not run: the whole gate (`npm test` with no argument), by the handoff and by the method.

## Changed tests (named)

- `tests/view/body-row.test.mjs`: the case "the body row reads temperature, satiety, health and
  nature energy as the task's example", which compared the four values joined by „ · ”, is replaced
  by a case that checks the cells of D-178's example in Las (36,9 °C with „bez ognia 79 min”, 82 %
  with „bez jedzenia 86 min”, „Zdrowie 100”, „Energia natury 90”); a comment says why (row 7, new
  example of D-178). The helper `joined` is gone with it.
- `tests/view/world-area.test.mjs`: in "only the value below its threshold stands in danger…" the
  assertion on `.body-text` joined by „ · ” is replaced by checks that four `.body-cell` stand, each
  with a `.body-value`, and that no „ · ” stands in `.body-cells`; a comment says why.

New cases: words of each note state (`body-row`); each note at its threshold (35,0 °C and 30 % read
minutes 0, 34,99 °C and 29,99 % read „marznie”/„głoduje”); by the fire; a chilled body by the fire
still „marznie”; a map that does not cool („nie stygnie”); no note under health and nature energy at
their lowest; danger of the values kept. On the screen: the cells and notes at game minute zero
before anything is discovered (83 and 116 min, worked out by hand in the comment); the red at chill
and hunger and the minutes at the thresholds; „przy ogniu” and back; notes after a death (synthetic
cold and hunger deaths, and a real death played out) and after a completion (82 and 115 min, worked
out by hand in the comment).

## Own-work check

Requirement most likely not met: the note's roles and the smaller size — `text-secondary` for the
note, `danger` for „marznie” and „głoduje”, `--font-size-detail` — which jsdom does not show (it
checks only the class). Check: in the running game on Las, read the computed style of `.body-note`.
It showed `font-size: 12px` (= `--font-size-detail`) and `color: rgb(159, 159, 169)` (= `#9f9fa9`,
`--text-secondary`); with the class `danger` put on a note by hand the colour read
`rgb(255, 100, 103)` (= `#ff6467`, `--danger`). The values' colour stayed `rgb(212, 212, 216)`.
The screenshot of the world area (inspected) shows the cells side by side with the notes under
temperature and satiety, health and nature energy with no note. Limit: the red note was forced by
hand in the page, not reached by playing (a real chill takes about 80 game minutes); the class
`body-note danger` that the screen produces for „marznie” and „głoduje” is checked in the jsdom
cases.

Mutations considered in head: `danger` flag dropped from the note (caught by the red cases),
`<` turned to `<=` at a threshold (caught by the 35,0 / 30 cases through `needNotes`), the note
under health added (caught by `note: null` and by `notesOf`), the notes dropped after the end
(caught by the death and completion cases), map taken from the wrong place (caught by the Las
minutes).

## Reaches beyond the dispatch

None beyond the files named. I read the guidelines the dispatch named (`styleguide-browser-view.md`
whole, `coding-browser-module.md` whole, `src/browser/AGENTS.md`); of `guidelines/testing.md` and
`guidelines/coding.md` I read the sections on expected values, changing a test, document
imitation, the gate and mutation, and the headings of `coding.md`, not both whole. Of the decisions
I read D-337, D-311, D-178, D-57 and D-39 at the current ranges; the other decisions and
invariants listed in the *Read* I did not open (the code and the tests did not need them).

## Searches not found or unclear

- `.runs/task-cycles/teraz-i-potem/task.md` passages of the *Read* (To do 4 to 6, Pytanie 6,
  Context, Settlements): not opened; D-337 holds the settlement and its example, and nothing in the
  slice needed more.
- `tests/view/page-document.mjs`: used through the existing imports of `world-area.test.mjs`, not
  read.
- `loop2-play` steps for the way into a map run differ from what the page shows today: there is no
  „Wyślij” at the character; the way is „Mapy” → „Las” → „Wejdź”. Found by looking; the skill's
  step 3 is out of date in that.

## Concerns

None for the slice. One observation: in `tests/view/world-area.test.mjs` the helper `Screen` still
passes no `onShowRule` to `WorldArea` (left by slices 5 and 6); my cases do not click the rows, so
it does not matter here.
