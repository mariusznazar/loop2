PASS b4c235677bb413bf3ef4aafdbd490d37240cc9cc

# Review of correction 2 (the human's answer: fix the unfixed findings of item 4)

Range `fcc9db2..b4c2356` (five commits: `a6187ca`, `be420e7`, `aee1ecd`, `e175b32`, `b4c2356`; four files: `foundations/decisions.md`, `guidelines/testing.md`, `src/server/configuration.ts`, `tests/startup.test.mjs`). `git rev-parse HEAD` shows `b4c235677bb413bf3ef4aafdbd490d37240cc9cc`. I read `.the-way/task-cycle/review/fix.md`, the handoff, both step reports and the whole diff. Read-only: the worktree stayed clean; crafted-input runs were done in scratch copies of the head outside the worktree. No `mikrus` tool was called.

Summary: 0 Critical, 0 Important, 4 Minor (none blocking). All four remarks are made; the fifth finding of item 4 (the fact `mikrus-tunnel-outbound-tcp`) is unchanged on purpose, as the handoff says, and I did not look for it.

## The remarks, one by one

### 1. Two byte-order marks (code `b4c2356`, entry `a6187ca`). Made.

Code (`src/server/configuration.ts:48, 131-139`): `byteOrderMark = /﻿/gu` and the refusal `password.replace(byteOrderMark, "") === "" || controlCharacter.test(password)`. The global flag matters for `replace` (every mark goes), and `replace` keeps no `lastIndex` state, so the shared module-level regular expression is safe. The message path is unchanged: `invalid("LOOP2_SMTP_PASSWORD_FILE", error)` with no content. The source holds the escape `﻿` and no raw mark (I counted raw EF BB BF bytes in both files at `b4c2356`: 0); prettier and eslint on both files exit 0.

Crafted password files, run against the real `readAccountConfiguration` of the built head in a scratch copy (script in the scratchpad, `matrix.mjs`), then the same matrix against the base source:

| File | Head | Base (`fcc9db2`) |
|---|---|---|
| zero bytes | refused | refused |
| one mark | refused | refused |
| two marks | refused | accepted (password U+FEFF) |
| three marks | refused | accepted (two U+FEFF) |
| mark and newline | refused | refused |
| two marks and newline | refused | refused |
| mark and text | accepted, mark dropped (15 chars) | accepted |
| two marks and text | accepted, one mark stays (16 chars, starts with U+FEFF) | accepted |
| text alone | accepted | accepted |
| 1024 bytes of valid text | accepted (1024 chars) | accepted |
| 1025 bytes | refused | refused |
| invalid UTF-8 (`73 FF FE 73`) | refused | refused |
| 1023 bytes of marks (341 marks) | refused | not run |
| 1026 bytes of marks (342 marks) | refused (over the limit) | not run |
| text followed by a mark | accepted (mark kept, as the rule says) | accepted |

Every refusal says exactly `Invalid or unavailable account configuration: LOOP2_SMTP_PASSWORD_FILE`; no file content appears in any message (the text fixture "sentinel-secret" was searched for in every message: none). The real-process case of the test (`refusedStart`, stderr) still asserts the same for a file with a trailing newline.

Fixtures against the base source: I put `fcc9db2:src/server/configuration.ts` into the scratch copy beside the head `tests/startup.test.mjs`, rebuilt and ran `node --test tests/startup.test.mjs`: 17 pass, 1 fail, `AssertionError: Missing expected rejection` in the case that carries `invariant: account-startup-configuration`. On the head source: 18 pass, 0 fail. So the new fixtures (two and three marks in the invalid list; two marks and text in the accepted part) fail without the change and pass with it. A mutation that refuses every file that starts with a mark would fail the accepted `mark + text` and `two marks + text` assertions; one that drops the `g` flag would fail the three-mark refusal.

Case name: "the SMTP password file must be a small non-empty UTF-8 regular file without control characters …" is unchanged. It is still accurate at the level of bytes, but see Minor N1.

