# Report — the foundation entries, group 1

**Status:** done with concerns (no question blocks the entries; the concerns are listed at the end).

Worktree `the task's worktree`, branch `task/teksty-rozjechane-z-kodem`, base `adbec4b`. Files changed: `foundations/decisions.md` (+61/-43), `foundations/glossary.md` (+1/-1). No other file.

## Commits (in order, all on the task branch)

| Commit | Entry |
|---|---|
| `6c31f59` | D-252 (settlement row 1) |
| `0202a50` | D-111 (settlement row 2) |
| `29447bc` | D-48 |
| `39760bd` | D-54 Rejected |
| `71271ee` | D-54, D-56 place on the list |
| `5aa41ec` | D-56 first number |
| `e4b08bd` | D-67 |
| `577ca9d` | D-156 |
| `be54119` | D-183 |
| `6956219` | D-04, D-213 |
| `c87a9b0` | D-101 |
| `a48f223` | D-207 |
| `8053821` | glossary `catch-up` |
| `937e47e` | D-313 Rejected |
| `3112e4d` | D-313 Rationale |
| `db0ceb7` | D-147, D-185 |
| `2f89dbb` | D-312 |

## Entries (one sentence English, one Polish)

- **D-252 — `row 1`.** EN: what `account-database-check` and `measure-passwords` print to whoever ran them is no log line, so on a failure it keeps the error's text and gets no JSON failure line (both work on a temporary database and made-up passwords); code unchanged. PL: to, co `account-database-check` i `measure-passwords` wypisują temu, kto je uruchomił, nie jest wierszem logu, więc przy awarii zostaje z treścią błędu i bez wiersza awarii JSON (oba działają na tymczasowej bazie i sztucznych hasłach); kod bez zmian.
  - Edited in place: binding sentence 2 (still three binding sentences), the *complies* example (beside the readiness line) and the *violates* examples, *Origin* (added the task and its question 7, row 1), *Rationale*, and *Rejected* (the two ways of question 7, A and B, each with the cost the task keeps; the code-bearing wording names no file in the prose).
  - Search of the foundation (WAY-33): `account-database-check` and `measure-passwords` appear only in D-253 (last-resort handling, consistent) and in the part map and testing guidelines (test file lists). D-354 holds the neighbouring settlement for `account-block` and `account-backup` (JSON line plus a sentence) and does not state this one; D-353 is about refusals. No entry already held the settlement, so no tie, no second entry; D-252 is the entry, as item 37 names it. D-354 and D-253 stay unedited and agree with the new wording.
- **D-111 — `row 2`.** EN: the mail password file must decode to a nonempty password, so an empty file, a file of only a byte-order mark and a trailing newline are all refused at startup. PL: plik hasła poczty musi dawać po dekodowaniu niepuste hasło, więc pusty plik, plik z samym znacznikiem BOM i końcowy znak nowej linii są odrzucane przy starcie.
  - Edited: binding sentence, *Rationale* (the decoding drops the byte-order mark), *Rejected* (the way of question 3 not chosen, "only zero bytes", with its cost). *Origin* stays `none`. The invariants that derive from D-111 (`account-startup-configuration`, `account-server-default-address`) stay true as written (an empty password is an "invalid explicit account setting"); the test for the new refusal is Slice 4's.
