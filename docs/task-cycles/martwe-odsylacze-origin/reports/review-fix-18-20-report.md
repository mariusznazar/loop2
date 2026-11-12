PASS a18acf22

# Review of the fix of findings I1–I4 of the review of slices 18–20 — `d07c5537..a18acf22`

Reviewed range: `git diff d07c5537..a18acf22`, one commit, `a18acf22 docs: :memo: fix the blocking findings of the review of D-347, D-339 and D-363`;
one file, `foundations/decisions.md` (+23 / −9). The worktree's `git rev-parse HEAD` is `a18acf22015ebf4e05e7c63b348373cd36622a62`, the head given,
and `git status --porcelain` is empty. Entries read from `git show a18acf22:foundations/decisions.md` (copied to the scratchpad), never from the working tree.

Blocking: 0. Minor: 2 in the fix diff. Out of scope / outside the fix diff: 1 note. Every finding of the findings file is fixed.

## The findings of the findings file

### I1 — D-347 / D-339: the measurement of the chronicle's size — **fixed**

- Source: `vault/technologia_zapis_dzialania_gry.md`, option 2 „Kronika”, *Pomiar skali*: 30 ziaren, jedna postać, Las, gotowy program 17 reguł; zapis
  około 9,5 KB; mediana 48 wpisów, maksymalnie 102; surowy JSON średnio 8,0 KB, maksymalnie 13,4 KB; bez zmian gracza i utrat passy, „których zdarzenia
  dziś nie niosą”; kronika jednego przejścia mieści się w limicie, ale D-208 już przyjmuje, że przy kilku pętlach zapis potrafi stanąć na limicie.
- D-347 at `a18acf22`, *Rationale* (lines 8448–8455 of the file at the head): every figure and condition of the source stands — 30 seeds, one character,
  Las, a ready program of 17 rules, median 48 / max 102 entries, 8.0 KB average / 13.4 KB max of raw JSON, save about 9.5 KB, the player's changes and
  the losses of the streak left out "which the game's events did not then carry", one map run within 64 KiB (D-207), several earning loops at the limit
  (D-208). The past tense "did not then carry" turns the source's „dziś” correctly into a dated state.
- D-339 at `a18acf22`: *Rejected* no longer says "was never measured"; it gives the estimate as "estimated when this was decided at 50 to 60 bytes an
  entry and several hundred entries", which is the note's „szacunek agenta: 50–60 bajtów na wpis, kilkaset wpisów w długim przejściu”
  (`vault/kronika_z_filtrami_loop2.md`, line 51), and beside it the measurement with its conditions. *Rationale* no longer says "two things nobody
  measured"; it says two hypotheses, the estimate (which the measurement "puts at fewer entries" — true: at most 102 against "several hundred") and the
  rarity of a reload "which nobody measured" (note line 48: „stała na dwóch rzeczach niezmierzonych”; the rarity of a reload stays unmeasured).
- "a measurement made earlier" (D-339): the research predates the decision of D-339 (the note's source gives the human's answer on 2026-11-06; the
  findings file dates the research 2026-11-01). True.
- D-208 at the head confirms the claim the fix ties to it: "Accepted with it: with several earning loops saving stops until the player stops one of
  them". D-207 at the head: "A save whose body is larger than 64 KiB is not sent".
- D-339's binding sentence states nothing about the size; nothing before *Rationale* changed (hunks `@@ -8182`, `@@ -8188`).

### I2 — D-347: the lack in the present tense that D-355 and D-356 made untrue — **fixed**

- D-347 at `a18acf22`, lacks: "what the owner sees on the screen and in the chronicle of the owner's own game reaches an agent only through the owner,
  since in the owner's browser it knows only what the owner passes on, while the kind, the code and the place of an error that no code handled reach the
  log of the game's server by D-356, which an agent reads by D-355".
- The lack is narrowed to what still holds, which is the finding's second suggested fix. Checked against D-356 at the head (binding sentence: the page
  "sends the kind, the code and the place of an error that no code handled to a route of the game's server, which … writes each as a failure line") and
  D-355 at the head ("An agent reads the log of a running container with `docker compose logs --tail` … through the `mikrus` MCP server").
