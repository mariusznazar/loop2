# Fix of finding I1 (review of slice 35, FAIL d07c5537)

**Status:** done

- Base of the fix: `3a4a8090a53472a2668e1c5123a21eb7091217cd` (worktree clean at start).
- Commit: `1eec81dc` — `docs: :memo: drop from D-185 and D-216 the reasons of the placement in the world area, which the end-of-run window replaced`.
- File changed: `foundations/decisions.md` (3 insertions, 5 deletions).

## I1 — fixed (finding held right)

Verified before fixing:
- Head: the lines "Do skrzynki: …" are built in `src/browser/view/trip-lines.ts:84-85` and shown by the end-of-run window (`end-window-lines.ts`, `end-window.tsx`); D-311 at the head says the window "holds the lines of the end (D-185, D-216), which the world area does not", and the screen has two columns with the clock in the header, no right area.
- Notes (snapshot `the private snapshot of the notes (not committed)/vault/plan_wyprawy_loop2.md`, point 10 and Q12): the passages give reasons for a placement in the world area below the discovery line and the paragraph of the last encounter, and "under the backpack"; that placement is replaced by the binding sentence of both decisions.
- Both entries' binding sentences already say the line stands in the end-of-run window, so the removed text was the narrative of the change and reasons for a superseded placement (template: *Rationale*/*Rejected* describe the decision as it stands, never the change).

Edits (editor tool):
- D-185 *Rationale*: deleted the sentence "Before the end had a window of its own … „… rozwiązany”."
- D-185 *Rejected*: deleted the clause ", and the discovery line and the paragraph of the last encounter, which then stood below the status row, would have gone lower" and the option "placing it under the backpack, in the place of the line „Wyniesie” — it changed the placement accepted below the status row". Remaining: "a line directly under the status row — a win opens with what did not come; showing nothing — leaves the transfer unreported."
- D-216 *Rationale*: deleted the sentence "Before the end had a window of its own the lines stood in the world area …". D-216 *Rejected* ("the same in the status row, which the header then held …") left as the review says.
- *Origin* lines of both entries read `none` at the head already; nothing to change.

Record-decision skill steps done: 1 read (`SKILL.md`, `read.md`, the shared `way_of_working.md`, the template's *Rationale*/*Rejected* rules, both entries whole, D-311 and the D-368 passage that D-185 derives from); 2 decided the entry is an in-place edit of two existing entries (no new question, no new number); 3 draft = deletions only, nothing added; 4.3 written with the editor tool and checked. Step 2 search of the whole foundation and 4.4 (neighbours): nothing added, no binding sentence changed, so no entry that derives from them changes. No critique pass (foundation entries of a change are reviewed by the change's review).

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0 ("0 errors").
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` — exit 1 (no line anywhere in the file, so none inside the two decisions).
- The product's gate not run (as instructed).

## Own-work check

Requirement most likely missed: leave no clause of the removed narrative and no sentence broken by the cut. Check: read both entries back after the edit (D-185 *Rationale*/*Rejected*, D-216 *Rationale*), no mention of "Before the end had a window", "then stood", "under the backpack", "the right area" remains in them (`git diff` shows exactly the 3 intended hunks). Result: clean.

## Observation (not fixed, outside the finding)

D-185 *Rejected* still says "a line directly under the status row"; at the head there is no "status row" in the world area (the completion text is the end window's title, `end-window-lines.ts:62`). The review said the sentence may stay, and a reword would be a claim about the head's order that the notes do not give, so I left it; it may go to the request's list as a remark.

## Reaches beyond the dispatch

`src/browser/view/trip-lines.ts`, `end-window-lines.ts`, D-311 and D-368 passages — to check the state at the head.

**Unread material:** none
**Searches not found or unclear:** none
