# Author report — task `blokada-konta`, the whole change as the one author

- **Status:** done with concerns
- Method: `.the-way/task-cycle/change/SKILL.md`, variant "the whole change as the one author";
  handoff `reports/03-author-handoff.md`; branch `task/blokada-konta` on top of `ed9da63`
  (untouched).

## Commits

| Commit | What |
|---|---|
| `ac56f8f` | code and tests: schema version 2 by ordered migration steps, blocking and unblocking in `AccountDatabase`, the guarded session write, `sessionAccount` refusing a blocked account, the blocked login (403 `account-blocked`, `release()`), the account re-read after the password check, the client's new refusal code, the owner's command `src/server/account-block.ts` |
| `02c2264` | the deploy skill and its byte-identical copy: section "Blocking a player account", the rollback paragraph, troubleshooting § "Rollback and the accounts" |
| `e069f69` | the foundation entries (below) and two invariant citations added to existing tests |
| `81cb7c6` | `guidelines/testing.md` (To do 7) and `guidelines/coding-database-access.md` (To do 8) |

## Files changed (added / removed lines, `ed9da63..81cb7c6`)

| File | + | − |
|---|---|---|
| `src/server/database.ts` | 109 | 28 |
| `src/server/account-routes.ts` | 19 | 1 |
| `src/server/account-block.ts` (new) | 90 | 0 |
| `src/browser/account-api.ts` | 1 | 0 |
| `tests/account-storage.test.mjs` | 361 | 3 |
| `tests/http.test.mjs` | 172 | 3 |
| `tests/account-api.test.mjs` | 2 | 0 |
| `.claude/skills/loop2-deploy/SKILL.md` | 36 | 2 |
| `.claude/skills/loop2-deploy/references/troubleshooting.md` | 9 | 3 |
| `.agents/skills/loop2-deploy/SKILL.md` | 36 | 2 |
| `.agents/skills/loop2-deploy/references/troubleshooting.md` | 9 | 3 |
| `foundations/decisions.md` | 48 | 5 |
| `foundations/invariants.md` | 34 | 4 |
| `foundations/glossary.md` | 6 | 0 |
| `guidelines/testing.md` | 7 | 4 |
| `guidelines/coding-database-access.md` | 19 | 4 |

`src/server/session-store.ts` is unchanged: the database's refusal reaches the Store's callback
as an unknown account's does. No screen file changed. The part map is unchanged: the new file
lies under `src/server/**`, and every new test stands in a file the map already claims
(`foundation_check.py` reports 0 errors).

## Foundation entries written (the foundation step)

Each with its meaning in the task document's language.

| Entry | Kind | Meaning (pl) |
|---|---|---|
| D-129 — How does the operator block and unblock a player account? (new; settlement row 1) | decision | Właściciel blokuje i odblokowuje konto poleceniem w kontenerze `loop2` z adresem e-mail; polecenie mówi, co zrobiło, blokada w jednej transakcji oznacza konto i usuwa wszystkie jego sesje, odblokowanie żadnej nie przywraca, opis jest w skillu `loop2-deploy`, a uruchamia je tylko człowiek. |
| D-130 — How is a player's login kept between requests? (new; projected, written whole as approved) | decision | Przeglądarka trzyma losowy identyfikator sesji w ciasteczku host-scoped, Secure i HttpOnly; serwer trzyma rekord sesji w SQLite, sprawdza go przy żądaniach wymagających zalogowania i może go unieważnić przy wylogowaniu albo blokadzie konta. |
| D-131 — What does the login of a blocked account tell the player? (new; settlement row 3) | decision | Zablokowane konto z poprawnym hasłem dostaje „To konto jest zablokowane.” (403, `account-blocked`) i nie dostaje sesji, ze złym hasłem — komunikat z D-100; taka próba nie dodaje niepowodzenia i niczego nie zeruje, a adres zablokowany po nieudanych próbach odmawia jej jak każdej. |
| D-100 (changed) | decision | Komunikat „Nieprawidłowy adres e-mail lub hasło.” dotyczy nieznanego adresu i złego hasła; poprawne hasło zablokowanego konta rozstrzyga D-131. |
| D-112 (changed) | decision | Obok połączenia serwera polecenie właściciela otwiera jedno krótkie połączenie na tych samych zasadach; otwarcie w jednej transakcji stosuje po kolei kroki przejścia aż do wersji 2 (krok na wersję, wdrożonego kroku się nie zmienia, nowa wersja dokłada krok na końcu), zachowując konta i sesje; blokada ustawia stan i usuwa sesje w jednej transakcji, a zapis sesji zablokowanego konta niczego nie zapisuje. |
| D-107 (relation only) | decision | Biblioteka sesji wynika też z D-130 (`derives from D-130`, jak podaje definicja). |
| `blocked-account-access` (new; projected) | invariant, test | Zablokowane konto nie może się zalogować ani korzystać z żądań wymagających zalogowania. |
| `player-server-session` (new; projected) | invariant, test | Serwer sprawdza żądania wymagające zalogowania na podstawie rekordu sesji w SQLite i unieważnia ten rekord przy wylogowaniu albo blokadzie konta. |
| `unblock-restores-no-session` (new; settlement row 2) | invariant, test | Sesja usunięta przy blokadzie konta nie daje dostępu po jego odblokowaniu. |
| `account-schema-lifecycle`, `account-database-schema` (changed) | invariant, test | Otwarcie bazy tworzy bieżący schemat na nowej bazie, przenosi starszą znaną wersję na bieżącą w jednej transakcji z zachowaniem kont i sesji i odmawia nieznanej nowszej wersji bez zmiany. |
| `account-session-storage` (changed) | invariant, test | Magazyn sesji nie zapisuje też sesji zablokowanego konta. |
| `player-opaque-session-cookie` (link only) | invariant | *Derives from* zyskuje D-130. |
| *blocked account* (new; settlement row 4) | glossary term | Konto, które operator odciął od logowania i gry i które takie zostaje, aż je odblokuje; co innego niż adres zablokowany na 15 minut po pięciu nieudanych logowaniach (D-102). |

