# Report — executor of slice 8 (account, session and attempt decisions over HTTP)

**Status:** done with concerns

The concerns:

1. **The slice reached far beyond its *Change*.** D-97 is mostly a decision of the browser, and
   D-98, D-99 and D-138 have browser sentences. So lines went into seven test files the slice does
   not name. Four of them are of `browser-view`, and four of them are in other slices' *Change*:
   - `tests/view/game-saver.test.mjs` and `tests/view/previous-save.test.mjs` (slice 12);
   - `tests/view/account-screen.test.mjs` (slice 13);
   - `tests/view/menu-bar.test.mjs` (slice 17).

   Lines were added only for this slice's decisions, as item 5 allows. Later slices that change
   these files will find these lines standing.
2. **Several changed files were read only in part** (see *Unread material*). The method asks every
   changed file to be read whole. I read every case I judged, with the helpers its assertions use.
   I found the candidates among the other cases by a search of the content terms (own-work check).
   Each change is one comment line.
3. **D-103's field names no invariant for its password gate.** `password-operation-gate` derives
   from D-103 (and D-113) and states the gate. D-103's `invariants:` does not name it, and the plan
   keeps `invariants:` as it stands. Following R1, the gate's part got no line. So a reader of D-103
   now finds that part neither in `invariants:`, nor in `tests:`, nor in the pair. See *Remarks for
   the human*.

## Commits

Range `174a3eff750f5c5c88ada0d7bb74b91c73060d95..199cd6e0`, author address `mariusznn@gmail.com`
(`git log -1 --format=%ae` after the commits):

- `6c42d73c` test: :white_check_mark: mark the tests that hold the sentences of the decisions on public files, logout, passwords, addresses, login messages, sessions, attempt limits, the password gate, password hashing, request identity, blocking and the blocked login with lines decision:
- `199cd6e0` docs: :memo: name the tests of D-86, D-97, D-98, D-99, D-100, D-101, D-102, D-103, D-106, D-109, D-137, D-138 and D-139, drop the pair of D-102 and D-139, which their invariants and tests hold whole, and keep or add a pair for D-97, D-98, D-99, D-100, D-103, D-109 and D-137 only for the part no invariant and no test holds

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `foundations/decisions.md` | 78 | 28 |
| `tests/http.test.mjs` | 51 | 0 |
| `tests/passwords.test.mjs` | 1 | 0 |
| `tests/account-storage.test.mjs` (beyond *Change*) | 11 | 0 |
| `tests/transport.test.mjs` (beyond *Change*) | 2 | 0 |
| `tests/password-measurement.test.mjs` (beyond *Change*) | 1 | 0 |
| `tests/view/account-screen.test.mjs` (beyond *Change*) | 17 | 0 |
| `tests/view/game-saver.test.mjs` (beyond *Change*) | 4 | 0 |
| `tests/view/menu-bar.test.mjs` (beyond *Change*) | 2 | 0 |
| `tests/view/previous-save.test.mjs` (beyond *Change*) | 1 | 0 |

All 90 lines added to tests are lines `decision:` (`git diff -U0 174a3eff -- tests`, every `+`
line counted: 90 with `decision: D-`, 0 without). Nothing else in a test changed. No mention of a
decision number was removed. Comments such as `// D-97 and D-101: …`, `// D-109: …`, `// D-98. …`,
`// D-99, D-100. …` and `// D-99: the address is normalized …` stay where they were, with the new
line beside them.

Each line stands where the file's neighbours put such lines:
- in `tests/http.test.mjs` and `tests/transport.test.mjs`, after the case's lines `invariant:`
  inside its body;
- in the other files, as the first line of the case's body, as slice 7 put them in
  `tests/account-storage.test.mjs`.

### Test files beyond the slice's *Change* (item 5), one line each

- `tests/account-storage.test.mjs` (account-server): uniqueness of the stored address (D-99), the store's refusal of expired sessions and its delayed renewals (D-101), the block and the owner's command (D-137), the reset in one operation (D-138).
- `tests/transport.test.mjs` (account-server): renewal by a static-file request, and invalid cookies authorizing nothing (D-101).
- `tests/password-measurement.test.mjs` (build-tools): the explicit Argon2id profile the measurement reads (D-106).
- `tests/view/account-screen.test.mjs` (browser-view): logout (D-97), the browser's password rules (D-98), no dot or ASCII restriction in the browser (D-99), the login form after a password reset (D-138).
- `tests/view/menu-bar.test.mjs` (browser-view): „Wylogowywanie…” while logout waits (D-97).
- `tests/view/game-saver.test.mjs` (browser-view): the save before logout and its outcomes (D-97).
- `tests/view/previous-save.test.mjs` (browser-view): a late answer that builds no game after logout (D-97).

