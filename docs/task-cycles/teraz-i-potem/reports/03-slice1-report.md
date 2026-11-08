# Report 03 — slice 1 (make-change)

- **Status:** done with concerns
- **Base:** `bd44c3964d404e4c4bf2d804140df657e31b5be1`
- **Commit:** `02e41f3` docs: :memo: name in the styleguide's roles the bar of the solving condition, the line of no winning rule in Potem and the notes of the body row

## Files changed

| File | Added | Removed |
|---|---|---|
| `guidelines/styleguide-browser-view.md` | 10 | 8 |

What changed, all in Polish, no value written, no token touched:

- Table *Roles*:
  - `highlight` — also the track of the bar of a requirement of the map's condition in the header (D-40).
  - `text` — also the fill of that bar while the requirement is not met, though the fill is no text (D-40).
  - `text-secondary` — also the note under temperature and under satiety in the body row, except „marznie” and „głoduje” (D-40: a note; D-337).
  - `positive` — a met requirement of the map's condition in the header has its name, numbers and the fill of its bar in this role (D-39, D-133).
  - `warning` — also „żadna reguła nie pasuje — postać stanie” in the row „Potem” (D-39: something is not carried out; D-335).
  - `danger` — also „marznie” and „głoduje” under temperature and satiety in the body row (D-39: a character may be lost; the source of `--danger` in `src/browser/tokens.css` names both).
  - The *Decision* column stays D-39 / D-40: it names the decision carrying the role's meaning, and every use above is a use of a meaning these carry. No new or changed meaning was written.
- Rule *Every background with its text*: the closing sentence spoke only of the track over the mage's head as a `highlight` with no text; read with the rule's first sentence it would have required the new track to carry `text`. It now names the track of the requirement bar too: no text on it, its fill in `text` is no text, the name and numbers stand beside the bar (D-40, D-133); the rule still does not say whether either track needs a text role.
- Rule *Contrast of every pair*: unchanged. None of its sentences speaks of the bar over the mage's head, and the new bar adds no pair: `positive` on `highlight` and `text` on `highlight` are pairs the rule and `design-token-contrast` already hold at 4.5:1, above the 3:1 D-39 asks of the met fill.

## Checks

| Command | Exit code | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after the edit, before the commit) | 0 | `0 errors` |
| `git diff -U0` lines grepped for `#hex`, `px`, `rem` | 0 | one hit, a false positive: „kursorem” in the old and new `highlight` row; no value written |

Not run: the product's whole gate `npm test` — the handoff and `change/SKILL.md` §3 leave it to the cycle. No test was written: the change is prose for agents and people with no behaviour of code (`change/SKILL.md` §2, "prose for people gets no test").

## Own-work check

- **Requirement most likely missed:** the slice's goal that the table *Roles* names *each* new use To do 5 lists (six uses across `positive`, `text`, `highlight`, `warning`, `danger`, `text-secondary`).
- **Check:** one `grep -E` per use, anchored on the role's row (`^\| \`<role>\`.*<words of the use>`), plus a negative control (`^\| \`danger\`.*NEGATIVE-CONTROL`) and the same `danger` pattern run against `git show HEAD:guidelines/styleguide-browser-view.md`.
- **Result:** all six FOUND; negative control MISSING; at HEAD the `danger` pattern counts 0, so the check tells the new file from the old one. A first run with the pipe unescaped (`^| …`) matched every line through the empty alternative and was discarded as no check.
- "Nothing else of the file changes": `git diff --stat` shows the one file, 10 added and 8 removed lines, all in the table and the one sentence of *Every background with its text*.

## Reaches beyond the dispatch

- `foundations/decisions.md` D-335 (lines 7262-7293), read whole, and a grep of D-334 for role names — to confirm that the line of no winning rule in „Potem” stands in `warning` in a decision before naming it in the table. The handoff names D-335 as row 2 of the settlements but the slice's *Read* does not list it.
- `foundations/decisions.md` D-337 (lines 7320-7353), read whole — the handoff's ruling names it for the notes of the body row; the slice's *Read* names "row 7" only.

## Choices made

- The *Decision* column of the changed rows names only the meaning's decision (D-39 / D-40), not the decisions of the uses (D-133, D-335, D-337). Rejected: adding them to the column. Cost if wrong: a reviewer who wants the decision of each use beside it adds them; the uses are findable by the words in the meaning column.
- The completion text in „Teraz” in `positive` and the cause of death in `text` were not added to the table: To do 5 lists only the uses of its items 1 (the warning of „Potem”), 3 and 4, and both are uses the screen already has today.

## Concerns

1. D-337 says „marznie” and „głoduje” stand "in red" and the notes in "smaller grey text", naming no role; the styleguide now names `danger` and `text-secondary` for them as uses of D-39 and D-40. A reader of D-337 alone does not see the roles. Not changed: this slice changes only the styleguide.
2. The rule *A fault of one screen is fixed in its component* has as its *Good* and *Bad* examples „wiersz stanu” (the status row), which this task takes off the screen of a map run in favour of the header. Left as is under "Nothing else of the file changes"; the example's point holds whatever row it names, but the name will be stale after the task.
3. "Smaller" text of the notes is a size token choice (an existing `--font-size-*`), which this slice does not name; the slice that builds the body row picks it from the existing tokens.

## Questions

none

## Searches not found or unclear

- The slice's *Read* says "Foundation entries rows D-39, D-40, row 5 and row 7"; read as D-39, D-40, D-133 (row 5) and D-337 (row 7) by the handoff's mapping.
- No sentence of *Contrast of every pair* speaks of the bar over the mage's head (looked for `paska postępu`, `nad głową` in the rule) — so nothing there to bring along.
