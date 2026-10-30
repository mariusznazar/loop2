# Report — return step, task `zapis-stanu-na-serwerze`

- **Status:** done with concerns (the concerns are for the orchestrator, below; none is a question
  for the human)
- **Stage:** return step (step 11 of `implement-task`), fresh agent with `make-change`; method
  `.the-way/task-cycle/change/SKILL.md`, `.the-way/task-cycle/skill/return_step.md`,
  `.the-way/task-cycle/skill/foundation_step.md`; element skill `the-way-record-decision`
  (`.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md`,
  `elements/common/rules.md`, `elements/common/way_of_working.md`).
- **Base:** `582e9be` · **Commit:** `188b836` docs: :memo: name the kept game state among the loads
  and the logout save in the saving decisions (on `task/zapis-stanu-na-serwerze`, author
  the private author address). `.the-way` at `a8dfe8a`, equal to its gitlink.

## Files changed

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 15 | 10 |

## What was compared, and what no longer matched

Compared with the code at `582e9be` (`src/browser/view/app.ts`, `game-view.ts`, `game-saver.ts`,
`src/browser/account-api.ts`, `src/browser/sim/saved-game.ts` head and load, `src/server/account-routes.ts`,
`database.ts`, `transport.ts`): every entry the change wrote or changed — D-04, D-07, D-53
(rationale), D-96, D-97, D-104, D-109, D-112, D-134 (rationale), D-156, D-179 – D-190; the
invariants `player-save-isolation`, `expired-session-unsaved-progress`, `account-save-sqlite-store`,
`saved-state-http-exchange`, `save-version`, `account-mutation-request-guards`,
`account-schema-lifecycle`, `account-database-schema`, `account-session-authorization`,
`blocked-account-access`, `account-save-durable-storage`, `player-self-registration`; the facts
`fetch-keepalive-body-quota`, `visibilitychange-hidden-last-event`; the part map entries of
`simulation`, `browser-view`, `account-server`. Also the entries the task names (*Decisions in
play*) that the code touches: D-51, D-62, D-91, D-132, D-137, D-157, D-173; and, as the search found
them, `account-client-requests`, `account-client-outcomes`, `simulation-isolation`,
`simulation-inputs`, `player-server-session`, `account-session-storage`, `account-save-sqlite-access`.

Four entries no longer matched the code, and were corrected in `188b836` through
`the-way-record-decision` (meaning in Polish, WAY-114):

| Entry | What did not match | Correction | Znaczenie |
|---|---|---|---|
| D-04 (binding sentence, complying example, rationale) | The view passes to the load function also the document kept in page memory after a save found no session (`app.ts:259`, `startFrom(keptGame.document, …)`; spec decision 5 and 8). D-04 listed only "the saved game state the browser downloaded from the server" — the whole review's m-4. | "…the passing of real time and a saved game state the browser downloaded from the server or kept in the page's memory after a save found no session (D-188)." The complying example and the rationale say the same. | Widok zmienia stan gry tylko funkcjami symulacji, którym podaje wybory gracza, upływ czasu i zapis stanu gry — pobrany z serwera albo zachowany w pamięci strony po zapisie, który nie zastał sesji. |
| D-190 (binding sentence) | Same path: "an unknown value downloaded from the server" (m-4). | "…an unknown value — a saved game state downloaded from the server or kept in the page's memory (D-188) — into a game state or a refusal…". | Kod rodzaju `saved-game` zamienia na stan gry albo odmowę zapis pobrany z serwera albo zachowany w pamięci strony. |
| D-185 (binding sentence) | After a failed save before logout the header line reads „Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.” and keeps it through the retries until a save succeeds (`game-saver.ts:171-172`, `logoutFailed`; spec § 8: "the header slot reads … while the saver's retries go on silently under it"). D-185 said every failure shows „…Gra spróbuje ponownie.”, so for the logout save D-185 and D-97 named two sentences for one line, with no precedence. | "…„Nie udało się zapisać postępu. Gra spróbuje ponownie.” in `warning`, or, once the save before a logout has failed, the sentence D-97 gives for that failure, and the game retries…" — the exception foreseen in advance written into the binding sentence (template, "Binding sentences"; WAY-30), so no `narrows` is needed. | Po nieudanym zapisie przed wylogowaniem wiersz nagłówka pokazuje zdanie z D-97 („…Spróbuj wylogować się ponownie.”) zamiast „…Gra spróbuje ponownie.”, aż zapis się uda; ponawianie bez zmian. |
| D-184 (binding sentence) | A moment of saving made while the save before logout is in flight is dropped when that logout goes on (`game-saver.ts:180-186`, `pending = false`), while D-184 said every moment during a request "is sent after its answer" — the slice review's m-3, which the whole review graded as an untested choice. | "…a moment of saving during one is sent after its answer, unless that request is the save before a logout that goes on (D-97)." | Chwila zapisu w trakcie zapisu przed wylogowaniem, po którym wylogowanie idzie dalej, nie jest wysyłana. |