Unchanged after the search of the foundation: `account-session-authorization` (a blocked
account's session is a removed session, so its 401 is the existing one), D-101, D-102, D-109,
the part map. No environment fact was added (see the choices below).

## Checks

Final runs on the committed head `81cb7c6`, clean tree, rebuilt first:

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/account-storage.test.mjs` | 0 | 29 tests, 29 pass |
| `npm test -- tests/http.test.mjs` | 0 | 25 tests, 25 pass |
| `npm test -- tests/account-api.test.mjs` | 0 | 9 tests, 9 pass |
| `npm test -- tests/startup.test.mjs` | 0 | 12 tests, 12 pass |
| `npm test -- tests/transport.test.mjs` | 0 | 7 tests, 7 pass |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | 5 tests OK (both copies byte-identical) |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | 1 test OK |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/server src/browser/account-api.ts tests/account-storage.test.mjs tests/http.test.mjs tests/account-api.test.mjs` | 0 | |
| `node node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig --check` (same files) | 0 | |
| `node scripts/build.mjs --check` (both type checks) | 0 | |

### Failing runs of tests written first and of each invariant's test

All runs `npm test -- <file>` from the worktree root (it builds, then runs that one file).

| Test (file) | Invariant | Failing run | Why it failed | Passing run |
|---|---|---|---|---|
| "a version-1 database opens as version 2 …" (`tests/account-storage.test.mjs`) | `account-database-schema`, `account-schema-lifecycle` | exit 1, before the migration code (stubs only) | `1 !== 2`: the version-1 database was not moved | exit 0 |
| "a failing migration step leaves a version-1 database at version 1 …" (same file) | `account-database-schema` | exit 1, before the migration code | "Missing expected exception": no step ran | exit 0 |
| "blocking deletes every session of that account and no other, and unblocking brings none back" (same file) | `unblock-restores-no-session` | exit 1 with stubs (`'unknown' !== 'blocked'`); exit 1 again with the session deletion in `blockAccount` broken for a moment | the account's sessions stay after the block | exit 0 |
| "a session write for a blocked account stores nothing …" (same file) | `account-session-storage` | exit 1 with stubs; exit 1 again with the guard of `saveSession` broken for a moment | "Missing expected rejection: held" | exit 0 |
| two command tests (same file) | — | exit 1 with the empty entry point (`undefined !== true`; a usage error exiting 0) | | exit 0 |
| "no session of a blocked account authorizes lookup or logout, in any browser, also after unblocking" (`tests/http.test.mjs`) | `blocked-account-access`, `player-server-session`, `unblock-restores-no-session` | exit 1 after the database code, before the route code; exit 1 again with the session deletion broken | "a row past the guard: 200 !== 401" (authorization ignored the blocked state); with the deletion broken: "first browser: removed" | exit 0 |
| "a blocked account's correct password gets its own refusal …" (same file) | `blocked-account-access` | exit 1 after the database code, before the route code | "correct password: 503 !== 403" | exit 0 |
| "a block committed while the password is checked refuses that login as blocked …" (same file) | — | exit 1 with the account re-read removed for a moment | "blocked meanwhile" (503, not 403) | exit 0 |
| "logout destroys only this browser's session and clears the same host cookie" (same file, existing test now citing it) | `player-server-session` | exit 1 with `destroySession` broken for a moment | the record stayed after logout | exit 0 |
| "an error status is a refusal carrying the server's code and message …" (`tests/account-api.test.mjs`, one row added) | `account-client-outcomes` | exit 1 with the client's change stashed | `code: null` and the status message instead of `account-blocked` and the server's message | exit 0 |

Each break was made in the worktree and restored before the commit; the restored files match
the commits (`git diff` empty after each restore).

`unblock-restores-no-session`: the break that leaves the sessions after the block fails both
tests at their "removed" assertion, which stands before the after-unblock assertion; no break
was found that keeps the sessions hidden while blocked and brings them back at unblocking
without also failing that earlier assertion.

### Checks not run

- `npm test` without arguments — the orchestrator's run, as the handoff gives.
- `tests/quality/test_quality_invariants.py` (Ruff, ShellCheck, the repository-wide ESLint and
  Prettier runs) — not run; I ran ESLint and Prettier on every changed TS/JS file directly
  instead. The cycle record notes that the Ruff and ShellCheck cases need `.runs/quality-venv`,
  absent in this worktree; no Python or Bash file changed.
- `tests/deploy/test_account_storage.py` (cites `account-schema-lifecycle`, needs Docker) — not
  run; its wording still holds for the changed sentence.
- The manual journey of the acceptance criterion on the test server — the human's after
  deployment (D-75, D-12).
- A screenshot of the login form with the new message (`ui_check.md`) — unchecked: no screen file
  changed, and the foundation settles a manual check of the journey after deployment (D-75). In
  code, `src/browser/view/account-screen.ts:186` puts a refusal's message into the form's
  warning, the state "Odmowa serwera … pod formularzem w `warning`" of the styleguide's "States
  of shared controls"; `src/browser/view/app.ts:13` treats only a 401 as signed out, so the 403
  keeps the forms.

## Own-work check

- **Requirement most likely not met:** the acceptance criterion's "konta i sesje założone przed
  wdrożeniem nadal działają", at the level of the running application rather than of
  `AccountDatabase` alone.
- **Check:** a one-off script (scratchpad, not committed) wrote a version-1 database by hand —
  WAL, the version-1 schema of `6540e4c`, one account with a real Argon2id hash and one live
  session row in express-session's form — opened it through the real `openAccountRuntime` and
  `createApp`, and sent `GET /api/account` with the old session's signed cookie and
  `POST /api/session` with the old password.
- **Result:** exit 0; `GET /api/account` 200 with the old account, login 200, `user_version` 2,
  the account's row unchanged with `blocked = 0`.

## Reaches beyond the dispatch

- `definicja_mvp_loop2.md` (vault), lines 387–415, 1707–1717 and 1825–1838: the full approved
  entries of D-130, `blocked-account-access` and `player-server-session` (Based on, Rationale,
  Rejected, Verification), which the task quotes only in part; lines 149, 211–250, 611–615 and the
  list of headings: to see which projected decisions D-130 derives from and whether they are in
  the log. The handoff allows this selective search.
- The vault directory `Notes/Projects/(P) Loop/_zadania` (name of the task file only) and
  `.runs/task-cycles/blokada-konta/cycle.md` lines 1–13: the task source's file name for the
  decisions' *Origin*.
- Decisions D-05, D-13, D-15, D-17 and the list of decision headings: the form of a written
  projected decision and the search for "Where are player accounts and saved game states
  stored?" (not in the log).
- The-way's templates and rules the element skills name (`elements/common/way_of_working.md`,
  `rules.md`, the decision, invariant and glossary templates and skills, the-way's WAY-03 as the
  decision example, `product-guidelines/testing/SKILL.md` and the "Writing the file(s)" sections
  of both guideline templates), and `.the-way/task-cycle/change/ui_check.md`.
