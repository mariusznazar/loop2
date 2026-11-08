# Report — slice 6 (the styleguide says how the chronicle uses roles, font and shared controls)

**Status:** done with concerns (small; listed below; nothing blocks).

**Commits** (branch `task/kronika-z-filtrami`; slice base `2b74988`, head `2ca73e1`; range `2b74988..2ca73e1`):

- `2ca73e1` docs: :memo: say in the styleguide how the chronicle of a map run uses the roles, Geist Mono and the filter row, and the tabs of the right area as a second place of a tab

The working tree is clean after the commit (`git status --short` empty).

## Files changed (added / removed lines)

| File | Added / removed |
|---|---|
| `guidelines/styleguide-browser-view.md` | 22 / 2 |

No other file changed. The Roles table is unchanged: every role the chronicle uses is already in it with its decision.

## What was made

Read first, as the slice says: the-way's `product-guidelines/styleguide/SKILL.md` in full (its step rules: the cycle's author writes the file as `product-guidelines/styleguide/template.md` gives), that template in full, `product-guidelines/template.md` in full, and the current `guidelines/styleguide-browser-view.md`. The code that the rules describe was read from `src/browser/view/right-area.tsx`, the chronicle's entry roles in `src/browser/view/chronicle-entries.ts` (the switch around lines 355-410), and the chronicle and tab rules in `src/browser/styles.css` (lines 303-400 and 477-530).

1. **Rule "Main button, secondary action and tab"** (existing; Decision gains D-311). Its tab bullet now names the second place of a tab: the two tabs „Kronika” and „Teren” over the right area of the screen of a map run while no rule is open (D-311). D-276 is not edited (as F19 leaves it); the styleguide records the second place, as the spec's *Foundation entries* asks.
2. **New rule "The chronicle of a map run"**, placed after the rule "The scene of a map run", as a product rule after the required ones. Decision: D-343 · D-344 · D-311 · D-130 · D-39 · D-40 · D-46. Invariant: none. Good and Bad lines, then the how-to body in Polish, saying: the seven filter buttons in the look of the pace buttons (D-130), one picked at a time, „Wszystko” on the start, the filter not a tab (D-343), and its text in the shared button's font; the list on `panel`, all in Geist Mono (D-46), newest first; the minute alone in a column on the left in `text-label`; the entry's text in its kind's role (`discovery`, `player-change`, `danger`, `text` for actions, combat, deaths and „Ognisko wygasło”, `positive` for a completion, D-344); an empty chronicle or an empty filter says „Nic tu jeszcze nie ma.” in `text-secondary` (D-343; as „Wybierz mapę z listy.” in D-331). Ends with the sentence that no new role, colour or value is added, with the values in the token file and the code in `src/browser/view/right-area.tsx`.
3. **`## Where in code`**: one line added, `src/browser/view/right-area.tsx` (the path the new rule names; tracked by git).

Nothing is written as a value: no colour, length, font name or number in the styleguide's rules (the minute `212` is an example entry's text, as the template's example texts are).

## Checks (command, exit code)

Run from the worktree root after the commit's file was saved.

