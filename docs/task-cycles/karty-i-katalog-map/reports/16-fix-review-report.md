PASS c2a7853e72ce464fc8b34dbbb4517de729836d0d

# Review of the fix — `karty-i-katalog-map`

- Fix range: `f0f3b0752e035cb1d8ae69a0242cc632f92a0ab1..c2a7853e72ce464fc8b34dbbb4517de729836d0d` (`a76c4e5`, `3c9b2f3`, `c2a7853`); `git rev-parse HEAD` in the worktree is `c2a7853`.
- Method: `.the-way/task-cycle/review/SKILL.md` and `fix.md` at the pinned `294af7f`. Read: `reports/14-findings.md` (I1, I2, M1–M7), `reports/15-fix-report.md`, and the diff of the range. The same reviewer as `13-review-report.md`.

## Findings of the findings file

| Finding | Verdict | Evidence |
|---|---|---|
| I1 — „Pętla zatrzymana …” in „Kto idzie” in the styleguide | **fixed** | `guidelines/styleguide-browser-view.md:518-521` now reads „przy postaci w pętli zarobkowej wiersz pętli w `text` z „Zatrzymaj” (D-244); „Program:” …”; the clause is gone; the code draws no stopped-loop line, as before. |
| I2 — the projected entries not written as the definition approved them | **fixed** | D-326 *Rejected* now holds „a new program bringing everything by default — a less conscious choice of what to bring.” and its *Rationale* is the definition's; D-325, D-53, D-149, D-170, D-180, D-188, D-243 and D-134 now carry the definition's *Rationale* and *Rejected*. I compared each against `definicja_mvp2_loop2.md` (the same lines as in my review): equal word for word. |
| M1 — no „ · ” between the heading's marks | **fixed** | `maps-screen.tsx:146-160` puts a `maps-card-sep` „ · ” before each mark; `tests/view/maps-screen.test.mjs:279-286` reads „Las · rozwiązana” and „Las — głębiej · odsłania ją Las”. |
| M2 — stale words | **fixed** | `styles.css:1302` „under „Wejdź””; `team-lines.ts:17` „why „Wejdź””; `trip-lines.ts:44` „The line above „Wejdź””; `tests/view/map-lines.test.mjs:31` „the list of maps hides maps…”. No „Wyślij” left in those files. |
| M3 — the styleguide's sentences on the disabled „Wejdź”, D-330 and „jak na Siedzibie” | **fixed** | `styleguide-browser-view.md:387-389` says the disabled „Wejdź” loses the main look and looks as every disabled button (rule States of shared controls), matching `.button.main:disabled`; `:518` cites D-329 alone; `:527-529` reads „pod wyłączonymi przyciskami każdej postaci, w `text-secondary` (D-287)”. |
| M4 — statuses `copy` not settled by the task | **contested; I keep it, as Minor, for the request** | The fix agent agrees that the task does not settle the statuses and that the cycle's author may not decide them, and leaves the rows as they stand so that the request names them for the human. That is the route my finding asked for („The request should name them for the human”), and changing the statuses here would be one more choice the task does not settle. The contest of a change to the file holds; the finding stays open until the request names the statuses. |
| M5 — kind `main` missing from the example | **fixed** | `coding-browser-module.md:282-283` names `secondary`, `tab` and `main`. |
| M6 — step note split off by a regular expression | **fixed** | `terrainLines` returns `{ text, note }` (`map-lines.ts:36-37, 71-93`); `STEP_NOTE` is gone; the screen draws the note in `maps-card-note`; `tests/view/map-lines.test.mjs` expects the new shape and the screen case with a made-up step passes. |
| M7 — no case for `halt()` with the screen Mapy | **fixed** | New case in `tests/view/uncaught-failure.test.mjs:445-480`, marked `invariant: uncaught-failure-game-state`: after an error nothing handled, „Puść w pętlę” and „Wejdź” start no save and move no address. The fix agent's control run (without the error) failed on „no act started a save”, so the case catches an act that gets through. |

Changed invariant test (named as the method asks): `tests/view/uncaught-failure.test.mjs`, the case above, a new case of `uncaught-failure-game-state`; no existing case changed.

## The coordinator's points