- Checked against the code at the head, not the fix report: `git grep -n -E 'browser-failure|reportBrowserFailure' a18acf22 -- src` finds
  `src/browser/view/app.ts:240` (`client.reportBrowserFailure(kind, code, place)`), `src/browser/account-api.ts:127,460-462` (POST
  `/api/browser-failure`), `src/server/account-routes.ts:58` (the path); `git show a18acf22:src/server/account-routes.ts` lines 414–440: the route takes
  only `kind`, `code`, `place` from the body, admits by a limit, writes `writeBrowserFailure(...)` or, at the first refusal, one `LIMITED` failure line.
  The sentence is true at the head (see Minor m2 for a qualification it drops).

### I3 — D-363: "the scope of the project" as an authority — **fixed**

- D-363 at `a18acf22`, *Rationale*: "is the form of the example „Wytwórz — ognisko (6 patyków)” that the binding sentence gives". The binding sentence of
  D-363 at the head does give it ("such as „Wytwórz — ognisko (6 patyków)”"). No project document stands as an authority; the reasons proper (a sentence
  like the row of a rule, D-288; the energy by its full name, D-310) stay in the same sentence. This is the wording the finding proposed.

### I4 — D-363: the principle turned into a contradiction — **fixed**

- D-363 at `a18acf22`: "which is poorer in that row than the old loop; whether that is a departure for the worse was put to the owner beside the rule
  that the game departs from the old loop's solutions only where the result is better, never worse, and he took this way".
- Note `vault/koszty_i_stan_ogniska_loop2.md`, line 43: „Przyjęty koszt: czytając program, gracz nie widzi cen bez otwarcia panelu — w tym wierszu
  ubożej niż stary Loop.”; line 46: „Pokazane jako materiał, nie rozstrzygnięcie: … „… odchodzi od nich tylko wtedy, gdy wychodzi lepiej, nigdy gorzej.”
  — ocenę, czy wiersz bez ceny to „gorzej”, zostawiono człowiekowi.” and „reszta zgodnie z rekomendacją” (rekomendacja: tylko panel). The new clause
  says exactly this; the contradiction is gone. The rule it names is no pointer to a project document, and the foundation holds the same principle
  elsewhere (D-338 *Rationale*: "the views of loop are the starting point and the least that this game takes, departed from only for the better").

No finding was contested.

## New findings in the fix diff

### Critical

none

### Important

none

### Minor

- **m1 — D-347 *Rationale*, the two sentences of the measurement (head lines 8452–8455), generalize past the measurement.**
  "the count leaves out the player's changes and the losses of the streak, which the game's events did not then carry, so a real map run holds more
  entries. The chronicle of one map run fits the limit of 64 KiB (D-207)". The source says only that the estimate is without those kinds („to
  oszacowanie bez zmian gracza i utrat passy”); "so a real map run holds more entries" is the author's inference, and true only of a map run with a
  change or a loss (one with neither holds the same count). The next sentence then states as a present fact, unqualified, that one map run's chronicle
  fits the limit — right after saying a real map run holds more than was measured. The source does say „kronika jednego przejścia mieści się w limicie”
  as the conclusion of the measurement, so the claim is traceable; it reads as a general fact rather than as the result of a measurement under narrow
  conditions. Effect: a reader re-weighing D-339 may take the fit as settled for any map run. Suggested wording: "so a map run with such changes or
  losses holds more entries. By that measurement the chronicle of one map run fits the limit …". Minor: the conditions stand in the same paragraph, and
  D-339 already words the same result as "which fits the limit for one map run" tied to the measurement.
- **m2 — D-347 *Rationale*, lacks (head lines 8443–8444), drops D-356's qualification.** "the kind, the code and the place of an error that no code
  handled reach the log of the game's server by D-356". D-356 at the head limits this: its route "limits the reports it accepts", and its lacks say "an
  error in the browser while the server or the network is down does not reach the server". The sentence names D-356 as its ground, so a reader who follows
  the link finds the limits; Minor, not Important, since D-347's change does not restate D-356 as an entry it writes but points to it. Suggested wording:
  "… reach the log of the game's server, within the limits of D-356, …".

## Notes outside the fix diff (not judged as findings of this fix)

- D-363 *Rejected* (unchanged by the fix): the „×” option is rejected because "it departs from the example „Wytwórz — ognisko (6 patyków)”". With
  I3 fixed, the example's only stated standing in the entry is that the binding sentence gives it, so this half of the reason is circular; the other
  half ("reads as a list, not as a sentence") carries the reason. Out of the fix diff; Minor at most.

## Other checks of the handoff

