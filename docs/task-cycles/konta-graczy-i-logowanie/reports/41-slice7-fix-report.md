# Slice 7 fix report — the email clause of `account-attempt-limits`

**Status:** done.

- Fix range: `8aa2e9c1c28cf82cf41ca50af30b5c8a86de7bd1` → `94900832a2390a987bd79eea04cbfd0e571ac46e`. The working tree is clean.
- Commit: `94900832a2390a987bd79eea04cbfd0e571ac46e`, "State that a successful login resets the email failure count of the attempt-limits invariant".
- Changed path: `foundations/invariants.md`, +1/−1. That is the sentence of one entry, and the file keeps LF (`git ls-files --eol`: `i/lf w/lf`).
- No code, test, decision or guideline changed. The process pin is unchanged at `574a37b9ab9572f876298f4cc10754581222d3f0`. I did not push, reset or rebase anything, and took no target, secret or deploy action.

## Finding 1 (Important): fixed

The reviewer is right.

- `succeed()` empties the email's failure history, at `src/server/account-policy.ts:152`–`154`. That follows D-100's binding sentence, "Success clears pre-lock email history but not IP failures".
- The lock case relies on it. After four failures and one success, the test expects the next failures to be verified and answered 401 (`tests/http.test.mjs:1084`–`1088`). Mutation c2 shows that this assertion pins the success-clearing.
- The sentence of the invariant counted every failure of the last 15 minutes, with no reset at a success. So the sentence forbade behaviour that the code and its cited test require.

I changed the sentence through the-way-record-invariant (steps 2–4 of its method, already read in slice 7). Only the email clause changed. Here is the binding sentence before and after; the changed words are marked.

- Before (at 8aa2e9c): "The account server refuses before password work a login for an email address with five failed or unsettled logins in the last 15 minutes or within 15 minutes of its fifth failure, a login from a client address with twenty failed or unsettled logins in the last 15 minutes and a registration from a client address with five created or unsettled accounts in the last hour, and settles each admitted attempt only when its password work has completed, whether or not its client is still connected."
- Now: "…a login for an email address with five failed or unsettled logins in the last 15 minutes **since its last successful login** or within 15 minutes of its fifth failure, …". The rest of the sentence is unchanged.

The IP clause stays as it is, as the reviewer says: a success does not clear address failures, D-100 says so, and the IP case asserts it. Method `test`, Rests on `none`, Derives from D-100 · D-101 · D-114, Part `account-server` and Violated `no` are all unchanged. So is the identifier, because the sentence constrains the same thing.

**The four citing tests, checked against the new wording.** All four are in `tests/http.test.mjs`.

- **Lock case (line 1066):**
  - After the success, only one or two failures count when "failure 1/2 after success" are admitted, so a 401 agrees with the sentence.
  - The fifth failure after the success starts the lock, and the correct password is then refused (429) until exactly 15 minutes after that fifth failure.
  - In the rolling part, four failures after the next success, plus one failure 15 minutes later, leave one failure in the window, so the correct login is admitted.
- **IP case (line 1116):** address clause only, unchanged.
- **Registration case (line 1183):** registration clause only, unchanged.
- **Disconnect case (line 1256):** four failures and one unsettled attempt, with no success in between. That makes five, so the refusal agrees with the sentence.

A lock clears the email history (`account-policy.ts`, `fail()`). The words "since its last successful login" therefore cover every case the code gives:

- Failures from before a lock are already older than 15 minutes when that lock ends.
- The lock itself is the separate clause "within 15 minutes of its fifth failure".

**The same omission in other entries this slice wrote: none.**

- D-114 states no threshold or count.
- D-100 and D-101 gained only their Verification line in slice 7, and their binding sentences already carry the success rule.
- `guidelines/coding-account-policy.md` describes reservation and settlement without restating the email count.

I searched `foundations/decisions.md` and `guidelines/coding-account-policy.md` for the thresholds (`five`, `pięć`) and found no restatement.

The Polish meaning in `reports/39-credentials-report.md` (the account-attempt-limits paragraph) had the same omission. I corrected it there, and added a line pointing to this fix.

## Corrected Polish meaning

`account-attempt-limits`: Serwer przed pracą hasła odmawia logowania na adres e-mail z pięcioma nieudanymi lub nierozliczonymi próbami w ciągu 15 minut od ostatniego udanego logowania albo w ciągu 15 minut od piątej porażki, logowania z adresu klienta z dwudziestoma nieudanymi lub nierozliczonymi próbami w ciągu 15 minut i rejestracji z adresu klienta z pięcioma utworzonymi lub nierozliczonymi kontami w ciągu godziny, a każdą dopuszczoną próbę rozlicza dopiero po zakończeniu pracy hasła, także gdy klient się rozłączył.

What changed, in Polish: udane logowanie zeruje licznik nieudanych prób adresu e-mail, ale nie adresu klienta — zdanie mówi teraz to, co robi kod i czego pilnuje test.

## Checks

| Command | Exit | Result |
|---|---:|---|
| `git status --short`; `git log --oneline -3` (start) | 0 | Clean at the reviewed head 8aa2e9c. |
| `python -B .the-way/elements/common/foundation_check.py` (after the edit, from the worktree root) | 0 | `0 errors`. |
| `git grep -n "account-attempt-limits" -- tests src guidelines foundations` | 0 | The citations are the four tests above, D-100, D-101, D-114 and the kind guideline. None of them depends on the old wording. |
| `git grep -n "invariants\.md" -- tests scripts package.json src` | 0 | The only match is prose in `src/browser/AGENTS.md:7`. No test or product file reads `foundations/invariants.md`; in the gate, only `foundation_check.py` reads it, and it ran on its own above. |
| `git diff --check` | 0 | No whitespace errors. |
| `git ls-files --eol foundations/invariants.md` | 0 | `i/lf w/lf`. |

**Full `npm test` was not rerun.** This is a documentation-only fix to one foundation sentence, and no test reads that file. The only gate stage that reads it is `foundation_check.py`, which ran on its own above with exit 0. Product code and tests are byte-identical to 8aa2e9c. The full npm test evidence for this head therefore stays that of run 14 in `reports/39-credentials-report.md` (`39-credentials-final.log`, exit 0: 396/396 Node, 278 Python, foundation `0 errors`).

Still unchecked, as before: the three Windows-only tests that skip on Linux, the Windows gate, the Argon2 measurement in the target image, and full saved-game durability.

## Reading reaches

- Read whole: `reports/41-slice7-fix-handoff.md` and `reports/41-slice7-blocking-findings.md`.
- Reread: the cited test lines (the lock case) and `succeed()` in `src/server/account-policy.ts`.
- I relied on what I had read in slice 7 for the-way-record-invariant, its template, D-100 and D-101, and did not reread them.
- I did not read `reports/40-credentials-review.md` beyond the finding as handed over, did not read `cycle.md`, and did not take up the Minor findings 2–6.
