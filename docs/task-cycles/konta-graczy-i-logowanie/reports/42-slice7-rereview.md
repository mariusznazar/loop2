PASS 94900832a2390a987bd79eea04cbfd0e571ac46e

# Review of the fix of slice 7's blocking finding

- Fix range: `8aa2e9c1c28cf82cf41ca50af30b5c8a86de7bd1` to `94900832a2390a987bd79eea04cbfd0e571ac46e`. It holds one commit, `9490083` "State that a successful login resets the email failure count of the attempt-limits invariant", which changes one path, `foundations/invariants.md` (+1/-1).
- The worktree is clean, and `git rev-parse HEAD` gives the given head. The process checkout and the gitlink both give `574a37b9ab9572f876298f4cc10754581222d3f0`.
- Method:
  - `.claude/skills/the-way-review-change/SKILL.md`, which delegates to `.the-way/task-cycle/review/SKILL.md`, section 4 "Review of a fix";
  - the user's playbook `C:/Storage/The Brain/The Brain/Notes/Areas/(A) Claude code/playbook_code_review.md`.
- Inputs read whole: `reports/41-slice7-blocking-findings.md`, `reports/41-slice7-fix-handoff.md` and `reports/41-slice7-fix-report.md`. I did not read `cycle.md`.
- Counts: blocking 0; Minor 1 new, in a report file outside the fix diff; out of scope 0. My earlier Minor findings 2–6 (`reports/40-credentials-review.md`) stand as recorded and are not regraded here.

## Findings of the findings file

### Finding 1 (Important): `account-attempt-limits` said the server refuses what the product admits — **fixed**

The email clause of `foundations/invariants.md:764` now reads "…five failed or unsettled logins in the last 15 minutes since its last successful login or within 15 minutes of its fifth failure…". The rest of the sentence and every field are unchanged: Method `test`, Rests on `none`, Derives from D-100 · D-101 · D-114, Part `account-server`, Violated `no`.

The failure scenario no longer holds. The invariant states one direction only: it says when the server refuses. So I asked whether the code refuses in every case the new sentence demands, and whether any cited test now expects the opposite.

- **The scenario of the finding** (`tests/http.test.mjs:1082`–`1088`): four failures, then a success, then "failure 2 after success". Since the success there is one failure, so the sentence demands no refusal, and the verified 401 the test expects agrees with it.
- **The code counts at least what the sentence counts.** Admission counts `failures.length + reserved` (`src/server/account-policy.ts:117`–`119`).
  - `failures` holds exactly the failures since the last success: cleared by `succeed` at `:152`–`154`, and cleared at a lock.
  - Those failures are also trimmed to the 15-minute window (`:216`, `recent` at `:88`–`90`).
  - `reserved` counts every unsettled attempt, those admitted before the success included.

  So whenever the sentence counts five, the code counts at least five and refuses.
- **The lock clause.** A lock is set at the fifth failure and lasts 15 minutes (`:162`–`165`, `:118`). Clearing the failures at the lock removes nothing the sentence still counts after the lock ends. Every failure that led to the lock is at most as recent as the fifth, so it is already 15 minutes old when the lock expires.
- **The other citing tests still agree with the sentence.** The IP case (`tests/http.test.mjs:1116`) and the registration case (`:1183`) touch only unchanged clauses. In the disconnect case (`:1256`), four failures and one unsettled attempt follow no success, which makes five, so the 429s it asserts are required by the sentence.
- **No other entry restated the omission.** `git grep` finds the identifier cited only in D-100, D-101 and D-114 (Verification), in `guidelines/coding-account-policy.md:23` and in the four tests. None of these restates the email count.

The fix diff introduces nothing new. It touches no code or test, and the test files are byte-identical to 8aa2e9c. So the full `npm test` evidence of run 14 (`reports/39-credentials-final.log`, exit 0) applies unchanged. The only gate stage that reads `foundations/invariants.md` is `foundation_check.py`, which I ran below.

## New findings

### Minor (outside the fix diff): the corrected Polish meaning narrows the window to 15 minutes after the success (new thread)

**Anchor:** `docs/task-cycles/konta-graczy-i-logowanie/reports/39-credentials-report.md:251`, repeated in `reports/41-slice7-fix-report.md`, section "Corrected Polish meaning".

**To paste:** „w ciągu 15 minut od ostatniego udanego logowania” means the 15 minutes that start at the success. The English sentence and the code count the failures of the last 15 minutes that came after the success, whenever that success was. A wording such as „z pięcioma nieudanymi lub nierozliczonymi próbami od ostatniego udanego logowania w ciągu ostatnich 15 minut” would carry the same meaning as the entry.

**Why I report it:**

- The Polish meaning is what the request shows the human who accepts the foundation change. So it has to say what the entry says.
- Example:
  - A success at T.
  - Five failures at T+20 min to T+24 min.
  - A sixth attempt at T+25 min.
- Under the English sentence and the code, all five failures are in the last 15 minutes and after the success, so the attempt is refused (in fact the lock started at the fifth failure).
- Read literally, the Polish counts only failures between T and T+15 min. It would demand no refusal there.
- The text is in report files, not in the commit, so it is outside the fix diff. Under section 4 of the method it is a Minor note and does not reopen the review. It should be corrected before the request is written.

## Declined to judge

- Minor findings 2–6 of `reports/40-credentials-review.md`: excluded from this round by the dispatch, and recorded for the review of the whole change.

## Checks run

| # | Command or method | Exit | Result |
|---|---|---:|---|
| 1 | `git rev-parse HEAD; git status --short; git -C .the-way rev-parse HEAD; git ls-files --stage -- .the-way` (Git Bash) | 0 | HEAD `94900832…`; clean; pin `574a37b…` both ways |
| 2 | `git log --oneline 8aa2e9c..9490083`; `git diff 8aa2e9c..9490083`; `git diff --stat 8aa2e9c..9490083` | 0 | One commit, `foundations/invariants.md` +1/-1, the email clause only |
| 3 | `git diff --check 8aa2e9c..9490083` | 0 | No whitespace errors |
| 4 | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| 5 | `git grep -n "account-attempt-limits" -- tests src guidelines foundations` | 0 | Cited in D-100, D-101, D-114, `guidelines/coding-account-policy.md:23` and `tests/http.test.mjs:1066`, `:1116`, `:1183`, `:1256`; none restates the email count |
| 6 | Manual: read the new sentence against `src/server/account-policy.ts:88`–`90`, `:117`–`119`, `:152`–`165`, `:216` and the four citing tests | — | The code refuses in every case the sentence demands; no cited test expects a contradicting admission |
| 7 | Manual: `grep -n "ostatniego udanego" reports/39-credentials-report.md` | 0 | Line 251 holds the Polish meaning reported above |

**Not run:** full `npm test` through the Linux harness. The fix changes one foundation sentence, no test or product file reads that file, and its one reader in the gate, `foundation_check.py`, ran as check 4. The dispatch also forbids repeating the unchanged gate.

## Reading reaches beyond the dispatch

- `src/server/account-policy.ts` (lines above) and `tests/http.test.mjs:1066`–`1290`: to check the new sentence against the code and the citing tests.
- `reports/39-credentials-report.md:251`–`253`: the corrected Polish meaning that the fix report names.
