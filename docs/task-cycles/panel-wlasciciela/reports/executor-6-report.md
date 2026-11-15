# Executor report — slice 6 (the styleguide describes the owner's screen, link and destructive button)

**Status:** `done`

## Commits

- `9faef372` — `docs: :memo: describe the list of accounts, the owner panel's link in the menu and the destructive button Zablokuj in the styleguide (D-281, D-410, D-411)` — on `task/panel-wlasciciela`, base `175d6d42`.

## Files changed

- `guidelines/styleguide-browser-view.md` — 58 lines added, 4 removed.

What changed, by place in the file:

1. **Rule "States of shared controls"**: `Decision` gains D-411. The list of destructive buttons gains „Zablokuj” on the list of accounts (D-411). The loading sentence gains „Zablokuj” as a destructive button that, while it waits for the server, is disabled and keeps its text.
2. **Rule "Menu bar, the menu „Konto” and the list of programs"**: `Decision` gains D-410 and D-411. The menu „Konto” bullet gains the link „Panel właściciela” to `#/konta`, after the address and before the buttons: a plain menu link, text in `text`, hover `highlight` as the program-list links, focus by Visible focus, absent for a player. The bar bullets gain: the items are the same for a player and an owner, and the list of accounts marks no item.
3. **New rule "The list of accounts"** (placed after "The end-of-run window", before `## Examples`): `Decision` D-410 · D-411 · D-281 · D-44 · D-39 · D-40, `Invariant` none, one-line Good and Bad. Covers the rows (address in `text-strong`; blocked state in `warning` when blocked, `text` otherwise; privilege and role in `text`; labels in `text-label`), the four buttons (three plain shared buttons; „Zablokuj” destructive, neutral at rest, `danger` under pointer and focus, disabled and keeping its text while waiting; no „Zablokuj” at an account with the owner role, including one's own), the confirmation sentence in `warning`, the empty list (`text-secondary`, no wording fixed), the failed list (one sentence in `warning` above the list), and an „Otwarte dla człowieka” list with the two items the decisions do not settle.

No role, no value, no shared control and no state of one is added. The Roles table is unchanged. `Where in code` is unchanged (the screen's code does not exist yet).

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Foundation check (plan's check 1) | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| Private-paths test (plan's check 2) | `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` | 0 | 1 test, OK |
| Prettier | not run | — | no `.ts`, `.tsx`, `.mjs` or `.css` file changed; the added check does not apply |
| ESLint | not run | — | no `.ts`, `.tsx` or `.mjs` file changed; the added check does not apply |

Both focused checks ran once, after the last edit and before the commit; the commit did not change the content. The product's gate (bare `npm test`) was not run, as the handoff says; the orchestrator runs it.

Own-work check (section 3 of make-change):

- **Requirement**: the Goal's list is present in the styleguide: the list of accounts at `#/konta` (rows, four buttons, role meanings, confirmation sentence, no „Zablokuj” at an owner, empty and failed list); the menu link „Panel właściciela” after the address and before the buttons, not a bar item; „Zablokuj” in the destructive-button list of „States of shared controls”, with its neutral rest, `danger` under pointer and focus, and its disabled waiting state keeping its text.
- **Check**: `grep -n "Zablokuj\|Panel właściciela\|D-411\|D-410" guidelines/styleguide-browser-view.md`, read against each item of the Goal, plus the two focused checks above.
- **Showed**: every item has a line; the grep hits are at the decision lines (195, 493, 973), the states rule (227, 256), the menu rule (520, 538), and the new rule (973–1012). Both focused checks passed.
- **Weakest point**: the roles I chose where D-411 and the foundation do not settle them — see concerns. Check of it: the review of the whole change reads each role of the new rule against D-39 and D-40 on a rendered screen of slices 7–10.

## Reach beyond the handoff

- Read `.the-way/product-guidelines/template.md` (the guideline form) and `.the-way/product-guidelines/styleguide/template.md` (the styleguide form), to write the new rule in its form. Both are named by the styleguide skill's step 2 and 4, so the reach is the form the Goal's "form of a rule" asked for.
- Read `.the-way/product-guidelines/styleguide/SKILL.md` as the file the stub `.claude/skills/the-way-maintain-styleguide/SKILL.md` names. Its steps 1, 3, 4 and 5 name further files (`recognize.md`, `audit.md`, `settle.md`, `hand_back.md`, and others); I did not read them, because my slice does no refinement and no audit.
- Searched `guidelines/` for the owner-panel terms, to check no other rule of the styleguide already names them (see Searches).

## Working copies

None made. Nothing to remove.

## Unread material

- `.runs/task-cycles/panel-wlasciciela/plan.md` — not read by me; the slice section is copied in the handoff, which I followed.
- `.runs/task-cycles/panel-wlasciciela/task-frozen.md` — read lines 25–44 only (the background, To do, and the first question with its answer). The slice's *Read* named To do 29–38 and the questions to settle; the rest of the task was not read.
- `foundations/decisions.md` — read whole only the entries D-280 (7296–7365), D-281 (7366–7411), D-44 (1098–1112), D-402 (10732–10746), D-410 (10894–10910), D-411 (10911–10936). Other entries not read.
- `foundations/glossary.md` — read the term "owner" (270–277) only.
- `guidelines/styleguide-browser-view.md` — read whole (987 lines, in two pages).
- `.the-way/product-guidelines/styleguide/SKILL.md` — read whole.
- `.the-way/product-guidelines/styleguide/template.md` — read whole.
- `.the-way/product-guidelines/template.md` — read whole.
- `.the-way/task-cycle/change/SKILL.md` and `.the-way/task-cycle/change/slice.md` — read whole.
- Not read at all, not needed for this slice: `.the-way/product-guidelines/styleguide/recognize.md`, `starting_rules.md`, `research.md`, `audit.md`, `audit_end.md`, `settle.md`, `task_document.md`, `new_tools.md`, `staged_cleaning.md`, `hand_back.md`; `ui_check.md`; `guidelines/testing.md` and `guidelines/coding.md` (no test or code written).

## Searches not found or unclear

- **The styleguide's example for "a change that adds no token, no shared control and no state of one"** (the order of work the Goal names): not found. A search of `.the-way/product-guidelines` for "adds no", "no new shared", "order of work" and "kolejność" gave no match. The only order example is "Plan of a user-interface change" in `guidelines/styleguide-browser-view.md` (under `## Examples`), which says it is an example, not a rule, and lists environment, values, one screen, then states. I followed the Goal's order (rules written before the screen) and the styleguide's own rule that a change with no new role, value, control or state needs no new decision.
- **Other owner-panel terms in `guidelines/`** (`Zablokuj`, `Panel właściciela`, `konta`): only unrelated matches in `guidelines/testing.md` and `guidelines/coding-*.md`; no existing styleguide rule names the owner panel, so the additions are not duplicates.
- **Current wording** for the confirmation, the empty list and the failed list: not found in the handoff, the plan, the task or the decisions. Left open in the rule (see concerns).

## Choices made (with the way rejected and its cost if wrong)

1. **Blocked state in `warning`** (D-39: "coś się nie wykona"). Rejected: `text`, as the other state fields. Cost if wrong: a blocked account is not visually marked; the reviewer can move it to `text` with one line.
2. **Confirmation sentence in `warning`.** Rejected: `danger`, which D-39 reserves for loss of a character, progress or data — a block loses none of them. Cost if wrong: one role change, same as in 1.
3. **Owner link in `text`, hover `highlight`.** Rejected: `text-label` (the bar's resting item role, which would make the link look like a bar item, which D-411 and D-281 forbid) and `text-strong` (reserved for the current item and names). Cost if wrong: low.
4. **Destructive „Zablokuj” as the rule's list entry**, with the disabled-while-waiting state keeping its text, per D-44's destructive-button rule and the Goal. No choice beyond the decisions.
5. **Empty list in `text-secondary`** with a sentence, following D-331 and D-343. The wording is left open. Rejected: no sentence at all — a blank list reads as an error.

## Questions

1. Which buttons stand at the confirmation of „Zablokuj”, and does a secondary action (D-275) cancel it? D-411 does not settle this, and the styleguide cannot describe it without it. My recommendation: leave it open in the rule as written, and let the human settle it; the reviewer then checks the screen against the rule once it is decided. Cost of leaving it open: the screen's author chooses, and it may need a second styleguide change.
2. The wording of the empty-list sentence and the failed-list sentence. My recommendation: the human chooses them when the screen is made (slice 7–10); the rule fixes the roles only.

## Concerns

- The bar's mark on `#/konta`: D-281 says no item of the bar is marked there, and the link is not a bar item, so I wrote no mark for the link either. If the link should show that the owner is on the panel, that is an unsettled choice; the reviewer should check it.
- The rule now carries a list of open human items. That follows the existing "Otwarte dla człowieka" practice in the styleguide, but it is a new use in the list-of-accounts rule; the reviewer can judge it.
- Nothing in the changed file is a check that a test can make: `Invariant: none`, as the rule's form asks for a rule the review checks.

## Addendum (coordinator's answers, commit `57e03bc9`)

**Status:** `done`

**Commit:** `57e03bc9` on `task/panel-wlasciciela`, on top of `9faef372`; `guidelines/styleguide-browser-view.md` only, by path.

**Changes in „The list of accounts”:**

- The confirmation of „Zablokuj” stands as the confirmation of „Zacznij od zera” does (D-402, read in `src/browser/view/program-list.tsx`, constants `RESET_QUESTION`, `RESET_CONFIRM_TEXT`, `RESET_WITHDRAW_TEXT`): the sentence of the block's effects in `warning` beside the control; the confirming button „Tak, zablokuj” as a destructive button in the look of „Zablokuj”; the secondary action „Wróć”, which closes the confirmation and changes nothing. The click that opens the confirmation sends nothing; „Tak, zablokuj” sends the block.
- The empty-list sentence and the failed-list sentence: the rule states that each is one sentence in its role (`text-secondary` and `warning`), and that the screen's author writes the words. No open item is claimed.
- The „Otwarte dla człowieka” part of the rule is deleted. The earlier open-items paragraph in the report's Questions and Concerns is superseded by this addendum.

**Note for the coordinator:** the styleguide also has an „Otwarte dla człowieka:” list in the rule „The end-of-run window” (line 960 of the file). It is not part of the list-of-accounts rule, so I left it. Say if it should go too.

**Checks (rerun after the edit, before the commit):**

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`.
- `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` — exit 0, 1 test OK.

**Unread material (addendum):** `src/browser/view/program-list.tsx` was read only in lines 40–70 (the reset's constants and types); the rest of the file was not read. The coordinator's description of the confirmation was followed where the file did not say more.

**Searches not found or unclear (addendum):** none new.