- Nothing before *Rationale* changed: `git diff -U0 d07c5537..a18acf22 | grep '^@@'` lists five hunks, at 8182, 8188 (D-339 *Rationale* and
  *Rejected*), 8436, 8441 (D-347 *Rationale*) and 8840 (D-363 *Rationale*); each lies after the entry's *Origin* line. Read whole at the head.
- No pointer to a note, task, question or decision number of the concept or of a task document, no "the MVP" / "the definition" / "the task", no secret
  or host address in the added lines: the scan of the added lines below matches only foundation identifiers D-206, D-207, D-208, D-347, D-355, D-356,
  D-288, D-310, each an entry of `foundations/decisions.md` at the head.
- No new contradiction with a binding sentence or a linked entry: D-339's binding sentence (chronicle in the memory of the page) is unaffected — the
  measurement is placed in *Rejected* as part of what was weighed, and the choice still rests on the shape and version of the save (D-206); D-347's
  binding sentence and Verification unchanged; D-363's binding sentence unchanged. D-347's kept lack "a state loaded from a save holds a chronicle only
  if the chronicle enters the save" stays true against D-339 (the state holds no chronicle; the view composes the paragraph from `lastCombat`).

## Declined to judge

- The six Minor findings M1–M6 of the first review (`reports/review-18-20-report.md`) — not in the findings file, so not fixed and not reviewed here
  (fix.md: the findings file bounds the review).
- The line wrapping of the changed paragraphs (D-339 *Rejected* has one long line, D-347 a short line "at that limit (D-208). Risks") — renders the same
  in Markdown; the file mixes wrapped and unwrapped paragraphs already.

## Checks run

- `git rev-parse HEAD` → `a18acf22015ebf4e05e7c63b348373cd36622a62`, exit 0; `git status --porcelain` → empty, exit 0.
- `git log --oneline d07c5537..a18acf22` → one commit, exit 0; `git diff --stat d07c5537..a18acf22` → `foundations/decisions.md | 32 +++++++++++++++++++++++---------`, exit 0.
- `git diff d07c5537..a18acf22`, exit 0 — read whole.
- `git show a18acf22:foundations/decisions.md` and `git show d07c5537:foundations/decisions.md` to the scratchpad, exit 0; entries D-207, D-208, D-338,
  D-339, D-347, D-355, D-356, D-363 read whole at the head.
- `git diff -U0 d07c5537..a18acf22 | grep '^+' | grep -i -E 'MVP|definition|the task|question|pytanie|vault|\.md|_loop2|https?://|mikr\.us|<IPv4>|token|secret|password|D-[0-9]+'`
  → exit 0, matches only the `+++` header and lines holding foundation identifiers (listed above); no forbidden pointer.
- `git grep -n -E 'browser-failure|reportBrowserFailure' a18acf22 -- src` → 5 matches, exit 0; `git show a18acf22:src/server/account-routes.ts` lines 410–450 read.
- `python -B .the-way/elements/common/foundation_check.py` in the worktree, after confirming it is clean at `a18acf22` → "0 errors", exit 0.
- Manual: `sed -n '95,135p'` of the snapshot `technologia_zapis_dzialania_gry.md`; `grep` of `kronika_z_filtrami_loop2.md` and
  `koszty_i_stan_ogniska_loop2.md` for the passages quoted above — each figure and clause of the fix compared with them.
- Not run: the product's full test command (`npm test`) — the fix changes only `foundations/decisions.md`, and the full suite is the cycle's own run.

## Reaches beyond the dispatch

- D-207, D-208 (whole, at the head) — to check the limit and the earning-loop claim the fix ties to them.
- D-338 (whole) — to check that the principle named in D-363 is held in the foundation.
- `src/browser/view/app.ts`, `src/browser/account-api.ts`, `src/server/account-routes.ts` at `a18acf22` (by `git grep`, passages read) — to check
  I2's new sentence against the code.
- `reports/review-18-20-report.md` — headings and the counts line only, to see what of the first review lies outside the findings file.

## Unread material

- `reports/review-18-20-report.md`: read by its headings and counts (lines 3–10 and the section headings); the findings file carries its blocking
  findings word for word, and its Minor findings are outside this review.
- The snapshot notes: `technologia_zapis_dzialania_gry.md` read lines 95–135 (option 2 and option 3); `kronika_z_filtrami_loop2.md` and
  `koszty_i_stan_ogniska_loop2.md` read by search, the passages of their question 1 and question 2 and the matched lines.

## Searches not found or unclear

none