- **D-48 — `row` (To do 24), listed as "the cycle's" only in the sense that the Origin now says so.** EN: the *Origin* says the names of the tokens other than roles were chosen by the cycle (Decision 1 of its spec, `docs/task-cycles/styleguide-loop2/spec.md` at `b0c4d44`), and Q18 covers the role names only. PL: *Origin* mówi, że nazwy tokenów innych niż role wybrał cykl (Decyzja 1 jego specu), a pytanie Q18 dotyczy tylko nazw ról. Binding sentences untouched.
- **D-54 *Rejected* — `row` (To do 25).** EN: *Rejected* is `unknown`, because no source offered sorting by name; the *violates* example stays. PL: *Rejected* to `unknown`, bo żadne źródło nie proponowało sortowania po imieniu; przykład naruszenia zostaje.
- **D-54 and D-56 place on the list — `row` (To do 26).** EN: "place on the list" means one thing: the order of the characters does not change, and the position number of a character shifts when a character before it leaves (D-54 *Rationale*; D-56 *violates*, *Rationale*, *Rejected*). PL: „miejsce na liście” znaczy jedno: kolejność postaci się nie zmienia, a numer pozycji przesuwa się, gdy odchodzi postać przed nią.
- **D-56 first number — `row` (To do 27).** EN: the binding sentence gives 1 to the first character of a game and one more than the last number for each later one, as `newGame` (`nextCharacterId: 1`) and `createCharacter` give it; a *complies* example added. PL: zdanie wiążące daje numer 1 pierwszej postaci gry, a każdej następnej o jeden więcej niż ostatni, tak jak daje go kod.
- **D-67 — `row` (To do 28).** EN: the first *complies* example speaks of a tile of Las missing two sticks since game minute 45, the only kind that gets two back. PL: pierwszy przykład *complies* mówi o kafelku Lasu, któremu brakuje dwóch patyków od minuty gry 45, bo tylko taki odzyskuje dwa.
- **D-156 — `row` (To do 30).** EN: *Rationale* says "a navigation from the player's webmail page on another site", not "a mail service". PL: uzasadnienie mówi o stronie poczty gracza w przeglądarce, nie o „mail service”.
- **D-183 — `row` (To do 31).** EN: *Rejected* gives the way of question Q6 (read by `git show 1b09f80:docs/task-cycles/plan-wyprawy/task.md`, line 60, "Odrzucone: B"): "Zakończ" before completion giving back to the chest what the character brought in, a free undo of the withdrawal and an exception for tasks 14 and 18. PL: *Rejected* podaje wariant odrzucony z pytania Q6: „Zakończ” przed domknięciem oddaje do skrzynki to, co postać wniosła, jako darmowe cofnięcie pobrania i wyjątek dla zadań 14 i 18.
- **D-04 and D-213 — `row` (To do 32).** EN: both name the state D-211 calls "the unsaved game state" by that name (D-04 binding sentence; D-213 binding sentences, two places), not "saved game state". PL: oba nazywają stan, który D-211 nazywa „the unsaved game state”, tą nazwą, a nie „saved game state”.
- **D-101 — `row` (To do 33; question 4, answer A).** EN: "a delayed renewal cannot restore a destroyed session". PL: „odnowienie opóźnione nie może przywrócić zniszczonej sesji”. No other use of "resurrect" in `foundations` or `guidelines` means a session or a counter (grep found only this one outside the character sense).
- **D-207 — `row` (To do 35; question 5, answer A).** EN: *Rejected* says a tab left open for a day sends about 2880 saves at the 30-second rhythm (24 x 3600 / 30 = 2880). PL: *Rejected* mówi, że karta zostawiona otwarta na dobę wysyła około 2880 zapisów przy rytmie 30 sekund.
- **`catch-up` (glossary) — `row` (To do 36; question 6).** EN: "The catch-up is the computing of the game minutes that passed since the save time, which runs after each load of a saved game state." PL: doliczanie to liczenie minut gry, które minęły od czasu zapisu, i biegnie po każdym wczytaniu zapisanego stanu gry. *Not* stays `none`. Search of the word in every file git tracks: the other uses (decisions, invariants `catch-up-*`, code and test comments) all fit the new meaning; the only text that echoes the old wording is `foundations/decisions.md:181`, "the time the game was closed", a violates example about the server, not the term; nothing needed rewriting.
- **D-313 *Rejected* — `row` (To do 39).** EN: the last variant (the group "Program" with the condition "Zawsze" added where the copy has none) is dropped; the three ways question 5 and 10 keep stay. PL: ostatni wariant (grupa „Program” z warunkiem „Zawsze” dodana, gdy kopia nie ma żadnej) usunięty, bo Mariusz go nie rozważał.
- **D-313 *Rationale* — `row` (To do 40).** EN: an action or condition that needs a target the rule panel offers none for gives way to the next one, because a rule without the target it needs cannot be written and a greyed button would refuse a discovery for which the decision gives a rule; so the button writes only a rule the rule panel can show filled. PL: czynność albo warunek, dla którego panel reguły nie ma celu, ustępuje następnemu, bo reguły bez potrzebnego celu nie da się zapisać, a wyszarzony przycisk odmawiałby odkrycia, dla którego decyzja daje regułę.
  - The reason is in the cycle record at `2aae30a`, but not as one sentence in the three places the handoff names: `cycle.md` Q9 (line 130) records the choice ("fall through to the next action, then conditions, then Zawsze -> Eksploruj") and its rejected guard, and line 230 only says the reason stands in the record (review r3). The reason itself stands in the record file it cites, `reports/report-slice-3.md`, choice 3: "null would grey the button on a state D-313 gives a rule for, and a rule without a target is not allowed by the types"; the reviewer's own proposed sentence (`reports/report-review-return.md`, finding r3) reads "the button writes only a rule the rule panel can show filled". The entry's sentence combines those two. See Reaches.