Everything else matched. Points the handoff asked me to judge:

- **New invariants written `Method: test` before their tests:** each now has citing tests on the
  branch — `player-save-isolation` (`tests/http.test.mjs:2235`), `expired-session-unsaved-progress`
  (`tests/view/account-screen.test.mjs:1113`, `:1142`), `account-save-sqlite-store`
  (`tests/account-storage.test.mjs:726`, `:800`, `:840`, `:886`), `saved-state-http-exchange`
  (`tests/account-api.test.mjs:540`, `:586`, `:692`, `:797`, `:810`), `save-version`
  (`tests/sim/saved-game.test.mjs:506`, `:530`, `:551`, `:802`). The template's form has no *Check*
  field; the citation `invariant: <identifier>` is what links an invariant to its test, and
  `foundation_check.py` reports 0 errors. No change.
- **`src/browser/view/program-panel.ts` (Slice 6, D-189):** a loaded map run shows the copy
  (`program-panel.ts:104-109`), as D-189's "the copy open to editing as D-62, D-132 and D-173 give".
  Matches; the panel is in `browser-view`, whose part map sentence still holds.
- **Minor findings** (`reports/26-whole-review-report.md` § Minor, `reports/25-slice-minor-findings.md`):
  only m-4 (D-04, D-190) and m-3 (D-184) showed an entry that no longer matched; corrected above.
  m-1 matches D-184 as written ("only where it changed since the save last sent"); the rest are about
  tests, comments or the deploy skill's wording, not foundation entries. None fixed in code.
- **`account-save-durable-storage`:** *Violated: yes* stays (plan row 31, after H2, not mine).
- **Part map:** `simulation`'s sentence ("computes the game: the game state, …") still covers the
  load; its *Trust boundary* `src/browser/sim/saved-game.ts` and `account-server`'s `src/server/**`
  match the answers of step 4. `browser-view`'s sentence ("sends the browser's requests to the account
  and save server") covers the saver. No change.
- **Environment facts:** the one outside behaviour the change rests on that the foundation does not
  hold is SQLite counting `length(CAST(game AS BLOB))` in bytes (`database.ts:97-108`). Not written:
  were it to change, the code of the `CHECK` would change, not D-112's "at most 65 536 bytes", so it
  calls no decision into question (environment-facts template, "Which facts are written"); a test
  pins it (`tests/account-storage.test.mjs:841`).
