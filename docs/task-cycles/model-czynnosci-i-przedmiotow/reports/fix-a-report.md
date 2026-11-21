done with concerns

# Fix A report — Important 2 (D-441), Minor 1, 10, 11

Commit: `109b2417` on `task/model-czynnosci-i-przedmiotow` (base `f9a9d24f`). Files changed:
`foundations/decisions.md` (47 added, 73 removed), `README.md` (1/1), `guidelines/coding-browser-module.md` (1/1),
`tests/sim/judging-record.test.mjs` (5/5), `tests/view/judging-cache.test.mjs` (1/1).

The concern: I touched two test files, which the handoff put outside my scope (see "Reaches beyond the handoff").

## Important 2 — fixed

D-441 now reads, in its first paragraph, "… and another for every change it counts, but for a chance of a collision of
at most one in 2^52." and, in its second, "… so two different contents share a judging only through such a collision, and
…". Its rationale's last accepted-cost clause now carries the same qualification ("… differ for every change it counts,
but for a chance of a collision of at most one in 2^52, in which a judging of one content stands beside another content
with the same fingerprint"); *Rejected* contradicted nothing and stands as it was. Every other binding sentence is
unchanged. Check: `python -B .the-way/elements/common/foundation_check.py` exit 0, "0 errors" (the run reads every `decision:`
quotation and the word limits of the changed entry).

Entry `Contradiction: yes` is resolved by the entry now stating what the spec's Decision 5 accepted.

## Minor 1 — fixed for all ten decisions

For each: read the entry, listed the `decision:` lines of the tests added in the range (`git diff -U0 aff09e98..HEAD -- tests`)
and read the tests under them, named in `tests:` what they hold, removed the pair (or the part of it) for parts a test holds.

