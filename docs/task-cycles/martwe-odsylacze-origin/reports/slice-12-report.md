# Slice 12 report — reasoning of D-222 to D-240 into the entries

**Status:** done

**Base:** `7fcf907e07f422e3dc997f9d860e5079998bcb0e` (HEAD when I started; worktree clean).
**Commit:** `303c16dd14d2013a91282e01dbc8e0973f7a85f9` — `docs: :memo: move the reasoning of D-222 to D-240 into the entries and drop their private origins`.
**File changed:** `foundations/decisions.md` (+54 / -37).

## Skill steps done (the-way-record-decision, for each of the 15 entries)

Step 1 read (`read.md`, template, rules, way_of_working, examples WAY-03 and WAY-27, the entry whole); step 2 decide-entry (the entry exists, so an in-place edit under "Changing a decision"; no new question, no collision found); step 3 draft (each added clause traced to a note passage, below); step 4 write by the Edit tool on `foundations/decisions.md` and run `foundation_check.py`. No show/ask round was needed: the orchestrator delegated, and no question arose.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors".
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` — hits only at lines 5043 and later; D-241 starts at line 5025, so none inside D-222..D-240 (D-226, D-236, D-237, D-238 are not in this slice; they already read `Origin: none`).
- `git diff 7fcf907e -- foundations/decisions.md` read whole: every changed line is an *Origin*, *Rationale* or *Rejected* line (or continuation) of D-222, 223, 224, 225, 227, 228, 229, 230, 231, 232, 233, 234, 235, 239, 240. Binding sentences, *Scope*, *Based on*, *Relations*, *Verification* untouched.
- Not run: the product's gate (`npm test`), as instructed.

## Own-work check

Requirement most likely not met: "nothing lost, nothing added" — a clause I wrote that the note does not give, or a note reason dropped. Check: re-read each added clause against its note passage (table below) and each note's *Answer* / *Not chosen* / accepted costs against the entry's *Rationale* and *Rejected*. Result: every added clause has a named passage; the remaining note content was already in the entries (the entries' *Rationale*/*Rejected* of the reset and backup decisions already carried the accepted costs and all rejected ways of the notes), so most entries changed in *Origin* only.

## One line per decision (what moved, from which passage)

- **D-222** — *Origin* none. Added: a well-formed address with a typo gets the one answer (reset-password note, Q15 answer: "gmial.com" case); the answer's ending is the "try later" of D-105 (Q2 answer, last sentence; D-105 already says so). Everything else of Q2, Q13, Q15 and row 3 (accepted costs, ways B and C, the form-gone way, the same-sentence-for-any-text way) was already in the entry.
- **D-223** — *Origin* none. Added: D-105 accepts only exhaustion of the provider's monthly allowance, not an hourly ceiling (Q3 answer, "przyjęty koszt, którego żaden wpis wcześniej nie przyjmował, bo…"). Way B and the costs were already there.
- **D-224** — *Origin* none. Nothing added: Q4/row 5 give no reason beyond "built as the confirmation link" (already there) and no way not chosen for the link's form (Q4's "Not chosen" belongs to the page check, D-225), so *Rejected* stays `unknown`.
- **D-225** — *Origin* none. Added to *Rationale*: "Anuluj" ends a page an emailed link opened, so as after any emailed link a signed-in player lands in Siedziba, a signed-out one sees the account forms (the question on "Anuluj" in the screens-and-menu note, answer and Source quoting D-96). Added to *Rejected*: "Anuluj" taking the screen from the saved state (the manual map run), a departure from D-96 (same question's Source, the plan's remark "wybór przejścia z zapisu byłby odejściem od zatwierdzonego D-96"). Q4 way B, Q14 way A and the costs were already there.
- **D-227** — *Origin* none. Added: the message goes out with the same mail settings and SMTP password as the confirmation message (Q7 answer). Q9 cost and way B were already there.
- **D-228** — *Origin* none. Added the review condition (definition entry "Which failure does the database backup survive?", *Review when*, without its date). Replaced "before the MVP requires protection against provider-wide loss" by "before the scope the game started with calls for protection against provider-wide loss" (lesson 3; same wording as the previous slice used). Rationale and Rejected otherwise identical to the definition's entry.
- **D-229** — *Origin* none. Added the review condition (definition entry "How does the account and save server access SQLite?", *Review when*). Replaced "the MVP's small account and save server" by "this small account and save server". Rest identical to the definition's entry.
- **D-230** — *Origin* none. Nothing added: Q1's accepted costs and ways B, C, D were already in the entry (its 385-account figure comes from the entry's own eight-files-at-once arithmetic, not from the note's 440, which assumed seven; I left it, it is consistent with the entry's text and with D-104's 65 MB per 1000 accounts).
- **D-231** — *Origin* none. Added: the key to Strych is a new secret on the server which D-13 records, as in any of the ways (Q3 answer, accepted cost). D-13 already names `/backup_key`. Other Q3 costs and ways B and C were already there.
- **D-232** — *Origin* none. Added "after the public launch of accounts" to the no-encryption way (Q4 way B). Rest of Q4 was already there.
- **D-233** — *Origin* none. Added: a hand-sent test message through `pusher` reached the owner's mailbox when this was weighed (Q5, result of the trial; the address it went to is not carried); a stopped schedule no longer keeps D-230's day-old bound (Q5 row 8, "kotwice pytania"). Ways A, B, C, the weekly-message way and the review wording were already there.
- **D-234** — *Origin* none. Nothing added: Q6 cost, consequence and ways B, C were already in the entry.
- **D-235** — *Origin* none. Added, as a past-tense premise: the testing guidelines' table for code talking to someone else's service named only the package registry and the mail service, with no rule for a backup server or a message service (the note's To do item 9 and its Context line about the table).
- **D-239** — *Origin* none. Added: a loop of short map runs was expected to catch up a week in about a second, one endless map run would choke after a few days (concept note D22, last paragraph before *Odrzucone*; written as an expectation, since the note gives no measurement). Entry already carried the rest of D22 and the definition's third rejected way.
- **D-240** — *Origin* none. Added: the catch-up needs no server of its own (concept D23, "gra nie potrzebuje serwera"); the order of the list of characters becomes a contract (concept §4, "Kolejność listy postaci jest przez to kontraktem"). Entry already carried D23's server way and §4's meeting-inside-map-runs way.

## Not carried, with the reason (questions for the orchestrator, none blocking)

1. D-239: the concept's "review hangs over it" (once buying is removed, the loop's yield becomes practice and the choice of program decides what grows) — a future review trigger tied to a decision of the concept's own numbering; not carried. Recommend: leave out.
2. D-233 way B: the note's remark that the plan would have to attach another task and fix the order of two tasks — a planning reason, not a product one; not carried.
3. D-225/D-224: the note's Q4 reason for the form standing in place of the game for a signed-in player ("the link alone authorises") belongs to the decision that places the form (D-96/D-109 side), not to these two; not carried here. If the orchestrator wants it in D-225, it is one clause.
4. The definitions' preferences of the owner (simple start for SQLite, Strych first then a device of his own) are the owner's motive in the *Technology* section, outside the passage the *Origin* named; not carried.
5. No note contradicts a binding sentence of the slice's decisions.

## Reach beyond the dispatch

Read `foundations/decisions.md` D-13, D-96, D-105, D-97/D-99 area (by grep and range), D-247 and the previous slice's diff to check consistency (lessons 2 and 4) and style; the snapshot's `MANIFEST.md`.

## Unread material

- `.runs/.../task.md:29-40, 64-74, 81-90, 100-105` — I relied on the copies in the handoff (identical passages), did not open the file.
- `.the-way/foundations/decisions.md` WAY-03 and WAY-27 read; `.the-way/elements/decisions/examples.md` read; `.the-way/task-cycle/skill/foundation_step.md` read in part (first 80 lines, the part on the *Rejected* rule).
- Notes: `reset_hasla_loop2.md` whole; `kopia_bazy_loop2.md` whole; `definicja_mvp_loop2.md` only the four named entries and the Technology lines for backup/SQLite plus Goal/Out of scope/Deliverables; `koncepcja_projektowa.md` only §4 "Wiele postaci", §5 "Pętla zarobkowa", D22, D23; `ekrany_i_menu_loop2.md` only the question on "Anuluj" and the line of its *Decisions in play* about D-225.
- Not read: `guidelines/coding.md`, `guidelines/testing.md` (no code or test changed).

## Searches not found or unclear

- None. (The note for D-224 gives no ways not chosen for the link form; recorded above as "nothing added", not as a missing note.)