- Product files outside the named reading, each to check an effect of the change:
  `src/browser/view/app.ts`, `src/browser/view/account-screen.ts`, `src/server/configuration.ts`,
  `src/server/main.ts`, `src/server/measure-passwords.ts`, `src/server/account-policy.ts`,
  `Dockerfile`, `compose.yaml`, `scripts/test.py`, `scripts/build.mjs`, `tsconfig.server.json`,
  `tests/startup.test.mjs` (its unknown-schema case uses 99, still unknown),
  `tests/deploy/test_account_storage.py`, `tests/agent_workflow/test_loop2_deploy_skill.py`,
  `.claude/skills/loop2-deploy/references/setup_and_secrets.md`, and the docstring of
  `.the-way/elements/common/foundation_check.py` (how a test cites an invariant).

## Questions for the orchestrator (none blocks; each with the answer I recommend)

1. **D-130's *Relations*.** The approved entry reads "derives from the projected decisions 'Who
   can create and use a player account?' and 'Where are player accounts and saved game states
   stored?'"; the plan assigns both to task 16, and neither is in the log. I wrote
   `Relations: none`, since `TODO` may not reach the main branch. Recommended: keep `none`, and
   carry into task 16's cycle that writing those two decisions adds `derives from` to D-130 and
   adds the decision "Who can create and use a player account?" to the *Derives from* of
   `blocked-account-access` (today `D-129 · D-131`).