- **D-142:** pair removed whole (attack before the end of either verb takes nothing; attack in the ending minute comes after the effect — `tests/sim/craft-and-tend.test.mjs`, four cases). `tests:` names both.
- **D-145:** `tests:` now names the use of one piece and the healing of any cause at the end, never above full health, not carried out in combat or at full health, the piece staying where health is full at the end (`craft-and-tend.test.mjs`). The pair stays for the stick after the encounter only (the sentence's "condition unchanged" has no test of its own); its „Opatrz” items are gone.
- **D-121:** pair removed whole; `tests:` names the first gathered moss (bandage and „Wytwórz”, neither „Opatrz” nor „Zdrowie poniżej”), the first crafted bandage („Opatrz” in that minute, nothing before, no condition), and no discovery by a „Wytwórz” with no effect or a repeated one.
- **D-380:** the „Wytwórz”/„Opatrz” items of both lines of the pair removed; `tests:` names „brakuje {ile} × {rzecz}” in the recipe's order, „zdrowie pełne” before „brakuje …”, and the rule passed over. The pair stays for „Obchód” with a full backpack and „Zapal — ognisko” short of nature energy, which the entry's own clause already left to the pair.
- **D-443:** pair and "until those tests stand" removed; `tests:` gained that a kind of action of today, „Idź — ognisko” and „Zjedz — jagoda” among them, keeps its kind when read from a previous save (`tests/sim/previous-programs.test.mjs`, version 9 case).
- **D-293:** pair removed; `tests:` names the cell „Wytwórz” with no time, the cell „Opatrz” with its own, the closed field with the time beside it, and each target of „Wytwórz” with the recipe's time beside its price, none at „Opatrz” and a resource (`tests/view/item-verb-panel.test.mjs`).
- **D-289:** pair removed; `tests:` names the bandage among the items of „Zapas poniżej”, in no pick of a target of the four actions, refused by the check, and „Wytwórz”/„Opatrz” greyed „nie znasz jeszcze celu” until an item each takes is known, moss being a target of neither (`program-editor.test.mjs`, `action-targets.test.mjs`).
- **D-363:** pair removed; `tests:` names no price at the cells of „Wytwórz”/„Opatrz”, the price at each target, the price of the chosen target in the field, none in the row (`item-verb-panel.test.mjs`, `craft-and-tend.test.mjs`).
- **D-318:** pair removed; `tests:` names both verbs leaving the mage standing, neither bending it, and no gathering effect at the end of either (`tests/view/scene-picture.test.mjs`).
- **D-441:** the fingerprint part of the pair removed (the pair's "complies"/"violates" items for it); `tests:` now names the stored fingerprint, a judging standing only beside the content it judged, also where another content reaches the same content revision, and a value with a malformed fingerprint read as another form. The pair stays for „Wyloguj”, which no test holds (there is no `decision:` line on the sentence about what stays at „Wyloguj”).

Check: foundation check exit 0. A search of `foundations/decisions.md` for "until tests of", "until those tests" and "until tests" finds no trace in the ten entries.

## Minor 10 — fixed

`README.md:78` now says the titles of the icons are held "by the resource data in `src/browser/sim/data/resources.ts` and, for the bandage, the item data in `src/browser/sim/data/items.ts`, next to the icon's file name". The part about the actions' titles in `actions.ts` is left as it stood. Evidence the sentence is true: `src/browser/sim/data/items.ts:11-12,101-102` (`iconTitle: "First aid kit icon"`). Prettier check of `README.md` passed.

## Minor 11 — fixed

`guidelines/coding-browser-module.md:131` now reads "Poza plikami danych nie wpisuj identyfikatorów ani nazw map, zasobów, przedmiotów i archetypów." No other change. Foundation check (which reads the guidelines) exit 0; Prettier check of the file passed.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0 ("0 errors"), run after the last edit and again after the commit.
- `npx --no-install prettier --check README.md guidelines/coding-browser-module.md tests/sim/judging-record.test.mjs tests/view/judging-cache.test.mjs` — passed. `foundations/decisions.md` is not covered by the repository's Prettier patterns (the file at the base fails the same check on its `*Rationale:*` lines), so it was not reformatted.
- Not run: any test file (the handoff forbids the gate; the two test files changed only in comment lines of `decision:` quotations).

## Reaches beyond the handoff

- **Two test files edited, comment lines only.** `tests/sim/judging-record.test.mjs` (lines 216, 543, 628, 687, 714) and `tests/view/judging-cache.test.mjs` (line 598) quote D-441's two changed sentences whole in `decision:` lines; the foundation check reports a quotation that no longer stands in the binding text, so the quotations had to follow the sentences. Nothing else of those files changed; no assertion moved. Fix B will edit `tests/view/judging-cache.test.mjs` (Minor 4, 5, 6): its lines are different, so there is no overlap.
- **Tests read:** I read the test names and the relevant bodies of the cases the `decision:` lines of the ten entries stand at, and the `decision:` lines of tests added in the range; I did not read every test body whole.
- A phrase I chose, for the orchestrator to see: in D-441's rationale I added the clause "in which a judging of one content stands beside another content with the same fingerprint"; that is the cost in words, not a new rule.

## Choices

- D-441: I kept the quotation form by changing the sentences and the quotations together; the way rejected was a separate new sentence after the unchanged one, which would have left the "another for every change" sentence standing unqualified and kept the quotations as they were.
- D-145, D-380, D-441: the pair stays only for the part the entry itself names as held by no test (the stick; „Obchód” and „Zapal”; „Wyloguj”). If one of those is in fact held, it is a one-line removal.

## Unread material

none of the named files; the findings file, `review-whole-report.md` and `foundation-report.md` were not read in full: I read `whole-findings.md` whole, and did not open the other two because the findings file and the entries held what I needed.

## Searches not found or unclear

- A `decision:` line on D-441's sentence about what stays at „Wyloguj”: not found (so that pair stays).
- The spec's Decision 5 (`spec.md` lines 296–357): not read; the finding quotes it and the entry took its bound ("at most one in 2^52") from the finding's text.

## Working copies

`.runs/fix-a/` (copies of the decisions file for the Prettier trial and the commit message) and `.runs/fix-a-check.txt` stood in the worktree; both removed. No worktree or clone made. The worktree is clean.