D-111 against the code, `account-startup-configuration` and the entries that derive from it:
- The binding sentence now says the password file "decodes to a password with no control character that is nonempty once every U+FEFF is taken out, so an empty file, a file of byte-order marks and nothing else and a trailing newline are refused while a byte-order mark followed by other characters is accepted with the mark dropped by the decoder". That is what the table above shows, case by case. The paragraph is still three sentences.
- *Rationale* and *Rejected* follow the answer (a mark followed by a password stays accepted; marks alone refused). The two added *Rejected* ways come from the cycle's own earlier weighing (`plan.md` *Choices* row on refusing every file with a mark, and the Slice 4 review and my finding 9 for accepting marks alone), with the answer of the human as the choice; the template (WAY-134) lets *Rejected* hold ways the source keeps, and I found no way the writer derived from its own reasoning.
- Entries that derive from D-111: the invariant `account-startup-configuration` ("partial or invalid explicit account settings exit nonzero before listening") names no password-file case and stays true; the invariant at `foundations/invariants.md:511-515` (`account-server-default-address`) and D-257 do not touch the file; the deploy reference `setup_and_secrets.md` (`## The SMTP password`) says nothing about marks (`grep` for BOM and byte-order over the repository finds only D-111, `configuration.ts`, `startup.test.mjs`, the restore script and a deploy reference about console output, all unrelated). The writer's statement that none needed a change holds.

### 2. D-247 and `catch-up-minutes` (`be420e7`). Made; my finding was wrong about the invariant.

D-247 now reads "It runs on its own after each load of a game state, the unsaved game state kept in the page's memory (D-211) included: after a sign-in, after a reload of the page, after a save lost to another browser's (D-209) and after a sign-in to the same account with that unsaved game state." The four occasions and the meaning are as before; the *violates* line ("a state kept in the page's memory going on from the sign-in with its missed game minutes dropped") still fits. I checked the text of the invariant `catch-up-minutes` (I printed it in the first review): it says "from the save time to the reading of the browser's clock" and holds no phrase about a load or a saved game state (`grep -c "saved game state"` over its entry: 0). So the writer is right that the phrase never stood there, and my finding 17 was mistaken in naming the invariant; no change to it is owed. The writer also named two other uses of "a load of a saved game state" (D-339 about the chronicle, which the unsaved state does not carry, and the invariant `death-settled-once`); neither is in the remark and I do not grade them.

### 3. The trust-boundary row (`aee1ecd`). Made.

`guidelines/testing.md` row `src/server/` now has: "`account-startup-configuration` (D-111), odmowa przy starcie pliku hasła poczty: przypadek „the SMTP password file must be a small non-empty UTF-8 regular file without control characters and is refused without echoing its contents" w `tests/startup.test.mjs`, na prawdziwych plikach; odmowę dostaje plik pusty, plik z samymi znacznikami kolejności bajtów (BOM) i plik ze znakiem sterującym, a komunikat prawdziwego procesu serwera nazywa ustawienie `LOOP2_SMTP_PASSWORD_FILE` i nie niesie treści pliku." Against the case: it uses real files (`writeFile`, `readAccountConfiguration`), its invalid list holds the empty file, marks alone and a control-character file, and its real-process step (`refusedStart`) asserts that stderr names the setting and does not echo the secret. The case name is quoted exactly. The step beyond the remark (D-111 added to the *Decision* line and the invariant to the *Invariant* line of `### Trust boundaries`) is sensible: the lists are meant to equal the row. Both are in the order of their neighbours.

### 4. D-01 (`e175b32`). Made; claims no more than the page shows.

D-01 now cites "Node.js at the top of the chart of runtimes … All Respondents chart, the first three rows by rank — "1" · "Node.js" · "10,062" · "2" · "Browser" · "9,682" · "3" · "Bun" · "2,321"; the page's text gives no label to these figures". I fetched `https://2025.stateofjs.com/en-US/other-tools/` (HTTP 200) and read the section "JavaScript Runtimes": the "All Respondents" chart lists "1 Node.js 10,062 +0.30", "2 Browser 9,682 -0.19", "3 Bun 2,321 +0.67" in that order. The claim "Node.js at the top of the chart" is therefore what the page shows; "respondents" and "11,141" no longer appear in D-01 (`grep` for `11,141`, `10,062` and "runtime question" over `foundations/`, `guidelines/` and the README finds only this line). The quoted runs omit the page's small text runs between the three (`+0.30` and a `0`); the entry states them as separate quoted items, which the template allows. This also resolves the open point of my finding N1 and the earlier Minor 5.

## What else changed in the range

Nothing else. The diff holds the four files above, nothing in `README.md`, other guidelines, other entries or tests. `foundation_check.py` and `git diff --check` are clean.

## Findings (all Minor, none blocks)

