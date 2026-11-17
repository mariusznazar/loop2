# Return step report — luki-w-testach-z-przegladu

**Status:** done with concerns

- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), `.the-way/task-cycle/skill/return_step.md`, `.the-way/task-cycle/skill/foundation_step.md`, each read whole; decisions written through `.the-way/elements/decisions/skill/SKILL.md` with `read.md`, `decide_entry.md`, `.the-way/elements/decisions/template.md`, `.the-way/elements/decisions/examples.md` (WAY-03 of the-way's log read), `.the-way/elements/common/way_of_working.md` and `.the-way/elements/common/rules.md`, each read whole.
- Worktree `the repository's root`, branch `task/luki-w-testach-z-przegladu`, started at `e0d2b678`; `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, equal to the gitlink (`git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way`).

## Files and commits

`foundations/decisions.md` only: 11 lines added, 10 removed over the three commits (`git diff --stat e0d2b678..HEAD`).

| Commit | What |
|---|---|
| `6fb4e876` | D-382 *Verification*: the clause on rows already drawn joins `tests:`, the pair of examples goes (+1 −3) |
| `b124f637` | D-49: second binding sentence, the violating example and the *Rationale* say the single test of the default address is one test file with a case for each startup `account-server-default-address` names (+3 −3) |
| `36e6825b` | *Verification* `tests:` of D-104, D-205 and D-271 extended by what the cases this change cites them on hold (+7 −4) |

Each kept in a commit of its own so that the human can refuse one at the merge by reverting it. The worktree is clean after the last commit (`git status --short` empty).

## Return step (for the record's *Return step*)

- **Foundation compared with code:**
  - D-382: its *Verification* said no test held the clause "a row already drawn is not drawn again when an entry is added above it", while the case "an entry recorded above the rows drawn draws its own row alone" (`tests/view/tabs-area.test.mjs:712-749`, commit `1f21cf91`, with `// decision: D-382 "A draw in which neither … when an entry is added above it"` at `:713`) holds it. Corrected: the clause is named under `tests:` and the pair, which covered only that clause, is removed (`6fb4e876`). The case does not grow the window, as the old pair's complying example did; the binding sentence does not mention a grown window, so no part stays for a pair.
  - D-49: "a single test of the default address" and the violation "a second test that starts the server without …" read against `tests/invariants/test_account_server_default_address.py:96-123`, whose two cases each start the server without either listen variable. Corrected as the orchestrator chose (Q16, review finding M-6) (`b124f637`).
  - D-205: its `tests:` said "an account and its session outliving the replacement of the application container"; since the fix of I-1 (`835a6d25`) the case citing it by `// decision: D-205 …` (`tests/deploy/test_account_storage.py:99-101`) also saves a game state and reads it back after the replacement (`:132-134`, `:148-151`). Corrected to "an account, its session and its saved game state" (`36e6825b`).
  - D-271 (named in the task's *Decisions in play*): two new cases cite it by `// decision: D-271 "A sprite file holds pixels alone, the game credits each pack whose licence asks for a credit …"` (`tests/view/icons.test.mjs`, the completeness cases of slice 4); its `tests:` named only the credit line of LPC Wolf. Corrected: it now names every sprite file assigned to its pack and every pack whose licence asks for a credit having a line among the credits (`36e6825b`). The pair is unchanged: none of its parts is a part these cases hold (the assignment table in the test sets which pack a file comes from; it does not prove where a picture comes from).
  - D-104: the new case "every route the application answers with a method other than GET and HEAD is a route a guard case lists" (`tests/transport.test.mjs`, slice 9) cites it by `// decision: D-104 "The session cookie uses SameSite=Strict, and every state-changing route requires …"` (`:1377`); its `tests:` did not say so. Corrected (`36e6825b`). D-104 has no pair.
  - Every other `decision:` line the change adds (`git diff 0b23580b..e0d2b678 -- tests scripts`, grepped for `decision: D-`): D-140, D-190, D-240, D-316 and D-322 — each decision's `tests:` already names what the new case holds (D-140 "an attack interrupting the action under way, which is lost"; D-190 "in a manual map run, an earning loop and a catch-up alike"; D-240 "the catch-up running when a loaded game comes back, taking the characters one at a time"; D-316 "running in from the right edge at the reading of its attack"; D-322 "holding all its motion — … the wolf and its cloud"); no pair claims a part these cases hold. No change. D-112: see *Concerns*.
  - D-422 against `tests/http.test.mjs:5959`: the case's name stands word for word; the case carries no `decision: D-422` line, so the pair is the only check and stays. Matches.
  - D-29 against `eslint.config.mjs` (`scriptDirectories` of the three directories, `globals.node` for them, no TypeScript patterns or programs): matches; the pair (versions and rule sets) is a part no test holds. D-73's list and `guidelines/testing.md:10-16` (eleven departures, D-422 named alone for its one case) and the *Doubles* of the integration recipe (`guidelines/testing.md:376`): match.
  - D-390 against `scripts/docker_gate.py` (`daemon_answers` asks `docker system df`) and `tests/quality/test_docker_gate.py` (the cached-version case): the *Rationale* and *Based on* the fix wrote match; the binding sentences are unchanged; the new case carries no `decision:` line, so `tests:` needs nothing.
  - Environment facts `express-session-id-generator`, `uid-safe-sync-id`, `random-bytes-sync-source`, `docker-desktop-resource-saver`: compared through the reviews' checks (the quotations found in the installed packages at the pinned versions, review of the whole change check 11; the live Resource Saver page, review of the fix check 3); `player-opaque-session-cookie` *Rests on* names the first three, D-390 *Based on* the fourth. Matches; not re-fetched by me.
  - Invariants: `account-save-durable-storage` (`test`) — its one citing case now writes and reads a saved game state, which agrees with D-17's "Checks of accounts and sessions alone … cannot clear account-save-durable-storage"; `account-database-schema` (with `account-schema-lifecycle` folded in, withdrawn with it as successor) — no reference to the withdrawn identifier outside the withdrawn list (grep of the tracked tree, `.runs/`, `.the-way/`, `node_modules/` and `dist/` excluded); `sprite-credits`, `player-express-session-sqlite-store`, `player-self-registration`, `player-password-login`, `email-verification-nonblocking`, `loop2-shared-public-origin` (`test`) — each cited, `foundation_check.py` exit 0 without the switch; `character-team` — sentence unchanged, its test after M-5 reads within it; `eslint-source-rules` — sentence and *Part* match the configuration. No change.
  - Guidelines: `guidelines/coding.md:37-43` (the *Linter* paragraph after M-7) and `guidelines/testing.md` rows the change edits — match the code. No change.
  - Part map, the touched parts (browser-view, simulation, account-server, build-tools, agent-workflow, deployment, product-foundation): every changed file falls under its part's *Files* (`foundation_check.py` reports no file claimed by no part); the descriptions still hold — build-tools still "starts Docker Desktop … for a test of the test gate that needs a Docker daemon when none answers". No change.
- **Decisions written or changed:** D-382 (*Verification*), D-49 (binding sentence, violating example, *Rationale*), D-104, D-205, D-271 (*Verification* `tests:` only).
- **Invariants written or changed:** none.
- **Environment facts:** none (the change rests on no source outside the product that the foundation does not hold after the fix's `docker-desktop-resource-saver`).
- **Glossary terms:** none.
- **Part-map changes:** none.
- **Projected entries written whole or in part:** none (the task carries none).
- **Rows of *Settlements to record* written:** none by this step; rows 1–3 were written by the foundation step and slices (D-422, D-73, `guidelines/testing.md`; `sprite-credits`; the three facts and `player-opaque-session-cookie` *Rests on*) and compared above.

## Each entry this step wrote, with its meaning

| Entry | Marker | Meaning (English) | Znaczenie (po polsku) |
|---|---|---|---|
| D-382 *Verification* | `the cycle's` (the plan names it for the return step; no row and no projected entry carries it) | The clause that a row already drawn is not drawn again when an entry is added above it is now held by a test, so no pair of examples stands for it. | Klauzulę, że wiersz już narysowany nie rysuje się ponownie, gdy nad nim przybywa wpis, trzyma teraz test, więc nie stoi przy niej para przykładów. |
| D-49 | `the cycle's` — a changed binding sentence for the human to accept at the merge (Q16, M-6) | The one exception to giving the server a free port is one test file of the default address, which starts the server without both listen variables in one case for each startup its invariant names — unconfigured outside production and fully configured with valid settings; any other test doing so violates the decision. | Jedynym wyjątkiem od wolnego portu jest jeden plik testu adresu domyślnego, który uruchamia serwer bez obu zmiennych nasłuchu w jednym przypadku na każdy start, jaki nazywa jego niezmiennik — bez konfiguracji poza produkcją i w pełni poprawnie skonfigurowany; każdy inny test, który tak robi, łamie decyzję. |
| D-104 *Verification* | `the cycle's` (no binding sentence changed) | A test now checks that every route answering a method other than GET and HEAD is one a case of the request guards covers. | Test sprawdza teraz, że każda trasa odpowiadająca na metodę inną niż GET i HEAD jest objęta przypadkiem strażników żądania. |
| D-205 *Verification* | `the cycle's` (no binding sentence changed) | The container replacement test now shows a saved game state surviving the replacement too, not only an account and its session. | Test wymiany kontenera pokazuje teraz, że wymianę przeżywa także zapis gry, nie tylko konto i jego sesja. |
| D-271 *Verification* | `the cycle's` (no binding sentence changed) | Tests now hold that every sprite file is assigned to its pack and every pack whose licence asks for a credit is credited. | Testy trzymają teraz, że każdy plik grafiki ma przypisaną paczkę, a każda paczka, której licencja wymaga wzmianki, ma ją w zasługach. |

D-49 and WAY-30: the change of D-49's sentence follows from To do 9 of the accepted task ("Nowy przypadek startu serwera kont w pełni skonfigurowanego, bez zmiennych nasłuchu, z powołaniem na `account-server-default-address`"), which requires the second case; the orchestrator recorded the reading as its autonomous choice Q16 (`cycle.md:131`), so I wrote it on that recommendation, kept it narrow (no new allowance beyond the cases the invariant names), and it goes before the human at the merge. Step 4.4 of the decision skill: no decision derives from or narrows D-49 and no invariant names it in *Derives from* (grep of `D-49\b` across the tracked tree: only the heading, two `decision: D-49` lines in `tests/quality/test_invariant_support.py:127,138` quoting the first sentence, which is unchanged, and `guidelines/testing.md:378,390`, which name D-49 for free ports and still hold).

## Choices that bind after the merge (handoff item 4)

| Choice | Place | Reason |
|---|---|---|
| D-49's reading of "a single test" as one file with a case per startup (Q16) | the log, D-49 (`b124f637`) | passes the plan test (binds every later test that starts the server); question 5 of "Where it goes": D-49 already answers the question |
| Slice 21: `start_application` waits for the readiness line `Loop: http://`, at most 60 s (`tests/invariants/account_container_support.py:24-25,122-142`) | nowhere new; it stands in the helper's code and docstring | binds later container tests, but the rule behind it — wait for a condition with a limit, not a fixed pause — is D-84 and `guidelines/testing.md:378`; the 60 s is a single number (question 3), kept in the code beside its comment; no rule, decision or the human sets it, so no invariant |
| Slice 22: the gate asks `docker system df` (`scripts/docker_gate.py:82-94`) | nowhere new; code with the test that holds it (`test_a_version_that_docker_desktops_cache_answers_is_no_answer_of_the_daemon`) and D-390's *Rationale* and *Based on* (written by the fix, `7988b582`) | a single text (question 3); the rule it serves, that only the daemon's answer counts, already stands in D-390's *Rationale*; promoting it to a binding sentence would change D-390 beyond what anyone accepted |
| Slice 17: the case's mailer deadline of 1.5 s (`tests/account-mail.test.mjs`) | nowhere; code | a single number in one case (question 3), with its reason in the comment |
| Slice 17 fix: `disableReverseLookup: true` on the test's SMTP server | nowhere; code | a setting of one test helper (question 3); no rule of how to write tests beyond that file |
| Slice 6: the case reads React's commits through the developer-tools hook, react-dom imported after it | nowhere; code | a technique of one case, not a rule for later tests (question 2 answered no); a React upgrade that breaks it fails the case at its controls |
| Slice 4: the table assigning each PNG of `assets/sprites/` to its pack, `login-backdrop.png` to Pixel Crawler alone (Q15) | nowhere; code with its test | a list (question 3); D-271's "sprites of the packs Pixel Crawler and LPC Wolf" speaks of the scene's pictures and the login picture together, so it does not contradict the assignment |
| Slice 9: the case reads Express's route table | nowhere; code | a technique of one case |
| M-5 fix: a loop's key read as a character that stands once in the teams | nowhere | a reading within `character-team` and D-241; no new rule |

## Checks

| Command | Exit | What it showed |
|---|---|---|
| `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0; 0 | both `bfb2e109735b5fff98802b8be0ff3c43c799262a` |
| `python -B .the-way/elements/common/foundation_check.py` (at `e0d2b678`, before any edit) | 0 | `0 errors` |
| same, after all five edits in the working tree | 0 | `0 errors` |
| same, with the working tree holding only the D-382 hunk, before `6fb4e876` | 0 | `0 errors` |
| same, after the D-49 hunk, before `b124f637` | 0 | `0 errors` |
| same, after the D-104/D-205/D-271 hunks, before `36e6825b` | 0 | `0 errors`; the file then compared byte for byte with the copy of all five edits (`cmp`, exit 0) |
| `python -B .the-way/instruction-files/check_instructions.py` (after the last commit) | 0 | `0 error, 144 warn, 7 info`, as the reviews found at `f742a3fb` and `e0d2b678` |

Not run: the product's gate (`npm.cmd test` without a file, `gate_times.py`) — the orchestrator's alone. No test of the product was run: the step changes no test and no code, only `foundations/decisions.md`; the tests whose citations the edits describe were run red and green by their slices and the reviews (review of the whole change checks 8 and 9; review of the fix checks 5-7; fix report for the Docker case).

## Own-work check

- **The requirement most likely unmet:** that D-49's new sentence is true of the code — that the file of the default address is the only test that starts the server without both listen variables, apart from the refused-port values and the containers the sentence lets through.
- **The check:** a search of `tests/` for files that start the built server (`server/main.js`, `dist/server/main`) and for files that set `LOOP2_LISTEN_PORT`, then reading each starting file that does not set it, and every process start in `tests/startup.test.mjs`.
- **What it showed:** the files that start the server are `test_account_save_sqlite_upgrade.py` (a Dockerfile `CMD` in a container, outside the rule), `test_account_server_typecheck.py` (names the entry file only), `test_account_server_occupied_address.py`, `test_local_start_access.py`, `tests/startup.test.mjs` (each of its starts at `:93`, `:118`, `:151`, `:188`, `:638`, `:672` sets `LOOP2_LISTEN_HOST` and a free `LOOP2_LISTEN_PORT`, or a port value the server refuses) and `test_account_server_default_address.py`; only the last starts without both variables, in its two cases. The sentence holds.
- **Second requirement:** that the `decision:` quotations of D-49 still begin a sentence of its binding text — its two quoting lines quote the first sentence, which I did not change; `foundation_check.py` exit 0.

## Concerns

1. **A `decision:` line on a helper that relies on a sentence rather than tests it.** `tests/invariants/account_container_support.py` (slice 21, `wait_until_ready`) carries `# decision: D-112 "The account server opens one application-owned SQLite connection before readiness"`. The helper waits for the readiness line because of that sentence; nothing in it fails if the server became ready before opening its connection (the race would come back as a flaky failure, not a deterministic one). The decisions template says a line `decision:` "stands at the test that holds the sentence". The review of the whole change accepted the line (Scrutiny 3: "The cited text is word for word"). I did not change it, nor add it to D-112's `tests:`, since that clause would then claim a test the line does not make. Recommended: drop the `decision:` line, or turn it into a plain comment naming D-112, in a later fix; the orchestrator decides whether it goes to the request's list of Minor findings.
2. **D-49 is a changed binding sentence marked `the cycle's`:** the request must put it before the human at the merge with Q16; if the human refuses `b124f637`, the second case of the default-address file stands against D-49's old wording.

## Mismatches outside the task (reported, not fixed)

- none beyond concern 1 (which lies inside the change, slice 21).

## Every choice made, with the way rejected

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| D-49 spells out the two startups and names `account-server-default-address` in the binding sentence | naming only the invariant ("each startup the invariant names") — shorter, but the reader of D-49 must open the invariant; or only "one test file" with no startups — would let the file grow cases the invariant does not name | if the invariant gains a third startup, D-49 must change too; the identifier in the sentence makes that edit easy to find |
| D-49's violating example rewritten as "a test outside the test file of the default address that starts …" | keeping "a second test …" — reads as a second case again, the ambiguity M-6 names | none known |
| D-382's pair removed whole, no pair for a grown window | keeping a pair for "a grown window" | the case draws a window that is not grown; the sentence does not speak of growth, and `memo` holds per row whatever the window's size; if a later reader thinks the grown window untested, the case's name and the `tests:` clause say what is held |
| D-104, D-205 and D-271 `tests:` extended (a reach beyond the handoff's list, under `return_step.md`'s "those the search of the foundation found" and "those the task names" for D-271) | leaving them — the clauses would understate what a test holds, so an agent comparing a change would think those parts unheld | the edits change no binding sentence and no pair; reverting `36e6825b` returns them as they were |
| Three commits instead of one | one commit | none; lets the human revert D-49 alone |

## Reaches beyond the dispatch

- `foundations/decisions.md` D-17 (`:1791-1800`), D-205 (`:3675-3690`), D-271 (`:4863-4912`), D-104 (`:2579-2598`), D-73 (`:813-826`), D-29 (`:446-460`), D-390 (`:1365-1380`) and the *Verification* of D-140, D-190, D-240, D-316, D-322: to compare the decisions the change's new `decision:` lines cite with what those cases hold (`return_step.md`, "those the search of the foundation found").
- `foundations/invariants.md`, `account-server-default-address`: the startups D-49 now names.
- `foundations/part_map.md` whole (short): the part map of the touched parts.
- `tests/deploy/test_account_storage.py:1-30,95-160`, `tests/view/tabs-area.test.mjs:640-749`, `tests/invariants/test_account_server_default_address.py` whole, `tests/startup.test.mjs:85-100,630-650` and the process starts listed above, `eslint.config.mjs` whole, the diffs of `scripts/docker_gate.py`, `tests/quality/test_docker_gate.py`, `tests/invariants/account_container_support.py`, `tests/account-storage.test.mjs`, `tests/http.test.mjs`, `tests/view/icons.test.mjs` (citation lines): the code the entries were compared with.
- `.runs/task-cycles/luki-w-testach-z-przegladu/request-notes.md` and `cycle.md` (lines found by a search for Q16, D-49 and the return step): the orchestrator's record of Q16.
- The author's rule files on scripts and on git (outside the repository), served by a hook of the session before my script and my first commit.

## Working copies

- `.runs\return-step\` held `foundation.diff` (the change's diff of `foundations/` and `guidelines/`), `all.patch` and the three partial patches cut from it, `split.py` (a script that cut a patch into chosen hunks, to commit the five edits of one file as three commits), `decisions.final.md` (a copy of the file with all five edits, compared with the result) and `ci.txt` (output of `check_instructions.py`). Removed whole before return (`rm -rf`, the directory no longer listed under `.runs/`). No worktree or clone was made.

**Unread material:** `plan.md` read in its *Foundation entries* (`:1-42`), *Coverage* and *Choices* (`:714-755`), not its slices, as the handoff names those two sections; `spec.md`, `task.md`, `reports/review-whole-report.md`, `reports/review-fix-1-report.md` and `reports/executor-6-report.md` read whole. `foundations/decisions.md` read by entry, as the method gives, not whole; of the decisions the handoff names, D-382, D-49, D-422, D-29, D-390 and D-73 read whole except that D-29's and D-390's *Rationale* and *Rejected* were read in the change's diff rather than in the file. The environment facts were read in the change's diff, not re-checked against their sources (the reviews did). The product's glossary and the-way's glossary not read: no entry I wrote uses a term in a new meaning.

**Searches not found or unclear:**
- A `decision: D-422` line at the case of `tests/http.test.mjs:5959`: not found, so D-422's pair stays as its only check.
- A `decision:` line on the new cached-answer case of `tests/quality/test_docker_gate.py`: not found, so D-390's `tests:` needs no change.
- Whether the `decision: D-112` line on the helper `wait_until_ready` counts as a test holding the sentence: unclear (concern 1).