2. **D-101's first sentence overlaps D-130** (the cookie's opaque random identifier, host scope,
   Secure, HttpOnly). I left D-101 as it is rather than moving the clause, which would rewrite the
   binding sentence of an approved decision beyond what the task carries. Recommended: leave it;
   the two agree, and a later change of either names the other through the search of the
   foundation.
3. **The Polish word „zablokowany” in `guidelines/testing.md`.** The existing row of D-102 says
   „zablokowany adres e-mail odmawia także poprawnego hasła” for the 15-minute email lock, while
   the glossary's *blocked account* keeps "locked" for that lock. My new rows say „konto
   zablokowane przez operatora” to keep the two apart; renaming the Polish word of the old row
   is the human's choice of a word (the glossary template's renaming rule). Recommended: leave
   the old row; if the human wants it, rename it in a later change of the testing guidelines.

## Choices made (way rejected, cost if wrong)

- **Blocked state:** `blocked INTEGER NOT NULL DEFAULT 0 CHECK (blocked IN (0, 1))` added by
  `ALTER TABLE` as step 2 of `schemaSteps` in `src/server/database.ts`; `readAccount` refuses a
  stored value other than 0 or 1. Rejected: a timestamp or reason of the block (a non-goal of the
  spec). Cost: a later need for when or why is one more step.
- **Opening:** one `transaction()` helper for the schema and both new operations; any
  `user_version` outside 0…current, negative included, is "Unsupported account database schema".
- **Guarded write:** `INSERT … SELECT … WHERE NOT EXISTS (blocked account) ON CONFLICT …`; a
  refused write keeps the existing message "Session cannot be replaced", as the spec gives.
  Rejected: a distinct message, which would need a second query after the write. Cost: the
  message does not tell a blocked account from a replaced identity; nothing shows it outside
  the server.
- **Re-read after the password check** (the spec leaves it to the maker): taken. A block that
  commits while the password is checked now gets 403 `account-blocked` and `release()`, instead
  of 503 after `succeed()`, which removes the history-clearing the spec review noted. Cost: one
  indexed read per correct password. The race left between the re-read and the session write
  still ends in 503 with no session (the guard). Its test waits for the in-flight admission and
  relies on the password work outlasting a 5 ms poll, as the existing disconnected-login test
  does: a machine on which Argon2 verification finishes within one poll would turn it red.
- **The command:** verbs `block` and `unblock`, English output naming the normalized address,
  exit 0 for blocked, already blocked, unblocked and not blocked; 1 database failure, 2 usage or
  an address without a valid form, 3 `LOOP2_DATABASE_PATH` unset, empty, `:memory:` or no
  existing file, 4 no such account. A missing file is refused by `statSync(...).isFile()` before
  opening. Rejected: an open mode that does not create, through an SQLite URI, since I did not
  verify that `node:sqlite` takes one. Cost: if the file is removed between the check and the
  open, the command creates an empty database at the current version; only the human removes
  that file. The deploy skill lists the exit codes.
- **Test placement:** the command tests in `tests/account-storage.test.mjs`, so the part map
  needs no entry. The migration tests write the version-1 schema of `6540e4c` out by hand.
- **The changed existing test:** "schema reopen preserves accounts and sessions and rejects a
  newer version without rewriting it" now writes version 3 instead of 2, since version 2 is known
  (spec, *Constraints*). This is a changed invariant test (`account-database-schema`) to name in
  the request, as are the two existing tests that now cite an invariant (the logout test,
  `player-server-session`) and the row added to the client's refusal test
  (`account-client-outcomes`).
- **No new environment fact.** D-112's reasoning that a block and a login's session write cannot
  interleave rests on SQLite allowing one write transaction at a time across connections and
  processes. I left *Based on* at `node-sqlite-database` and added no fact. Rejected: a new fact
  with a pinned source of SQLite's locking (needs an outside read). Cost if wrong: that reasoning
  rests on SQLite's documented locking with no cited source; the tests exercise it on real
  files across processes.
- **Part of the new invariants:** `account-server`, the part whose change can make them false.
  The definition wrote `every` when the map had no parts.
- **D-112's first binding sentence is long**, so that the entry keeps to three sentences while it
  takes in the second connection, the ordered steps and their rule for later tasks.

## Mismatches with the handoff

- The handoff's example focused command `python -B scripts/test.py <test file>` would not build
  when run outside npm: `scripts/test.py:17` reads `os.environ["npm_execpath"]` (seen in the code,
  not run). I used `npm test -- <file>`, which runs the same script for one file.

## Problems observed

- None in the product beyond the above. The first prettier check of the two test files failed
  and was fixed by `prettier --write` before the first commit.
