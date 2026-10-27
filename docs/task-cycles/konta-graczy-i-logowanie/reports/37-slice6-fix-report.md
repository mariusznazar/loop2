# Slice 6 fix report — supplied-identifier permission row

**Status:** done.

- Fix range: `4101fb9e46226a9ce1a13580aa3413a1a80c398e` → `480309c953da7ff4f3a650c6ef431dad29fb62cb`. The working tree is clean.
- Commit: `480309c953da7ff4f3a650c6ef431dad29fb62cb` — State the supplied-identifier permission row as the decisions give it.
- Changed paths: `guidelines/testing.md`, +1/-1 (one table row). The file keeps LF endings (`git ls-files --eol`: `i/lf w/lf`). No code, test or foundation entry changed.
- Process pin unchanged at `574a37b9ab9572f876298f4cc10754581222d3f0`. Nothing pushed, reset or rebased; no target, secret or deploy action.

## Finding 1 (Important): fixed

The reviewer is right. Row 4 of the permission table promised that a logout naming an account "zostaje odrzucone bez zmiany żadnej sesji". Neither D-107 nor D-95 sets that refusal, and the test `tests/http.test.mjs:412-422` expects the opposite for a query or header identifier: 204, with the caller's own session ended.

**The row now reads:**

> | Każdy wywołujący | Inne konto albo sesja wskazane identyfikatorem w żądaniu | GET /api/account, POST /api/logout | Identyfikator w żądaniu nie daje uprawnień: odczyt zwraca własne konto albo 401, a wylogowanie kończy co najwyżej sesję tej przeglądarki, bez ważnej sesji zwraca 401, a sesje wskazanego konta zostają | D-107 · D-95 |

Where each part comes from (the testing template's "Writing the file" section, followed through `the-way-maintain-testing-guidelines`):

- "Grants no authority" and the 401 without a valid session come from D-107.
- "Ends only this browser's server-side session" comes from D-95, which the row now cites as well.

I did not add a separate row for the empty-body refusal. It is my implementation choice (report 34, choice 2), and rows on input form belong to slice 8's completion of the table. The words "co najwyżej" make the row true for both outcomes the product gives:

- a non-empty body is refused with 400, and no session is ended;
- a query or header identifier passes, and only the caller's own session is ended.

**Checked against the tests that cover the row** (all in `tests/http.test.mjs`):

- A lookup carrying another account's identifier in the query or a header returns the caller's own account. Without a session it returns 401.
- A logout with a body naming another account is refused with 4xx, and both sessions remain.
- A logout carrying another account's identifier in the query or a header ends the caller's own session with 204, and the named account's session remains.
- Absent, tampered, unknown, expired and deleted sessions get 401.

None of these contradicts the new row. The code does not change.

## Checks

| Command | Exit | Result |
|---|---:|---|
| `git status --short`; `git log --oneline -3` | 0 | Clean at the reviewed head 4101fb9. |
| Grep of `tests/` for `guidelines`, `testing.md` or `AGENTS.md` (Grep tool, plus `grep -n "guidelines\|AGENTS" tests/agent_workflow/*.py`) | 0 / no match | No test reads `guidelines/testing.md`. The only matches are the deploy skill copies under `.agents/`. |
| `grep -c "co najwyżej sesję tej przeglądarki" guidelines/testing.md` | 0 | 1 match: the new text is in the file. |
| `git diff --check` | 0 | No whitespace error. |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors`; it checks the decision numbers the row cites. |

I did not rerun the full `npm test`. This is a documentation-only fix, no test reads the changed file, and the only gate stage that does read it (`foundation_check.py`) ran on its own above, exit 0. The final full `npm test` evidence therefore stays that of 4101fb9, report 34, run 15, exit 0. Its code and tests are identical at 480309c.

## Foundation and guideline consequences

- `guidelines/testing.md`, Trust boundaries, row 4: rewritten as above, citing D-107 and D-95. No foundation entry, invariant status or other rule changes. The rule's *Decision* field already lists both decisions.
- Polish meaning: Wiersz mówi teraz tylko to, co dają decyzje: identyfikator w żądaniu nie daje uprawnień, odczyt zwraca własne konto albo 401, a wylogowanie kończy najwyżej sesję tej przeglądarki i nigdy sesji wskazanego konta.

## Reading reaches

- I read whole: `reports/37-slice6-fix-handoff.md` and `reports/37-slice6-blocking-findings.md`.
- I relied on what I already had in context from report 34 and did not reread it: the make-change method, the testing template ("Trust boundaries", "Writing the file"), D-95, D-107, the existing row and the cited test lines.
- I did not read `cycle.md`, and I did not take up the Minor findings 2–4.
