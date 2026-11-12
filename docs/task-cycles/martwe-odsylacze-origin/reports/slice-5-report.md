# Slice 5 report

**Status:** done with concerns (questions below; none blocks the slice)

**Base:** `cc0c6eec8402c0cb61ac12d8f94223e2bd4f4645` (HEAD at start, worktree clean).

**Files changed:** `foundations/decisions.md` (+29 / -29), commit `1879a6d9` (`docs: :memo: move the reasoning of D-57 to D-71 into the entries and drop their private origins`).

## Steps of `the-way-record-decision` done

Read (`read.md`, template, `rules.md`, `way_of_working.md`, examples WAY-03, WAY-27, the 15 entries whole), decide-entry (each is an in-place edit of an existing question; no collision, no binding sentence touched), draft, write (Edit tool on `foundations/decisions.md`), check (`foundation_check.py`). No new entry, number, invariant, glossary term or fact.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` -> `0 errors`, exit 0.
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md`: first hit is line 1547 (D-73); D-57 to D-71 span 1284-1523, so no line inside the slice's decisions.
- `git diff cc0c6eec -- foundations/decisions.md` read whole: every changed line is an `Origin`, `Rationale` or `Rejected` line (or continuation) of D-57 to D-71. Binding sentences, Scope, Based on, Relations and Verification untouched.
- Own-work check (requirement most likely not met: "a reason a note does not give is not added"): re-read each added clause against its note passage; clauses at risk are listed under Choices.

## One line per decision: what moved, from which passage

- D-57: Origin -> `none`. Moved: the condition on warmth takes a number with tenths (loop default 36.5, step 0.1), so the program check takes tenths there (fire-and-food note Q8, cost shown and To do 13).
- D-58: Origin -> `none`. Nothing to move: Q8 and settlement row 2 (ambient temperature a map number, not named by D-24's list; balance constant refused) were already in Rationale and Rejected.
- D-59: Origin -> `none`. Nothing to move: Q8, Q9 and row 3 (no stored surplus, hardness of Las) already carried.
- D-60: Origin -> `none`. Nothing to move: Q8 and row 4 (cold and hunger counted apart, self-recovery, what streak and wounds rest on) already carried.
- D-61: Origin -> `none`. Moved: the rule that an action in progress lasts its full duration concerns a map run that goes on, so death ending the run mid-action leaves it untouched, as ending the run does (Q10 and Context of the same note, row 5).
- D-62: Origin -> `none`. Moved: the time that stands still is that of this map run alone; the end screen stops no earning loop of another character, as a pause stops none (earning-loop note Q17, row 20); Rejected: the screen stopping other characters' loops, viewing the result would hold up their earning (Q17, Not chosen). Q10 and forest-solution Q12 were already carried.
- D-63: Origin -> `none`. Moved: the bought branch is an exception written into the binding sentence, as lighting without sticks would go against the rule that lighting uses sticks (skill-trees note, collision resolved under the settlements table); the word Plomyk appears in the skill name "Rzucanie czaru Plomyk", not in action names, and without shown skills the player learns it is a spell only from the fall of energy (spell note Q7, weak point). Q1, Q6 and Q9 reasoning already carried.
- D-64: Origin -> `none`. Moved: carrying capacity is a trait, a number that acts always, while a number acting in one action belongs to the tree of that action's skill; a character founded in a team carries it too (fire-and-food note Q15); the growth of a trait through a branch waits for a change of the scope; Rejected: the branch "Mocne plecy" (+5 per rank up to 30 in loop's data), and reading 15 as a starting value (skill-trees note Q10, row 6). The wording "The MVP definition" / "the definition" became "the scope accepted for the first version of the game" (see Choices).
- D-65: Origin -> `none`. Moved: the parallel with packing for a trip, which takes as many items from the top of the list as fit (row 10, "What the cycle would otherwise guess" and the projected entry named beside it).
- D-66: Origin -> `none`. Moved: gathering with a miss belongs to the first version's accepted scope (definition, In scope point 12).
- D-67: Origin -> `none`. Moved: the map's data give only the time to renew one piece, so the upper bound is set by this decision (row 12, "obok wpisu projektowanego ... tylko czas odnowienia jednej sztuki").
- D-68: Origin -> `none`. Moved: the program leads the character back to the extinguished campfire "as to a known campfire" (row 13).
- D-69: Origin -> `none`. Nothing to move: Q9 and row 14 (no ceiling, feeding far ahead) already carried.
- D-70: Origin -> `none`. Moved: a newly crafted campfire is extinguished, which a new player does not expect; the extinguished campfire's icon holds its colour in its file like the other map icons; the scene already shows an extinguished campfire as the same picture without colour and motion (Need and Context of the cost-and-state-of-campfire note). Q11 reasoning (minutes in the row, hover ties) and its Rejected were already carried; the note's own weak point of Q11 (one icon cannot tell burning from extinguished) is the Rejected "one icon for both states".
- D-71: Origin -> `none`. Moved: in the minute of death the ending action's effect does not take hold, so neither does its discovery (discovery-note Q11, edge case); a loop character that meets something undiscovered leaves it to the player in a manual run, since a solved map has few discoveries and nothing loses them (earning-loop note Q9, row 16); the order carries the completion as its last step (forest-solution Q8, weak point); in combat minutes nature energy stands still with the body, a combat minute is "the body stands still" without exception, and the game has no combat spell today (spell note Q3). Rejected: energy returning in combat minutes when the mage is well fed (Q3, B); the Q10 alternative "half a point more"; a loop run discovering at once with the report naming it (Q9, B), and discoveries kept in the report until it is closed (Q9, C).

