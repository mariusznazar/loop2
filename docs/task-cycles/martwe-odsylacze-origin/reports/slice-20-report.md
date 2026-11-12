# Slice 20 report — reasoning of D-351 to D-363 into the entries

**Status:** done with concerns (see Concerns; no question blocks the slice).

**Slice base:** `0822d4b2b7dece7124da144844a5c0cd744e6611` (HEAD at start; worktree clean).
**Commit:** `9d6316c3` — `docs: :memo: move the reasoning of D-351 to D-363 into the entries and drop their private origins`.
**Files changed:** `foundations/decisions.md` (+21 / -17).

## Method (steps of `the-way-record-decision`, per entry)

Read (`read.md`, template, rules, way of working, WAY-03, WAY-27, foundation step; the nine entries whole at the head);
decide the entry (each is an edit in place of an existing entry, no new question, binding sentences untouched);
draft (only *Rationale*, *Rejected*, *Origin* lines); write (editor tool, Edit); check (`foundation_check.py`).
No step-4 question arose (delegated); the search of the foundation was done for the cross-references I added
(D-355, D-356, D-288, D-310, D-16 / deploy script, D-347).

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0 (`0 errors`), run before and after the commit.
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md`
  — exit 0, prints **18** lines, **none inside D-351 to D-363** (checked by line range 8534-8800: 0 hits).
  The slice's expectation "prints no line at all (exit 1)" holds only for my decisions. The 18 remaining lines belong to
  D-27, D-40, D-43, D-47, D-53, D-62, D-122, D-132, D-135, D-147, D-173, D-185, D-212, D-216 (below D-351; presumably other
  slices or not yet done) and **D-368, D-369, D-370, D-371** (decisions that came with the merge of `origin/main`; they
  name `koniec_przejscia_loop2.md`, `zakres_mvp2_loop2.md`, `rozpoznanie_projektant.md`). This is the count asked for
  "as the last decision slice": 18 lines in 18 decisions still name a note. They are not in this slice's list.
- `git diff 0822d4b2 -- foundations/decisions.md`, read whole: every changed line is an *Origin*, *Rationale* or *Rejected*
  line (or a continuation of one) of D-351, D-352, D-353, D-354, D-355, D-356, D-360, D-361 or D-363. Nothing before
  *Rationale* changed except the *Origin* line.

## One line per decision: what moved, from which passage

- **D-351** (note on the test of part boundaries, Q1-Q3, row 1; no onward passage): *Origin* -> `none`. Added to
  *Rationale*: the check reads code, not strings, so a text holding sample code is no import (Q3 answer "czyta kod, nie napisy";
  Q2 b reason about sample text); accepted cost: a process of another part started from a test passes without the check
  (Q2 answer). All three *Rejected* groups (Q1 b/c, Q2 b, Q3 A2/B2) were already in the entry.
- **D-352** (note on tidying PR remarks, question on the open game, row 1): *Origin* -> `none`. Added to *Rationale*: the road
  is written down so that a later change of the addresses of screens does not quietly bring the loss of the link back
  (row 1, "What the cycle would otherwise guess"). Accepted cost (30 s) and both *Rejected* ways (B, C) were already there.
- **D-353** (same note, question "Co jest awarią…", row 2): *Origin* -> `none`. Added to *Rationale*: a false line of failure is
  also a false message of the watcher (Answer, last sentence; D-356 is the watcher). *Rejected* (1) and (2) already there.
- **D-354** (same note, same question, answer (3a), row 3): *Origin* -> `none`. Rationale and *Rejected* (3b, 3c) were
  already complete; nothing added.
- **D-355** (note on knowing about a failure, question 2 "Dokąd trafia zapis…", row 1; onward: the Source line's
  technology report, section "Rekomendacja i ryzyka", read in `the main checkout of the repository: .runs\technology\`): *Origin* -> `none`.
  Added to *Rejected* for `journald` and `syslog`: an agent would read the game's lines out of a shared host log only
  through a filter that is an agreement (report, "Dlaczego nie tańsze 4 albo 5"). Lacks, risks, all nine rejected ways and their
  costs were already in the entry.
- **D-356** (same note, question 1 "Skąd właściciel…", row 2; onward: the note's *Technology* section, preference, and
  the report section "Rekomendacja i ryzyka", point F): *Origin* -> `none`. Added to *Rationale*: the owner wanted failures of
  the server and of the browser both covered, the server weighing more only where covering the browser would strongly narrow
  the choice; the report from the browser narrows nothing on the side of the server and costs no money. Lacks (6), risks
  (15) and all rejected ways (A, A2, B, C, D, E1, E2, G, H, I, J) were already in the entry.
- **D-360** (note on restoring the database, question 2, row 1): *Origin* -> `none`. In *Rejected*, the way "read the log of
  password resets" got its premise (the row's *Not chosen*: the log vanished at every deployment, so it found only part
  of the resets), in the past tense, with "D-355 keeps it longer since" because D-355 now changes that premise.
- **D-361** (same note, question 3, row 2): *Origin* -> `none`. Rationale and *Rejected* were already complete (control question
  "a stoi" is the accepted risk of the slip in switches, already there); nothing added.
- **D-363** (note on costs and state of the campfire, Q1-Q3, rows 1-3; onward: the projected entry of the MVP2 definition
  with its *Origin* -> scope table row NG6 and the new-player reconnaissance, proposal 6, barrier 5 and moments 13, 14, 17, 18):
  *Origin* -> `none`. Added to *Rationale*: what the new-player agent saw without a price (moments 13, 14, 17, 18 and
  barrier 5), past tense; the sentence form as a rule row reads (D-288) and the energy by its full name as the reason does (D-310);
  the price needs no new role of the style guide because it stands in the name's text (Q2); the old loop's solutions are
  departed from only for the better (Q1 *Source*, quoted principle) beside the accepted cost. In the existing text I replaced
  "the example of the definition" (twice) with the example itself, to keep "the definition" out of the entry.

## Onward passages read, per decision

D-351, D-352, D-353, D-354, D-360, D-361: the passage has no own *Origin* line pointing on; I read the note's *Decisions in play*
only to place references. D-355, D-356: the Source line names two technology reports (outside the snapshot, found in
the main checkout's `.runs/technology/`); I read their last sections only ("Po krytyce" and "Rekomendacja i ryzyka"), not the whole
112 KB. D-363: definition of MVP2 (projected entry, lines 426-439), `zakres_mvp2_loop2.md` (row NG6), `rozpoznanie_nowy_gracz.md`
(moments 13-18, barriers, proposal 6).

## Concerns (for the orchestrator)

1. **Clauses already in the entries that I could not trace to a passage of the notes** (left as they are; not added by me): D-351
   "reads what a file imports because that stands at the head of the file and a failed match is plain to see"; D-353 "a browser
   breaks off a body when a player closes the tab or loses the connection"; D-355 "The numbers of the rotation are chosen bounds,
   not measured needs", "A failed append does not stop the deployment, since a full disk … would otherwise block the very deployment
   that repairs the game", and "except two things nobody has checked" (the note says "bez zależności od niczego niesprawdzonego na
   serwerze"; the entry is the more cautious one and the unread daemon version in the note's Context supports it); D-356 the whole
   sentence about the `LIMITED` line (the notes I read do not hold it). If the reviewer wants them removed, say so.
2. **Not carried on purpose, because it no longer holds or is not reasoning:**
   - D-355 *Rejected* Grafana Cloud "probable conflict with D-347": D-347 was narrowed to the browser by this very change and the
     report itself says D-347 does not reach the server's output; carrying it would put a false conflict in.
   - D-356 risk 5 of the note adds "nor by the comparison of installed copies": at the head `deploy/loop2-deploy:233-234` compares the
     installed copies of the watcher and its schedule, so the clause would be false; the existing "covered by no invariant test"
     is left (it may also be out of date: `WATCH_SCRIPT` is in `NOT_ROUTES` and the message is under the invariant `failure-watcher-message`).
   - D-356 risk 7 "the test gate would refuse a new workflow file" is written in the conditional; the gate has `check-address.yml`
     in place now. Left as the note's hypothesis.
   - D-354: row 3's "the guideline of recording a failure needs a decision it follows from" (a reason for having the entry, but
     it would name the guidelines file; the template bars files in *Rationale*).
   - D-363: the figure "column 208-304 px" (Q1 Answer); I could not confirm it at the head in the guidelines or CSS, and the
     template bars counts. The narrow column stays described in words.
   - D-360: the blocks (To do item 12) are not in the passage the *Origin* named; the binding sentence says nothing of them.
   - D-361: To do item 14 (the count is case-insensitive, covers `Include`, skips comments) is outside the named passage.
3. The slice's check "prints no line at all (exit 1)" cannot hold repository-wide, see Checks (18 lines of other decisions, D-368 to D-371
   among them from main's merge).
4. The technology reports at `the main checkout of the repository: .runs\technology\` are not in the snapshot; I read them as the Source line
   of the passage names them. They are gitignored working files of the main checkout, not the vault or the old Loop.

## Own-work check

Requirement most likely not met: "a reason a note does not give is not added" and "nothing names a note or a path".
Check: re-read each added clause against its passage (listed above) and ran the grep restricted to lines 8534-8800 (0 hits; no
`Notes/`, `_loop2.md`, `.md` of a note, no host address or account in my text). The one cross-entry fact I added (D-355 keeps the log
longer; D-288/D-310 references; D-356 watcher) was checked against the entries at the head. Result: passed.

## Unread material

- Technology reports (D-355/D-356): read only "Po krytyce" and "Rekomendacja i ryzyka"; the option sections were not read.
- `koncepcja_projektowa.md`: not read; none of the nine Origins names it.
- Notes' sections outside the named passages (Need, Context, To do) read, but not carried except where cited above.
- The files of the slice's *Read* that were read whole: task passages (given), the `the-way-record-decision` skill and its source skill,
  `read.md`, `decide_entry.md`, `template.md`, `examples.md` (names WAY-03 only), `rules.md`, `way_of_working.md`, `foundation_step.md`,
  WAY-03, WAY-27, `slice.md` and `change/SKILL.md`. `foundations/decisions.md` read by the passage D-351 to D-364 and by search for the rest.

## Searches not found or unclear

- `guidelines/...`, `foundations/invariants.md`, D-82, D-362 and D-368 were not opened (not needed for these nine entries).
- Where the first sentence of D-355's Rationale says the copy "depends on nothing about the server … except two things": the note
  and the entry differ (concern 1); unclear which is the later decision, left as is.
