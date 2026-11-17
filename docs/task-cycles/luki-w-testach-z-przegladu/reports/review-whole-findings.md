# Findings of the review of the whole change (`reports/review-whole-report.md`, FAIL f742a3fb), cut from the report in the reviewer's words

The blocking finding first, then the Minor findings within the task (the reviewer marks none outside the task).

### Critical

none

### Important

#### I-1. `account-save-durable-storage` reads `test`, and its one citing case does not hold its sentence, which D-17 says it cannot (blocking)

- **Place:** `foundations/invariants.md:688-694` (*Method* `review` → `test`, commit `84d2d59a`); `tests/deploy/test_account_storage.py:97-150` (the case `test_replaced_container_keeps_accounts_and_sessions`, now `# invariant: account-save-durable-storage`, and its docstring at `:20-24`, commit `60bd5bab`); `foundations/decisions.md:1798` (D-17 *Verification*, unchanged).
- **What is wrong:** the invariant's sentence is "Replacing the application container preserves the SQLite database of player accounts and saved game states." D-17's *Verification* says: "Checks of accounts and sessions alone do not establish preservation of saved game states and cannot clear account-save-durable-storage." The only case citing the invariant registers an account, reads it through its session, replaces the container and reads the account and signs in again; it never writes or reads a saved game state. The docstring the slice wrote says so itself ("it shows the database file that holds them surviving the replacement through an account and its session, and no saved game state"). So after the change the foundation holds two statements that contradict each other: the invariant counts as checked by a test (and `foundation_check.py` counts the citation as covering it), and D-17 says that very test cannot clear it.
- **Why it matters:** this is the defect the task exists to remove — its *Need*: "Fundament zawyża to, co sprawdzono". A reader of the invariant trusts a test for the saved game state, which no test shows; a change that put the saved game state in another file or table outside the volume would pass this case. By section 3 of the method (WAY-263), a change whose foundation entry it changes says more than its files do is Important.
- **Mandated by the task:** To do 11 names this citation word for word ("znacznik z `tests/deploy/test_account_storage.py`, przypadek `test_replaced_container_keeps_accounts_and_sessions`, przepięty z `account-schema-lifecycle`"), and also says "metoda `test` i znaczniki w testach, które je sprawdzają" — in tests that check them. The citation is made as asked; the defect is that the cited test does not yet check the sentence.
- **Remedy within the task (recommended):** extend the same case to save one game state before the replacement (`PUT /api/saved-game` with `version`, `basedOn: 0` and a small `game`, through the case's request probe, which today sends only GET and POST and needs a method field) and read it back after the replacement (`GET /api/saved-game`, the same `version`, `revision` 1 and `game`), seen failing once with the database path of `compose.yaml` moved outside the volume as slice 1 did; then drop the "no saved game state" clause of the docstring. The invariant and D-17 then agree with no change of either. The other way — rewording D-17 — would make the foundation drop a check it rightly asks for.
- **Evidence:** the three passages quoted above; executor 1's own concern (`reports/executor-1-report.md`, section "Concern"), which recommends the same remedy.
- **Comes from:** spans the plan's *Foundation entries* (commit `84d2d59a`, row "account-save-durable-storage — *Method* → `test`") and slice 1 (commit `60bd5bab`); a gap of the plan, which routed the concern to no slice.

### Minor

Each is within the task unless it says otherwise.

#### M-1. The comment states 750 ms where the measurement gives 740 ms (slice 17 review, Minor 1; graded here Minor, within the task)

- **Place:** `tests/account-mail.test.mjs:361`.
- **Own words:** the comment that gives the reason of the new 1.5 s deadline says the way to the held answer took "up to 750 ms with four spinning processes per CPU"; the executor's table and the commit message say 740 ms. The reason of a changed limit should carry the measured number.

#### M-2. The comment of the changed deadline holds one computer's timings (slice 17 review, Minor 2; Minor, within the task)

- **Place:** `tests/account-mail.test.mjs:357-362`.
- **Own words:** the six lines hold timings of this computer (130 ms idle, up to 750 ms under load) and a fact of smtp-server 3.21.1 (it greets 100 ms after it accepts). D-82 and `guidelines/testing.md:101-103` say a comment that carries information the code needs moves it to the foundation, and a comment without such information is not written. The timings age with the computer and the library version; the library fact is the kind of statement an environment fact keeps with its source and version. Minor: it sets no expected value and misleads no reader about behaviour.

#### M-3. smtp-server's reverse DNS lookup can still use up the whole new deadline (slice 17 review, Minor 3; Minor, within the task)

- **Place:** `tests/account-mail.test.mjs:141-187` (the test's `SMTPServer` options, no `disableReverseLookup`) and `:365` (`deadline: 1500`).
- **Own words:** before it greets, smtp-server waits up to 1500 ms for `dns.reverse` of the client's address, after its 100 ms delay; on a computer whose resolver does not answer a PTR query for 127.0.0.1 the way to the held answer is at least 1600 ms, past the new deadline, and the case would fail on the same precondition every run. Not a regression (with 300 ms it failed there too); `disableReverseLookup: true` on the test's server would remove the query from every case of the file. A follow-up for the human to weigh.

#### M-4. The Docker gate's question rests on an undocumented behaviour of Docker Desktop that the foundation does not record (slice 22, commit `f742a3fb`)

- **Place:** `scripts/docker_gate.py:10-15` (module docstring) and `:82-94` (`daemon_answers`); `tests/quality/docker_standin.py:37-48` (`cached_version`).
- **Own words:** the gate now asks `docker system df` because Docker Desktop in Resource Saver answers `docker version` from a cache. That behaviour stands only in the executor's observation of one computer (backend log lines `apicache] cache << GET /v1.55/version`) and in this docstring; Docker's documentation names no command, and no environment fact holds it. A later Docker Desktop that caches `/system/df` would bring back the old behaviour with no signal, and `system df` on a very large store could pass `ANSWER_LIMIT` (30 s) and lead to a skip. Recommended: an environment fact through `the-way-record-environment-fact`, from the Resource Saver page and the observed version, as executor 22 suggested. Minor: the change complies with D-390, D-391, D-392 and D-406 (see Scrutiny 2) and was shown to protect what it says (my break run below).

#### M-5. The check of `character-team` refuses a loop whose key and map run name two characters of the team, which the invariant does not say (slice 12, commit `de7774b5`)

- **Place:** `tests/invariants/test_character_team.py:136-137` (the altered document "a loop's map run carrying another character of the team") and `:273-275` (`membership_errors` flagging `key != str(carried)`).
- **Own words:** `character-team` says "Every character belongs to exactly one team." A loop under character 1 whose map run carries character 3 names two characters, each of which still belongs to one team; that the loop stands under the id its map run carries is the shape of D-241 ("holds its earning loops … by character number") and D-56, not this invariant. The case passes today because the load refuses such a document, but a later change of the load's shape rule would fail a test labelled `character-team` for a reason outside its sentence. The executor named the reading as unsettled. Recommended: drop that one altered document and the key check from this invariant's test, or cite the decision that holds them.

#### M-6. D-49 names as a violation "a second test that starts the server without `LOOP2_LISTEN_HOST` and `LOOP2_LISTEN_PORT`", and the change adds a second such case (slice 14, commit `dbba1499`)

- **Place:** `tests/invariants/test_account_server_default_address.py:100-123`; `foundations/decisions.md:1059` ("The one exception is a single test of the default address") and `:1066` (violates: "a second test that starts the server without …").
- **Own words:** To do 9 and the invariant `account-server-default-address` ("including wholly unconfigured non-production and fully configured valid startup") ask for this case, and read as one test file of two cases it complies with D-49; read as cases, it violates it. The harm D-49 guards against is small here, since the case passes whether 127.0.0.1:3000 is free or not. Recommended for the return step: reword D-49 through `the-way-record-decision` so that "the single test of the default address" holds a case for each start the invariant names.

#### M-7. "Every TS/JS file of the parts in D-29's scope" now literally takes in every script of agent-workflow (slice 15, commits `54909922`, `8ac7ca4e`)

- **Place:** `guidelines/coding.md:37-40`; `tests/quality/test_source_tool_scope.py:1-4`.
- **Own words:** D-29's *Scope* now names agent-workflow, so "Wzorce plików `eslint.config.mjs` obejmują każdy plik TS/JS części z zakresu D-29" read literally covers the scene-art scripts too; the next sentence ("nowy skrypt gdzie indziej w agent-workflow nie") corrects it, and the test's docstring has the same shape. Recommended: "każdy plik TS/JS pięciu części, które D-29 wymienia, i każdy plik JavaScript z trzech katalogów agent-workflow". Minor: the following sentence prevents the wrong reading.

#### M-8. The case that holds the content clauses of `sprite-credits` carries no citation of it (slice 4, commit `51618a45`)

- **Place:** `tests/view/icons.test.mjs:350` (the case "the section's last two lines credit the packs of the dust and of the wolf: what each is for, its title, author, page and licence …"); the new citing cases at `:421` and `:434`.
- **Own words:** `sprite-credits` asks for a line that names what the pack is for, its title, its author, its page with a link, its licence with a link and how the files differ; the two cases that now cite it check only that the pack's title stands in `„…”`. The existing case at `:350` pins every credit line's whole text, its links and the count of lines, so the clauses are tested, but not under the invariant's citation. Adding `// invariant: sprite-credits` above `:350` would make the invariant's test reach its whole sentence.

#### M-9. The same driver helpers written twice in two invariant tests (structure; slice 12)

- **Place:** `tests/invariants/test_character_team.py:163-171` and `tests/invariants/test_program_closed_lists.py:148-185` (`sibling`, and a saved document made through `withSaveTime`, `savedGame` and a JSON round trip, with `loadSavedGame`).
- **Own words:** both JavaScript drivers gained the same import of sibling modules and the same way to make a saved document; `tests/invariants/program_fixture.py` already holds shared driver pieces (`KNOWING_GAME_JS`, `HELD_PROGRAMS_JS`). The files grew 184 → 397 and 305 → 432 lines. `guidelines/coding.md` holds no rule of size, so this is Minor (WAY-363).