## Choices and clauses to look at (could be read as mine)

- D-64 "The MVP definition" -> "the scope accepted for the first version of the game": the old wording pointed at a document the reader cannot open; the text still says only what that point says (15 pieces, taken together). Say if you want it left as it was.
- D-64 "waits for a change of that scope": from the weak point "growth of a trait through a branch, which the concept describes, waits for a change of the definition after the MVP".
- D-62 "as a pause stops none" and the Rejected clause: from Q17 ("Nie, tak samo jak pauza"; Not chosen "Zatrzymuje: ... wstrzymuje zarobek innych postaci"). The note's answer to Q17 also says the rules' phrase "time stands still" needs the addition that it concerns this map run; the binding sentence already says "for that map run".
- D-71 Rejected "nature energy coming back in the minutes of combat when the mage is fed well enough": the note names this way (Q3, B) with no cost beside it; the reason beside it is the one the note gives for the chosen way (combat minute stays "body stands still" without exception).
- D-71 Rejected for the loop's discoveries: the note's process cost for B ("needs a change of the definition with a gate") is carried only as its product meaning (the guarantee that catching up leaves the player's knowledge and programs as found would stop holding); C is "an idea of the critic, from outside the sources" -> carried as "one more piece of game state", the note's cost.
- D-70 "a new player does not expect": from the Need of the note (a newly crafted campfire is extinguished, "czego nowy gracz się nie spodziewał"); the earlier research document that note cites was not opened.

## Existing text the notes do not give (left as it was)

These Rejected clauses stood in the entries before this slice; the notes name only the chosen way (answer A) for them, so they are writer-derived and not from a note's *Not chosen*. I did not delete them (the slice asks nothing to be lost). Recommended answer: leave, or mark `unknown` in a later pass if the orchestrator wants the strict reading of the template.
- D-57 Rejected (warmth on a scale of its own; whole degrees).
- D-58 Rejected (one ambient temperature in the balance) is supported by settlement row 2's "what the cycle would otherwise guess"; not a note's Not chosen.
- D-59, D-60, D-61, D-65, D-66, D-67 (clock for each tile), D-68, D-69 (feeding at start; no ceiling is row 14), D-71 (first five clauses) Rejected: same case.
- D-67 Rationale "Counted from the start of the map run ..." and "Accepted with it ..." and D-69 Rationale "lands on the campfire it was started at": not in the notes read; they likely come from later notes (not named by the Origin).

## Questions for the orchestrator

1. A note contradicting a binding sentence: none found. One superseded pair: the fire-and-food note Q11 chose one icon for both states; the later cost-and-state note changed D-70 to two icons. The entry follows the later note; nothing changed in the binding sentence. Recommended: no action.
2. Whether the unsupported Rejected clauses listed above stay (recommended: stay).

## Reach beyond the dispatch

- `the author's notes\.ai\rules\scripts.md` (named by the user's global instructions) and the earlier slice report `reports/slice-4-report.md` (for the working pattern). `.the-way/task-cycle/change/SKILL.md` and `slice.md` read. No other file.

## Unread material

- `.the-way/foundations/decisions.md:68-94` and `:718-752` read (WAY-03, WAY-27). `foundation_step.md` read whole. Foundation entries row 2 (D-362 as changed): not read, it does not bear on D-57 to D-71. `guidelines/*`, `src/browser/AGENTS.md`: not read, no code or guideline file changed.
- Notes read by passage as the slice says: fire-and-food (whole, 161 lines), forest-solution (Q8, Q12), earning-loop (Q9, Q17, settlements 16 and 20 and neighbours), spell note (Q1, Q3, Q7, Q10, settlements), skill-trees note (Q9, Q10, settlements and collisions), MVP definition (In scope list, lines 25-50), cost-and-state-of-campfire note (Need, To do, Decisions in play, settlements), discovery note (Q11).

## Searches not found or unclear

- None missing from the snapshot. The Origin of D-62 names "Q17, and Settlements to record, row 20" of the earning-loop note: both found. The reasoning of Q2 of the spell note (numbers of nature energy) is not named by D-63/D-71's Origin and was not read.
