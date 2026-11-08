# Classification A of the sentences of `guidelines/coding.md`

Classifier A. Worktree `the worktree of the task`, file `guidelines/coding.md` (361 lines),
units from `reports/inputs-sentences.md` (S001-S120). Read: the handoff, the units file, `coding.md` whole, the template
(`.the-way/product-guidelines/coding/template.md`) whole, D-28 to D-33, D-252, D-253, the task document, `eslint.config.mjs`,
`ruff.toml`, `prettier.config.mjs`, `package.json` (versions), `tests/quality/test_quality_invariants.py` (flags). History:
`git log -S` for the sentences, and the records of the cycles `reguly-awarii-i-logow` (commit `23b5240`, with its
review reports and findings), `napis-o-awarii` (`905c1ab`) and `coding-guidelines` (`dd55ec2`, `9a8dd99`), read through
targeted searches (see the last section).

Labels: `known-practice`, `project-decision`, `derivable-case`, `state-listing`, `repeated-decision-or-config`, `structure`.
A unit I split appears as members (`S047a`, `S047b`, ...) with their exact words; for the others the id is enough.
In the column "replacement name" only `known-practice` rows have a value.

## 1. Table

| id | lines | rule (section) | group | source | origin | confidence | one-line reason | replacement name (known-practice) |
|---|---|---|---|---|---|---|---|---|
| S001a "Przed każdą zmianą kodu produktu" | 8 | When to read | project-decision | template | | low | Says when the file binds (WAY-212); no practice name conveys it, but `AGENTS.md` says the same, so it could be a repeat. | |
| S001b ", także skryptów i testów" | 8 | When to read | project-decision | own | | low | The loop2 widening of the trigger to scripts and tests; also stated by D-28 and `AGENTS.md`, so it could be a repeat. | |
| S002 | 8-9 | When to read | project-decision | own | | medium | Tells the agent to apply the invariants by the methods the foundation records, not by commands of its own (a loop2 working convention). | |
| S003 | 10 | When to read | repeated-decision-or-config | own | | high | Repeats the first clause of D-28. | |
| S004 | 14 | Kinds of code | structure | template | | high | Header row of the table of kinds. | |
| S005 | 16 | Kinds of code | structure | own | | high | Table row (content-data). | |
| S006 | 17 | Kinds of code | structure | own | | high | Table row (simulation-module). | |
| S007 | 18 | Kinds of code | structure | own | | high | Table row (saved-game). | |
| S008 | 19 | Kinds of code | structure | own | | high | Table row (browser-module). | |
| S009 | 20 | Kinds of code | structure | own | | high | Table row (http-application). | |
| S010 | 21 | Kinds of code | structure | own | | high | Table row (password-hashing). | |
| S011 | 22 | Kinds of code | structure | own | | high | Table row (database-access). | |
| S012 | 23 | Kinds of code | structure | own | | high | Table row (session-store). | |
| S013 | 24 | Kinds of code | structure | own | | high | Table row (account-policy). | |
| S014 | 25 | Kinds of code | structure | own | | high | Table row (browser-api-client). | |
| S015 | 26 | Kinds of code | structure | own | | high | Table row (mail-sending). | |
| S016 | 37-40 | Linter | repeated-decision-or-config | own | | high | ESLint version, sets, config file: repeats D-29, `package.json` and `eslint.config.mjs`. | |
| S017 | 40-41 | Linter | repeated-decision-or-config | own | | high | Parser API and globals versions: repeats D-29 and `package.json`. | |
| S018 | 41-44 | Linter | repeated-decision-or-config | own | | medium | `noInlineConfig` and `--max-warnings 0` are in D-29 and `eslint.config.mjs`; the consequence "a disable comment fails" is the author-facing part, but S029 and the Bad line carry the action. | |
| S019 | 44-46 | Linter | repeated-decision-or-config | own | | medium | Ignore list and file-pattern scope repeat D-29 and the config; D-29 *complies* implies "add the pattern of a new directory", which no other sentence says. | |
| S020 | 46-47 | Linter | repeated-decision-or-config | own | | medium | Repeats D-29 ("review ... keeps its rules to those sets and its file patterns to that scope"); a reviewer duty. | |
| S021 | 47-49 | Linter | repeated-decision-or-config | own | | high | Empty suppressions file of the test: repeats D-29 and `tests/quality/test_quality_invariants.py:49`. | |
| S022 | 51-53 | Linter | repeated-decision-or-config | own | | high | Task's own example: Ruff 0.17.1, 393 of 407, fourteen examples (D-30, `ruff.toml`). | |
| S023 | 53-55 | Linter | repeated-decision-or-config | own | | high | `--config ruff.toml --ignore-noqa` and "no suppression comment takes effect": D-30. | |
| S024 | 55-56 | Linter | repeated-decision-or-config | own | | medium | `.py` and `.pyi` only: D-30 "every .py and .pyi file Ruff finds"; the extensionless gap is a consequence, not stated in D-30. | |
| S025 | 58-61 | Linter | repeated-decision-or-config | own | | high | ShellCheck version and flags: repeats D-31 and the test (`--norc --shell=bash --extended-analysis=true`). | |
| S026 | 61-62 | Linter | project-decision | own | | high | "dopisz do listy w `tests/quality/test_quality_invariants.py`" is what the author must do (the task names it as staying); the first half repeats D-31 "run on it by name". | |
| S027a "Dyrektywa `# shellcheck disable=…` działa" | 63 | Linter | repeated-decision-or-config | own | | medium | The directive has effect in the tool, which is why D-31 hands it to review. | |
| S027b "więc jej nie dodawaj; przegląd ją odrzuca" | 63-64 | Linter | project-decision | own | | high | The instruction to the author and the review's duty (D-31 *violates*). | |
| S028 | 64-65 | Linter | repeated-decision-or-config | own | | high | Repeats D-31 ("embedded commands in YAML or test literals are outside"). | |
| S029 | 67 | Linter | project-decision | template | | high | The thing the author does (the task names it as staying); template: "a fault of one file is fixed in that file" (WAY-203). | |
| S030 | 67-68 | Linter | repeated-decision-or-config | own | | high | Repeats "Changing the rule set takes a human-accepted change of this decision" of D-29, D-30, D-31. | |
| S031 | 68-70 | Linter | repeated-decision-or-config | template | | medium | Pinned versions and local copies: D-29 to D-32 "local pinned", and the template's "Pinned versions" bullet. | |
| S032 | 113-117 | Formatter | repeated-decision-or-config | own | | high | Prettier version, flags, defaults: D-32 and `package.json`. | |
| S033 | 117-118 | Formatter | repeated-decision-or-config | own | | high | D-32 "no ignore file of its own able to hide a file". | |
| S034a "Edytor korzysta z `prettier.config.mjs`, który nie ustawia żadnej opcji, więc formatuje tak samo" | 118-119 | Formatter | repeated-decision-or-config | own | | high | D-32 "the editor's prettier.config.mjs sets no option"; `prettier.config.mjs` is `export default {}`. | |
| S034b "nie dodawaj do niego opcji" | 119 | Formatter | project-decision | own | | high | The instruction to the author (D-32 *violates*: "an option added to prettier.config.mjs"). | |
| S035 | 119-120 | Formatter | repeated-decision-or-config | own | | high | D-32 "narrow repository attributes preserve LF". | |
| S036 | 120-123 | Formatter | repeated-decision-or-config | own | | medium | Scope, no historic exceptions, no `prettier-ignore`, excluded kinds: D-32 and D-28 (rejected "per-file historic exceptions"). | |
| S037 | 140-141 | Dependency audit | repeated-decision-or-config | own | | high | D-33 first clause. | |
| S038 | 141-145 | Dependency audit | repeated-decision-or-config | own | | high | D-33: tool, version, comparison with `{fork-point}`, threshold. | |
| S039 | 145-147 | Dependency audit | repeated-decision-or-config | own | | high | D-33 coverage sentence. | |
| S040 | 149 | Dependency audit | repeated-decision-or-config | own | | high | D-33 "a failed request or an unreadable report fails the audit". | |
| S041 | 149-150 | Dependency audit | repeated-decision-or-config | own | | medium | D-33 *Rationale* ("newly published advisories can change the result for the same lockfile"); a reason, which the template says a rule does not carry (WAY-168). | |
| S042 | 150-151 | Dependency audit | repeated-decision-or-config | own | | high | D-33 "no automatic revision or scheduled threshold review". | |
| S043 | 151-152 | Dependency audit | repeated-decision-or-config | own | | high | D-33 "sending package names and versions without application code". | |
| S044 | 152-153 | Dependency audit | repeated-decision-or-config | own | | high | D-33 exclusions. | |
| S045a "Awaria to sytuacja, w której produkt nie zrobił tego, o co go poproszono albo co miał zrobić sam, z powodu innego niż spodziewana odmowa" | 162-163 | Recording a failure | project-decision | template | | medium | Defines the term that scopes the rule (failure vs expected refusal); no single known name conveys exactly this boundary. | |
| S045b ", także gdy zawiodła usługa zewnętrzna" | 163-164 | Recording a failure | derivable-case | template | no-mistake | medium | An outside service failing is a case of "did not do what it was asked" from S045a; added with the rule at adoption (`3400178`, translation of the template), no record ties it to a mistake. | |
| S046 | 164-165 | Recording a failure | derivable-case | template | no-mistake | low | The wrong-password example restates the exclusion already inside S045a; added at adoption (`3400178`). Could also be read as the boundary itself (project-decision). | |
| S047a "Awarię zapisuj zawsze z przyczyną, czyli z pierwotnym błędem, a nie z samym napisem" | 165-166 | Recording a failure | known-practice | template | | medium | Keep the root cause with the log line. | error cause / exception chaining (log the cause, not a bare string) |
| S047b "raz, tam gdzie kod ją obsługuje" | 166-167 | Recording a failure | known-practice | template | | medium | Log once at the place that handles the error. | log at the handling boundary, no log-and-rethrow (double logging) |
| S048 | 167-168 | Recording a failure | project-decision | own | | high | Names `writeFailure`, `src/server/log-line.ts` and `ReasonedFailure`; none of them is in the foundation (searched `foundations/*.md`). | |
| S049 | 170-171 | Recording a failure | known-practice | template | | medium | One handler of last resort per process for what nothing handled; "(D-253)" is a pointer. | global uncaught-exception handler (last-resort handler) |
| S050a "Procesy dotykające danych kont — serwer, `account-block` i `account-backup` — mają własną [obsługę], bo domyślny wypis mógłby zacytować wartości" | 171-173 | Recording a failure | repeated-decision-or-config | own | | high | First sentence of D-253 almost word for word, with its reason (review remark N3 of the cycle `reguly-awarii-i-logow` says the "bo" clauses repeat D-253). | |
| S050b "`installLastResort`" | 172 | Recording a failure | project-decision | own | | medium | The name of the helper to use; D-253 does not name it (searched `foundations/*.md`). | |
| S051 | 173-175 | Recording a failure | repeated-decision-or-config | own | | high | D-253 second binding sentence almost word for word; its "bo" is again a reason (N3). | |
| S052 | 175-177 | Recording a failure | state-listing | own | | high | Task's own example: lists four files that already meet the rule (also in D-253). | |
| S053a "Przeglądarka też ją ma:" | 177 | Recording a failure | state-listing | own | | high | States that the browser already meets the rule. | |
| S053b "`installLastResort` z `src/browser/view/last-resort.ts` anuluje zdarzenie błędu, którego nic nie obsłużyło, i zapisuje w konsoli zwykłym tekstem jeden wiersz z rodzajem, kodem i miejscem obsługi, bez treści i stosu błędu, ten sam wiersz raz do odświeżenia strony." | 177-180 | Recording a failure | repeated-decision-or-config | own | | medium | The behaviour is in D-253 sentence 2 almost word for word; only the file path and the function name are not there (they are in `coding-browser-module.md`). | |
| S054 | 180-181 | Recording a failure | state-listing | own | | medium | Names a script that still falls short of the rule (the task deferred it, record `reguly-awarii-i-logow`); lists state, not an action. Could be read as a project-decision (the rule binds it). | |
| S055 | 190 | Hiding a failure | known-practice | template | | high | Task's own example. | fail loudly (no swallowed errors, no silent empty fallback) |
| S056a "Tryb zdegradowany, w którym produkt działa dalej bez jednej funkcji" | 191 | Hiding a failure | known-practice | template | | medium | The subject is the pattern known as graceful degradation. | graceful degradation |
| S056b "jest dopuszczalny tylko tam, gdzie ustala go zadanie, zapisując go jako decyzję produktu, i zawsze zostawia wiersz w logach" | 191-193 | Hiding a failure | project-decision | template | | high | Task names it as staying: only where a task sets it, as a recorded decision, with a log line. | |
| S057a "Wiersz przebiegu sprawy, czyli tego, co produkt robi dla jednej sprawy od żądania albo zadania w tle do jej końca, niesie te identyfikatory z listy `### Logging scope`, które łączą zdarzenia tej sprawy" | 202-204 | Identifiers in log lines | known-practice | template | | low | Lines of one case carry the identifiers that join them. The definition of "sprawa" and the reference to the list are project-specific, so it could be a project-decision. | correlation ID (request- or job-scoped fields in structured logs) |
| S057b "każdy pod nazwą z listy, tą samą w każdym wierszu, tak aby wyszukiwanie znalazło całą sprawę" | 204-205 | Identifiers in log lines | derivable-case | template | no-mistake | low | The same field name in every line follows from the stated purpose (a search finds the whole case); added at adoption (`3400178`). Could also be known-practice (consistent field names). | |
| S058a "W kodzie Node.js stałe pola wiersza to `event` albo `failure`, `kind`, `code`, `place` i identyfikatory z listy" | 205-207 | Identifiers in log lines | project-decision | own | | medium | The fixed field names; `failure`, `kind`, `code`, `place` appear in D-252 *complies*, `event` does not. | |
| S058b "dalsze pole, takie jak `linkPurpose`, jest polem, a nie pozycją listy" | 207-208 | Identifiers in log lines | derivable-case | own | agent-mistake | medium | Follows from "identifiers that join the events of a case". Origin: the proposal set listed `linkPurpose` as an identifier (`.runs/coding/failure-rules-proposals.md:36`) and the critique removed it (`failure-rules-critique-verdict.md:7`); the sentence was added at adoption (`3400178`). The mistake is of the proposal stage, not of a code author; the evidence lies outside git. | |
| S059 | 208-209 | Identifiers in log lines | repeated-decision-or-config | own | | high | D-252: "its Bash scripts keep their own text and a line in the browser's console is plain text". | |
| S060 | 209-211 | Identifiers in log lines | derivable-case | template | no-mistake | medium | Task's own example; added at adoption (`3400178`, translation of template lines 198-199); the cycle record and reviews name no mistake behind it. | |
| S061 | 211-212 | Identifiers in log lines | derivable-case | template | no-mistake | medium | A last-resort line need carry none because the handler does not know the case; added at adoption (template lines 199-200); no mistake found in the records. | |
| S062 | 221 | Business events | project-decision | template | | medium | Binds the list to log lines (the list is loop2's promise); could be read as derivable from "the list is a promise of the product" (S083). | |
| S063 | 222 | Business events | project-decision | own | | high | Names `writeEvent` and `src/server/log-line.ts`; not in the foundation. | |
| S064a "Logi nie zawierają żadnego sekretu, bez wyjątku" | 231 | Secrets and personal data | known-practice | template | | high | Never log secrets. | never log secrets |
| S064b ", więc identyfikator będący sekretem zostaje poza nimi, nawet gdyby stał na liście" | 231-232 | Secrets and personal data | derivable-case | template | no-mistake | medium | Follows from "no exception"; added at adoption (`3400178`, template lines 203-204). | |
| S065a "Nie zawierają danych osobowych" | 232 | Secrets and personal data | known-practice | template | | high | No personal data in logs. | no PII in logs (data minimisation) |
| S065b "jedynym wyjątkiem od tego zakazu są identyfikatory z listy `### Logging scope`" | 233-234 | Secrets and personal data | project-decision | template | | high | The single exception (the list); only loop2's list says what it is. | |
| S066a "Kod nie zapisuje całego obiektu ani treści żądania" | 234 | Secrets and personal data | known-practice | template | | medium | Do not log whole objects or request bodies. | log only an allowlist of fields (no whole objects or request bodies) |
| S066b "co nie dotyczy samego błędu" | 234-235 | Secrets and personal data | project-decision | template | | medium | Carves the error itself out of the ban, which S067 then narrows. | |
| S067 | 235-237 | Secrets and personal data | project-decision | template | | medium | What is written instead (kind, code, place) and the precedence over `### Recording a failure`; the redaction idea is known, the precedence is not. | |
| S068 | 237-238 | Secrets and personal data | project-decision | own | | high | Task's own example: read only the name, code and SQLite `errcode`, never `message` or `stack`. | |
| S069 | 247 | Logging scope | structure | own | | high | List label. | |
| S070 | 249 | Logging scope | structure | own | | high | List bullet of the logging scope. | |
| S071 | 251 | Logging scope | structure | own | | high | List label. | |
| S072 | 253 | Logging scope | structure | own | | high | List bullet. | |
| S073 | 254 | Logging scope | structure | own | | high | List bullet. | |
| S074 | 255 | Logging scope | structure | own | | high | List bullet. | |
| S075 | 256 | Logging scope | structure | own | | high | List bullet. | |
| S076 | 257 | Logging scope | structure | own | | high | List bullet. | |
| S077 | 258 | Logging scope | structure | own | | high | List bullet. | |
| S078 | 259 | Logging scope | structure | own | | high | List bullet. | |
| S079 | 260 | Logging scope | structure | own | | high | List bullet. | |
| S080 | 261 | Logging scope | structure | own | | high | List bullet. | |
| S081 | 262 | Logging scope | structure | own | | high | List bullet. | |
| S082 | 263 | Logging scope | structure | own | | high | List bullet. | |
| S083 | 265 | Logging scope | project-decision | template | | medium | Says what the list means (a promise, not an inventory); changes how an agent treats it. Could be read as derivable. | |
| S084 | 265-267 | Logging scope | repeated-decision-or-config | template | | medium | D-252 last sentence ("an agent adds alone an item that fits this principle, an identifier of a thing included"); the template asks the text to say how an item is added, so the removal needs a form decision. | |
| S085 | 267-268 | Logging scope | repeated-decision-or-config | template | | medium | D-252 "anything that points to a person takes the human's consent"; "new meaning" is WAY-172. | |
| S086 | 274-275 | PLW1510 | repeated-decision-or-config | own | | medium | Example gloss for a rule D-30 and `ruff.toml` leave non-blocking. | |
| S087 | 275 | PLW1510 | repeated-decision-or-config | own | | medium | Same. | |
| S088 | 279 | I001 | repeated-decision-or-config | own | | medium | Same ("this rule does not block"). | |
| S089 | 283-284 | ISC004 | repeated-decision-or-config | own | | medium | Same. | |
| S090 | 288-289 | UP031 | repeated-decision-or-config | own | | medium | Same. | |
| S091 | 293 | RUF059 | repeated-decision-or-config | own | | medium | Same. | |
| S092 | 297 | PIE808 | repeated-decision-or-config | own | | medium | Same. | |
| S093 | 301-302 | RUF007 | repeated-decision-or-config | own | | medium | Same. | |
| S094 | 306 | RUF012 | repeated-decision-or-config | own | | medium | Same. | |
| S095 | 310 | PLR0402 | repeated-decision-or-config | own | | medium | Same. | |
| S096 | 314-315 | FURB167 | repeated-decision-or-config | own | | medium | Same. | |
| S097 | 319 | RUF100 | repeated-decision-or-config | own | | medium | Same ("E402 is not in the blocking set"). | |
| S098 | 320 | RUF100 | derivable-case | own | no-mistake | low | Follows from S029 and D-30 (no suppression of a blocking rule); in the first version of the file (`a98222d`), no remark found that ties it to a mistake. Could also be a repeat of D-30. | |
| S099 | 324 | SIM117 | repeated-decision-or-config | own | | medium | Same as S086. | |
| S100 | 328-329 | FURB192 | repeated-decision-or-config | own | | medium | Same. | |
| S101 | 333 | SIM102 | repeated-decision-or-config | own | | medium | Same. | |
| S102 | 337-338 | Odłożone rodzaje i formatowanie | repeated-decision-or-config | own | | medium | D-28 last sentence (testing rules and the explicit-time example stand in `guidelines/testing.md`). | |
| S103 | 338 | Odłożone rodzaje i formatowanie | repeated-decision-or-config | own | | high | D-28 "cover all code, tests included". | |
| S104 | 339 | Odłożone rodzaje i formatowanie | repeated-decision-or-config | own | | high | D-28 deferral of Python and Bash formatting. | |
| S105 | 339-340 | Odłożone rodzaje i formatowanie | repeated-decision-or-config | own | | high | D-28 deferral of the exemplars for build, deployment, entry points, HTML, CSS. | |
| S106 | 340-342 | Odłożone rodzaje i formatowanie | repeated-decision-or-config | own | | medium | D-28 (no stylesheet exemplar) and its *Rationale* (the styleguide holds the rules); the pointer to the styleguide also stands in `AGENTS.md`. | |
| S107 | 343-344 | Odłożone rodzaje i formatowanie | state-listing | own | | medium | Lists two exemplars that now exist and the kinds they carry; D-28 only promises them for their first implementations, and the table of kinds shows the rows. | |
| S108 | 345 | Odłożone rodzaje i formatowanie | repeated-decision-or-config | own | | high | D-28 "any deferred existing kind is compared before its exemplar is selected". | |
| S109 | 346 | Odłożone rodzaje i formatowanie | repeated-decision-or-config | own | | medium | Repeats D-28 (general checks cover all code) and S103. | |
| S110 | 346-348 | Odłożone rodzaje i formatowanie | repeated-decision-or-config | own | | high | D-28 "full-compliance source invariants ... without a transitional per-file no-regression invariant". | |
| S111 | 352 | Where in code | structure | own | | high | Path. | |
| S112 | 353 | Where in code | structure | own | | high | Path. | |
| S113 | 354 | Where in code | structure | own | | high | Path. | |
| S114 | 355 | Where in code | structure | own | | high | Path. | |
| S115 | 356 | Where in code | structure | own | | high | Path. | |
| S116 | 357 | Where in code | structure | own | | high | Path. | |
| S117 | 358 | Where in code | structure | own | | high | Path. | |
| S118 | 359 | Where in code | structure | own | | high | Path. | |
| S119 | 360 | Where in code | structure | own | | high | Path. | |
| S120 | 361 | Where in code | structure | own | | high | Path. | |
| S901 (extra unit: the title and header lines "# Coding guidelines — loop2", "- **Discipline:** coding", "- **Applies to:** browser-view · simulation · account-server · build-tools · deployment · agent-workflow") | 1-4 | file header | structure | template | | high | Header fields of the form; no unit covers lines 1-4. | |

Left out as the handoff says: the fields *Decision*, *Invariant*, *Good*, *Bad* of the rules, the fenced examples and the headings.
A check of the units file against the line numbers of `coding.md` found no other uncovered stretch.

## 2. Counts per group

Counted over the rows above with `grep -c` (members count as rows; S901 included): 134 rows = 120 units, minus 13 split units
(S001, S027, S034, S045, S047, S050, S053, S056, S057, S058, S064, S065, S066), plus their 26 members, plus the extra unit S901.

| group | own | template | total |
|---|---|---|---|
| known-practice | 0 | 9 | 9 |
| project-decision | 10 | 9 | 19 |
| derivable-case | 2 | 6 | 8 |
| state-listing | 4 | 0 | 4 |
| repeated-decision-or-config | 54 | 3 | 57 |
| structure | 35 | 2 | 37 |
| all | 105 | 29 | 134 |

Derivable cases by origin: agent-mistake 1 (S058b), no-mistake 7 (S045b, S046, S057b, S060, S061, S064b, S098), unknown 0.
Low-confidence rows: 6 (S001a, S001b, S046, S057a, S057b, S098).

## 3. Sentences I am least sure of

Low-confidence rows first, then the medium ones where the second group is a real rival.

- S001a, S001b: project-decision or repeated-decision-or-config (the same trigger stands in `AGENTS.md`, and D-28 holds the scope of tests).
- S046: derivable-case or project-decision (the boundary between a failure and a refusal; the template carries it twice).
- S057a: known-practice or project-decision ("sprawa" is defined by loop2 and tied to its list).
- S057b: derivable-case or known-practice (consistent field names).
- S098: derivable-case or repeated-decision-or-config.
- S045a: project-decision or known-practice (operational error against expected refusal).
- S054: state-listing or project-decision.
- S062, S083: project-decision or derivable-case (the list is a promise, so each item leaves a line).
- S084, S085: repeated-decision-or-config or project-decision (they are the "how an item is added" text the template asks for).
- S086-S101 (the sixteen sentences of Examples): repeated-decision-or-config or project-decision. The per-rule glosses
  are not in D-30 (it only lists the fourteen rules and one reason), but they bind nothing and the rules do not block.
  If the later stage treats them differently from one another it should decide them as one group.
- S018, S019: repeated-decision-or-config or project-decision (each carries one author-facing consequence that no other sentence states).
- S058a: project-decision or repeated-decision-or-config (four of five field names are in D-252 *complies*).

## Searches not found or unclear

- `git log --diff-filter=A --name-only -- docs/task-cycles` (the handoff's form) returned nothing from `HEAD`, because the
  records were added and removed on side branches and the merges hide them. I found them with `--all` (the records are in
  commits `23b5240`, `905c1ab`, `dd55ec2`, `9a8dd99`). The handoff's command as written is not enough.
- The records of the cycle `reguly-awarii-i-logow` (commit `23b5240`) hold the reviews and findings, but not the task
  document `reguly_awarii_i_logow_loop2.md` (it lives in the vault, which I did not read), so I could not check its
  question-by-question settlements against the sentences. For the origin of the sentences added in `3400178` I used the
  cycle record, the author handoff, the review reports, the two findings files and the two files
  `.runs/coding/failure-rules-proposals.md` and `failure-rules-critique-verdict.md` of the main checkout
  (`[the main checkout] .runs\coding\`); these are ignored by git and outside the worktree, which the handoff did not
  list, so I read them read-only and I name this here.
- Origin `no-mistake` for S045b, S046, S057b, S060, S061, S064b means: the sentence was added in `3400178` as a translation
  of the template, and I found no remark in the cycle record or the reviews that ties it to a mistake. It does not mean I
  found a statement that no mistake lay behind it. The reviews of that cycle (I1 to I3, N1 to N3, return step I1) concern
  code, D-253's binding sentences and reasons in the rule text; none concerns these sentences.
- The record of the cycle `coding-guidelines` (351 lines plus hundreds of report files) I read only through searches for
  `example`, `RUF100`, `E402`; S098's origin rests on that, so it is the weakest origin in the table (`low`).
- The sentence S058b: the evidence of the mistake (a proposal listing `linkPurpose` as an identifier) is of the proposal
  stage and not of a code author, so whether the later stage counts it as "an agent's mistake" is a call for the orchestrator.
- The two sentences of the failure section changed after adoption (`defa71f`: program to process; `b891590`: the qualifier
  "które tych danych nie dotykają" in S051, tied to review finding I1 of the return step; `af2cfae`: the browser sentence
  S053 and the end of S054) are all `repeated-decision-or-config` or `state-listing`, so their origin was not needed.
- I did not check whether D-253 or `coding-browser-module.md` would still say what S053b says once S053b is gone (the
  function name and the path appear in `coding-browser-module.md`, found by `grep installLastResort`); that is for the
  later stage.
- Not found: any statement of the functions `writeFailure`, `ReasonedFailure`, `writeEvent`, `installLastResort` in
  `foundations/*.md` (grep, no match), which is why S048, S050b and S063 are `project-decision` and not repeats.
