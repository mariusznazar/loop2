# Report — the fix of the whole-change review's findings

**Status:** done

Worktree `the task's worktree`, branch `task/teksty-rozjechane-z-kodem`, range `0fba2b3..f5c7601` (11 commits, one per matter).

## Commits and files

| Commit | Files (added/removed lines) | Finding |
|---|---|---|
| `7a879fa` | `foundations/decisions.md` (D-252) | I1, 1, 2 |
| `efd26ba` | `guidelines/coding.md` (+5/-2) | I1, 1, 14 |
| `eb43999` | `guidelines/coding-account-policy.md` (+1/-1) | 13 |
| `a5af9a7` | `guidelines/coding-browser-module.md` (+1/-1) | 12 |
| `c3c632a` | `foundations/decisions.md` (D-183) | 3 |
| `4b78a4c` | `foundations/decisions.md` (D-01) | 5 |
| `6c089cd` | `foundations/decisions.md` (D-111) | 6 |
| `b60b582` | `foundations/decisions.md` (D-02) | 15 |
| `8183881` | `foundations/glossary.md` (+1/-1) | 7 |
| `d1dbe4f` | `README.md` (+1/-1) | 10 |
| `f5c7601` | `guidelines/testing.md` (+1/-1) | 11 |

Total over the range: 7 files, 28 added, 22 removed (`decisions.md` 18/15 for the four decision edits together).

## Findings

- **I1 (fixed, `7a879fa` and `efd26ba`).** The three places now say "no failure line in the log form" instead of "no JSON line", and that form is named by its fields (`failure`, `kind`, `code`, `place`):
  - D-252 binding paragraph: the failure of the two commands "gets no failure line in the log form of this decision, with `failure`, `kind`, `code` and `place`".
  - D-252 *Verification*: the *complies* line now says that the `account-database-check` sentence has no failure line of the log form, and that `measure-passwords` gives the error's text in its report, "the one JSON object it prints", with no failure line of the log form. The *violates* example reads "a failure line of the log form, with `failure`, `kind`, `code` and `place`, written by `account-database-check` or `measure-passwords`".
  - `guidelines/coding.md` ("Recording a failure"): "awaria zostaje z treścią błędu i bez wiersza awarii w postaci wierszy logu (z polami `failure`, `kind`, `code` i `place`); raport `measure-passwords` zostaje takim, jaki jest."
  - The same phrase "a JSON line of failure" in D-252 *Rationale* and *Rejected* (three places) became "a failure line of the log form", so that the entry does not keep the ambiguous wording in a second place. This is the same sentence-level matter as the finding; the code is unchanged. Check: `git show 7a879fa`; against the code `src/server/measure-passwords.ts:342-345,376-388` (prints one JSON object on failure) and `src/server/account-database-check.ts:82-86` (`console.error` of the text), both read again before the edit.
