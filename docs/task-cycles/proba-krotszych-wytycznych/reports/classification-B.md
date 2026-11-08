# Classification B of the sentences of guidelines/coding.md

Worktree `the worktree of the task`, `guidelines/coding.md` (361 lines),
units from `reports/inputs-sentences.md` (S001-S120). Labels: `known-practice` (KP), `project-decision` (PD),
`derivable-case` (DC), `state-listing` (SL), `repeated-decision-or-config` (RD), `structure` (ST).

How the work was done (short): all units read against the file, the template
(`.the-way/product-guidelines/coding/template.md`), D-28..D-33, D-252, D-253, `ruff.toml` and the task
document. Origins of the derivable cases come from `git log -S` on `guidelines/coding.md` and from the cycle
records `docs/task-cycles/reguly-awarii-i-logow/` (commit 23b5240) and `docs/task-cycles/coding-guidelines/`
(commit dd55ec2); details under the table.

Column `practice name` is filled only for `known-practice`. Column `origin` only for `derivable-case`.
Text of a member is quoted only for split units.

## 1. Table

| id | lines | rule (section) | group | source | origin | confidence | reason | practice name |
|---|---|---|---|---|---|---|---|---|
| S001 | 8 | When to read | project-decision | template | | medium | the condition under which the file is read (form requirement WAY-212); "także skryptów i testów" is loop2's own widening | |
| S002 | 8-9 | When to read | project-decision | own | | medium | tells the author to apply the invariants through the methods the foundation records; no known name carries it | |
| S003 | 10 | When to read | repeated-decision-or-config | own | | high | repeats D-28 (loop2 adopts the pinned templates) | |
| S004 | 14 | Kinds of code | structure | own | | high | table header row | |
| S005 | 16 | Kinds of code | structure | own | | high | table row | |
| S006 | 17 | Kinds of code | structure | own | | high | table row | |
| S007 | 18 | Kinds of code | structure | own | | high | table row | |
| S008 | 19 | Kinds of code | structure | own | | high | table row | |
| S009 | 20 | Kinds of code | structure | own | | high | table row | |
| S010 | 21 | Kinds of code | structure | own | | high | table row | |
| S011 | 22 | Kinds of code | structure | own | | high | table row | |
| S012 | 23 | Kinds of code | structure | own | | high | table row | |
| S013 | 24 | Kinds of code | structure | own | | high | table row | |
| S014 | 25 | Kinds of code | structure | own | | high | table row | |
| S015 | 26 | Kinds of code | structure | own | | high | table row | |
| S016 | 37-40 | Linter | repeated-decision-or-config | own | | high | ESLint version, config file name, sets and their versions: values of `eslint.config.mjs`/`package.json` and D-29 | |
| S017 | 40-41 | Linter | repeated-decision-or-config | own | | high | parser API and globals versions, compiler stays TS 7: D-29 verbatim | |
| S018 | 41-44 | Linter | repeated-decision-or-config | own | | medium | `noInlineConfig`, `--max-warnings 0` and "eslint-disable fails the check" are D-29; the consequence is also author-relevant but Good/Bad of the rule and S029 carry it | |
| S019 | 44-46 | Linter | repeated-decision-or-config | own | | high | no own rules, only listed ignores, file patterns cover every code directory: D-29 | |
| S020 | 46-47 | Linter | repeated-decision-or-config | template | | high | "review holds the configuration to the decision": D-29 verification and the template's own sentence | |
| S021 | 47-49 | Linter | repeated-decision-or-config | own | | high | empty suppressions file of the test: D-29 | |
| S022 | 51-53 | Linter | repeated-decision-or-config | own | | high | Ruff version, `ruff.toml`, 393 of 407, fourteen examples: D-30 and `ruff.toml` (the task's own example) | |
| S023 | 53-55 | Linter | repeated-decision-or-config | own | | high | `--ignore-noqa`, explicit config, noqa does not silence: D-30 | |
| S024 | 55-56 | Linter | repeated-decision-or-config | own | | medium | `.py`/`.pyi` scope with extensionless Python skipped: D-30 "every .py and .pyi file"; the extensionless remark is a consequence of that scope, not a separate rule (added in 770688f with the D-29..D-33 flags, no mistake record) | |
| S025 | 58-61 | Linter | repeated-decision-or-config | own | | high | ShellCheck version, flags, default checks, no example rules: D-31 | |
| S026a | 61 | Linter | repeated-decision-or-config | own | | medium | "Test wymienia skrypty po nazwie:" - D-31 "run on it by name" and verification "named in the test" | |
| S026b | 61-62 | Linter | project-decision | own | | high | "nowy skrypt Bash dopisz do listy w `tests/quality/test_quality_invariants.py`." - what the author must do (the task names it as staying) | |
| S027 | 63-64 | Linter | project-decision | template | | medium | "do not add `# shellcheck disable`; review rejects it": author action; repeats D-31 verification (violates) and the template's "review finds such a comment"; alt RD | |
| S028 | 64-65 | Linter | repeated-decision-or-config | own | | medium | embedded commands in YAML and test literals are outside the scope: D-31 says it; could be read as a case derived from "standalone" (alt DC), but it stood in the very first version (a98222d, no mistake record) | |
| S029 | 67 | Linter | project-decision | template | | medium | author action "fix the report in the file instead of silencing" (the task names it as staying); alt KP ("do not suppress warnings") | |
| S030 | 67-68 | Linter | repeated-decision-or-config | template | | low | "changing the set needs a human-accepted change of the decision" is the last sentence of D-29/D-30/D-31; but it is also what the author does when a rule is wrong; alt PD | |
| S031 | 68-70 | Linter | repeated-decision-or-config | template | | high | pinned versions in declared dependencies, tests run local copies: template "Pinned versions" and D-29..D-33 "local pinned" | |
| S032 | 113-117 | Formatter | repeated-decision-or-config | own | | high | Prettier version, flags, defaults (two spaces, semicolons, quotes, 80, LF): D-32 | |
| S033 | 117-118 | Formatter | repeated-decision-or-config | own | | high | no ignore file hides a file: D-32 | |
| S034a | 118-119 | Formatter | repeated-decision-or-config | own | | high | "Edytor korzysta z `prettier.config.mjs`, który nie ustawia żadnej opcji, więc formatuje tak samo;" - D-32 | |
| S034b | 119 | Formatter | project-decision | own | | medium | "nie dodawaj do niego opcji." - author action, D-32 verification (violates) names it too | |
| S035 | 119-120 | Formatter | repeated-decision-or-config | own | | high | `.gitattributes` keeps LF on Windows: D-32 "narrow repository attributes" | |
| S036 | 120-123 | Formatter | repeated-decision-or-config | own | | medium | scope and exclusions: D-32 (excluded kinds, no historic exceptions in its Rejected, review of `prettier-ignore`) | |
| S037 | 140-141 | Dependency audit | repeated-decision-or-config | own | | high | D-33 first sentence | |
| S038 | 141-145 | Dependency audit | repeated-decision-or-config | own | | high | npm version, command, fails on low and above, info does not block: D-33 | |
| S039 | 145-147 | Dependency audit | repeated-decision-or-config | own | | high | audited dependency kinds, nested npm package not audited: D-33 | |
| S040 | 149 | Dependency audit | repeated-decision-or-config | own | | high | failed request or unreadable report fails the audit: D-33 | |
| S041 | 149-150 | Dependency audit | repeated-decision-or-config | own | | medium | new advisory can change the result: D-33 Rationale (a reason, not a rule) | |
| S042 | 150-151 | Dependency audit | repeated-decision-or-config | own | | high | threshold has no automatic revision: D-33 | |
| S043 | 151-152 | Dependency audit | repeated-decision-or-config | own | | high | only names and versions are sent: D-33 | |
| S044 | 152-153 | Dependency audit | repeated-decision-or-config | own | | high | runtime, images, system packages, non-npm are outside: D-33 | |
| S045 | 162-164 | Recording a failure | known-practice | template | | medium | definition of a failure as an unexpected, operational error (external service failure included) against an expected refusal; alt RD (D-252 adopts the rule whole) | operational errors vs expected (domain) errors |
| S046 | 164-165 | Recording a failure | derivable-case | template | origin: no-mistake | medium | "an expected refusal such as a wrong password is an ordinary answer" follows from the definition in S045 ("for a reason other than an expected refusal"); alt KP | |
| S047a | 165-166 | Recording a failure | known-practice | template | | high | "Awarię zapisuj zawsze z przyczyną, czyli z pierwotnym błędem, a nie z samym napisem," | error cause chaining (keep the original error, not a bare string) |
| S047b | 166-167 | Recording a failure | known-practice | template | | medium | "raz, tam gdzie kod ją obsługuje." - alt PD (the choice of where is a rule, but it is the usual one) | log once, at the place where the error is handled (no log-and-rethrow) |
| S048 | 167-168 | Recording a failure | project-decision | own | | high | names `writeFailure`, `src/server/log-line.ts` and `ReasonedFailure`: loop2's code, no known name | |
| S049 | 170-171 | Recording a failure | known-practice | template | | medium | every process has one handler for what nothing handled; "(D-253)" is a pointer; alt RD (D-252 adopts the rule) | global uncaught-exception handler (last-resort handler) |
| S050 | 171-173 | Recording a failure | repeated-decision-or-config | own | | medium | D-253 first binding sentence (processes touching accounts, `installLastResort`, the default print could quote values); it is also what an author of such a process does, alt PD | |
| S051 | 173-175 | Recording a failure | repeated-decision-or-config | own | | medium | D-253 third binding sentence (scripts that touch no account data meet the rule with the default print); alt PD | |
| S052 | 175-177 | Recording a failure | state-listing | own | | high | lists which files already have the handling (the task's own example) | |
| S053a | 177 | Recording a failure | state-listing | own | | high | "Przeglądarka też ją ma:" - states that the browser already meets the rule | |
| S053b | 177-180 | Recording a failure | repeated-decision-or-config | own | | medium | what the browser handler does (cancels the event, one plain-text line with kind, code, place, once until reload): D-253 second binding sentence; alt PD | |
| S054 | 180-181 | Recording a failure | project-decision | own | | low | `deploy/loop2-deploy` is covered and leaves no final line when killed; not in D-253 (the cycle record says `coding.md` carries it, cause 9 deferred), so removing it loses the fact; alt SL | |
| S055 | 190 | Hiding a failure | known-practice | template | | high | the task's own example | fail loudly (do not swallow errors, no silent failure) |
| S056 | 191-193 | Hiding a failure | project-decision | template | | high | degraded mode only where a task sets it, recorded as a product decision, always leaves a log line (the task names it as staying) | |
| S057 | 202-205 | Identifiers in log lines | known-practice | template | | medium | a line of one case carries the identifiers that join its events under the same names, so one search finds the case; the hook "from the list `### Logging scope`" is loop2's but the practice is the same; alt PD | correlation IDs in structured logs (stable field names) |
| S058a | 205-207 | Identifiers in log lines | project-decision | own | | high | "W kodzie Node.js stałe pola wiersza to `event` albo `failure`, `kind`, `code`, `place` i identyfikatory z listy;" - loop2's fixed field names (D-252 says "fixed field names" without listing `event`) | |
| S058b | 207-208 | Identifiers in log lines | derivable-case | own | origin: unknown | medium | "dalsze pole, takie jak `linkPurpose`, jest polem, a nie pozycją listy." follows from the list being the promise of identifiers; it came with the section in 3400178 as the author's choice Q2 of the cycle, taken from proposals and a critique verdict (files under `.runs/`, not in the tree), so a mistake behind it cannot be shown or excluded | |
| S059 | 208-209 | Identifiers in log lines | repeated-decision-or-config | own | | high | console line is plain text, Bash keeps its text: D-252 second sentence | |
| S060 | 209-211 | Identifiers in log lines | derivable-case | template | origin: no-mistake | high | the task's own example; follows from "identifiers join the events of a case"; came with the section (3400178) and the template (aa4a41c); the cycle record's findings I1-I3 and Minor do not touch it | |
| S061 | 211-212 | Identifiers in log lines | derivable-case | template | origin: no-mistake | high | last-resort line need carry none because it does not know the case: follows from the same purpose; same origin as S060 | |
| S062 | 221 | Business events | project-decision | template | | low | each listed event leaves a log line - the rule itself, with loop2's list; alt KP (business-event/audit logging) or DC (follows from "the list is the promise") | |
| S063 | 222 | Business events | project-decision | own | | high | names `writeEvent` and `src/server/log-line.ts` | |
| S064a | 231 | Secrets and personal data | known-practice | template | | high | "Logi nie zawierają żadnego sekretu, bez wyjątku," | never log secrets |
| S064b | 231-232 | Secrets and personal data | derivable-case | template | origin: no-mistake | medium | "więc identyfikator będący sekretem zostaje poza nimi, nawet gdyby stał na liście." follows from "no secret, no exception"; came with 3400178, not in any finding | |
| S065a | 232 | Secrets and personal data | known-practice | template | | high | "Nie zawierają danych osobowych;" | do not log personal data (data minimisation) |
| S065b | 232-234 | Secrets and personal data | project-decision | template | | high | "jedynym wyjątkiem od tego zakazu są identyfikatory z listy `### Logging scope`." - the one exception; no known name | |
| S066a | 234 | Secrets and personal data | known-practice | template | | medium | "Kod nie zapisuje całego obiektu ani treści żądania," alt PD (a loop2 rule inherited from the template) | log allow-listed fields, never whole objects or request bodies |
| S066b | 234-235 | Secrets and personal data | derivable-case | template | origin: no-mistake | low | "co nie dotyczy samego błędu." scope carve-out; the error is governed by S067; alt PD | |
| S067 | 235-237 | Secrets and personal data | project-decision | template | | high | an original error that quotes values is written without them, with kind, code and place; this rule beats `### Recording a failure` (precedence is a choice) | |
| S068 | 237-238 | Secrets and personal data | project-decision | own | | high | read only name, code and SQLite `errcode`, never `message` or `stack` (the task's own example) | |
| S069 | 247 | Logging scope | structure | own | | high | label of the identifiers list | |
| S070 | 249 | Logging scope | structure | own | | high | list bullet of the logging scope | |
| S071 | 251 | Logging scope | structure | own | | high | label of the events list | |
| S072 | 253 | Logging scope | structure | own | | high | list bullet of the logging scope | |
| S073 | 254 | Logging scope | structure | own | | high | list bullet of the logging scope | |
| S074 | 255 | Logging scope | structure | own | | high | list bullet of the logging scope | |
| S075 | 256 | Logging scope | structure | own | | high | list bullet of the logging scope | |
| S076 | 257 | Logging scope | structure | own | | high | list bullet of the logging scope | |
| S077 | 258 | Logging scope | structure | own | | high | list bullet of the logging scope | |
| S078 | 259 | Logging scope | structure | own | | high | list bullet of the logging scope | |
| S079 | 260 | Logging scope | structure | own | | high | list bullet of the logging scope | |
| S080 | 261 | Logging scope | structure | own | | high | list bullet of the logging scope | |
| S081 | 262 | Logging scope | structure | own | | high | list bullet of the logging scope | |
| S082 | 263 | Logging scope | structure | own | | high | list bullet of the logging scope | |
| S083 | 265 | Logging scope | project-decision | template | | low | "the list is the product's promise, not an inventory of its code" - template requires the statement, it is a stance with no ready name; alt RD (D-252 Rationale says the list can drift) | |
| S084 | 265-267 | Logging scope | repeated-decision-or-config | template | | low | D-252 third sentence ("an agent adds alone an item that fits the principle, an identifier of a thing included"); also an instruction to the author; alt PD | |
| S085 | 267-268 | Logging scope | repeated-decision-or-config | template | | low | D-252 ("anything that points to a person takes the human's consent"); also an instruction to the author; alt PD | |
| S086 | 274-275 | PLW1510 | repeated-decision-or-config | own | | medium | the rule is an example (not blocking): D-30 lists PLW1510 and `ruff.toml` omits it; the sentence adds the reason; alt PD | |
| S087 | 275 | PLW1510 | repeated-decision-or-config | own | | medium | same as S086 | |
| S088 | 279 | I001 | repeated-decision-or-config | own | | medium | same as S086 (I001 not blocking) | |
| S089 | 283-284 | ISC004 | repeated-decision-or-config | own | | medium | same as S086 | |
| S090 | 288-289 | UP031 | repeated-decision-or-config | own | | medium | same as S086 | |
| S091 | 293 | RUF059 | repeated-decision-or-config | own | | medium | same as S086 | |
| S092 | 297 | PIE808 | repeated-decision-or-config | own | | medium | same as S086 | |
| S093 | 301-302 | RUF007 | repeated-decision-or-config | own | | medium | same as S086 | |
| S094 | 306 | RUF012 | repeated-decision-or-config | own | | medium | same as S086 | |
| S095 | 310 | PLR0402 | repeated-decision-or-config | own | | medium | same as S086 | |
| S096 | 314-315 | FURB167 | repeated-decision-or-config | own | | medium | same as S086 | |
| S097 | 319 | RUF100 | repeated-decision-or-config | own | | low | legacy `noqa: E402` may stay although E402 is not in the set: `ruff.toml` and D-30 show E402 is absent; alt PD (a permission for old code) | |
| S098 | 320 | RUF100 | derivable-case | own | origin: no-mistake | medium | "Nie uprawnia to do wyciszenia reguły blokującej." follows from "no suppression comment takes effect" (D-30) and S029; written in a98222d by slice S11, whose review had no findings (cycle record `coding-guidelines`) | |
| S099 | 324 | SIM117 | repeated-decision-or-config | own | | medium | same as S086 | |
| S100 | 328-329 | FURB192 | repeated-decision-or-config | own | | medium | same as S086 | |
| S101 | 333 | SIM102 | repeated-decision-or-config | own | | medium | same as S086 | |
| S102 | 337-338 | Odłożone rodzaje i formatowanie | repeated-decision-or-config | own | | high | testing rules, patterns by level and the explicit-time example stand in `guidelines/testing.md`: D-28 | |
| S103 | 338 | Odłożone rodzaje i formatowanie | repeated-decision-or-config | own | | high | general checks cover test files: D-28 | |
| S104 | 339 | Odłożone rodzaje i formatowanie | repeated-decision-or-config | own | | high | Python/Bash auto-formatting deferred: D-28 | |
| S105 | 339-340 | Odłożone rodzaje i formatowanie | repeated-decision-or-config | own | | high | exemplars for build, deployment, entry points, HTML, CSS deferred: D-28 | |
| S106 | 340-342 | Odłożone rodzaje i formatowanie | repeated-decision-or-config | own | | medium | CSS has no pattern or kind guidelines, its tested rules stand in the styleguide: D-28 (decision text and Rationale) | |
| S107 | 343-344 | Odłożone rodzaje i formatowanie | repeated-decision-or-config | own | | medium | repeats the table rows (saved-game, mail-sending) and D-28; alt SL | |
| S108 | 345 | Odłożone rodzaje i formatowanie | repeated-decision-or-config | own | | high | a deferred existing kind is compared before its exemplar is chosen: D-28 | |
| S109 | 346 | Odłożone rodzaje i formatowanie | repeated-decision-or-config | own | | high | general checks cover the whole accepted scope: D-28 | |
| S110 | 346-348 | Odłożone rodzaje i formatowanie | repeated-decision-or-config | own | | high | full compliance for adopted linters, no no-regression check: D-28 | |
| S111 | 352 | Where in code | structure | own | | high | path in Where in code | |
| S112 | 353 | Where in code | structure | own | | high | path in Where in code | |
| S113 | 354 | Where in code | structure | own | | high | path in Where in code | |
| S114 | 355 | Where in code | structure | own | | high | path in Where in code | |
| S115 | 356 | Where in code | structure | own | | high | path in Where in code | |
| S116 | 357 | Where in code | structure | own | | high | path in Where in code | |
| S117 | 358 | Where in code | structure | own | | high | path in Where in code | |
| S118 | 359 | Where in code | structure | own | | high | path in Where in code | |
| S119 | 360 | Where in code | structure | own | | high | path in Where in code | |
| S120 | 361 | Where in code | structure | own | | high | path in Where in code | |

Units not in the units file: none. Not units (as the handoff says): the title and header lines 1-4, the
section headings, the `Decision/Invariant/Good/Bad` lines of each rule, the fenced examples.

## 2. Counts per group

| group | own | template | total |
|---|---|---|---|
| known-practice | 0 | 9 | 9 |
| project-decision | 8 | 8 | 16 |
| derivable-case | 2 | 5 | 7 |
| state-listing | 2 | 0 | 2 |
| repeated-decision-or-config | 53 | 5 | 58 |
| structure | 36 | 0 | 36 |
| all | 101 | 27 | 128 |

Rows (units and members): 128. Confidence: high 81, medium 39, low 8.

## 3. Sentences I am least sure of

- S030 (RD or PD): last sentence of D-29/D-30/D-31, but also the author's step when a rule seems wrong.
- S084, S085 (RD or PD): near-verbatim D-252 binding sentence, yet they say what an agent does alone and what needs the human; the later stage should decide whether "the author's action" overrides "repeats the Decision".
- S050, S051, S053b (RD or PD): the same pattern for D-253.
- S054 (PD or SL): the only place that records `deploy/loop2-deploy`; not in D-253.
- S062 (PD, KP or DC): the plain rule "each listed event leaves a line".
- S083 (PD or RD): the stance "promise, not inventory".
- S066b (DC or PD): carve-out "does not concern the error itself".
- S097 (RD or PD): permission for legacy `noqa: E402`.
- S086-S101, the rest of the Examples (RD or PD): each sentence restates "this Ruff rule does not block" (D-30, `ruff.toml`) and adds a reason; if the reason is the point, they are PD.
- S057 (KP or PD): the practice is the correlation id, but the sentence also fixes "names from the list, the same in every line".
- S045, S046, S049 (KP, RD or DC): template sentences that D-252 adopts whole.
- S058b (DC, origin unknown): origin cannot be reached.

## Origin of the derivable cases (how it was established)

- S046, S058b, S060, S061, S064b, S066b: first appear in commit 3400178 (2026-11-02, `git log -S` on
  "Spodziewana odmowa", "dalsze pole", "nie niesie żadnego", "nie musi nieść", "nawet gdyby stał"; "co nie dotyczy samego" gives no hit
  because of line breaks, it is in the same commit by the section text). Cycle record
  `docs/task-cycles/reguly-awarii-i-logow/` (added by 23b5240, `cycle.md`, `reports/05-findings.md`,
  `reports/11-return-findings.md`, `04-review-report.md`, `10-return-review-report.md`): the findings (I1 message of an
  error written, I2 readiness line, I3 test; return finding I1 on D-253 exceptions) and the Minor items
  (N3 reasons in rule text) touch other sentences; none ties these six to an agent's mistake. The same sentences stand in the
  template since aa4a41c in the-way (2026-11-01); the record of that template task is not in the-way's tree. So: `no-mistake`
  for five, `unknown` for S058b, whose sentence is the cycle's choice Q2 built on `.runs/` files that are not in the tree.
- S098: first appears in a98222d (2026-10-20). Cycle record `docs/task-cycles/coding-guidelines/cycle.md` (dd55ec2): slice S11
  reviewed with no findings; final whole-branch review findings I-1 and I-2 concern native CI and fixtures. `no-mistake`.

## Searches not found or unclear

- The record of the-way's own task that wrote the template (aa4a41c, 2026-11-01) is not in the-way's history, so whether a
  template sentence of the failures-and-logs rules was added after an agent's mistake in the-way cannot be shown; the loop2
  record shows none. S046, S060, S061, S064b, S066b are `no-mistake` only for loop2's history.
- The files `.runs/coding/failure-rules-proposals.md` and `failure-rules-critique-verdict.md` (source of S058b's choice) are
  ignored by git and not in the worktree; hence `origin: unknown` for S058b.
- `git log -S "co nie dotyczy samego"` and `-S "Ruff sprawdza pliki"` found nothing because of line breaks in the file; the commits
  were found by shorter fragments of the same sentences.
- Whether the task wants author-action sentences that repeat a decision (S084, S085, S050, S051, S030) in RD or PD is not
  fully settled by its wording ("zostaje to, co autor kodu ma zrobić"); I used RD when the sentence is the decision's own
  binding sentence and PD when it names a concrete step (file to edit, option not to add, directive not to write).
