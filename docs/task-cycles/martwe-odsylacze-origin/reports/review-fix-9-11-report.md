PASS 95a29574

# Review of the fix of findings 9–11 — range `5dea4e7c..95a29574`

Reviewed: one commit, `95a29574` ("carry the reasoning of D-179, D-189 to D-192 and the rejected ways of D-187 as the game has them"), `foundations/decisions.md` +7 −7. Every line was read from the commits (`git show`, `git diff`), never from the worktree. The findings file is `reports/findings-9-11.md`, which holds blocking findings only. The fix report is `reports/fix-9-11-report.md`, read as claims to check. The sources were the snapshot `the private snapshot of the notes (not committed)/vault/`, the code at `95a29574` and the foundation at `95a29574`.

## Findings of the findings file

- **Important 1 — fixed.** Every passage the finding lists as lost now stands in the entry at `95a29574`:
  - **D-179** carries both passages. The accepted cost is „„Restart” takes from the chest as it stands, like any other start, and is no longer a pure repetition”, from §4 „restart bierze ze skrzynki jak każdy start i przestał być czystym powtórzeniem”. The reason for the backpack cap is „pieces carried in take room from the first minute, and a full backpack makes gathering not feasible (D-65), not only fruitless …”, from §4 „wniesione sztuki zajmują miejsce od minuty zerowej, a pełny plecak czyni zbieranie NIEWYKONALNYM, nie tylko bezowocnym … Wnoszenie kosztuje natychmiast, a nie tylko daje”. Against the head: D-189 starts every other run, a „Restart” included, from the chest, and D-65 says the program passes over a gathering rule when the backpack is full. Both added sentences hold.
  - **D-189** carries the number, „41 seconds at 16× as in 11 hours of the earning loop, about 960 times apart”, from D31. It also carries „pętli nie trzeba domykać, żeby wziąć dniówkę” as „the earning loop need not be closed to take the day's pay”. On the wording, see Minor 1 and Minor 3.
  - **D-190** carries all five passages. The sweep sentence comes from D29 „Przemiatanie może pomóc ocenić ryzyko…”. The reset sentence comes from „Docelowo … przy jednej postaci reset jest karą i to wystarcza”. „one event would be two different deaths” comes from „dwie śmierci z jednego zdarzenia”. „the characters of a team would fight over the one” comes from „drużyna biłaby się o jedno”. „set aside, not refused for good … comes back when a chain appears that could” comes from „odłożone, nie odrzucone … wraca, gdy pojawi się łańcuch”.
  - **D-191** carries the accepted cost from D25 *Znany koszt*, nearly word for word, and „an investment in a character” from „zaczyna być inwestycją w postać”.
  - **D-192** carries D26's „mechanizm, którego wymaga druga postać i rozgałęzienie klas”, written with "archetype". That fits the meaning: at the head the game already holds several characters (D-54) but one archetype (`src/browser/sim/data/archetypes.ts`, `elementalMage` only), and the clause says „would require”.
- **Important 3 — fixed.** D-187 *Rejected* now reads: „a cap set on one of the current maps — a new balance number outside the predecessor game's data; no cap of a map at all; the cap of a map stated with no code built for it.” These are ways B, C and D of `plan_wyprawy_loop2.md` Q1, named as the game would have them. B keeps its product reason. C and D have none, because the note gives only a process reason for C and no reason for D. "the definition", "readiness" and "review of the plan" are gone. The reason for B is true at the head: `src/browser/sim/data/maps.ts` holds two maps, Las and Las — głębiej, and `carryIn`/`carryOut` are optional and unset on both (`maps.ts:36-37`). The note quotes the predecessor's data with Las and Las — głębiej at `carryIn: null`, `carryOut: null`.
- **Important 2 — not part of this fix** (superseded by the merge `5dea4e7c`, as the handoff says). At `95a29574`, D-185 holds `main`'s text. A grep for "right area" and "ahead of its time" in the log finds them only in an unrelated decision near line 7683, not in D-185 or D-216.

