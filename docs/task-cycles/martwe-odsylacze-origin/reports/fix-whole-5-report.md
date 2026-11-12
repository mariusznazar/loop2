# Report — fix of the review of the whole change, part 5 (testing rules, D-82 and D-73, process words of D-03, D-05, D-38)

**Status:** done.

Base of the fix: `2997d338d747812f8ee2a964adb3921fe83f2933` (worktree clean at the start, branch `task/martwe-odsylacze-origin`).

**Commits** (not pushed):
- `06e6556e` — `foundations/decisions.md` (D-73, D-82, D-03, D-05, D-38).
- `31c65bfa` — `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`.

Files changed: `foundations/decisions.md` (10 added, 10 removed), `guidelines/testing.md` (20 added, 18 removed), `guidelines/styleguide-browser-view.md` (3 added, 2 removed).

## What I did through the skill

D-73 and D-82 through `the-way-record-decision` (`.the-way/elements/decisions/skill/SKILL.md`): step 1 read (`read.md`, `template.md`, `rules.md`, `way_of_working.md`; D-73, D-80, D-82, D-89 whole; the nine other departures of D-73 by their *Relations* line); step 2 decided the entry (an edit in place of D-82, no new question, no new number; searched the foundation for entries naming D-82 or D-73: D-80, D-387, D-388 cite D-82 and need no change; no invariant derives from D-82); step 3 drafted; step 4 wrote with the editor tool and ran `foundation_check.py`; step 4.4 neighbours: no decision derives from D-82, D-73's change adds one departure and touches none of the decisions deriving from it. Not done: the question to the human and the critique (the handoff delegates; the review of the change reads foundation entries). D-03, D-05, D-38: *Rationale* lines only, same skill, steps 1-4.

Exception to say plainly: three small replacements in D-73's and D-82's text (the list of departures, the new rationale sentence, the accepted-cost clause) were made with a short Python replace that asserted each old string occurred once, not with the editor tool. The result is the same text; every other edit was made with the editor tool.

## I-3 — fixed, the finding held

Checked against the head: the template (`.the-way/product-guidelines/testing/template.md:146-154`) names four sources and a comment naming the source where the test's name does not show it; D-82 and `guidelines/testing.md:90-97` dropped the comment rule and the other three sources, `guidelines/testing.md:84` still gave the four, D-73 and `guidelines/testing.md:10-11` still gave nine departures. Verified that the departures of D-73 are exactly the decisions whose *Relations* say `narrows D-73`: D-74, D-75, D-76, D-77, D-78, D-79, D-163, D-235, D-273, and now D-82 (script over the log, printed the list).

The way chosen is the recommended one: D-82 stays, as the tenth departure.

D-82 binding sentence.
- Old: "The expectation of a test comes from the loop2 foundation — its decisions, invariants and glossary. What a test needs of the requirement it checks stands in the foundation, so a test comment names as the source of an expectation no document outside the foundation — … — and a comment that carries nothing the code needs is not written."
- New: "The expectation of a test comes from the loop2 foundation — its decisions, invariants and glossary — from a relation the code under test does not compute, or from a crash counted as a failure; a human's judgement is a source once a decision of the foundation holds it. What a test needs of the requirement it checks stands in the foundation, so no comment is required to name the source of a value, a test comment names as the source of an expectation no document outside the foundation — … — and a comment that carries nothing the code needs is not written."
- Why these three added sources: the template's relation and crash sources are not touched by the answer behind the departure (its example is "2 + 2 = 4 needs no source", a relation the code does not compute); the template's human's judgement with a date in a comment would be a comment naming a source, so it enters through a decision. This keeps one rule in `guidelines/testing.md`.

D-82 *Relations*: `derives from D-73` -> `narrows D-73`. Not in the handoff's list of lines to change; I changed it because all nine other departures are `narrows D-73`, the template says the entry that goes against another names it as `narrows`, and D-73's own rationale says a departure is a decision of its own. Way rejected: leave `derives from`, and the list of D-73 would name a decision that does not narrow it. Cost if wrong: one line, easy to restore.

D-82 *Verification*, Minor 6: "complies" gained "a test whose expected value is a sum or another relation written out by hand, with no comment beside it"; "violates" now ends "as the source of the expected value, with a line or without one" (the words "with a line" no longer narrow the example below the binding sentence).

D-82 *Rationale*: first sentence now says the template asks a comment to name the source of a value the test's name does not show, that this decision departs from that one rule and keeps the template's sources, a human's judgement entering through the foundation, and that the reviewer's question of where a value comes from is answered by an entry; the accepted cost gained "and the reader finds the source of a value by searching the foundation, not from a comment". *Rejected* unchanged (I added no way: the human weighed none besides those kept, and a way I derived must not enter).

D-73 binding sentence: departures list gained D-82 (`D-74, D-75, D-76, D-77, D-78, D-79, D-82, D-163, D-235 and D-273`).