- **Glossary:** "save" now names both saving the copy into a program (D-164, the glossary's `copy`)
  and saving the game state on the server; both are meanings a reader of the field gives the word,
  so no entry (glossary template, "Which words take an entry"). No word of the-way's glossary is
  used bare in the new text.
- **Settlements to record and projected entries:** rows 1–10 and the projected entries the plan
  assigns are all in the log (as the whole review also found); nothing the foundation step missed.
  No choice that binds after the merge was found unwritten.

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (before the edit, at `582e9be`) | 0, "0 errors" |
| `python -B .the-way/elements/common/foundation_check.py` (after the edit, before and after the commit) | 0, "0 errors" |
| `git -C .the-way rev-parse HEAD` against `git ls-files --stage -- .the-way` | both `a8dfe8a…` |

No test reads the wording of the four decisions (`git grep -n decisions.md -- tests` finds only
comments), so no other focused check applies. Not run: `npm test` (no argument), the cycle's gate.
No test was written: a decision takes none.

## Own-work check (section 3)

- Requirement most likely unmet: the return step's "compares with the code the entries the change
  writes or changes … and corrects whatever no longer matches" — that I compared an entry with the
  view and missed a path. Check: for each moment of saving and each outcome of the saver I followed
  the code path in `game-saver.ts` and `app.ts` (moment during a request, moment during the logout's
  save, hidden page during a request, too large at logout, failure at logout and its retries,
  conflict then a failed save, outdated then logout, kept state for the same and another account)
  against D-184 – D-188 and D-97. It showed the two mismatches corrected in D-184 and D-185; the
  others hold (see Concerns 3 for one left as is).
- `git diff 582e9be..188b836` holds only the four entries' paragraphs; `foundation_check.py` 0.

## Reaches beyond the dispatch

- `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md` §§ 5, 6, 8 (lines 185–300, 330–360) — to see
  whether the kept-document load and the logout-failure sentence were the spec's design rather than
  an executor's drift; they were.
- `guidelines/coding-saved-game.md` § When to read and § Rules — whether the guideline repeats the
  narrower wording (Concerns 2).
- `.the-way/foundations/glossary.md` headings — the-way's terms, for the qualifier rule.
- `.the-way/elements/environment-facts/template.md` § Which facts are written; `.the-way/elements/glossary/template.md`.

## Searches not found or unclear

- The handoff asks to "check each invariant's *Check* names them"; the invariants template has no
  *Check* field. I read it as the citations `invariant: <identifier>` in the tests (template, "Method
  and test"), and checked those.

## Choices, with the way rejected and its cost if wrong

1. **D-04 and D-190 widened in wording, not the code changed.** Rejected: keeping the kept state as a
   live `GameState` in the page — the spec rejected it (a second way to build the game, and its
   running map run would need a pause of its own). The meaning the human approved for D-04 — the view
   changes the game state only through a function of the simulation — stays; the task's row 5 and
   D-188 already require going on from the kept state. Cost if wrong: the orchestrator must name the
   two changed binding sentences under *What this request settles* for the human at the merge; if the
   human reads the widening as beyond question 10, D-04 goes back and the code needs the rejected way.
2. **D-185 carries the exception, rather than D-97 gaining `narrows D-185`.** The template lets an
   exception foreseen in advance stand in the binding sentence; both rows (2 and 6) were approved
   together. Cost if wrong: one sentence of D-185 to move.
3. **D-184 gains the logout exception, rather than the saver keeping the moment.** Rejected: a code
   change in `game-saver.ts` and `app.ts` so a moment during the logout's save is sent after the
   logout's own answer — new code at the logout race, after review. Cost: an act the player makes
   in the instant „Wylogowywanie…” stands is lost when the logout succeeds, and waits for the next
   30-second check when the logout request fails.

## Concerns for the orchestrator

1. Four binding sentences changed in this step (D-04, D-184, D-185, D-190): the request names each
   under the changed decisions, with the meanings above.
2. `guidelines/coding-saved-game.md:8-9` ("…albo dokument pobrany z serwera na stan gry lub
   odmowę") and `:122` keep the narrower wording D-04 and D-190 had. A guideline is no foundation
   entry and its meaning needs the human's approval (WAY-172), so I did not change it; the
   guideline's own process may widen it.
3. Not changed, judged still matching: D-186's "on the header line of D-185 until its first
   successful save" — a failed or too-large save after the conflict puts its own sentence on that one
   line (`game-saver.ts:165-172`); I read the line of D-185 as showing the latest outcome.
   `account-client-outcomes` speaks of returning "an account", while tests of the saved-game requests
   cite it (`tests/account-api.test.mjs:587-767`); its sentence still holds (every answer other than
   a request's success status is a failure), as it did for logout before this change.

## Problems observed

None.

## Questions

None.
