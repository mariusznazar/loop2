PASS f5c760119a593bb04a646ecb4088564f9a25a01e

# Review of the fix of the whole-change review's findings

Range `0fba2b3..f5c7601` (11 commits, 7 files, 28 insertions, 22 deletions). `git rev-parse HEAD` shows `f5c760119a593bb04a646ecb4088564f9a25a01e`, the head I was given. I read `.the-way/task-cycle/review/fix.md`, the fix report `whole-fix-report.md` (claims to verify) and the findings file `whole-findings.md`; I computed `git log` and `git diff 0fba2b3..f5c7601` myself. Read-only; the worktree stayed clean.

Summary: 0 Critical, 0 Important, 3 Minor (new or remaining, none blocking). The blocking finding I1 is fixed in all three places, and every Minor finding handed to the fixer is fixed, answered with evidence, or asked for no change.

## The findings file, one by one

### I1 (blocking). Fixed, in all three places.

The defect was that the binding sentence, the *violates* example and the rule in `guidelines/coding.md` said the failure of `measure-passwords` "gets no JSON line" while the unchanged code prints a JSON object on failure.

- D-252 binding paragraph (`foundations/decisions.md:5128-5134`): the failure of the two commands now "gets no failure line in the log form of this decision, with `failure`, `kind`, `code` and `place`". The paragraph still has three sentences (the template allows one to three). The log form named by its fields is the one `src/server/log-line.ts` writes (`JSON.stringify({ failure, ...errorFields(error), place, ...fields })`, line 54), so "log form" is checkable, and the report of `measure-passwords` (`{ok, versions, errors}`, `measure-passwords.ts:376-388`, printed by `finish` at `:343-345`) has none of those fields.
- D-252 *Verification*: *complies* now says `account-database-check` leaves "its sentence with the error's text and no failure line of the log form", and `measure-passwords` gives the error's text "in its report for the script that ran it, the one JSON object it prints, and no failure line of the log form". *Violates* reads "a failure line of the log form, with `failure`, `kind`, `code` and `place`, written by `account-database-check` or `measure-passwords`". A reviewer who compares the unchanged code with these lines no longer finds a violation: `account-database-check.ts:82-86` writes one `console.error` sentence with `error.message`; `measure-passwords.ts` prints its report.
- D-252 *Rationale* and *Rejected* (three places that said "a JSON line of failure") were brought into line, which the finding did not list but which the same defect needs. `grep` of D-252 for "JSON" now finds only "one JSON object on one line" (the log lines of Node.js code) and "the one JSON object it prints" (the report). Both are true of the code. The *Rejected* ways still match question 7 A and B of the task (the "wiersz awarii JSON" of the answer is the log form).
- `guidelines/coding.md:132-139`: "awaria zostaje z treścią błędu i bez wiersza awarii w postaci wierszy logu (z polami `failure`, `kind`, `code` i `place`); raport `measure-passwords` zostaje takim, jaki jest." Same meaning as D-252.

### Minor 1 (made-up values per command). Fixed.
D-252 binding: "as `account-database-check` does on a temporary database and `measure-passwords` on made-up passwords". *Rationale*: "works on a temporary database, or on made-up passwords". `coding.md`: "Żadne z nich nie działa na wartości gracza: `account-database-check` pracuje na tymczasowej bazie, a `measure-passwords` na sztucznych hasłach." Checked against `account-database-check.ts:49` (`mkdtemp`) and `measure-passwords.ts:68, 252` (synthetic passwords). `account-database-check` uses a made-up password hash rather than a made-up password, so "pracuje na tymczasowej bazie" is the exact claim for it; the sentence does not say it uses made-up passwords.

### Minor 2 (D-252 and D-354 pointer). Fixed.
One clause in the D-252 binding paragraph: "the sentence by which `account-block` or `account-backup` answers the operator is the matter of D-354". The fixer chose a prose pointer and no `Relations` line, correctly: D-354 already `derives from D-252` (`:7958`), and the template writes a relation in the dependent entry only.

### Minor 3 (D-183 "tasks 14 and 18"). Fixed.
The clause is dropped (`:3364`). The source (`git show 1b09f80:docs/task-cycles/plan-wyprawy/task.md` line 59) gives the exception only by task numbers, so dropping the clause invents nothing. D-183 *Rejected* now holds the way and its reason, as the source keeps them.

### Minor 4 (D-147 and D-185). No change asked; none made. Correct.

### Minor 5 (D-01 "total"). Fixed, with a residue.
`:9`: "All Respondents chart, the figure under the chart — "11,141"". The same *Based on* entry still says "Node.js 10,062 of 11,141 respondents to the runtime question" in its heading words, which is the inference the old label also made. The fixer reported it. See Minor N1.

### Minor 6 (D-111 *Rationale*). Fixed.
"… the password is empty when what the file decodes to is empty, not only when the file has no byte …" (`:2024`).

### Minor 7 (`catch-up`). Fixed.
`foundations/glossary.md:225`: "The catch-up is the computing of the game minutes that passed since the save time, after each load of a saved game state and after a sign-in to the same account with the unsaved game state kept in the page's memory." Verb next to its subject, meaning unchanged (compared with the earlier sentence and with D-247).

### Minor 10 (README lead-in). Fixed.
`README.md:23`: "Serwer budują i uruchamiają dwa polecenia, `npm run build` i `npm start`; `npm run typecheck` sprawdza typy przeglądarki i serwera bez emisji plików. Poniżej ich opis oraz uwagi o grafikach:". It is true of the four points: two commands, one note on the source of the sprites, one note that `npm run kitchen-sink` copies none. The list is unchanged.