`guidelines/testing.md`:
- lines 10-13: "dziewięć" -> "dziesięć odstępstw", D-82 added to the list, and one line like the one for D-77: "D-82 jest odstępstwem tylko w sprawie komentarza, który nazywa źródło wartości; pozostałe źródła oczekiwania zostają takie, jak daje je szablon."
- the rule "Where the expected value comes from": the line-84 sentence now reads "Oczekiwanie pochodzi z fundamentu loop2 — decyzji, niezmienników i słownika — z niezależnej zależności, której kod pod testem nie liczy, albo z awarii liczonej jako niepowodzenie; ocena człowieka jest źródłem, gdy trzyma ją decyzja fundamentu (D-82)", and the second paragraph begins with the departure stated plainly ("Szablon każe komentarzowi nazwać źródło wartości, gdy nazwa testu go nie pokazuje; w loop2 żaden komentarz nie musi tego robić (D-82)"). The old sentence "Dokumentami źródłowymi są fundament … (D-82)" and "Oczekiwanie testu pochodzi z fundamentu, nie z dokumentu zadania ani z koncepcji" are folded into those; the remaining sentences are kept as they were.
- first "Not tested on purpose" bullet: "(D-73)" -> "(D-73, D-89)" (finding 30, D-89).

## Minor 4 — fixed
`guidelines/styleguide-browser-view.md:333`: "z jednym rodzajem dołożonym później:" -> "z dwoma rodzajami dołożonymi później: grubością belki i linii zakładki (2026-11-02) oraz wyglądem sceny (2026-11-11):". The two kinds and dates are those the two list items below it carry.

## Minor 6 — fixed (see D-82 *Verification* above).

## Minor 3 and 7 — not fixed in the foundation; for the human at the request

**Minor 3 (D-381).** In D-381's binding sentence, the clause that after a logout the server answers with no session did not come from a source: the executor of the slice wrote it from what a test asserts, not from the old game's rules or from an answer of the human. A rule taken from what a test happens to assert is exactly the kind of evidence D-80 refuses (the current behaviour as proof of the requirement). The question for the human: "Keep the clause (the server answers a request after a logout as a request with no session), or drop it from D-381 until a source for it is named?"

**Minor 7 (pointers to earlier cycle records).** During this cycle the choice was made that comments and files stop pointing to specs, plans and slice reports of earlier task cycles, not only to notes of the author, and the sweeps of the later slices removed such pointers. No entry holds that choice for anything but test comments: D-82 forbids pointers in test comments, and the invariant `tracked-file-private-names` and D-362 forbid notes, folders, paths and files of the old game, not the records of task cycles that stay in loop2's own git history. So a later change may write such a pointer in a code comment or in a decision and nothing in the foundation says it is wrong. The question for the human: "Widen D-362 (or the invariant) so that no tracked file points to a record of an earlier task cycle, or leave such pointers allowed outside test comments?"

## D-03, D-05, D-38 (process words, *Rationale* only)
- D-03: "and the program editor is what the project is judged by" -> "and the program editor is the screen on which the game stands or falls, since writing a program there has to go without grimacing" (the note's statement is that writing a program without grimacing is what the project is judged by; I kept the content and named the game, not the project's stage).
- D-05: "the one in the loop2 container where the MVP runs, and …" -> "the one in the loop2 container, and the `/api/` paths it serves are the account and save routes." (the clause about the MVP carried nothing the entry needs).
- D-38: "each screen of the MVP adds values … drifts with every task" -> "each screen of the game adds values … drifts with every change".
No other "MVP" remains in `foundations/decisions.md` (grep).

## Checks (command and exit code)
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors".
- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` — exit 0, "checked: 444 files, 0 listed, 15 binary files not read".
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- . ':(exclude).the-way'` — no line (not even D-48's).
- Script over `foundations/decisions.md`: the decisions with `narrows D-73` equal the list in D-73's binding sentence (printed both).
Not run: the product's gate (`npm test`), as ordered; no code or test changed.

## Own-work check
Requirement most likely unmet: after my change the testing guidelines give one rule for where an expectation comes from, and D-73's list is true. Check: the comparison above (list equals the `narrows D-73` set) and `foundation_check.py`; reread `guidelines/testing.md` lines 77-100: line 79 (Decision D-73 · D-80 · D-82) fits, no sentence of the file gives the template's four sources against D-82 any more. It showed the two agree. A remaining weakness: "ocena człowieka jest źródłem, gdy trzyma ją decyzja fundamentu" is my reading of how the human's judgement reaches a test without a comment; it is not in the human's words, so I put it before the orchestrator below.

## Choices made, with the way rejected
- D-82 keeps relation / crash / judgement as sources (rejected: reduce D-82 to "the foundation alone", which the finding calls the dropped sources and which the human's own example "2 + 2 = 4" speaks against). Cost if wrong: the binding sentence is longer than needed.
- The judgement enters through the foundation (rejected: a dated judgement named in a comment as the template has it, which would reintroduce the comment naming a source). Cost if wrong: one clause of D-82 and one of the guideline.
- D-82 *Relations* changed (see above).

## Reaches beyond the dispatch
None beyond the nine departure entries' *Relations* lines (read to compare with D-82) and the template of decisions and `rules.md` (read as the skill's step 1).

## Unread material
none (the findings file and the handoff whole; the template of testing guidelines, the skill and the decision template whole; D-73, D-80, D-82, D-89, D-03, D-05, D-38 whole; `guidelines/testing.md` whole; `guidelines/styleguide-browser-view.md` lines 322-360 only, the file's other parts untouched by this part).

## Searches not found or unclear
- The task document's wording of the human's reason for the departure is in `.runs/task-cycles/.../task.md` (question 1a); I used only its content, named no document in the entries.
- Not found: any statement of the human on whether a dated judgement may stay as a comment source; the choice above is mine (open for the orchestrator).
