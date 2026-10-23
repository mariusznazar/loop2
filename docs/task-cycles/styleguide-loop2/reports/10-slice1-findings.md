# Findings 10 — review of slice 1 FAIL, for the one fix

The blocking finding of `09-slice1-review.md` (lines 28–58), in the reviewer's words, follows.
Before it, the orchestrator's answer to the question the finding puts to it.

## Orchestrator's settlement of the way out (cycle record, questions table, row S1-I1)

The first way: D-40's meaning of `highlight` takes in the control under the pointer. Ground: the
accepted task document carries both sides — row 3 / Q4 ("tło wyróżnione — ten wiersz albo tor jest
zaznaczony") and Q12 ("pod kursorem — tło wyróżnione, bez zmiany ramki"), both answered by Mariusz.
D-40 is a new entry of this request, not an approved decision, and writing it to hold both stays
within what the accepted task document carries, so no question goes to the human (cycle step
"foundation step", WAY-30); the request names the widened meaning under *What this request
settles*. Through `the-way-record-decision`: D-40's meaning of `highlight` reads "this row or track
is marked, or this control is under the pointer" (wording yours), Q12 joins its *Origin*, its
*violates* example stays true (the selected button shown by `highlight` alone remains a wrong use,
since selection is `selected`); the styleguide's Roles row of `highlight` and rule 6 follow.

The reviewer notes that rule 2's wording (M4, `09-slice1-review.md`) changes with the way chosen:
the fix keeps rule 2 consistent with it — a control under the pointer keeps the text role it has
(`danger` on a destructive button, `text-strong` on the selected one), as Q4 and row 2 let every text
role stand on `highlight`. Run the affected checks again (`foundation_check.py`,
`check_instructions.py`), and commit by explicit paths.

## The finding, in the reviewer's words (I1, then M4 for its context)

### Important

**I1 — the styleguide prescribes `highlight` for hover, which the meaning of `highlight` does not
cover (within the task; the task itself mandates both sides).**

- Place: `guidelines/styleguide-browser-view.md:167` ("hover — tło `highlight`, ramka bez zmiany"),
  against `guidelines/styleguide-browser-view.md:18` (`highlight` — "Ten wiersz albo tor jest
  zaznaczony.") and rule *Each role in its meaning* (`:45-56`); `foundations/decisions.md:801`
  (D-40: "`highlight` that this row or track is marked").
- What is wrong: rule *States of shared controls* tells Slice 6 to give every hovered control the
  background `highlight`. D-40, the Roles table and rule 1 allow `highlight` only in the meaning
  "this row or track is marked"; a button, select list or field under the pointer is neither a row
  nor a track. The merged styleguide thus contradicts itself: Slice 6 either builds the hover state
  as rule 6 says and every review under rule 1 finds a role used outside its decision, or it departs
  from rule 6. D-40's own *violates* example ("the button chosen in a group shown by the background
  `highlight` alone") shows the decision already reads `highlight` on a button as a wrong use.
- Why it matters: rule 1 is the styleguide's first required rule and the one review keeps
  (*Invariant* `none`); a contradiction between it and rule 6 leaves Slices 6 and 7 (controls and
  the kitchen-sink's hover samples) without a way to comply with both, and the next interface task
  inherits it.
- Source of the defect: the task's own settlements — Q12 ("pod kursorem — tło wyróżnione, bez
  zmiany ramki") against Q4 / row 3 ("tło wyróżnione — ten wiersz albo tor jest zaznaczony"). D-40
  is faithful to row 3; the styleguide is faithful to Q12. The slice cannot settle this alone.
- Evidence: reading of the three places above; no check compares meanings (template "Translated
  meanings").
- Way out, for the orchestrator: either D-40's meaning of `highlight` takes in the control under the
  pointer, with Q12 added to its *Origin* and the Roles row and rule 6 brought in line (a change of
  D-40 beyond row 3's wording, which the task document carries in Q12 — a WAY-30 question for the
  foundation step), or the conflict goes to the human as a question of the task. Rule 2's wording
  (M4) changes with whichever is chosen.

**M4 — rule *Every background with its text* reads as overriding a button's text role on hover.**
`guidelines/styleguide-browser-view.md:65-69`: "element, któremu styl nadaje tło `page`, `panel`
albo `highlight`, dostaje kolor tekstu `text`". Under rule 6 a hovered destructive button gets
`highlight` while its text stays `danger`, and a hovered selected button keeps `text-strong`; the
sentence "Jego części o innym znaczeniu biorą swoją rolę tekstu" covers parts, not the element's own
text. Slice 6 writing `:hover { background: var(--highlight); color: var(--text) }` by this rule
would turn the destructive button's red off on hover. Reword so that an element whose role is
another text role keeps it on any of the three backgrounds (D-39, D-40 allow every text role on
all three). Changes together with I1.