| Check | Command | Exit | Result |
|---|---|---|---|
| foundation (slice's check) | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| token values (slice's check) | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | `Ran 4 tests … OK` |
| instruction files (extra; the product's AGENTS.md names this guideline) | `python -B .the-way/instruction-files/check_instructions.py .` | 0 | `0 error, 80 warn, 7 info` for the whole repository; for this file, 2 warnings, both `dead-path` for `` `#/mapy` `` at lines 504 and 512, present before this change (the same text stood at lines 502 and 510 at `2b74988`) |

Not run: `npm test` with no file (the full gate, not run by this executor as the handoff says). No `ui_check.md` read: the change alters no screen, only the guideline's text.

### Tests written first

None. The change is prose; there is no test to write first. No test was added, changed or skipped.

**Note on the slice's check:** `tests/invariants/test_browser_view_token_values.py` reads the code of the part's files (styles, TypeScript, HTML), not `guidelines/styleguide-browser-view.md`. Its passing says nothing about this guideline's text; the slice's "(the guideline's examples)" wording does not match what that test reads. I ran it as the slice names it and report it as such.

## Own-work check (section 3)

**Requirement most likely missed:** the styleguide writes no meaning the task did not settle, and no value, and each role it names is the one the decisions and the code give. The second place of tabs and the rule's wording must follow D-311, not invent a role or a look.

**Checks made:**
- Every backticked role in the added lines (`text`, `text-label`, `text-secondary`, `discovery`, `player-change`, `danger`, `positive`, `panel`) is a row of the Roles table. Checked by grep of the added lines against the table's first column.
- Added lines hold no colour, length, font name or hexadecimal value. Digits appear only in decision identifiers (D-274 … D-344) and in the example text „Minuta 212” and „212” (entry text).
- Each role's use was read against the code: the chronicle rows (`chronicle-minute` in `text-label`, `chronicle-text.discovery`, `.player-change`, `.danger`, `.positive`, plain `text` for the other kinds), the empty sentence in `text-secondary` (`.chronicle-empty`), the list in Geist Mono (`.chronicle-list, .chronicle-empty` in `font-family-mono`), the filter row without a mono font and on the `panel` background (`.chronicle`).
- Entry roles in `chronicle-entries.ts`: action `text`, discovery `discovery`, streak `danger`, world kind `text` (death, campfire), completion `positive`. The rule states the same.

**Result:** all checks agree. No mismatch found between the rule and the code or the decisions.

**Mutation view (not run; prose):** a rule that wrote the minute in `text` or the filter in tabs would be caught only by a reader, since the invariant is `none` for this rule (the review of a change to the chronicle reads it against D-343). Recorded as such.

## Reaches beyond the handoff

- Read in full: `.the-way/product-guidelines/styleguide/SKILL.md`, `.the-way/product-guidelines/styleguide/template.md`, `.the-way/product-guidelines/template.md` (the form and rules of writing).
- Read whole, as the handoff gives: `.runs/.../task.md` lines 30-125 (To do and Questions to settle, Q1-Q12, the parts the slice cites), `.runs/.../spec.md` lines 330-430 and 540-585 (D5, D6, D7, D9, the foundation-entry notes and the guideline changes), and the decisions D-39, D-40, D-46, D-130, D-276, D-311, D-331, D-343, D-344 and the glossary term `chronicle`, at the handoff's ranges.
- `src/browser/view/right-area.tsx` read whole; `src/browser/view/chronicle-entries.ts` lines 355-410 (the roles); `src/browser/styles.css` lines 303-400 and 477-530; `src/browser/tokens.css` read whole (to check which tokens the rule's values sit in; not written into the rule); `tests/invariants/test_browser_view_token_values.py` header and the role list (to see what it reads).
- `.the-way/instruction-files/check_instructions.py` usage (its ROOT argument): read the header to run it correctly; the file itself was not otherwise read.
- Slice 5's report, `reports/11-slice5-report.md`, sections "What was made", "Choices" and "Concerns".

## Files changed beyond the slice's Change

None. The slice's Change is `guidelines/styleguide-browser-view.md`; that is the only file committed.

## Choices

- **Second place of tabs: a bullet in the existing rule, not a new rule.** The rule "Main button, secondary action and tab" already holds the tab look; the right area's two tabs are the same control. Rejected: a rule of its own for the right-area tabs, which would repeat the tab look in two places. Cost if wrong: the rule grows by one clause; if a later decision gives the right area a different tab look, the bullet must change with it.
- **The chronicle rule's Decision list** names the decisions the body cites (D-343, D-344 for the look and the roles, D-311 for the place, D-130 for the filter look, D-39, D-40 for the roles, D-46 for the font). D-338 and D-345 are not cited by the body and are left out. Cost if wrong: a reviewer finds the rule's decision list short; it reads correctly against the cited decisions.
- **No change to the Roles table.** Every role the chronicle uses is already in it with a decision (D-39, D-40). Rejected: adding a row for the chronicle's `text-secondary` sentence; that meaning is already D-40's "explanation".
- **No change to the kitchen-sink rule.** The slice adds no shared control, state or role; the tabs and buttons on the page already show their looks.

## Concerns

1. The slice's token-values check does not read the guideline (see the note above). This styleguide is not checked by any test; its text is checked only by the foundation check (references) and by a review of the change, as the template says.
2. The two `#/mapy` dead-path warnings from the instruction checker are old, not caused by this change; the rule "Screen Mapy" writes `#/mapy` as a route in backticks. Not fixed here (not in the slice).
3. The rule "States of shared controls" describes the tab's loading and disabled states for the form's tabs. The right-area tabs never wait for a server, so those states do not occur there; the rule does not say so for the right area. I left it, since the same control's states apply and the rule does not list the right area by name.

## Searches not found or unclear

- Whether the filter buttons' font is the shared button's: the CSS has no mono rule on `.chronicle-filters`, and `.button` sets no mono font; I read this from the rules, not in a browser. The slice's wording (D9: the filter buttons keep the shared button's font) agrees.
- The `chronicle-entries.ts` role of the combat paragraph (`combatText` row) is `text` in `RightArea` (`role="text"`); I did not read the composing function beyond that line.
- None else.
