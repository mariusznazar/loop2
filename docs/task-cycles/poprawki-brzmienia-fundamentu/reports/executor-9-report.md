# Report - executor of slice 9 (make-change)

**Status:** done

**Commit:** `4cd6fe84` on `task/poprawki-brzmienia-fundamentu` (base `c753bc5e`).
**Files changed:** `foundations/decisions.md` (+11 / -11), `tests/view/maps-screen.test.mjs` (+2 / -2).

## Items of the slice

- **D-119** - made. In *Rationale*, "„Obchód” or „Zawierucha”" is now "„Obchód”", and the sentence on „nie dla tej postaci” / „wykup ją” is gone.
- **D-170** - made. The binding sentence now reads "on the select list beside the label „Program:”, whose options are the names of the player's programs, at that character in the section „Kto idzie” of the card of a map". The two lines `decision: D-170 "The player picks …"` in `tests/view/maps-screen.test.mjs` (lines 483 and 560) follow the new span (rule 4). The third D-170 quotation there ("The list shows the first program …") is unchanged and still stands.
- **D-189** - made in part, part already made. The binding sentence already said "the card of the map marks it, under „Wejdź” at the character in „Kto idzie”"; I added only " (D-251)" after "equipment". The *Rationale* said "the mark on the card of the map" (not "on the list of maps"); it now says "the mark under „Wejdź” on the card of the map shows the one price of that". Tests quote D-189 up to "…lacks that equipment" with no full stop, so they still match as a prefix (the check passes).
- **D-310** - made: "…then the world and the backpack, then the nature energy, and a branch the character did not buy after them." The order matches the docstring of `actionRefusal` in `src/browser/sim/program.ts` (combat, world and backpack, nature energy, a branch not bought). I changed "and the nature energy last" to "then the nature energy" so that the sentence does not say "last" twice.
- **D-335** - not standing. The wording "Zasil — Ognisko" stands nowhere in D-335 (the pair of examples that held it was dropped in commit 4437095f); `grep -n "Zasil — Ognisko"` finds nothing in `foundations/decisions.md`. Every "Zasil — ognisko" in the log already has a lower-case o, as `actions.ts:146` has. No change.
- **D-342** - made: "…„Przesunięto regułę 2.1 na 1.3: …”, and for rule groups „Dodano grupę „Ogień””, „Usunięto grupę „…””, „Zmieniono grupę „…”” and „Przesunięto grupę „…””, with no numbers, „Zmieniono plan wyprawy”, …". Checked against `chronicle-entries.ts:237-251`: the four group texts carry no number.
- **D-347** - made: the risk now ends "…a tab left overnight may slow down under a growing chronicle, though D-382 bounds the rows drawn, so the risk is left to the memory the chronicle takes."
- **D-373** - made: "20 minutes is what one stick adds to a burning fire without the branch „Oszczędne dorzucanie” (D-379), so a smaller flame …".
- **D-380** - made (the human's wording). *Relations*: "derives from D-308 · derives from D-309 · derives from D-310". *Rationale*: "…in the form D-310 gives — the name of the thing in lower case, one reason at a time — here, and those of combat, „tylko w walce” and „trwa walka”, in D-309, so a later change names …". D-309 holds exactly those two reasons; what D-308, D-309 and D-310 bind is untouched. The binding sentences and *Verification* of D-380 are unchanged.
- **D-384** - made: "it is also the last fallback of the order D-170 gives the list „Program:”."

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` (after all edits; entries were written in one script run, so I ran it once after them, not after each) | 0 | `0 errors`, 6 `listed:` lines |
| `python -B .the-way/elements/common/foundation_check.py` (full output in `reports/executor-9-check-full.txt`) | 0 | `0 errors`, 6 `listed:` lines |
| `npm test -- tests/view/maps-screen.test.mjs` | 0 | 21 pass, 0 fail |
| `npx prettier --check tests/view/maps-screen.test.mjs` | 0 | formatted |

The 6 `listed:` lines (none is an error; each is about an invariant `*.md` sentence that an earlier slice changed, with no file citing it changed): `account-server-runtime`, `terrain-drawing-numbers`, `player-opaque-session-cookie`, `trip-plan-progress`, `loop-run-knowledge`, `sprite-credits`. None belongs to this slice: I touched no invariant.

The full gate (`npm test` without a file) was not run, as the handoff says.

## Own-work check

The requirement most likely missed: D-170's new sentence, D-310's order and D-342's four entries must say what the code does, and a quotation of a changed sentence must not break. Checks: (1) read `program.ts:285-300`, `chronicle-entries.ts:232-251`, `maps-screen.tsx` (label `Program:` span plus a select labelled `Program: <name>`) against the new wording; (2) the foundation check, which compares every `decision:` line with the binding sentences, ends with 0 errors for D-170, D-189, D-310, D-342, D-380 and D-384; (3) `grep "Program: {"` in `foundations/`, `guidelines/` and `README.md` finds no other copy of the old D-170 wording. All held.

Not caught by any check I ran: the choice in D-189 to write " (D-251)" in a binding sentence while D-251 "derives from" D-189 (the task's wording; the foundation check accepts it, and D-189's *Relations* name no D-251, which is the task's choice).

## Choices

- D-310: "then the nature energy, and a branch the character did not buy after them" instead of keeping "and the nature energy last" plus the task's phrase; rejected: the literal join, which would read "last … after them". Cost if wrong: one clause of D-310.
- D-189 *Rationale*: wrote "the mark under „Wejdź” on the card of the map" (the old wording differed from the task's quotation); rejected: leaving the *Rationale* as it was.

## Reaches beyond the handoff

- `grep -n` on `foundations/decisions.md` for "Zasil — Ognisko" and `git log -S` for the same wording (to see where D-335's wording went), `git grep -n 'decision: D-<n> "'` for D-119, D-170, D-189, D-310, D-335, D-342, D-347, D-373, D-380, D-384 (to find quotations; rule 4). No entry opened whole beyond the handoff's ranges.

## Working copies

`.runs/executor-9/` in the worktree (edit script, message file, copies of check and test output) - removed before return; the check output is kept as `.runs/task-cycles/poprawki-brzmienia-fundamentu/reports/executor-9-check-full.txt`.

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1-607 of 1166 (the Roles table and the rules up to "Menu bar"); this slice changes no style or view code, only a comment quotation in a test.
- `guidelines/testing.md`: read whole (two pages).
- `foundations/decisions.md:9344-9422` D-308 and `:8789-8814` D-251, `:7041-7067` D-379, `:10786-10798` D-382: read whole. The task passages and all other named files: read.
- Files of `src/` named in *Read* (`maps-screen.tsx`, `program.ts`, `actions.ts`, `chronicle-entries.ts`): read the cited ranges only.

## Searches not found or unclear

- "Zasil — Ognisko" (D-335): not found; see above.
- The task's quoted D-189 *Rationale* wording ("the mark on the list of maps") does not stand; the current wording is "the mark on the card of the map".
- Nothing else unclear.