- **D-147 and D-185 *Rejected* — `row` (To do 41).** EN: the variants "putting it above discovery" (D-147) and "placing it above discovery" (D-185) are dropped, since the discovery is now a band above the program (D-122, D-311), no longer a line of the world column, so no placement "above discovery" exists to reject; the other variants of both stay. PL: warianty „nad odkryciem” usunięte, bo odkrycie jest dziś pasem nad programem, a nie wierszem kolumny świata.
  - I did not write `unknown` or a new reason: the decisions' own sources (`walka-w-glebi-lasu` cycle row C8; D-185's sources) hold reasons only for the old order ("long wrapped text uses space", "changes the established order"), so no reason that survives the change exists in them. Dropping leaves D-147 five and D-185 two other ways, each with its reason.
- **D-312 — `row` (To do 42).** EN: "Its further cost" names the third way another group comes first: the game's rule moved to a later group. PL: „Its further cost” wymienia trzecią drogę: reguła gry przeniesiona do późniejszej grupy.

All rows are `row <n>` rows of the plan's *Foundation entries* (the rows own To do numbers 24 to 42); two are the task's *Settlements to record* rows 1 and 2. None is `projected` or `the cycle's`.

## Foundation checks run

- `python -B .the-way/elements/common/foundation_check.py` before the first edit (baseline): exit 0, `0 errors`.
- The same command after every entry or group of edits (16 times, once per commit above): each exit 0, `0 errors`. The final run on `2f89dbb`: exit 0, `0 errors`.
- The product's gate was not run (the handoff forbids it); no `--skip-test-citations` was needed because no invariant was written.

## Own-work check

- Requirement most likely not met: the template's limit of one to three binding sentences for D-252, whose sentence 2 now carries a long clause, and the rule that the author's *Rationale* and *Rejected* name no file, script or count. Check: counted the sentences of D-252's first paragraph (three: "Loop2 adopts...", "A log line ...", "The product logs ..."), and read the *Rationale* and *Rejected* additions: they say "both commands", "a command", "the person who ran it" and name no command or file (the two commands are named only in the binding sentence and in *Verification*, where the template allows it). Result: both hold.
- Second check: `git diff adbec4b HEAD` grepped for `will|should|MUST|SHALL`: no match in added lines (binding-word rule). A `grep` for U+FFFD and `â€` in `foundations/decisions.md`: none (the first, failed heredoc run of D-48 matched nothing and changed nothing).
- Third: every quoted number or place was read from its source in this run: `src/server/account-database-check.ts:83-85`, `src/server/measure-passwords.ts:384` (read; they match the row), `src/server/configuration.ts:128-131` (read: `length === 0` check, `TextDecoder` default drops BOM), `src/browser/sim/game.ts:342` (`nextCharacterId: 1`), `:407`, `:422`; the `git show` of `1b09f80`, `2aae30a` and `b0c4d44`.

## Reaches beyond the handoff