### Minor 11 (`memory-limit.test.mjs` in the unit line). Fixed.
`guidelines/testing.md:338`: "bez `tests/view/page-document.test.mjs` i `tests/view/memory-limit.test.mjs`, które uruchamiają procesy (integration test)". Both files stand in the integration *Files* line (`:350`), and both call `spawnSync` (checked in the earlier review for page-document and by the Slice 9 report for memory-limit).

### Minor 12 (D-265 citation). Fixed.
`guidelines/coding-browser-module.md:248`: "… ekran może je importować; import czystych funkcji dopuszcza D-265 niezależnie od statusu pliku." D-265's binding sentence says a new screen "may import that module's pure functions" (read whole); the status of the file is not a condition.

### Minor 13 (*Bad* of the account-policy rule). Fixed.
`guidelines/coding-account-policy.md:25`: "Próba jest liczona dopiero po pracy hasła (sprawdzeniu hasła przy logowaniu, haszowaniu przy zakładaniu konta) albo zwalniana, gdy klient się rozłączy." It agrees with the *Good* line of the same rule.

### Minor 14 (`coding-mail-sending.md` and the repeated phrase). Answered with evidence.
`coding-mail-sending.md` holds no copy of the phrase; the only copy was in `coding.md`, now fixed with Minor 1. I repeated the `grep` over `guidelines/`: the old phrase "Oba działają na tymczasowej bazie i sztucznych hasłach" no longer stands anywhere.

### Minor 15 (D-02 address). Fixed.
`:23`: "Node.js 24.21.0 low-level HTTP API (https://nodejs.org/download/release/v24.21.0/docs/api/http.html § HTTP, introduction — "…"; read 2026-11-10)". I fetched that address and compared the quoted passage with tags removed and whitespace collapsed: present, word for word. The frozen address matches the one D-01 already uses for the TypeScript page.

### Minor 16 (D-237 *complies*). No change asked; none made. Correct.

## New findings of this review (Minor, nothing blocks)

- **N1.** D-01 *Based on* still says "Node.js 10,062 of 11,141 respondents to the runtime question" in the words before the address; the page labels neither number as respondents to the runtime question (the earlier reviewer's finding). Left by the fixer, who named it. A reader who compares the page with the entry meets the same unlabelled figure. Lies inside the task (item 21).
- **N2.** The D-252 binding paragraph is now longer: its second sentence carries the commands, the made-up values, the log form with four field names and the pointer to D-354. It stays within three sentences and is readable only with care. A candidate for a later edit that moves the D-354 pointer to *Relations* wording or *Rationale*; no wrong reading found. Lies inside the task.
- **N3.** The *Rationale* of D-252 says "works on a temporary database, or on made-up passwords" in the singular for a pair of commands; accurate, slightly abstract. Not a defect.

## Declined to judge

- Minors 8, 9 and 17 of the whole review (outside the task) were not handed to the fixer and I did not look for them in the fix.
- Whether D-252 should say more about the readiness line: not changed by the fix and not asked.

## What the fix itself could have broken

I read the whole diff (`git diff 0fba2b3..f5c7601`, 7 files, only prose and one test-file list line): no code file changed, no test file changed, no identifier of an invariant or decision moved, no numbering changed. The D-252 edits keep every field of the entry; the glossary entry keeps its `Not` field; the README list is unchanged. No new Critical or Important finding.

## Checks run

| Command or method | Exit | Result |
|---|---|---|
| `git rev-parse HEAD` | 0 | `f5c760119a593bb04a646ecb4088564f9a25a01e` |
| `git log --oneline 0fba2b3..f5c7601`; `git diff --stat 0fba2b3..f5c7601`; `git diff 0fba2b3..f5c7601` | 0 | 11 commits, 7 files, read whole |
| `python -B .the-way/elements/common/foundation_check.py` (worktree) | 0 | `0 errors` |
| `git diff --check 0fba2b3..f5c7601` | 0 | no output |
| `git status --short` | 0 | empty |
| `grep` of `src/server/log-line.ts` for the field `failure` | 0 | line 54 writes `failure` with the error fields and `place` |
| `sed` of D-252 (`foundations/decisions.md:5123-5175`) and D-265 | 0 | read as described |
| `curl` of `https://nodejs.org/download/release/v24.21.0/docs/api/http.html`, passage tested with tags removed | 0 | True |

Not run: `npm test` and every other test (the fix changes no code and no test; the orchestrator runs the gate); a fresh fetch of the State of JS page (N1 rests on the earlier reviewer's reading).

## Reaches beyond the dispatch

- `src/server/log-line.ts` (head and line 54), `src/server/measure-passwords.ts:336-395` and `src/server/account-database-check.ts:20-100`: to check I1 against the code the dispatch names.
- `foundations/decisions.md` D-354 (relations) and D-265 (binding sentence): to judge Minors 2 and 12.

## Unread material

- `reports/whole-review.md` (my own earlier report) was not reopened; I used the findings file.
- `guidelines/coding.md`, `guidelines/coding-account-policy.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `README.md`: read in the diff and the lines around the hunks, not whole.
- `foundations/decisions.md`: D-252 read whole; D-01, D-02, D-111, D-183 read at the edited lines and their fields; D-265 and D-354 read for the lines above.
- The pages cited by D-01 (State of JS) and D-02 other than the Node.js HTTP page were not opened.
- The fix report's "reaches" (the skills of the-way and their templates) were not read by me.

## Searches not found or unclear

- The exception that "tasks 14 and 18" stood for (Minor 3): the fixer found it only for task 14; I did not look further, since the clause was dropped.
- Whether a test or script matches the wording of the *violates* example of D-252 literally: not searched; `foundation_check.py` exits 0.
- Nothing else looked for and not found.
