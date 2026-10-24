# Report — executor of Slice 11, cycle `ognisko-i-jedzenie`

**Status:** done

Slice base `6981b7fae945f28aa65fb0a04aeca31fc636fa64`; commit `eca1fb1` on `task/ognisko-i-jedzenie`.

## Files changed (`git diff --numstat 6981b7f eca1fb1`)

| File | Added | Removed |
|---|---|---|
| `src/browser/view/body-row.ts` (new) | 92 | 0 |
| `src/browser/view/status-row.ts` | 37 | 10 |
| `src/browser/view/app.ts` | 6 | 2 |
| `src/browser/styles.css` | 19 | 0 |
| `tests/view/body-row.test.mjs` (new) | 162 | 0 |
| `tests/view/status-row.test.mjs` | 137 | 2 |

## What was made

- `body-row.ts`, after the exemplar `status-row.ts`: pure `bodyValues(body)` (three values, each
  `{ text, danger }`) and `backpackText(character)`, and `createBodyRow()`, whose elements are made
  once and updated in place. Temperature is cut down to tenths (`Math.floor(value * 10)`), satiety
  and health to whole numbers (`Math.floor`), with a decimal comma. Temperature below
  `BALANCE.body.chilledBelow` and satiety below `BALANCE.body.starvingBelow` get the class `danger`;
  health never does. The backpack reads `Plecak {count}/{cap}` from `backpackCount` and
  `backpackCap` (the carrying capacity, D-57), then the held items in `ITEMS`' order with their
  names from the data.
- `status-row.ts`: after death `statusText` reads `Minuta {death.minute} · Mag zamarzł` (cold) or
  `· Mag umarł z głodu` (hunger), without „ (pauza)”; a new pure `pauseLabel(state)` gives „Pauza”,
  „Wznów” or `null` after death, and `update` hides the pause button on `null`. „Restart” and
  „Zakończ” stay destructive buttons; `app.ts` already calls `restart(state)` / `end(state)`
  whenever a map run exists, and both act on a map run ended in death (`game.ts:271-292`), so no
  change was needed there. Every action carrying a `resource` now appends its name („Zbiera:
  patyk”, „Idzie po: patyk”); the other new actions show their data status texts as they stand.
- `app.ts`: the body row is placed between the status row and the terrain panel and updated in
  `renderMapColumn`.
- `styles.css`: `.body-row` (flex, wrap, `--space-l` column gap, `--space-xs` top margin),
  `.body-text`/`.backpack-text` (no margin, tabular numbers), `.body-value.danger` in `var(--danger)`.
  No new token, role or shared control.

## Checks

