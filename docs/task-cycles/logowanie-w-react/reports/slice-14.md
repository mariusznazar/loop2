# Slice 14 report

**Status:** done with concerns (two questions for the human at the blocked draft request, below)

## Commits and files

- One commit on `task/logowanie-w-react` (hash by `git log -1`): `guidelines/coding-browser-module.md` (rewritten in place), `guidelines/coding-content-data.md` (+1 row, `src/browser/sim/data/about.ts`, status `copy`).

## What changed

- Rule „TypeScript i DOM” (D-03, invariant browser-view-framework): now says React is the one UI framework, a screen is a `.tsx` component, an unmoved screen stays on the DOM API (D-265). Good/Bad blocks rewritten (good: `.tsx` component; bad: `import "preact"`).
- Files of this kind: exemplar `account-card.tsx` (D-36); `status-row.ts` now `copy`; `account-screen.ts` removed (file no longer exists); added `account-rules.ts`, `credits-section.tsx`, `controls/react-button.tsx`, `controls/react-text-field.tsx`. Every file in `src/browser/view/` has a row.
- New rules: Hooki and Efekty (D-267, invariant none), Wspólna kontrolka w dwóch postaciach (D-265, none), Strona wszystkich stanów bez Reacta (D-45 · D-265, none).
- Examples: new „Ekran w Reactcie: karta logowania" taken from the header and code of `account-card.tsx`; the DOM example kept and relabelled as for screens that stay in DOM.
- Where in code: added `account-card.tsx`, `src/browser/kitchen-sink/`, `tests/view/react-controls.test.mjs` (all tracked).

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors".
- Not run: the full test suite (the orchestrator's run).

## Read (as ordered)

All items of *Read* and the current ranges, in full: task.md 45-49; spec.md 75-85, 135-141 (read as 135-152 with decision 6), 281; `.the-way/product-guidelines/template.md`, `coding/template.md`, `coding/SKILL.md:40-43`; `guidelines/coding.md`, `styleguide-browser-view.md`, `coding-browser-module.md`, `coding-content-data.md`; `src/browser/view/account-card.tsx`; decisions D-03, D-36, D-265, D-267, D-263 (read); environment facts 472-495. Some reads were issued in one parallel batch instead of one per call.

## Reaches beyond the dispatch

- `foundations/invariants.md:35` and `tests/invariants/test_browser_view_framework.py`: to write the Good/Bad of the framework rule against what the invariant actually checks (React not on its framework list).
- `foundations/decisions.md:5376` D-263 (searched for a decision carrying the kitchen-sink rule; it does not).
- `src/browser/sim/data/about.ts`: to confirm it exists and is a content-data file.
- `git ls-files` for `tests/view/react-controls.test.mjs` and `src/browser/kitchen-sink`.

## Questions for the human at the blocked draft request (none stopped the slice)

1. Status of the DOM modules in *Files of this kind*. D-03/D-265 say screens move to React, yet the DOM modules (including `status-row.ts`) stand as `copy`, which invites copying DOM code. Statuses allowed: exemplar, copy, do not copy. I kept the existing `copy` (no source settles another). Recommend: keep until the human decides whether `do not copy` fits modules awaiting a move to React.
2. The rule „Strona wszystkich stanów bez Reacta" cites D-45 · D-265. D-265 only says the page shows the DOM form and rejects bundling the page; no decision states the ban on reaching a `.tsx` file as such (spec decision 6 does). Recommend: the human accepts the citation, or a decision is recorded through `the-way-record-decision` for the ban.

## Searches not found or unclear

- The handoff's "rows F1, F3, F17, F19" are not named elsewhere; I took them as the foundation entries listed under *Current ranges* (D-03, D-36, D-265, D-267 and the four environment facts).
- No test runs the Good/Bad fenced blocks; the invariant tests do not check the guideline's blocks, so those were checked by reading the invariant's test only.
- Spec decision 5 says the plugin choice may be named in the request for the human to overturn; not a guideline matter, left to the orchestrator.

## Choices

- Kept the heading „TypeScript i DOM" (a literal others may match); rejected renaming it. Cost if wrong: heading slightly misleading.
- Hooki and Efekty as two rules (D-267 holds both in one decision). Cost if wrong: none.