## New findings in the fix diff

### Critical

none

### Important

none

### Minor

1. **D-189 *Rationale* — "the earning loop need not be closed to take the day's pay" can be read against the binding sentence.**
   - Place: `foundations/decisions.md:3658` at `95a29574`.
   - What is wrong: in the source, „pętli nie trzeba domykać” means that the map run in progress does not have to reach its completion: „wypłaca przy zatrzymaniu, razem z przejściem w toku”. "Closed" is no word of the foundation. The glossary has *completion* for the end of a map run (`glossary.md:136-138`), and an earning loop as a whole has no completion. Read plainly, "the earning loop need not be closed" means "need not be stopped". That contradicts the binding sentence: practice „added to the character skills when the loop stops”. "The day's pay" is also a new figure of speech that the entry does not explain.
   - Why it is only Minor: the clause just before it ("rather than waiting for a completion") points the reader to the intended meaning, and the binding sentence is clear.
   - Suggested wording: "since the map run in progress need not reach its completion for its practice to be paid".
2. **D-189 *Rationale* — wrong cross-reference for the pace.**
   - Place: `foundations/decisions.md:3658`.
   - What is wrong: the sentence "the fastest pace passes sixteen game minutes in a real second (D-239, D-129)" rests on D-21, not D-129. D-21's binding sentence says „one game minute per real second times the pace … 16×”, and its complies example says „a map run at 16× passing sixteen game minutes … in one real second”. D-129 only says that the pace the player picks stays.
   - The arithmetic holds at the head: `balance.ts:11` `loopMinuteRealSeconds: 60`, `balance.ts:13` `paces: [1, 2, 4, 8, 16]`, and 60 × 16 = 960. Also 11 h / 41 s ≈ 966.
   - Suggested fix: cite D-21 (and D-130 for the buttons, if wanted) in place of D-129.
3. **D-189 *Rationale* — the measurement does not say which game was measured.**
   - Place: `foundations/decisions.md:3658`.
   - What is wrong: the entry says "Measured when every completion still paid". The source is D31 and §5 of the concept document, and §5 describes „grę uruchamialną z repo `loop`”, the predecessor game. At the head, Las is 480 game minutes, which D-129's *Rationale* gives as „half a real minute” at 16×. So the reader meets 41 s and 11 h with no game named. The template lets a measurement stand only "with what was measured and under which conditions". The foundation names "the predecessor game" elsewhere (38 occurrences).
   - Not verified: whether this game ever paid every completion. If it never did, the sentence implies a past state of this game that never existed.
   - Suggested wording: "Measured in the predecessor game, when every completion still paid: …".
4. **D-191 *Rationale* — the accepted cost is only partly conditional, unlike what the fix report claims.**
   - Place: `foundations/decisions.md:3688`.
   - What is wrong: the fix report says the cost is "in conditional form … not as a claim about today's trees". Only the last clause is conditional ("where there are none, a finer split makes empty trees"). The clause "a program uses what is already best, so the weaker character skills stay at the first level" states as a fact what is a tendency, and the author says they did not verify it at the head. ("First level" is right: `src/browser/sim/skills.ts:54`, `level: reached + 1`.)
   - Why it is only Minor: it stands under "Accepted with it" and renders D25's accepted cost faithfully.
   - Suggested wording: "the weaker character skills tend to stay at the first level".
5. **D-190 *Rationale* — "the design points to a later direction, not built" names a source the reader cannot open.**
   - Place: `foundations/decisions.md:3673`.
   - What is wrong: "the design" here is the private concept document. Its first use in the same entry ("which the design gives as the place …") came before this fix; the fix only changed "had" to "has" in that sentence. No other entry of the log says "the design" in this sense. Nothing is lost, because the direction itself is spelled out, and the handoff's list of banned pointers does not name this word.
   - Suggested wording: "a later direction, not built, in which …", without the attribution.