| Command | Exit |
|---|---|
| `npm run build` | 0 |
| `node --test tests/view/body-row.test.mjs tests/view/status-row.test.mjs` — first run, on stubs (`bodyValues` giving three empty values, `backpackText` `""`, `pauseLabel` `""`) | 1 — 13 of 20 fail, each on its assertion (no TypeError) |
| the same, after the code | 0 — 20/20 |
| the same, with the two fake-document tests added | 0 — 22/22 |
| `npm run typecheck` | 0 |
| `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` | 0 — 281/281 |
| `python -B -m unittest discover -s tests/invariants -p test_browser_view_token_values.py` | 0 |
| `python -B -m unittest discover -s tests/invariants -p test_browser_view_focus_outline.py` | 0 |
| `python -B -m unittest discover -s tests/invariants -p test_content_identifiers.py` | 0 |
| `python -B -m unittest discover -s tests/invariants -p test_browser_view_framework.py` | 0 |
| `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier` | 0 (eslint and prettier tests both ran) |
| `python -B .the-way/elements/common/foundation_check.py` (not in the slice's checks, run anyway) | 0 — 0 errors |

The 7 tests that passed in the first run are the 6 existing status-row tests and the new "an action
without a target shows its status text from data alone". That one guards the generalization from
`walkTo` to any action with a `resource`: the data already held those texts, so it could not fail
first.

Mutation check: with `pauseButton.hidden = …` in `status-row.ts` and `classList.toggle("danger", …)`
in `body-row.ts` both removed, rebuilt, the focused run exited 1. The two fake-document tests failed
("on the screen the pause button is hidden after death…" and "the row on the screen marks only the
value below its threshold as danger…"). Both lines were then restored, and the run was 0 again.

Not run: the full `npm test`, which is the cycle's run.

## Own-work check

- Requirement most likely unmet: what reaches the screen, not the text functions. That means the
  `danger` class on the right value as values change, and the pause button really gone after death
  while „Restart” and „Zakończ” stay. Pure tests do not show either.
- Check: the fake-document tests in both test files. They build the row with `createBodyRow` /
  `createStatusRow` and update it twice, then read the class, `hidden` and the texts. The mutation
  above shows they catch the missing wiring.
- What it showed: both pass. Also a real map run with an empty program dies of cold at minute 243 in
  `advanceMinutes(…, 1000)`, and the status row reads `Minuta 243 · Mag zamarzł`.
- Screenshot: **unchecked**. The foundation and guidelines settle no route for screenshots of the
  running product (searched `foundations/`, `guidelines/`, `AGENTS.md`, `src/browser/AGENTS.md` for
  "screenshot"/"zrzut": only the styleguide's mockup example). The states were checked in code
  instead: the body row with no value in `danger`, with temperature in `danger`, with satiety in
  `danger`, an empty and a filled backpack; the status row running, paused and after death.

## Reaches beyond the dispatch

- The handoff path named in the dispatch message, `reports/18-slice-11-handoff.md`, does not exist.
  The handoff is `reports/17-slice-11-handoff.md`, and I followed it, with its report path
  `17-slice-11-report.md`.
- `src/browser/sim/data/archetypes.ts`: read to see whether "Mag" is the archetype's name for
  `content-identifiers`. It is not; the name is „Mag żywiołów".
- `tests/invariants/test_content_identifiers.py` (docstring and ENTRIES): read for the same reason.
- `tests/view/icons.test.mjs:130-160` and `tests/view/tile-list.test.mjs:1-40`: read for how view
  tests run without a browser (a fake document).
- `src/browser/sim/game.ts:200-360`: read for `restart`, `end`, `setPaused` and the span functions
  at death.

## Choices made

- **Texts of the causes in `status-row.ts`** (`DEATH_TEXTS`, keyed by `DeathCause`), beside its
  other fixed texts. Rejected alternative: a data file holding them, or a text built from the
  archetype's name. The archetype's name „Mag żywiołów” would give „Mag żywiołów zamarzł”, not the
  task's „Mag zamarzł”, and no data file is in the slice's *Change*. Cost if wrong: a second
  archetype, or a cause of another kind, moves two strings into data.
- **Which part stands in `danger`:** the whole value with its name („Temperatura 34,9 °C”), not the
  number alone. Health has no threshold in the task, so it never stands in `danger`, even near zero.
  Cost if wrong: a CSS selector or a span split.
- **`danger` judged on the body's value, not on the shown one.** Cut down, the two agree (spec
  Decision 3). For example, 34.99 is shown as „34,9” in `danger` and 35.0 as „35,0” without it;
  the tests check both.
- **Target name for any action with a `resource` field** (`"resource" in action`), not a list of
  kinds. Rejected: listing `walkTo` and `gather`. A new action that takes a resource shows its name
  without a change here.
- **Pause button hidden** (`hidden`), not removed. It is made once, like the other buttons, and
  comes back after „Restart”. If it had keyboard focus at death, that focus is lost.
- **Body row font:** the text font (Geist) with tabular numbers, not the mono font of the clock. The
  styleguide gives Geist Mono only to the chronicle and the clock.

## Adaptations and remarks

- `src/browser/sim/data/actions.ts:3` still says "Status text; for walkTo the resource name follows
  it". It now follows for every action with a resource (gather too). The data file is outside this
  slice's *Change*, so I left it; a one-line comment fix for a later slice or for the review.
- `guidelines/coding-browser-module.md` lists no row for `body-row.ts`. By the handoff, a file added
  after the audit takes no row until the guidelines are refreshed.
- No invariant test changed.

## Status texts of the new actions (for the request)

From the data, as the status row now shows them:

- „Zbiera: <zasób>”
- „Idzie do ogniska”
- „Wytwarza ognisko”
- „Zapala ognisko”
- „Zapala patyk”
- „Zasila ognisko”
- „Je jagodę”

The two texts at death are „Mag zamarzł” and „Mag umarł z głodu” (spec Decision 5).