- **N1.** `tests/startup.test.mjs`, case title: "must be a small non-empty UTF-8 regular file …". A file of marks alone is non-empty by bytes and is now refused, which the title no longer hints at; the row of the guidelines and D-111 say it. Renaming the case would also move the quoted name in the guideline row; as it stands, nothing reads wrongly. Lies inside the correction.
- **N2.** D-247 now says "after each load of a game state, the unsaved game state kept in the page's memory included", while the glossary entry `catch-up` (unchanged) says "after each load of a saved game state and after a sign-in … with the unsaved game state kept in the page's memory". Same meaning, two shapes of sentence. Inside the correction; no wrong reading found.
- **N3.** `foundations/decisions.md` D-111 binding sentence is long (one sentence of about 150 words in the paragraph's second half). It stays within three sentences and every clause is checkable. Inside the correction.
- **N4.** (outside the remarks) D-339 and `death-settled-once` still say "a load of a saved game state" for loads that can be of the unsaved state. The writer left them on purpose and reported them; the correction binds only the findings of item 4.

## Declined to judge

- The fact `mikrus-tunnel-outbound-tcp` (item 4's fifth finding): not changed on purpose; outside this review.
- Whether a file with a mark followed by another mark and text should be accepted: the human's rule accepts it, with one invisible mark in the password; I only checked that the code does what the rule says.

## Checks run

| Command or method | Exit | Result |
|---|---|---|
| `git rev-parse HEAD` | 0 | `b4c235677bb413bf3ef4aafdbd490d37240cc9cc` |
| `git log --oneline fcc9db2..b4c2356`; `git diff --stat`; `git diff fcc9db2..b4c2356` | 0 | five commits, four files, read whole |
| `python -B .the-way/elements/common/foundation_check.py` (worktree) | 0 | `0 errors` |
| `git diff --check fcc9db2..b4c2356` | 0 | no output |
| `git status --short` | 0 | empty |
| Scratch copy of `HEAD` (git archive, `.the-way`, `node_modules`): `node scripts/build.mjs` | 0 | built |
| Scratch, head: `node --test tests/startup.test.mjs` | 0 | 18 pass, 0 fail |
| Scratch, head: `node matrix.mjs` (15 crafted files through `readAccountConfiguration`) | 0 | as in the table; no content in any message |
| Scratch, base `configuration.ts` and head test file: `node scripts/build.mjs`, then `node --test tests/startup.test.mjs` | 1 | 17 pass, 1 fail: "Missing expected rejection" in the invariant's case |
| Scratch, base source: `node matrix.mjs` | 0 | two and three marks accepted (the defect), the rest as in the table |
| Scratch, head: `npx prettier --check src/server/configuration.ts tests/startup.test.mjs`; `npx eslint src/server/configuration.ts` | 0; 0 | clean |
| Count of raw EF BB BF bytes in `configuration.ts` and `startup.test.mjs` at `b4c2356` | 0 | zero in both |
| `curl` of the State of JS page, text extract of the "JavaScript Runtimes" chart | 0 | rows 1-3 as D-01 quotes them |

Not run, with the reason: `npm test` (the orchestrator's gate), the other test files (the change touches one source file and one test file; I ran the test file that holds the case and the build), a browser look (no interface change).

## Reaches beyond the dispatch

- `foundations/invariants.md` entries `catch-up-minutes` and `account-startup-configuration` (and a grep of those that derive from D-111) and D-257: to verify that no derived entry needed a change.
- `.claude/skills/loop2-deploy/references/setup_and_secrets.md` (`## The SMTP password`, by `grep`): to see whether the deploy instructions say anything about the content of the password file.
- `tests/startup.test.mjs:54-110` (the fixture): to run the same files through the real configuration reader.

## Unread material

- `reports/correction-2-step-1-handoff.md` and `reports/correction-2-step-2-handoff.md`: not read; I took the two step reports as the claims and checked them against the diff.
- `guidelines/testing.md`: read the changed row and the `### Trust boundaries` lines, not the whole file. `foundations/decisions.md`: D-111 and D-247 whole; D-01 at its *Based on* line and its *Rationale*; D-257 whole. The other entries that mention "load of a saved game state" (D-339, `death-settled-once`) not read.
- The rest of the State of JS page (other charts) and the other sources of D-01: not opened.

## Searches not found or unclear

- The phrase "a load of a saved game state" in the text of `catch-up-minutes`: not found (the finding's wording was wrong for that entry).
- Any other file that states a rule on the content of the SMTP password file besides D-111, the code and the test: not found.
- Nothing else looked for and not found.