6. **D-179 *Rationale* — the "because" runs backwards, and two added sentences say "no longer".**
   - Places: `foundations/decisions.md:3524` and `:3688`.
   - What is wrong in D-179: the entry says "The backpack is the cap on carrying in because carrying in costs at once and not only gives". The source says the reverse: the backpack cap is what makes carrying in cost („Rolę zabezpieczenia przejmuje pułap plecaka … Wnoszenie kosztuje natychmiast”).
   - Suggested wording for D-179: "The backpack is the cap on carrying in so that carrying in costs at once and not only gives: …".
   - "No longer": D-179 says "is no longer a pure repetition", and D-191 says "the program is no longer only the solution of a map". Both are worded as a change from an earlier state, which the template asks *Rationale* to avoid (WAY-07). In D-191 it reads as the idiom "not only … but"; in D-179, "is not a pure repetition" says the same thing.

## Points the fix report raises

- **The 41 s / 11 h measurement kept as a dated measurement.** I agree with keeping it. The template lets a measurement the choice rests on stand, with what was measured and under which conditions, and not as a general bound. The added "the factor holds" checks out at the head against the data. The sentence still needs the game it was measured in (Minor 3) and the right cross-reference (Minor 2).
- **"Later direction, not built" in D-190.** Acceptable. It stands in *Rationale* and is scoped by "while a character that dies without a resurrection comes back with the same archetype". That premise holds at the head: D-190's binding sentence says „its archetype unchanged”, and `archetypes.ts` holds one archetype. The clause does not force later work, so WAY-05 is not broken, and it traces to D29 „Docelowo …”. The only issue is the attribution to "the design" (Minor 5).
- **The conditional wording about weaker skills in D-191.** Only partly conditional (Minor 4). The conditional "would require" in D-192 is right.

## Other checks of the handoff

- **Nothing before *Rationale* changed.** Every changed line of the diff begins with `*Rationale:*` or `*Rejected:*`. *Origin* of all six entries stays `none`.
- **Pointers.** The added lines hold no `.md` name, no "vault", no "definition", "MVP", "the task" or "readiness", no `§`, no concept decision number (`D` and digits without a hyphen), no question number, no secret and no host address.
- **Contradictions with binding sentences or linked entries.** None found, apart from the reading risk in Minor 1. The new D-179 sentence agrees with D-189, including the „Restart” on a solved map that D-189 counts as a manual map run of a solved map. The D-190 sweep sentence agrees with D-239 („without certifying that the chosen program survives every seed”). "has no sweeping" is true at the head: no seed sweep exists in `src` or the tests; the one hit, `tests/sim/saved-game.test.mjs:2173`, is a sweep inside a test, not one over seeds. The D-190 team clause rests on D-54, which says a team holds several characters.

## Declined to judge

- D-185 and D-216 (Important 2): superseded by the merge, outside this fix's diff.
- The rest of D-190's sentence "which the design gives as the place where a program is lost at no cost", apart from the verb this fix changed: it was written before this fix. It is mentioned in Minor 5 only as context.
- The Minor findings of the first review (`review-9-11-report.md`, Minor 1–7): they are not in the findings file, so they are not fixed in this cycle step.

## Checks

