# Slice 11 report — the program editor offers the repertoire

**Status:** done with concerns (manual browser check not performed)

## Files and commits
- `src/browser/view/program-editor.ts`, `src/browser/view/game-view.ts`, `tests/view/program-editor.test.mjs` — one commit, "feat: :sparkles: offer the character's repertoire in the program editor and disable adding a rule while it holds no action".

## What changed
- New exports `offeredConditionKinds`, `offeredActionKinds`, `offeredItems`; `offeredResources` now keeps the map's resources the repertoire holds as items (map order). All read `editorRepertoire(state)`.
- `withConditionKind` gained a required `items` parameter (first target of "Zapas poniżej" from the offered items; null when none). The `OFFERED_ITEMS` constant is gone.
- The editor fills condition, action, resource and item selects from the offer; a value outside the list is added after the offered ones (`showChoice`, generalising `showResource`). The rows are rebuilt when the offer changes (same mechanism as the map's resource change).
- "Dodaj regułę" (shared button) is `disabled` while the repertoire holds no action.
- `game-view.ts` calls `programEditor.update` also when `state.understanding` changes (reference compare; the sim replaces the object only on a discovery).
- Body row, backpack, tile list, map drawing untouched (D-125).

## Checks (command, exit code)
- Red, new tests before the code (stubs returning `[]`): `npm test -- tests/view/program-editor.test.mjs` exit 1, 7 failing new cases. Three DOM cases failed there on a test-helper TypeError, not the assertion; after fixing the helper I broke the behaviour again (offer = all kinds, button never disabled) and the run failed on assertions, exit 1, 5 failing new cases (the pure-function cases for offered kinds and items, and three DOM cases); source restored.
- Green: `npm test -- tests/view/program-editor.test.mjs` exit 0 (36 pass).
- `npx prettier --check`-equivalent (`--write`, no config) exit 0, `npx eslint --max-warnings 0` on the 3 files exit 0, `npm run typecheck` exit 0.
- `npm test` exit 1: Node 507 pass / 0 fail; Python failures only the base's three: `test_loop2_one_serving_process` setUpClass, `test_ruff_source_rules`, `test_shellcheck_source_rules`.
- `python -B .the-way/elements/common/foundation_check.py` exit 0 ("0 errors").
- Not run: manual browser check (new game's lists and inactive button, change after the first chill, D-88). Reason: serving the game needs the login/account server; I did not drive a browser. Unchecked, not passed. Rendered appearance of the disabled button is also unchecked (it uses the shared button's `:disabled` style, no CSS change).

## Own-work check
Requirement most likely missed: a rule holding a value outside the lists must still show it (and an Understanding change must refresh the lists without losing it). Test "a rule holding a kind or a target outside the lists still shows it" and the item-select case cover condition, action, resource and item selects; the two-step test shows lists and button change when the Understanding changes. game-view's added condition has no automated test (needs the whole page DOM): covered only by reading.

## Choices
- Rebuild rows on any change of the offer (JSON compare) instead of patching options in place: simpler, same as the existing resource-list behaviour; cost: a partially typed number in a rule is lost at a discovery moment (the game is paused by slice 10 then).
- Required `items` parameter rather than default, so no caller silently offers all items. Existing tests' calls updated (`ITEMS_LISTED`); the old "Zapas poniżej is bound to no map" case now passes `[]` resources with all items.
- Existing tests that used `newGame()` for resource lists moved to `newKnowingGame()` (a new game offers none now) — a deliberate change by D-124/Q-C1.

## Reaches beyond the dispatch
None beyond reading `tests/sim/understanding-fixture.mjs`, `foundations/glossary.md` / `decisions.md` ranges named, and `styles.css` for `.button:disabled` (exists).

## Foundation mismatches
None found.

## Concerns
Manual browser check unperformed (above). Flaky tests did not appear.

## Fix of I-1

**Finding held right.** With no item in the Understanding, the lists offered „Idź”, „Zbierz”, „Tu leży mniej niż” and „Zapas poniżej” though `withActionKind` / `newCondition` return null for them, so the change handler committed nothing and the select kept showing the wrong kind.

**Fix (commit bdef6f8, `src/browser/view/program-editor.ts` + `tests/view/program-editor.test.mjs`):** the reviewer's first option. `offeredActionKinds` drops the kinds that take a resource (`walkTo`, `gather`) while `offeredResources` is empty; `offeredConditionKinds` drops `hereBelow` while no resource is offered and `itemBelow` while no item is offered. A rule already holding such a kind still shows it (`showChoice`). This matches `actionInRepertoire` / `conditionInRepertoire`, where those kinds have no rule in the repertoire without a target.

**Tests, written first:**
- "kinds that name a resource or an item are not offered while the Understanding holds no target for them" (pure lists; with `items: ["moss"]` all four return) and "with no target offered the selects list only choices that commit: the rule's kind stays the one shown" (DOM model).
- Seen failing: `npm test -- tests/view/program-editor.test.mjs` exit 1, both new cases failing on assertions (38 run, 2 fail), before the fix.

**Checks after the fix:**
- `npm test -- tests/view/program-editor.test.mjs` exit 0 (38 pass).
- `npx eslint --max-warnings 0` on both files exit 0; Prettier write run on both.
- `npm test` exit 1: Node 514 pass / 0 fail; Python failures only the base's three (`test_loop2_one_serving_process` setUpClass, `test_ruff_source_rules`, `test_shellcheck_source_rules`).
- `python -B .the-way/elements/common/foundation_check.py` exit 0.
- Still not run: the manual browser check.

No reach beyond the two files.