- **1 and 14 (fixed, `7a879fa`, `efd26ba`).** D-252 binding paragraph: "as `account-database-check` does on a temporary database and `measure-passwords` on made-up passwords"; D-252 *Rationale*: "works on a temporary database, or on made-up passwords". `guidelines/coding.md`: "Żadne z nich nie działa na wartości gracza: `account-database-check` pracuje na tymczasowej bazie, a `measure-passwords` na sztucznych hasłach." Finding 14 names `guidelines/coding-mail-sending.md` too; that file holds no such phrase (`grep "tymczasowej\|sztucznych" guidelines` found only `coding.md:135`), so the single fix in `coding.md` covers it.
- **2 (fixed, `7a879fa`).** One clause in the D-252 binding paragraph: "the sentence by which `account-block` or `account-backup` answers the operator is the matter of D-354". D-354's *Relations* already holds `derives from D-252`, and the decision template says a relation is written in the entry that depends on the other and uses only `derives from` and `narrows`, so D-252 gets no relation to D-354 and D-354 needs no change.
- **3 (fixed, `c3c632a`).** D-183 *Rejected*: the clause "and an exception for tasks 14 and 18" is dropped. Checked in `git show 1b09f80:docs/task-cycles/plan-wyprawy/task.md` line 59 and the lines around it: the task names the exception only by the tasks' numbers; the nearby answer says only that task 14 brings "the exception of a manual run of a solved map", and does not say what task 18 held. So I dropped the clause and did not invent a content.
- **4 (nothing to fix).** The reviewer says nothing to fix unless the human wants the way kept; D-147 and D-185 are not changed.
- **5 (fixed, `4b78a4c`).** D-01 *Based on*: "All Respondents chart, total — "11,141"" became "All Respondents chart, the figure under the chart — "11,141"". The earlier text of the same source ("10,062 of 11,141 respondents to the runtime question") is left as it was: the finding asks only for the place; the reading "respondents to the runtime question" for the figure is the same inference, and I did not re-fetch the State of JS page. See concerns.
- **6 (fixed, `6c089cd`).** D-111 *Rationale*: "so the password is empty when what the file decodes to is empty, not only when the file has no byte".
- **7 (fixed, `8183881`).** `catch-up` definition: "The catch-up is the computing of the game minutes that passed since the save time, after each load of a saved game state and after a sign-in to the same account with the unsaved game state kept in the page's memory." Meaning unchanged, so no search of other uses was needed (a wording change; "A changed meaning" binds a changed meaning).
- **10 (fixed, `d1dbe4f`).** `README.md` lead-in reworded (Polish): "Serwer budują i uruchamiają dwa polecenia, `npm run build` i `npm start`; `npm run typecheck` sprawdza typy przeglądarki i serwera bez emisji plików. Poniżej ich opis oraz uwagi o grafikach:". The list is unchanged.
- **11 (fixed, `f5c7601`).** `guidelines/testing.md` unit recipe *Files*: "bez `tests/view/page-document.test.mjs` i `tests/view/memory-limit.test.mjs`, które uruchamiają procesy (integration test)". Both files are in the integration *Files* line (read again).
- **12 (fixed, `a5af9a7`).** `guidelines/coding-browser-module.md`, "Ekran w Reactcie: Postać": "…ekran może je importować; import czystych funkcji dopuszcza D-265 niezależnie od statusu pliku." D-265 (read whole) says a new screen "may import that module's pure functions".
- **13 (fixed, `eb43999`).** `guidelines/coding-account-policy.md`, *Bad* of the first rule: "Próba jest liczona dopiero po pracy hasła (sprawdzeniu hasła przy logowaniu, haszowaniu przy zakładaniu konta) albo zwalniana, gdy klient się rozłączy." It agrees with the *Good* line.
- **15 (fixed, `b60b582`).** Fetched `https://nodejs.org/download/release/v24.21.0/docs/api/http.html` (title "HTTP | Node.js v24.21.0 Documentation"); the passage "The HTTP interfaces in Node.js are designed to support many features … so the user is able to stream data." is present word for word (checked by string comparison on the page text with the tags removed). D-02 *Based on* now reads "Node.js 24.21.0 low-level HTTP API (https://nodejs.org/download/release/v24.21.0/docs/api/http.html § HTTP, introduction — "…"; read 2026-11-10)".
- **16 (nothing to fix).** As the reviewer says; D-237 is not changed.

## Checks

