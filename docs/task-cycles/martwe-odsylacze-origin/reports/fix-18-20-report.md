# Report — the fix of findings I1–I4 (slices 18–20)

**Status:** done

**Base of the fix:** `d07c5537ab3ac657f43ff09c0be023933bb624fa` (the handoff said the review ran at `9d6316c3`; the head is one commit later, and its diff does not touch D-347, D-339 or D-363 beyond what the review quoted — I checked that the quoted sentences stood at the head before editing). Worktree clean at the start.

**Files changed:** `foundations/decisions.md` (+23 / -9): D-339 (*Rationale* last sentence, *Rejected*), D-347 (*Rationale*), D-363 (*Rationale*). Nothing before *Rationale* changed; *Origin* lines are `none` and stayed.

**Commit:** see the commit that holds this report's change (`docs: :memo: fix the blocking findings of the review of D-347, D-339 and D-363`).

## Findings

- **I1 — fixed.** Checked against the research (snapshot `vault/technologia_zapis_dzialania_gry.md`, option 2, lines 107–113): the measurement is there as quoted (30 seeds, one character, Las, ready 17-rule program; save about 9.5 KB; median 48 entries, 102 at most; raw JSON 8.0 KB on average, 13.4 KB at most; without the player's changes and the losses of the streak, which the events did not carry; one map run fits the limit; D-208 already accepts that several loops bring the save to it). The note of D-339 (`kronika_z_filtrami_loop2.md`, question 1, lines 43–46) says "rozmiaru nikt nie zmierzył (szacunek agenta: 50–60 bajtów na wpis …)", i.e. the estimate was the agent's and the measurement was not used. D-208 at the head confirms the claim about earning loops (its *Rationale*: saving stops with several loops; about 10 loops on Las).
  - D-347 *Rationale*: after the lacks, a sentence carries the measurement with its conditions, that one map run fits the 64 KiB limit (D-207) and that D-208 accepts a save at the limit with several loops.
  - D-339 *Rejected*: "was never measured" replaced by "was estimated when this was decided at 50 to 60 bytes an entry …, so by that estimate the game would stop saving", followed by the measurement under narrower conditions and its result. *Rationale* last sentence: "two things nobody measured" replaced by two hypotheses, the estimate (which the measurement of D-347 puts at fewer entries under narrower conditions) and the rarity of a reload (which nobody measured; the note says the same).
  - Left unsaid on purpose: the measured bytes per entry, because the source gives an average and a maximum of the total size and a median and a maximum of the count, which do not pair into a per-entry figure.
  - D-339's binding sentence needed no change: it does not state the chronicle's size.
- **I2 — fixed.** Verified at the head that D-356's browser report exists in code: `src/browser/view/last-resort.ts` (`onLine`), `src/browser/view/app.ts:240-248` (`reportBrowserFailure`), `src/browser/account-api.ts:460`, route `/api/browser-failure` in `src/server/account-routes.ts:58,420-440` writing a failure line. D-347 lack narrowed: what the owner sees on the screen and in the chronicle reaches an agent only through the owner; the kind, the code and the place of an unhandled error reach the server's log by D-356, which an agent reads by D-355. I did not claim anything about the test server's logs being the owner's game's logs beyond what D-356 states.
- **I3 — fixed.** The note (question 2, answer and source) gives "the example of the approved definition", read as a sentence like the row of a rule (D-288). D-363: "that the scope of the project fixed" replaced by "that the binding sentence gives" (the binding sentence of D-363 does contain the example).
- **I4 — fixed.** Note, question 1: accepted cost "poorer in that row than the old Loop"; the principle was shown "jako materiał, nie rozstrzygnięcie", the judgement left to the human, who took the recommended way. D-363: the added clause replaced by "whether that is a departure for the worse was put to the owner beside the rule that the game departs from the old loop's solutions only where the result is better, never worse, and he took this way".

No finding contested.

## Steps of `the-way-record-decision` done

1. Read: `read.md`, the template (via the handoff's constraint on *Rationale* and *Rejected*), `rules.md`'s rule on measurements as the finding quotes it, `way_of_working.md` whole; D-347, D-339, D-363 whole; D-207, D-208, D-355, D-356 whole; the research and both notes in the snapshot.
2. Decide the entry: no new entry and no new question; edits of three entries in place, none touching the binding part.
3. Draft: values taken from the research and the notes, quoted above.
4. Write: edits with the editor tool; no script. Step 4.4 (neighbours): no entry of the log depends on a changed binding sentence, since none changed.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` -> exit 0 ("0 errors").
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` -> exit 1 (no match, so no line inside the three decisions).
- The product's gate not run (as instructed).

## Own-work check

Requirement most likely missed: a sentence of an entry that states a past state as a fact of today, or that cites a source the reader cannot reach. Check: re-read the three entries after the edit for a project document used as an authority and for a present-tense claim; the check of private-source words above found none. One residue I noticed and left: D-347's last lack ("a state loaded from a save holds a chronicle only if the chronicle enters the save") is untouched; it is true as a conditional and is not part of the findings.

## Reach beyond the dispatch

D-207, D-208, D-355, D-356 (whole, to check the claims), `src/browser/view/last-resort.ts`, `src/browser/view/app.ts`, `src/browser/account-api.ts`, `src/server/account-routes.ts` (searched by word, passages read) to verify at the head that the browser report is built.

## Unread material

none (the handoff names the findings file and the research report; both read; the research report read from line 60 to 130 and by search of its option 2; the headings of the other options not read, since the findings concern option 2 and the lack of option 3 only, line 126).

## Searches not found or unclear

none. One mismatch noted: the handoff gives the reviewed head as `9d6316c3`, while the worktree head is `d07c5537`; the three entries quoted by the review were unchanged between them.