- `git show b0c4d44:docs/task-cycles/styleguide-loop2/spec.md` (Decision 1), and the PR #21 body (`gh pr view 21`), to confirm that the cycle chose the non-role token names and to name the spec's place for D-48 (the PR body also gives `b0c4d44` as the record commit). Why: the handoff says "Decision 1 of its spec" without a place.
- `git show 2aae30a:docs/task-cycles/ekran-przejscia/reports/report-slice-3.md`, `report-review-return.md`, `report-review-whole.md`, `report-review-1.md`, `report-return-step.md`. Why: the three places the handoff names do not hold the reason in one sentence (see D-313 *Rationale*), and for D-147 and D-185 to see what the sources keep.
- `git show 1933a3f:docs/task-cycles/walka-w-glebi-lasu/cycle.md` (row C8) and `git grep` of `siedziba-i-druzyna` (`d1d35ac`, `reports/02-review.md`) for D-147 and D-54. Why: to confirm that no source offered sorting by name and what the old "above discovery" variant meant.
- `src/browser/sim/game.ts`, `src/server/configuration.ts`, `src/server/account-database-check.ts`, `src/server/measure-passwords.ts`: read, not changed. `foundations/invariants.md` (the two invariants deriving from D-111, and a search for invariants deriving from D-252: none found). `foundations/glossary.md` head and neighbours of `catch-up`. D-240, D-122, D-311, D-123, D-353, D-354, D-253 read whole for the search of the foundation.
- The vault's task file `zadanie_loop2_teksty_rozjechane_z_kodem.md` exists at `the folder of the task notes in the author's backlog`; I cited it in D-252's *Origin* by the pattern the log uses (vault file name, path, question and row).

## Unread material

- `.the-way/elements/decisions/examples.md` was read only to its first lines (it names WAY-03 as the example, which lives in the-way's own `foundations/`); WAY-03 itself I did not open. The template and `rules.md` were read whole.
- `.the-way/elements/glossary/examples.md` read whole; the-way's own `foundations/glossary.md` and the-way's own `foundations/decisions.md` were not read (not needed to word a loop2 entry).
- Of `plan.md` I read the section *Foundation entries* and the slice goals around Slice 5; the rest of the plan was not read (slice texts for Slices 4 and 10 not read, so I could not confirm how they cite my entries).
- The cycle record at `2aae30a` and `b0c4d44`: read only the files named above, not the whole record.

## Searches not found or unclear

- The reason of D-313's give-way rule is not in one sentence in the three places the handoff names (see above); found in `report-slice-3.md` choice 3 and the reviewer's finding r3. Worded from those two; confirmable by the orchestrator.
- D-48: no spec outside the cycle record at `b0c4d44` holds "Decision 1"; the vault's `styleguide_loop2.md` no longer exists in `_zadania` (the vault holds the task under other names), so the quoted Q18 title stays as the entry had it.
- D-147 and D-185: no reason that survives the layout change exists in the decisions' sources; I dropped the variants instead of writing `unknown` (see above). If the orchestrator prefers `unknown` as the plan proposed, a variant would have to stay with a reason that the screen cannot give.
- The test file `tests/invariants/test_account_startup_configuration.py` does not exist under that name (I looked for the invariant's test to see whether it covers an empty password; not found, not pursued, as Slice 4 owns the test).

## Questions

none.

## Concerns

1. **D-252 grew one clause, not a new entry.** The rule of the decisions' template ("a new rule next to an existing decision is a new question") would favour a new decision beside D-354, as the neighbour was written. I followed the handoff and item 37 (D-252) and fitted the clause in sentence 2 so D-252 keeps three binding sentences. Cost if wrong: the orchestrator or the reviewer may want it split out; then D-252's clause moves to a new entry that derives from D-252, with the same text. Slice 10 can cite D-252 as the handoff says; it should not need D-354 for these two commands.
2. **D-185 still says "placing it under the backpack — changes the accepted placement below the status".** The review that raised To do 41 (`report-review-1.md` M2) calls "below the status" a removed layout as well; the task item names only "above discovery", so I left that reason. It is a further row of the same kind.
3. **D-247 and the glossary.** D-247 says the catch-up runs after "each load of a saved game state" and lists "a sign-in to the same account with the state kept in the page's memory (D-211)", a state D-211 now calls the unsaved game state (row 32 for D-04 and D-213 only). The glossary entry follows D-247's wording as the row asks; the same naming slip stands in D-247 and in the invariants `catch-up-minutes` text; not changed (not my row).
4. **D-165 and other entries** still use "its place on the list" for the programs' list (`decisions.md`, the D-165 *Violates*/*Rejected*); the row covers D-54 and D-56 only.
5. **D-48 Origin** now points to `docs/task-cycles/styleguide-loop2/spec.md` at commit `b0c4d44`, a file removed from `main` again but reachable (it is an ancestor of the branch); the log's other Origins cite the vault, so this is the first Origin with a commit reference. The template allows "a file at a fixed commit".
6. **D-183 *Rejected*** keeps the source's "tasks 14 and 18" literally; it names plan tasks that mean nothing to a later reader. The source gives no other cost; I did not paraphrase it.