| Command | Exit code |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py`, run after each commit that changed a foundation file or a guideline (11 runs) | 0, `0 errors` each time |
| `python -B .the-way/elements/common/foundation_check.py` at the end (HEAD `f5c7601`) | 0 |
| `git diff --check` after each edit and `git diff --check 0fba2b3 HEAD` at the end | 0 |
| `git status --short` at the end | clean |

No `npm test` was run (the orchestrator runs the gate). Not run: any test of the code; the change touches no code.

## Own-work check

The requirement most likely not met: I1, that the three places no longer say the unchanged `measure-passwords` does what the entry forbids. The check: read the code again (`measure-passwords.ts:342-345`, `:376-388`; `account-database-check.ts:82-86`) and read the new text of the three places and of the *Rationale*/*Rejected* as a reviewer who compares the code with the *violates* example. Showed: the *violates* example now names the log form with its four fields, which the `measure-passwords` report (`ok`, `versions`, `errors`) does not have; the *complies* line names that report as a JSON object. Another grep: `grep -n "JSON"` over D-252 finds two uses, both true of the code: "one JSON object on one line" for a log line of Node.js code, and `measure-passwords` "the one JSON object it prints" (its report). "JSON line of failure" no longer stands anywhere in D-252.

Foundation text kept in English; `coding*.md` and `README.md` kept in Polish, `testing.md` in Polish as the file has it.

## Reaches beyond the dispatch

- `.claude/skills/the-way-record-decision/SKILL.md`, `.claude/skills/the-way-record-glossary-term/SKILL.md`, `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md`, `.the-way/elements/decisions/skill/SKILL.md`, `.the-way/elements/decisions/template.md` (whole), `.the-way/elements/common/rules.md`, `.the-way/elements/glossary/template.md`, `.the-way/product-guidelines/template.md` (first 120 lines), `.the-way/product-guidelines/coding/SKILL.md` — the handoff named the skills and the templates; I did not read the other files the decision skill names (`read.md`, `decide_entry.md`, `examples.md`, `way_of_working.md`) because every edit is a rewording of an existing entry or a one-clause pointer and no entry is created or its meaning changed.
- `foundations/decisions.md`: D-354 (whole), D-183 (whole), D-265 (whole), the passages of D-01, D-02, D-111 around the edits.
- `a rule file of the author's agent instructions` (the user's rule before writing a script), `src/server/measure-passwords.ts` and `src/server/account-database-check.ts` (the places the finding names), `guidelines/coding-browser-module.md` and `guidelines/coding-account-policy.md` (the passages around the edits).

## Unread material

- `reports/whole-review.md` (the source of grade and scope): not read; the findings file the handoff names was read whole.
- `guidelines/coding.md`, `guidelines/coding-account-policy.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`: read the passages around the edits only (the whole-file reading `make-change` asks was not done for these; the edits are single sentences).
- `foundations/decisions.md` D-252, D-01, D-02, D-111, D-183: D-252 whole; D-01, D-02 and D-111 read in part (heading, binding paragraph, fields and the line edited); D-183 whole.
- `foundations/glossary.md`: the `catch-up` entry and its neighbours only; D-247 and D-211, against which the sentence was checked in the review, not re-read (the meaning is unchanged by the wording).
- `.the-way/elements/decisions/skill/read.md`, `decide_entry.md`, `examples.md`, `.the-way/elements/common/way_of_working.md`, `.the-way/elements/glossary/skill/*`: not read, as above.

## Searches not found or unclear

- What exception tasks 14 and 18 stood for in finding 3: found only for task 14 ("manual run of a solved map") and nothing for task 18; the clause was dropped.
- `guidelines/coding-mail-sending.md` named in finding 14 holds no copy of the phrase; searched with `grep` over `guidelines/` (found only `guidelines/coding.md`). Everything else: none.

## Concerns and questions

- Finding 5: D-01 *Based on* still says "Node.js 10,062 of 11,141 respondents to the runtime question"; "respondents to the runtime question" is the same inference as the "total" the reviewer disliked, and the page was not re-fetched. Left as it was because the finding asks only for the place of the figure; a reader may want the description trimmed too.
- Finding 2: no `Relations` change was made, because the template puts a relation in the dependent entry (D-354 already derives from D-252). If the orchestrator wants a link from D-252, it would have to be a prose pointer, as written.
- No question needs an answer.