| Check | Command or method | Exit | Result |
|---|---|---|---|
| Head | `git rev-parse HEAD` in the worktree | 0 | `95a29574f221434265b0c56f1d8c2db77b95d03c`, the given head |
| Range | `git log --oneline 5dea4e7c..95a29574`; `git diff --word-diff=plain 5dea4e7c..95a29574` | 0 | one commit; 6 entries touched |
| Only *Rationale*/*Rejected* changed | `git diff -U0 5dea4e7c..95a29574 \| grep -E '^[+-][^+-]' \| cut -c1-20` | 0 | every changed line starts `*Rationale:*` or `*Rejected:*` |
| Pointers in added lines | `grep -noiE "definition\|MVP\|the task\|readiness\|§\|\bD[0-9]{1,3}\b\|vault\|\.md\b\|\bQ[0-9]+\|concept\|\bnote\b\|https?://\|…\|the design\|no longer\|loop" added.txt` | 0 | hits: "earning loop" only for "loop"; "the design" ×2 (D-190); "no longer" ×2 (D-179, D-191) |
| Foundation check | snapshot of `95a29574` (`git archive`) with `.the-way` at the pinned `e9a0f926` (`git -C .the-way archive`) in a scratch git repo; `python -B .the-way/elements/common/foundation_check.py` | 1, then 0 | the first run reported only "`.the-way` matches no file git tracks", an artifact of the snapshot (the submodule was excluded rather than recorded as a gitlink). After `git update-index --add --cacheinfo 160000,e9a0f926…,.the-way` the check gave `0 errors` |
| Pin | `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0 | both `e9a0f926dc9758f6554e8c0a30925d3e4d68cfed` |
| Sweep at head | `git grep -nIiE "sweep\|przemiat" 95a29574 -- src test tests e2e` | 0 | one hit, a sweep inside a test (`saved-game.test.mjs:2173`); no sweep over seeds |
| Archetypes | `git show 95a29574:src/browser/sim/data/archetypes.ts` | 0 | one archetype, `elementalMage` |
| Skill level numbering | `git show 95a29574:src/browser/sim/skills.ts` | 0 | `level: reached + 1` (line 54): the first level is 1 |
| Pace and loop data | `git show 95a29574:src/browser/sim/data/balance.ts` | 0 | `gameMinutesPerRealSecond: 1`, `loopMinuteRealSeconds: 60`, `paces: [1, 2, 4, 8, 16]` |
| Map caps | `git grep -nIE "carryIn\|carryOut\|Cap" 95a29574 -- src/browser/sim/data/maps.ts`; `git grep … "name: \""` | 0 | optional fields only; maps Las, Las — głębiej |
| Important 2 wording | `grep -n "ahead of its time\|right area"` in decisions at the head | 0 | only an unrelated decision near line 7683 |
| Worktree untouched | `git status --porcelain` in the worktree | 0 | empty |

Not run: the product's full suite, which is the cycle's own run.

## Reaches beyond the dispatch

- Foundation at `95a29574`, to check the added claims and cross-references:
  - D-21, D-54, D-65, D-129, D-239, whole;
  - D-130, by title and binding sentence;
  - the „Restart … same seed” decision found near line 1376;
  - D-180 to D-188, read in passing, since they lie between the six entries;
  - glossary *completion*, *earning loop*, *archetype*, *practice*.
- Code at `95a29574`, to check true-at-head claims: `src/browser/sim/data/balance.ts`, `src/browser/sim/data/maps.ts`, `src/browser/sim/data/archetypes.ts`, `src/browser/sim/skills.ts`.
- The decision template `.the-way/elements/decisions/template.md`, for the rules on *Rationale* (measurements, history, prose that forces later work).
- Concept document: §4 „Kierunek: przedmioty krążą między mapami” and „Kierunek: rozwój postaci przez wprawę”, §5 whole, and D25 to D31. These are the passages the finding names, read to compare the fix's wording.
- `plan_wyprawy_loop2.md` Q1, for the ways of D-187.
- `review-9-11-report.md`, its Minor findings and the executors' questions, to keep them apart from this fix.

## Unread material

- `review-9-11-report.md`: read only lines 1–74 (the blocking findings, Minor findings and executors' questions). Its comparison table, its pointer check, its checks and its unread-material sections (lines 75–197) were not read; they belong to the earlier range.
- Concept document: only the passages listed above were read, not the rest of the file.

## Searches not found or unclear

- Whether this game ever paid every completion, which would make "Measured when every completion still paid" a past state of this game rather than of the predecessor game. Not found; the history of `src` was not traced (Minor 3).
- Whether the character skill trees at the head hold weaker skills that stay at the first level in practice. Not verified (Minor 4).