1. **I2's removals and D-251.**
   - The removed clauses make no entry untrue and break no link. No entry or test refers to the removed words; `foundation_check.py` passes (0 errors).
     - D-149 drops the rejected „a new-map message on completion”. The definition the human approved drops it too, and its kept *Rationale* clause „the end of the map run that opens a map names the way to it” says the end of a map run will point to the opened map (task 16). Keeping that rejection would contradict the approved reasoning.
     - D-170 drops a *Rationale* clause on a new character and the rejected „a list for each map”. The binding sentence still states the order of programs for a character that has not gone („the program with which any character last entered a map”), so only its explanation is lost. With one card per map, the rejected way no longer exists as it stood beside the old row of every map.
     - D-243 drops „Accepted with it: one more button in a long row, …” and „several times the view”. Both are costs of the old Siedziba row, which no longer exists.
   - One point for the request, not a finding of this fix: D-149's kept clause names something the game does not do until task 16. It sits in *Rationale*, which binds nothing, and the fix report names it for the request (concern 1).
   - D-251 is within the task: the plan's *Foundation entries* lists it as projected and written whole. Its *Rationale* and *Rejected* hold every word of the definition's, plus true detail an earlier task wrote: „(D-189)”, „It stands where the line of D-188 stands, in the same role.” and „— the game speaks of a loop it does not have yet”. The fix range does not touch it. The difference adds and contradicts nothing, so it is no finding; for consistency with D-149, D-170 and D-243, the request may name it (fix report, concern 3).
2. **M4** — the contest holds (above).
3. **The private note** — the fix range adds no path or title of it.
   - `git diff f0f3b07..c2a7853` searched over its added lines for `definicja|vault|Brain|Notes/|Projects|(P) Loop|private|prywat`: no hit (grep exit 1).
   - The three commit messages, searched with the same pattern: no hit (grep exit 1).
   - `foundations/decisions.md` does name `definicja_mvp2_loop2.md in the vault (Notes/Projects/(P) Loop)` in *Origin* lines: 24 at the base `2136709`, 35 at the head. The 11 more come from `afe5920`, outside this fix range. This is the log's existing convention for *Origin*; whether it may stand is the coordinator's call, not a finding of the fix.
   - `guidelines/` holds no mention.

## New findings in the fix diff

- Critical: none.
- Important: none.
- Minor:
  - **N1** `tests/view/uncaught-failure.test.mjs:474-477` — the assertion „no earning loop took the button” proves nothing. `buttonNamed` finds the button whether or not it is disabled, and a started loop leaves „Puść w pętlę” in place, disabled. The case is still protective through „no act started a save”, which a loop start or a send would break (shown by the control run). Asserting `!button.disabled`, or that no loop line stands, would make the second assertion carry weight. Within the task.
  - **N2** `guidelines/styleguide-browser-view.md:509-511` — the rule „The screen Mapy” gives no role for the new „ · ” separator of the heading, which the code draws in `text-secondary` (`styles.css:1941`). That is the role of the description beside it (D-40), so nothing is wrong on screen, but the styleguide does not say it. Within the task.

## Checks run

From the worktree root at `c2a7853`. The worktree stayed clean (`git status --short` empty).

| Command | Exit |
|---|---|
| `npm test -- tests/view/map-lines.test.mjs` | 0 |
| `npm test -- tests/view/maps-screen.test.mjs` | 0 |
| `npm test -- tests/view/uncaught-failure.test.mjs` | 0 |
| `npm test -- tests/view/team-lines.test.mjs` | 0 |
| `npm test -- tests/view/trip.test.mjs` | 0 |
| `npm test -- tests/view/account-screen.test.mjs` | 0 |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 |
| `npm run typecheck` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0 (0 errors) |
| `git diff f0f3b07..c2a7853 \| grep '^+' \| grep -iE 'definicja\|vault\|Brain\|Notes/\|Projects\|\(P\) Loop\|private\|prywat'` | 1 (no hit) |
| `git log --format=%B f0f3b07..c2a7853 \| grep -iE` (same pattern) | 1 (no hit) |

Manual checks: the *Rationale* and *Rejected* of D-53, D-134, D-149, D-170, D-180, D-188, D-243, D-251, D-325 and D-326 at the head compared by eye with the definition's passages; D-251 also compared with its base text.

Not run: the full `npm test` (the cycle's gate); StrykerJS (the fix changes no simulation file); a real browser (the separator's look is for the human at the request).

## Reaches beyond the dispatch

- `the approved project definition (a private note)`, the projected entries' passages, already read in the review of the whole change, to compare the fixed fields (point 1).
- `git show 2136709:foundations/decisions.md`, D-251 and the count of *Origin* lines naming the definition (points 1 and 3).

## Searches not found or unclear

none
