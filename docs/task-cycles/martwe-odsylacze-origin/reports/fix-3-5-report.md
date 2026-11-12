# Report — fix of findings I-1 and I-2 (review of slices 3-5)

**Status:** done

- Base of the fix: `7e3aa5e849b205fd439384b88a4bbf771207c77d` (worktree clean at start, branch `task/martwe-odsylacze-origin`; the reviewed commit 1879a6d9 is an ancestor).
- Commit: `7ec7966b` (`docs: :memo: restore the lost costs of the library in D-03 and the time of the premise in D-12`).
- File changed: `foundations/decisions.md`, 4 lines added, 4 removed (all inside D-03 and D-12; Rationale and Rejected only).

## Steps of `the-way-record-decision` done

Step 1 read (`read.md`, `decide_entry.md`, the template, `way_of_working.md`; D-03 and D-12 whole; D-228, D-230 to D-238, D-360 located and D-228 read, the rest by heading). Step 2 decided the entry: both are edits in place of existing entries, no new question, no number change, no collision. Step 3 drafted from the snapshot notes only. Step 4.3 wrote (edit of the file) and ran `foundation_check.py`. Step 4.4 (neighbours): none; no binding sentence or field changed. Not done: critique (the foundation entries of a change are reviewed with the change) and the question to the human (handoff delegates).

## I-1 (D-03) — fixed

- *Rationale*, "Lacks of the option chosen", gained, in product terms and with no file name or count: the rule that bars other frameworks and its check written anew; the two checks for values written in place of tokens and for content identifiers widened to the file type of the new screens, else a colour written in a component passes unseen; the shared controls becoming the library's components or staying as wrapped elements, the page showing the controls following; the guideline for the browser's code and its exemplar written anew; and the mitigation that the tests of the screens rewritten anyway (the editor and the layout) change in every option, so the test loss falls mainly on the game screens' tests.
- *Rejected* for the DOM now says it bears none of those costs, and that the tests of the screens rewritten anyway change in every option.
- Source for each: `technologia_budowanie_ekranow.md` § Konsekwencje, "Wspólny koszt każdej biblioteki" and "Testy". The note's line count (about 1130) is not carried, because the template bars counts in prose.
- Small note on the finding: for React the content-identifiers check already reads `.tsx` (the note says so, and the tree shows it), so the widening applies strictly to the token check. The entry states the cost generally ("read only the file types they list"), which is true of any library and does not claim React needs both.

## I-2 (D-12) — fixed

- *Rationale* now reads: the access was chosen while the server held nothing whose loss the owner feared, the old game's container included, so for the time the work went freely, and the access was to be secured further later. No date or "before any account existed" was added, since the note does not say that; the lapse of the premise against D-228, D-230 to D-238 and D-360 is the finding's own reading and stays in the finding, not in the entry.
- One more tense fix in the same entry, same cause: *Rejected* said "more setup than the server's present contents warrant"; it now reads "the server's contents then warranted". This line predates the task; changed because it states the same premise as today's fact. Revert it if it is out of scope.
- For the orchestrator: whether the lapsed premise (the server now holds accounts and saved states that the product backs up) calls D-12 into question is the human's matter, as the review said.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors".
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` — no line inside D-03 (lines 39-51) or D-12 (lines 321-340); the many hits elsewhere belong to other decisions (later slices), not mine.
- Product gate: not run (as instructed).

## Own-work check

Requirement most likely missed: an added sentence carrying a private-source trace or a reason the note does not give. Check: the grep above restricted to the two entries (empty), and re-reading each added clause against the note's text. Result: every clause maps to a line of the note; the only addition beyond it is the tense change.

## Unread material

The vault and the old Loop clone were not opened. D-230 to D-238 and D-360 were located by heading and not read whole (D-228 was read to the start of its entry); the finding only needs that they concern backing up the accounts and saved states, which D-228's binding sentence states.

## Searches not found or unclear

none
