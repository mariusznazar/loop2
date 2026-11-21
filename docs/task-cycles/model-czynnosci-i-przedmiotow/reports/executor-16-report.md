Status: done

# Report — executor of slice 16 (The scene at „Wytwórz” and „Opatrz”)

## Commits

- `82d478ba` test: :white_check_mark: the scene's test takes „Wytwórz” and „Opatrz” with an item as the target … (D-318, D-367, D-320, D-322)

Base: `301f9856`. Worktree clean after the commit.

## Outcome

`src/browser/view/scene-picture.ts` needed no change. Row 5's cases were already handled by the code from Slice 7:
- `goalOf` returns STAYS for `craft` and `tend` (the switch in scene-picture.ts, lines 180–202);
- `USES_BACKPACK` already holds `"craft"` and `"tend"` (lines 578–586), so their end starts no gathering effect;
- the badge takes `ACTIONS[kind].icon`, which is `claw-hammer` for „Wytwórz” and `bandage-roll` for „Opatrz”;
- the plaque of a discovery takes `ITEMS[bandage].icon`, which is `first-aid-kit`.

So the slice adds tests only. They pass on the existing code; the failing run was not seen for them, and the break check below is the evidence they catch a change.

## Files changed

| File | Added | Removed | Part | Reason |
|---|---|---|---|---|
| `tests/view/scene-picture.test.mjs` | 55 | 0 | (1) one-time for the model | The new cases cover the two verbs as kinds with item targets; the bandage plaque case is one assertion of the same test set. Counted in (1) because a file changed for both counts in (1). |
| `src/browser/view/scene-picture.ts` | 0 | 0 | — | Unchanged; see Outcome. |

New tests (all in `tests/view/scene-picture.test.mjs`):
- „Wytwórz and Opatrz with an item as the target leave the mage where it stands” (D-318, „Where its action leads nowhere”);
- „the badge of „Wytwórz” and „Opatrz” is the icon of the verb, and neither bends the mage” (D-320, D-318);
- „the end of „Wytwórz” or „Opatrz” starts no effect of a gathering, alone or beside one” (D-367, D-318);
- „a discovery of „Opatrz” and of the bandage shows the verb's icon and the bandage's, from its row” (D-322).

## Checks

- `npm test -- tests/view/scene-picture.test.mjs` — exit 0, 75 tests, 75 pass, 0 fail.
- Break check (own-work): I removed `"craft"` and `"tend"` from `USES_BACKPACK` in `src/browser/view/scene-picture.ts` and ran `npm test -- tests/view/scene-picture.test.mjs` — exit 1, 1 fail: „the end of „Wytwórz” or „Opatrz” starts no effect of a gathering, alone or beside one”. Then I restored the file with `git checkout -- src/browser/view/scene-picture.ts`; `git status` shows no change to it. The break of the goal (`craft`/`tend` to STAYS) and of the bending was not run; the goal and bend asserts are the existing ones plus the two new ones, not mutated.
- `npx prettier --check tests/view/scene-picture.test.mjs` — pass.
- `npx eslint tests/view/scene-picture.test.mjs` — exit 0.
- `node tests/quality/eslint-size-rules.mjs` — exit 0, "0 functions and files over a threshold in 343 files".
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — exit 0, "0 errors"; nothing from the changed file.
- Typecheck — not run: no `.ts` file changed, and the changed file is a `.mjs` test that the typecheck does not read.
- Full gate (`npm test` with no argument) — not run, as the handoff forbids.

Own-work check (section 3): the requirement that the mage stays at both verbs, that the plaque shows the verb's icon, and that neither end starts a gathering effect — checked by the four new tests; the break check above shows one of them fails when the backpack rule is removed.

## Reaches beyond the handoff

- `src/browser/sim/data/actions.ts` (lines 1–30, 175–240), `src/browser/sim/data/items.ts` (lines 75–102), `src/browser/sim/types.ts` (grep for action kinds) — to confirm the kinds `craft` and `tend`, their icons and the bandage's icon.
- `foundations/decisions.md`: D-317 (lines 11513–11603, read with long lines cut at 400 characters), D-443 (line 8155, read with long lines cut at 600 characters), D-367 and D-318 whole.
- `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `tests/view/scene-picture.test.mjs` — read in part (see Unread material).

## Unread material

- `guidelines/testing.md` — read lines 1–207 of 510 (the choice of levels, expected values, trust boundaries table start). Lines 208–510 not read.
- `guidelines/styleguide-browser-view.md` — read lines 1–601 of 1217. Not read: lines 602–1217.
- `tests/view/scene-picture.test.mjs` — read lines 1–1274 of the original file (before my edits); lines 1275–end not read. The tail holds the wolf, specks and picture-band tests, which the new tests do not touch.
- `foundations/decisions.md` D-317 — read through its verification and rationale only at a 400-character line cut; D-443 at a 600-character cut.
- `foundations/decisions.md` D-320 and D-322 — not read; the new test lines quote them as the existing tests of the same file do; I did not check the quoted sentence against the log text.
- `foundations/part_map.md` — not read (the handoff names only lines 3–32 for browser-view; I did not read them).
- `.the-way/task-cycle/change/ui_check.md` — not read: the slice alters no screen (tests only).
- `.the-way/task-cycle/change/walkthrough.md` — not read: the slice alters no behaviour a user sees; see the walkthrough line below.
- `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md` line 41 and `spec.md` lines 258–262 — taken from the handoff's copies; not opened.

## Searches not found or unclear

- `„Opatrz” ... no picture and no effect` (D-318 verification) — the scene's behaviour matches; the „no picture” part is covered by the existing tests of the scene's data (the picture band file test), not by a new assert. Not a gap for this slice.
- D-320 and D-322 quotes: taken from existing tests of the same file, not verified against the decision text.
- Nothing else not found.

## Walkthrough

The change alters no behaviour a user sees in the running product: it adds tests only, and the scene's code is unchanged. No walk was made.

## Working copies

- `.runs/executor-16/` — a directory of check logs (`run1.log`, `mutant.log`, `size.log`, `fc.log`); removed after this report was written, the results above being the record. No worktree was made.

## Choices and adaptations

- The new tests assert the existing behaviour of Slice 7 rather than a change; no code was written for them, and no failing run was seen for them first. The reason: the code already has the behaviour, so the honest check is the break check above.
- Test names use the verbs' labels as the existing tests do; the decisions cited are the ones in the handoff.
- No invariant test changed. No plan or spec change. No foundation entry written.