For the four `browser-view` files I read `guidelines/styleguide-browser-view.md` (in part; see
*Unread material*). For the others, the guidelines of their parts are `guidelines/coding.md` and
`guidelines/testing.md`, both read whole. Each file was run on its own (below).

## Checks run

| Command | Exit | What it showed |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (first run, working tree) | 1 | `1 error`: `foundations/decisions.md:2214: the entry lacks *Origin*, *Rationale*`. My edit of D-109's field had dropped the lines `- **Origin:** none` and the start of `*Rationale:*`. They were restored word for word. |
| `python -B .the-way/elements/common/foundation_check.py` (after the fix, and again after the last edit of D-99's field) | 0, 0 | `0 errors`. None of D-86, D-97, D-98, D-99, D-100, D-101, D-102, D-103, D-106, D-107, D-109, D-137, D-138, D-139 is listed as `held by nothing`. The 11 listed are D-181, D-182, D-184, D-185, D-186, D-188, D-215, D-216, D-217, D-218 and D-220, none of them in this slice. The check also verifies every quotation of a line `decision:`, and it passed. |
| `npm test -- tests/http.test.mjs` | 0 | 95 tests, 95 pass, 0 fail, 0 skipped |
| `npm test -- tests/passwords.test.mjs` | 0 | 2 tests, 2 pass |
| `npm test -- tests/transport.test.mjs` | 0 | 12 tests, 12 pass |
| `npm test -- tests/account-storage.test.mjs` | 0 | 82 tests, 82 pass |
| `npm test -- tests/password-measurement.test.mjs` | 0 | 12 tests, 12 pass |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 131 tests, 131 pass |
| `npm test -- tests/view/menu-bar.test.mjs` | 0 | 29 tests, 29 pass (run after the last line in this file was added) |
| `npm test -- tests/view/game-saver.test.mjs` | 0 | 20 tests, 20 pass |
| `npm test -- tests/view/previous-save.test.mjs` | 0 | 44 tests, 44 pass |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` on the nine changed `.mjs` files (run twice, the second time after the last edit) | 0, 0 | all use Prettier code style |
| `git diff -U0 174a3eff -- foundations/decisions.md`, read | — | 13 hunks, at D-86, D-97, D-98, D-99, D-100, D-101, D-102, D-103, D-106, D-109, D-137, D-138 and D-139. Every changed line is the line `- **Verification:**` or one of its continuation or pair lines. D-107 is untouched. In D-86 the field `invariants: public-file-access` got a full stop before `tests:`; the identifier is unchanged. |

**Not run:**

- The full gate (`npm test` with no file). It is the cycle's run, not the slice's (WAY-160).
- `test_ruff_source_rules` and `test_shellcheck_source_rules`. They fail at the base with
  `FileNotFoundError`, as the handoff says, and no file they read was changed.

No test was written and no invariant changed, so section 2 of the method has no failing first run
to record.

## Own-work check (section 3)

**Requirement most likely missed:** that every test holding a sentence of the slice's decisions
carries a line, also in files the plan did not name.

**Check:** a script, `.runs/executor-8/holders.py` (removed). It listed every case of every tracked
`.mjs` test file that holds one of 23 content terms of the decisions:
- the sentences of logout, the login and registration messages, the blocked message and the limit's message;
- `blockAccount`, `runBlockCommand`, `argon2id`, `m=65536`, `keyCapacity`, the 30-day lifetime, `MemoryStore`;
- the password sentences, `invalid-email`, `no-store`, `set-cookie`, `destroySession` and `touch`.

For each case it gave the lines `decision:` of this slice's decisions that the case carries.

**Result:** 124 cases, of which 75 carried no slice line. I judged each of the 75 again:
- **One got a line:** `tests/view/menu-bar.test.mjs` „while the page says the logout is unavailable…”, which asserts „Wylogowywanie…”.
- **The other 74 hold no sentence of these decisions.** They hit by chance (`touch` in other words, „Za dużo prób” in a client test that says the wording is not what it tests), hold the decision of another slice, or hold a part an invariant derived from the decision already states (R1 and slice 5's C2). The judged ones are named under *Choices*.

**Second risk:** a quotation that does not start a binding sentence or does not stand in it.
**Check:** the foundation check, which verifies each quotation. It exited 0 with `0 errors`.

## Reaches beyond the dispatch

- **`foundations/invariants.md`, entries `password-operation-gate` and `account-session-storage`.** I read them to learn what they derive from. `password-operation-gate` derives from D-103 and D-113 and states the gate. `account-session-storage` derives from D-112 and D-115, not D-101, so its tests got D-101 lines (slice 5's C3).
- **The plan's later slices (`.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md:186-206,236-246`).** I searched them for `account-screen`, `menu-bar` and `game-saver`, to learn whether another slice judges D-97's browser tests. None does: those slices change these files for other decisions.
- **Reports of slices 5 and 7.** I read them for the precedents of judging (C1 "a precondition is not a hold", C2, C3, C4 on the length of a quotation) and of reading the styleguide.
- **Other test files, read for item 5, beyond those changed:**
  - `tests/account-api.test.mjs:440-520`, the client hands on whatever message it gets: no D-139 or D-100 line;
  - `tests/startup.test.mjs:470-515`, the dummy hash;
  - `tests/view/clock.test.mjs` (case list and header);
  - `tests/view/password-reset.test.mjs` (case list);
  - `tests/view/uncaught-failure.test.mjs` (the D-97 mentions, all inside D-323's lines).
- **Searched by grep:** `tests/agent_workflow`, `tests/deploy`, `tests/invariants` for the block command, and nothing was found.

## Working copies

**Directory:** `.runs/executor-8/`. It held:
- two one-off scripts, `holders.py` and `lines.py`;
- their outputs `holders.txt`, `unmarked.txt` and `lines.txt`;
- the output of the foundation check;
- the output of each focused test run and the list of exit codes.

What the report needs of them stands in this report. The directory was removed before return.

## Unread material

- **`.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md:16-73` and `task-frozen.md:30-42,99-104`.** I read them as the copies in the handoff, and read `task-frozen.md` whole. Of `plan.md` I read lines 186-206 and 236-246 (see *Reaches*).
- **`.the-way/elements/decisions/template.md`.** I read lines 105-264, which cover the three ranges the *Read* names.
- **`guidelines/styleguide-browser-view.md`.** I read lines 1-554. Lines 555-986 I did not read: the screen Mapy, the program editor, the scene, the camp, the chronicle, the end-of-run window, mockups and the plan of a UI change. I checked them by their headings and by a search for "test" and "komentarz", which found no rule on comments or lines in test files.
- **`tests/account-storage.test.mjs` (changed, 3243 lines).** I read lines 1-175, 1646-1770, 1975-2262, 2660-2810 and 2890-3000, and the list of every case with its lines `invariant:`. The rest I did not read.
- **`tests/transport.test.mjs` (changed, 1312 lines).** I read lines 150-220, 415-440 and 514-900, and the list of every case. The rest I did not read.
- **`tests/view/account-screen.test.mjs` (changed, 6186 lines).** I read lines 1-60, 433-732, 935-1060, 1340-1400, 1518-1585, 3300-3467, 4245-4266, 5428-5490, 5882-5934 and 6066-6105, and the list of every case. The rest I did not read.
- **`tests/view/menu-bar.test.mjs` (changed).** I read lines 560-716. The rest I did not read.
- **`tests/view/game-saver.test.mjs` (changed).** I read lines 1-20 and 590-741, and the list of every case. The rest I did not read.
- **`tests/view/previous-save.test.mjs` (changed).** I read lines 1330-1434. The rest I did not read.
- **`tests/http.test.mjs`, `tests/passwords.test.mjs`, `tests/password-measurement.test.mjs`, the 14 decisions, D-73, D-82, the 14 invariants of the *Read*, `guidelines/testing.md`, `guidelines/coding.md`, `foundations/part_map.md`, `foundations/glossary.md` and `.the-way/elements/decisions/skill/SKILL.md`.** Read whole.

## Searches not found or unclear

- **A test of the 10,000 live keys of each table, of email keys kept as digests, of bounded histories and of their loss at a restart (D-103 sentence 1).** Not found. `keyCapacity` is tried only with 2, so this part stays in D-103's pair.
- **A test that the password gate's cap was chosen by measurement (D-103).** Not found as a test of the product. `tests/password-measurement.test.mjs` checks the tool that measures, not the choice, so this part stays in the pair.
- **A test of a new password equal to the account's old one (D-98).** Not found.
- **A test that no password field carries a `maxlength` (D-98).** Not found. The case at `tests/view/account-screen.test.mjs:5428` checks `noValidate` only.
- **A test that the server accepts an address with letters outside ASCII (D-99).** Not found. Only the browser's rules are tested with „ą ę@ł”.
- **A test of a blocked account's login whose right password a reset replaced during its check (D-100).** Not found.
- **A test that a late account answer after logout cannot remount the game (D-97).** Only the reset's late answer is tested (`tests/view/previous-save.test.mjs:1339`).
- **A test that the two logout sentences stand in `warning` (D-97).** Not found. `saveLine`, `noticeTexts` and the saver's `sentenceOf` read only the text.
- **A test that the shared button draws „Wyloguj” (D-97).** Not found.
- **A test of "in one transaction" of the block (D-137).** Not found. The tests show the state after a block, not its atomicity.
- **A test that runs the command in the container, or of the `loop2-deploy` skill describing it (D-137).** Not found.
- **A test that account answers hold no secret, such as a session key or the mail password (D-109).** Not found. Stacks and database errors are covered by tests that refuse any text of the synthetic error.
- **Unclear: whether D-102's "A limited player sees …" needs a browser test.** The browser shows whatever message the server sends (`tests/account-api.test.mjs:446` says so). So I judged the server's tests to hold it.

## Choices made (way rejected, cost if wrong)

- **C1 — slice 5's precedents followed.**
  - *Chosen:*
    - a precondition or a shared helper is no hold;
    - a part an invariant derived from the decision states gets no line, also at tests that are not that invariant's (R1, slice 5's C2);
    - a test of an invariant derived from another decision gets a line for a part that decision's own invariant does not state (C3).
  - *Left without lines on that ground:*
    - `tests/http.test.mjs:175` (traversal; `public-file-access`);
    - the attempt-limit cases `:1611`-`:1745` (`account-attempt-limits`, `account-attempt-tracking`);
    - `:1779`, `:3580` (sessions ended by a block or a reset; `player-server-session`, `unblock-restores-no-session`, `password-reset-ends-sessions`);
    - `:3640`, `:3700` (the reset clearing a lock; `account-attempt-limits`);
    - `tests/passwords.test.mjs:5` (the gate; `password-operation-gate`);
    - `tests/account-storage.test.mjs:1839` and `tests/http.test.mjs:2622` (a block stopping a link; held by the cases at `:1649` and `:2905`, and their case is the reset or the message under way);
    - `tests/view/clock.test.mjs:78-104` (the clock's own dispose; logout's disposal is held by `account-screen` 972 and 1044);
    - `tests/view/game-saver.test.mjs:662`, `:684`, `:719` (D-207 and the saver's dispose);
    - `tests/view/account-screen.test.mjs:666`, `:5900` (the card's local check, ASCII passwords, no code-point or exactness rule);
    - `tests/view/account-screen.test.mjs:3421` (a later save of the logout's page; D-211);
    - `tests/view/previous-save.test.mjs:1371`, `:1398`, `:1422` (D-402's order of answers);
    - `tests/http.test.mjs:4946` (a log-line case whose body check is incidental);
    - `tests/transport.test.mjs:514` (it does not require a renewal).
  - *Rejected way:* a line at every test that would fail if the sentence broke. It would add a few dozen lines, for example a D-109 line at every case whose helper asserts `no-store`.
  - *Cost if wrong:* a reviewer asks for those lines. The fields would not change.
- **C2 — the account-storage case of the block (`:1979`) got a D-137 line** although its invariant `unblock-restores-no-session` states the sessions' part. The line is for the mark: "marks the account blocked", "clears the account's blocked mark". No invariant states the mark itself. *Cost if wrong:* one line to drop.
- **C3 — D-106 sentence 2 split.** The tests hold "Its cost parameters are set explicitly": the profile `m=65536,p=1,t=3` differs from the package's default parallelism of 4, so the defaults would fail them. The invariant `player-argon2-deployment-check` holds "after measuring … in the intended Mikrus container image". So D-106 is held whole and carries no pair. *Cost if wrong:* if "measuring" is not counted as held by a review invariant, D-106 needs a pair for it.
- **C4 — quotations that run past what the test holds.** A quotation must begin at the start of a sentence, so a test that holds a clause deep in a long sentence quotes up to that clause. Examples:
  - D-109's privilege clause at `tests/http.test.mjs:4453`;
  - D-98's browser clause at `tests/view/account-screen.test.mjs:681`, which also quotes "is never compared with the account's old password", a clause nothing holds.

  The clause `tests:` of each field says in words what is held. *Rejected:* stopping at the first words of the sentence, which would point at the wrong clause.
- **C5 — D-109's pair added** for "secret" alone, since no test checks that an answer holds no session key or mail password (R2).

## The row of each decision (item 6)

Lines are those of the case's `test(` at `199cd6e0`.

### D-86

- **Tests, in part, sentence 1** ("Every visitor may retrieve the built game's files from its public directory"): `tests/http.test.mjs:123` „serves the built HTML and JavaScript from another working directory”.
- **Invariants:** `public-file-access` holds "and no file outside it" and sentence 2 whole.
- **Nothing holds:** none.
- **Verification became:** `tests:` added. It had no pair.

### D-97

- **Tests, sentence 1** (whole):
  - `tests/view/account-screen.test.mjs:435` „until the server names an account…” (in the menu „Konto”)
  - `tests/view/account-screen.test.mjs:972` „a confirmed logout or an expired session removes the game…”
  - `tests/view/account-screen.test.mjs:3343` „„Wyloguj” saves first and goes on, stays or ends…”
  - `tests/view/account-screen.test.mjs:3408` „a tab that stopped saving as outdated logs out without a save…”
  - `tests/view/account-screen.test.mjs:4259` „„Wyloguj” on the screen of a map run going on saves it as it goes…”
  - `tests/view/menu-bar.test.mjs:620` „while the page's logout waits „Wyloguj” reads Wylogowywanie…”
  - `tests/view/menu-bar.test.mjs:660` „while the page says the logout is unavailable…”
  - `tests/view/game-saver.test.mjs:593` „before logout the saver waits for the request in flight…”
  - `tests/view/game-saver.test.mjs:706` „a saver stopped as outdated reports so before logout…”
  - `tests/http.test.mjs:594` „logout destroys only this browser's session…”
- **Tests, sentence 2** (in part):
  - `tests/view/account-screen.test.mjs:3343`
  - `tests/view/account-screen.test.mjs:3408`
  - `tests/view/game-saver.test.mjs:616` „before logout a refusal is reported for logout to go on…”
  - `tests/view/game-saver.test.mjs:636` „a failed save before logout asks to log out again…”
- **Tests, sentence 3** (in part):
  - `tests/view/account-screen.test.mjs:972`
  - `tests/view/account-screen.test.mjs:1011` „a logout whose outcome is uncertain keeps the game…”
  - `tests/view/account-screen.test.mjs:1044` „signing in and out again and again keeps at most one clock running”
  - `tests/view/account-screen.test.mjs:4259`
  - `tests/view/previous-save.test.mjs:1339` „a reset confirmed while a logout waits is sent…”
- **Invariants:** none.
- **Nothing holds:**
  - "shared" (the button drawn by the shared control);
  - the role `warning` of both sentences;
  - stale account answers other than the reset's.
- **Verification became:** `tests:` added, pair rewritten.

### D-98

- **Tests, sentence 1** (whole):
  - `tests/http.test.mjs:1006` „passwords count 12 to 128 Unicode code points…”
  - `tests/http.test.mjs:848` „registration stores an Argon2id hash of the exact password…”
  - `tests/http.test.mjs:3347` „a working link sets the exact password once…”
- **Tests, sentence 2** (in part):
  - `tests/http.test.mjs:1006`
  - `tests/http.test.mjs:1564` „the password rules of a new password are those of registration…”
  - `tests/http.test.mjs:3385` „the password rules come before the link…”
  - `tests/view/account-screen.test.mjs:681` „registration problems follow the server's rules, counting a password in code points”
  - `tests/view/account-screen.test.mjs:940` „the address rule and the password rules each give registration's result alone”
  - `tests/view/account-screen.test.mjs:1526` „a password the server would refuse sends nothing…”
  - `tests/view/account-screen.test.mjs:6086` „a new password the server would refuse sends nothing…”
- **Invariants:** none.
- **Nothing holds:**
  - "is never compared with the account's old password";
  - "without making UTF-16 field limits authoritative".
- **Verification became:** `tests:` added, pair rewritten.

### D-99

- **Tests, sentence 1** (whole):
  - `tests/http.test.mjs:966` „one normalized address holds one account…”
  - `tests/http.test.mjs:1068` „malformed fields and out-of-shape credentials are refused…”
  - `tests/http.test.mjs:848`
  - `tests/http.test.mjs:1564`
  - `tests/http.test.mjs:3012` „an address not written as name@domain is refused…”
  - `tests/http.test.mjs:3060` „a request needs no session, names only the account…”
  - `tests/account-storage.test.mjs:158` „two connections cannot insert the same normalized email…”
  - `tests/account-storage.test.mjs:2727` „the owner's command blocks and unblocks by address…”
- **Tests, sentence 2** (in part):
  - `tests/http.test.mjs:1068` (no dot)
  - `tests/view/account-screen.test.mjs:681` (no dot, no ASCII, in the browser's rules)
- **Invariants:** none.
- **Nothing holds:**
  - no ASCII and no DNS restriction at the server;
  - "confirmation establishes whether the address is real", which is a statement of purpose.
- **Verification became:** `tests:` added, pair rewritten.

### D-100

- **Tests, sentence 1** (whole): `tests/http.test.mjs:966`.
- **Tests, sentence 2** (in part):
  - `tests/http.test.mjs:1173` „a known address with a wrong password and an unknown address fail login identically”
  - `tests/http.test.mjs:1068`
  - `tests/http.test.mjs:1868` „a blocked account's correct password gets its own refusal…”
  - `tests/http.test.mjs:1968` „a password replaced while the old password is checked refuses that login…”
- **Invariants:** none.
- **Nothing holds:** "whatever the account's block" for a login whose password a reset replaced.
- **Verification became:** `tests:` added, pair rewritten.

### D-101

- **Tests, sentence 1** (part "a player may remain signed in through several browsers at once"):
  - `tests/http.test.mjs:594`
  - `tests/http.test.mjs:912` „a credential success replaces only this browser's session…”
- **Tests, sentence 2** (whole): `tests/transport.test.mjs:765` „rolling static responses use the newest signing key…”.
- **Tests, sentence 3** (whole):
  - `tests/http.test.mjs:546` „absent, tampered, unknown, expired and deleted sessions…”
  - `tests/http.test.mjs:679` „a read that loaded its session before logout cannot revive it afterwards”
  - `tests/http.test.mjs:2353` „only a valid session of an unblocked account asks for a message…”
  - `tests/http.test.mjs:3978` „no session, a forged or removed session… on both save routes…”
  - `tests/http.test.mjs:4355` „… on both previous-save routes…”
  - `tests/transport.test.mjs:816` „new opaque sessions persist in SQLite while anonymous and invalid cookies create nothing”
  - `tests/account-storage.test.mjs:2214` „missing and expired records authorize nothing…”
  - `tests/account-storage.test.mjs:2229` „out-of-order renewal preserves the later expiry…”
  - `tests/account-storage.test.mjs:2251` „a delayed touch after destroy cannot recreate a session…”
- **Invariants:** `player-opaque-session-cookie` holds the cookie part of sentence 1.
- **Nothing holds:** none.
- **Verification became:** `tests:` added. It had no pair.

### D-102

- **Tests, sentence 3** (whole):
  - `tests/http.test.mjs:1227` „five failed logins lock an address…” (also "a capacity refusal is not a credential failure")
  - `tests/http.test.mjs:1278` „one client address is admitted twenty failed logins…”
  - `tests/http.test.mjs:1346` „one client address creates five accounts per rolling hour, and refused registrations take no slot”
  - `tests/http.test.mjs:1420` „a disconnected login keeps its reservation…”
- **Invariants:** `account-attempt-limits` holds sentences 1 and 2.
- **Nothing holds:** none.
- **Verification became:** `tests:` added, pair removed.

### D-103

- **Tests, sentence 3** (in part, "including dummy verification for an unknown account"): `tests/http.test.mjs:1068`.
- **Invariants:**
  - `account-attempt-tracking` holds sentence 2;
  - `account-attempt-limits` holds the settling after the actual work;
  - `password-operation-gate`, not named in the field, holds the gate shared by hashing and verification, with no queue and slots released after success or failure.
- **Nothing holds:**
  - sentence 1: 10,000 keys of each kind, digests, bounded histories, loss at a restart;
  - "a concurrency cap selected by measurement within the container memory budget".
- **Verification became:** `tests:` added, pair rewritten.

### D-106

- **Tests, sentence 2** (part "Its cost parameters are set explicitly"):
  - `tests/passwords.test.mjs:49` „compiled password operations create and verify the production Argon2id profile”
  - `tests/http.test.mjs:848`
  - `tests/http.test.mjs:3347`
  - `tests/password-measurement.test.mjs:61` „the entrypoint measures the production profile and gate with synthetic passwords only”
- **Invariants:**
  - `player-argon2-password-hash` holds sentence 1;
  - `player-argon2-deployment-check` holds the measurement.
- **Nothing holds:** none.
- **Verification became:** `tests:` added. It had no pair.

### D-107

- **Tests:** none added.
- **Invariants:** `player-express-session-sqlite-store` states both sentences whole.
- **Nothing holds:** none.
- **Verification became:** unchanged.

### D-109

- **Tests, sentence 1** (in part):
  - `tests/http.test.mjs:848` (a visitor creates an account)
  - `tests/http.test.mjs:3060` (asks for a reset link with no session)
  - `tests/http.test.mjs:2504` „a link confirms its own account once, with or without a session…”
  - `tests/http.test.mjs:4453` „an account without the previous-save privilege gets 403…”
- **Tests, sentence 3** (in part):
  - `tests/http.test.mjs:466` „a stored session alone selects the account…” (`no-store`, no hash, no session identifier)
  - `tests/http.test.mjs:649` „a failed session destruction is not reported as logout…”
  - `tests/http.test.mjs:912`
  - `tests/http.test.mjs:1193` „a failed session save keeps the new account usable…”
  - `tests/http.test.mjs:2681` „no response and no line of the server's log holds a link's token”
  - `tests/http.test.mjs:3214` „no answer and no line of the server's log holds a reset link's token…”
  - `tests/http.test.mjs:3788` „a hash that fails answers 500 with no detail…”
  - `tests/http.test.mjs:3824` „no answer and no line … holds a set-password request's token or password”
- **Invariants:** `account-session-authorization` and `player-save-isolation` hold sentence 2, the reset link's authority and the session's authority of sentence 1.
- **Nothing holds:** "secret" in account answers.
- **Verification became:** `tests:` added, pair added.

### D-137

- **Tests, sentence 1** (in part):
  - `tests/account-storage.test.mjs:2727` „the owner's command blocks and unblocks by address…”
  - `tests/account-storage.test.mjs:2940` „the owner's command changes nothing on a usage error, an unknown address or an unusable database…”
- **Tests, sentence 2** (in part):
  - `tests/account-storage.test.mjs:1979` „blocking deletes every session of that account and no other…”
  - `tests/account-storage.test.mjs:1649` „a block committed through another connection stops every link issued before it…”
  - `tests/account-storage.test.mjs:2905` „the owner's command stops every emailed link of the account it blocks…”
- **Invariants:** `blocked-account-access`, `player-server-session`, `unblock-restores-no-session` and `unblock-restores-no-link` hold the sessions and links after a block and an unblock.
- **Nothing holds:**
  - "run in the `loop2` container";
  - "in one transaction";
  - sentence 3 (the skill describes the command; only a human runs it).
- **Verification became:** `tests:` added, pair rewritten.

### D-138

- **Tests, sentence 2** (in part):
  - `tests/account-storage.test.mjs:1713` „a working reset link replaces the password, deletes every session of its account…” (one operation)
  - `tests/http.test.mjs:3347` (signs nobody in)
  - `tests/view/account-screen.test.mjs:1562` „a change clears the fragment first, then shows a new card…” (the login form)
- **Invariants:**
  - `player-opaque-session-cookie` holds sentence 1;
  - `player-server-session` and `password-reset-ends-sessions` hold the rest of sentence 2.
- **Nothing holds:** none.
- **Verification became:** `tests:` added. It had no pair.

### D-139

- **Tests, sentences 1 and 2** (whole):
  - `tests/http.test.mjs:1868` „a blocked account's correct password gets its own refusal…”
  - `tests/http.test.mjs:1915` „a block committed while the password is checked refuses that login as blocked…”
- **Invariants:** `blocked-account-access` (cannot sign in).
- **Nothing holds:** none.
- **Verification became:** `tests:` added, pair removed.

## The pairs added or rewritten, for the human's acceptance at the merge

The pairs of D-102 and D-139 were removed. These pairs were rewritten or added:

- **D-97 (rewritten)**
  - complies: „Wyloguj” drawn with the shared button of `src/browser/view/controls/`; the sentence of a save failed before logout and the sentence of the update above the forms, each in `warning`; a late answer of the account read or of the saved game state, arriving after a confirmed logout, leaving the forms as they stand
  - violates: a button of its own for „Wyloguj”; either sentence in another role than `warning`; a late answer of the account read or of the saved game state, arriving after the logout, building the game again over the forms
- **D-98 (rewritten)**
  - complies: a password reset accepting a new password equal to the account's old one; password fields of the browser with no `maxlength`
  - violates: a password reset refused because the new password equals the old one; a `maxlength` on a password field, which cuts a password of up to 128 code points written in characters of two UTF-16 units
- **D-99 (rewritten)**
  - complies: the server accepting a registration whose address holds letters outside ASCII
  - violates: a check of the server that refuses an address with letters outside ASCII, or one that looks the domain up in DNS before an account is created
- **D-100 (rewritten)**
  - complies: a login of a blocked account, whose right password a reset replaced during its check, answered with „Nieprawidłowy adres e-mail lub hasło.”
  - violates: such a login answered with the refusal of D-139
- **D-103 (rewritten)**
  - complies: at most 10,000 live email keys and 10,000 live client-address keys in the process's memory, an email key kept as a digest of fixed size, each history no longer than its threshold, all of them gone at a restart; the cap of the password gate changed only together with a measurement of it within the container's memory budget
  - violates: attempt histories written to the database or to a file that outlives a restart; a raw email address as a key of the table; a history that grows past its threshold; a cap of the gate raised with no measurement behind it
- **D-109 (added)**
  - complies: an account answer that holds no session signing key and no mail password, also when the configuration behind the route fails
  - violates: an answer of the account server that quotes a value of the session key file or of the mail password file
- **D-137 (rewritten)**
  - complies: the owner running `docker exec loop2 node dist/server/account-block.js block <email>` on the server, as the `loop2-deploy` skill describes it; the mark, the deletion of the sessions and the stopping of the links written in one transaction
  - violates: an HTTP route of the account server that blocks accounts; a skill instruction in which an agent runs the command through the `mikrus` MCP server; a block that marks the account in one transaction and deletes its sessions or stops its links in another

## Remarks for the human (R3: nothing of the decisions changed)

- **D-103, *Verification*.** It names `account-attempt-limits · account-attempt-tracking` but not `password-operation-gate`, which derives from D-103 and states sentence 3's gate. The template asks *Verification* to name every invariant derived from the decision. The plan keeps `invariants:` as it stands, so the field was not completed. A later change should add it.
- **D-137, sentence 1.** It says the command runs "in the `loop2` container". Its tests run the built `dist/server/account-block.js` as a process of its own on the test machine, which is as close as the gate gets.
- **D-102, sentence 3.** "A limited player sees …" is held by the server's answer. The browser shows any sentence the server sends, so nothing in the browser is particular to this sentence.
- **D-138's binding sentences** say a reset "signs nobody in, so the player signs in with the new password on the form". The page shows „Hasło zmienione. Zaloguj się nowym hasłem.” above the form (D-225's subject). The two agree.

## Problems observed

- **The first foundation check failed:** `foundations/decisions.md:2214: the entry lacks *Origin*, *Rationale*`.
  - *Cause (verified by reading the file):* my edit of D-109's *Verification* replaced a passage that ran into `- **Origin:** none` and the first words of *Rationale*, and the replacement left them out.
  - *Fix:* both were restored word for word, and the check then passed.
  - The final diff of D-109 changes only its *Verification* lines.
