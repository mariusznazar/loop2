# Foundation step — committed boundary

Actor: foundation_author. Status: completed within the named boundary; no check implementation, covered code, configuration, guideline or instruction-file change. Independent critique remains with the orchestrator after the whole change. No subagents, host access or deployment work.

Worktree: C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines. Base and current origin/main: c379207bfd8bd148d3589ea75604ba5165915d01. Result commit: 75a5fc91b8e74c81cba6f0aded3f2bf3752475a6. Gitlink and actual .the-way checkout: d829e3aa6242a9b8901274531dd82fd5c7d87628, verified equal before use. Active branch: task/coding-guidelines, no configured upstream.

Authoritative inputs: foundation-handoff.md; whole frozen task.md; plan.md Foundation entries and Choices; pinned task-cycle skill and the four project element wrappers, pinned element skills/templates/common rules/way_of_working and their examples; pinned product-guidelines/reading.md and both general/coding templates. Source-only MVP contributes no projected entry here.

Input SHA-256:
- `.runs/task-cycles/coding-guidelines/task.md`: `718f0d973b71aba5c3039e8ec7c6549b53c1c42faca08a85a0d56bb02c85dbc3`
- `.runs/task-cycles/coding-guidelines/plan.md`: `4880e4b8ae29f58862e61f8b0ea9516175eb9be36583770c53411f7d4a1cd604`

## Foundation and guideline selection

All seven parts were read whole from foundations/part_map.md: browser-view, simulation, account-server, build-tools, deployment, agent-workflow and product-foundation. Six hold covered code; the seventh holds the changed foundation. Existing full current invariant file, linked environment facts and product glossary were read, as was the pinned process glossary. No glossary addition is required.

Exhaustive latest-Scope inspection of the base log selected all D-01 through D-27; every selected entry was read whole, including rationale/rejected and linked entries. The independent direct Scope comparison in foundation-verify.py found exactly the same 27 identifiers; source lines and current versions are in foundation-verification.json under scope_selection. Current versions are D-03/2, D-04/3, D-05/3, D-06/3 and /1 for the others. No selected current version is missing.

The entire five-element foundation was searched before writing with `rg -n` for linter, eslint, ruff, shellcheck, prettier, formatting, exemplar, recommended, vulnerabilities, guidelines, rule set and audit; no existing adoption, conflicting choice or duplicate was found. Whole-entry reading also checked broader consequences: compiler/package boundary, view/simulation isolation, content identifiers, HTTP errors, tool ownership, deployment boundaries and future new paths. Existing D-01–D-27 meanings are unchanged. The source/preservation audit confirms every preexisting decision, invariant and fact block remains present unchanged modulo normal repository LF normalization.

Guidelines directory is absent. The task itself creates coding.md plus content-data, simulation-module, browser-module and http-application kind files, so it does not wait for its own output. There is no visible-behavior or styleguide change here. Future general/kind selection remains exactly the handed-over selection; no discrepancy was found.

## Accepted settlement mapping and meaning

| Row | Entry / fingerprint | Polish meaning |
|---|---|---|
| 1 | D-28/1 @719c9a67 | Loop2 przyjmuje szablony wytycznych, uzgodnione odłożenia i pełną zgodność przy wprowadzeniu linterów zamiast przejściowej kontroli długu. |
| 2 | D-29/1 @cd8014d6 | TS/JS kontroluje pełny przyjęty zestaw ESLint z zachowaniem TS7, pomocniczym API TS6 i ochroną konfiguracji oraz zakresu przed wyłączeniem. |
| 3 | D-30/1 @19dcd3f6 | Python sprawdza 393 reguł Ruff; wskazane 14 pozostaje przykładami, a wyciszenie reguły blokującej jest naruszeniem. |
| 4 | D-31/1 @e3145b98 | Samodzielne skrypty Bash podlegają pełnym domyślnym kontrolom ShellCheck na każdym poziomie komunikatów, bez wyciszeń i zewnętrznych nadpisań. |
| 5 | D-32/1 @7eedf283 | Prettier formatuje cały przyjęty zakres webowy ustawieniami domyślnymi i LF także na Windows, bez wyjątków dla starego kodu. |
| 6 | D-33/1 @fce481a6 | Audyt npm blokuje nowe względem początku zmiany pary nazwa–wersja z podatnością od low, a niepewny wynik nie oznacza przejścia. |
| 7 | D-34/1 @3c028ef9 | Wzorcem content-data jest resources.ts; kształt katalogu jest przykładem, a wiążące pozostają obecne zasady izolacji symulacji. |
| 8 | D-35/1 @c2db6e62 | Wzorcem simulation-module jest game.ts, bez obowiązku GameResult dla każdego pomocnika i z zachowaniem obecnych zasad wejść oraz izolacji. |
| 9 | D-36/1 @39db0c31 | Wzorcem browser-module jest status-row.ts; organizacja kontrolek i aktualizacji pozostaje przykładem obok obecnych reguł DOM i danych gry. |
| 10 | D-37/1 @c04bd997 | Wzorcem http-application jest app.ts, a oddzielenie tworzenia aplikacji od portu jest przykładem bez nowej blokady struktury fabryki. |
| 11 | eslint-recommended-rules/1 @3f3d5421 | Wydanie @eslint/js 10.0.1 określa pełną listę 64 reguł recommended i ich poziom error. |
| 12 | typescript-eslint-typechecked-rules/1 @f030ff1d | Zestaw typescript-eslint 8.71.2 utrwala wszystkie dodatkowe reguły oraz odziedziczone wyłączenia reguł podstawowych. |
| 13 | ruff-default-rules/1 @46b97f28 | Ruff 0.17.1 zawiera dokładnie wymienione 407 reguł domyślnych bez preview, stanowiących podstawę przyjętego podzbioru. |
| 14 | shellcheck-default-bash-checks/1 @30288d55 | ShellCheck 0.11.0 określa kompletny skład kontroli domyślnych przez parser i wskazane listy analizatorów, z odrębnym doborem kontroli opcjonalnych. |
| 15 | eslint-source-rules/1 @01072719 | Żaden objęty plik TS/JS nie narusza blokującej reguły ESLint ani nie wyłącza jej dyrektywą w źródle. |
| 16 | ruff-source-rules/1 @d7e3e90e | Żaden objęty plik Python nie narusza blokującej reguły Ruff ani nie wycisza jej w źródle. |
| 17 | shellcheck-source-rules/1 @007bded4 | Żaden objęty skrypt Bash nie narusza domyślnych kontroli ShellCheck ani nie zmienia ich dyrektywą w źródle. |
| 18 | eslint-configuration-rules/1 @6a43710f | Faktyczna konfiguracja ESLint zachowuje dokładny przyjęty zestaw reguł, ustawień i pełny zakres plików. |
| 19 | prettier-source-format/1 @5a23ca31 | Każdy plik w przyjętym zakresie ma format Prettier i zakończenia LF niezależnie od platformy. |
| 20 | introduced-npm-vulnerabilities/1 @da4f7801 | Zmiana nie dodaje objętej wersji zależności npm ze znaną podatnością od low, a brak wiarygodnych danych nie daje przejścia. |
| 21 | guidelines-form/1 @7196030f | Pliki wytycznych zachowują dokładną formę szablonów przypiętego the-way, także tabele i przypadki zasad. |
| 22 | guidelines-reference-current/1 @01e19765 | Odwołania wytycznych wskazują aktualny fundament danego commita i stanu po scaleniu. |

Rows 21–22 copy the exact identifiers and sentences of the pinned general template. Their Derives from is none, as that template requires. They are not falsely attributed to D-28. New decisions D-28–D-37 use `Approved by: Mariusz, merge of <request link>`; root explicitly confirmed the placeholder until the draft PR exists, followed by placeholder-only substitution before ready-for-review. No agent go-ahead is labelled human approval.

D-28 carries the explicit departure and accepted deferrals. D-29 keeps the compiler/API distinction, all JS/TS rules, new-path coverage and configuration/suppression protection. D-30 keeps the exact fourteen Ruff example rules and explicit isolated blocking selection. D-31 keeps default nonoptional Bash checks, all levels and standalone-script scope. D-32 keeps the full formatter scope, exclusions, shared explicit defaults and LF. D-33 keeps exact actual package-name/version pairs, all dependency classes/manifests/lockfiles, advisory-range matching, live database semantics, valid offline empty-set comparison and no successful verdict on unavailable/incomplete/unsupported input. D-34–D-37 preserve the distinction between examples and existing architectural rules; no new factory, universal return type, mandatory update method or catalogue-shape rule was added.

## Membership and source evidence

foundation-source-evidence.json records every unauthenticated publisher URL and HTTP 200 response. foundation-source-* files hold the exact upstream edition read. The release-existence check independently reopened four public release endpoints and confirmed @eslint/js 10.0.1, typescript-eslint 8.71.2, Ruff 0.17.1 and ShellCheck v0.11.0. Requests contained no user account names, owner names, email addresses or local paths.

The ESLint fact lists all 64 rule names and error levels with no configured options. The TypeScript fact includes every added error and disabled core rule plus complete source composition through flat base, compatibility overrides and recommended-type-checked; combining them with ESLint resolves to 92 active rules. Ruff records all 407 individually named defaults from DEFAULT_SELECTORS and the nonpreview selection expression; the exact fourteen adopted exclusions leave 393. ShellCheck publishes compositional membership, so its fact quotes the complete default pipeline, all default Analytics tree/node and Commands lists including declaration expansions, ControlFlow composition, empty Custom checker, shell-conditioned ShellSupport list and inclusion/default-option logic; parser diagnostics are included. Optional lists remain separately gated. No invented one-to-one SC-code list substitutes for that composition.

The four facts have Method: TODO, explicitly authorized by root and permitted by the element template. No fact watch/probe was assigned by task or plan, and inventing one would expand scope. Source validation is evidence for these entries, not a standing fact-method verdict. Each remains unchecked by name: eslint-recommended-rules/1, typescript-eslint-typechecked-rules/1, ruff-default-rules/1, shellcheck-default-bash-checks/1. Whether WAY-08 deliberate-break acceptance applies to a future fact method remains the pinned template’s pending question; this change settles neither answer.

## Methods and remaining independent authors

| Invariant | Exact method | Check acceptance at this boundary |
|---|---|---|
| eslint-source-rules/1 | `python -B scripts/check_eslint.py --record .runs/eslint.jsonl` | New independent check author and deliberate-break reviewer still pending; script is not produced yet |
| ruff-source-rules/1 | `python -B scripts/check_ruff.py --record .runs/ruff.jsonl` | New independent check author and deliberate-break reviewer still pending; script is not produced yet |
| shellcheck-source-rules/1 | `python -B scripts/check_shellcheck.py --record .runs/shellcheck.jsonl` | New independent check author and deliberate-break reviewer still pending; script is not produced yet |
| eslint-configuration-rules/1 | `python -B scripts/check_eslint.py --configuration --record .runs/eslint-configuration.jsonl` | New independent check author and deliberate-break reviewer still pending; script is not produced yet |
| prettier-source-format/1 | `python -B scripts/check_format.py --record .runs/format.jsonl` | New independent check author and deliberate-break reviewer still pending; script is not produced yet |
| introduced-npm-vulnerabilities/1 | `python -B scripts/check_dependencies.py --fork-point {fork-point} --record .runs/dependency-audit.jsonl` | New independent check author and deliberate-break reviewer still pending; script is not produced yet |
| guidelines-form/1 | `python -B .the-way/product-guidelines/form_check.py --record .runs/guidelines-form.jsonl` | Existing pinned checker; future guideline cases and whole-branch deliberate-break acceptance still pending |
| guidelines-reference-current/1 | `python -B .the-way/product-guidelines/form_check.py --merge-onto {merge-onto} --record .runs/guidelines-reference.jsonl` | Existing pinned checker; future guideline cases and whole-branch deliberate-break acceptance still pending |

All six source/configuration/format/audit methods are command-shaped interfaces, not TODO: Python may name future scripts under WAY-105. None was accepted merely because a sentence exists; their methods were not invoked against missing files and have no successful verdict. Root dispatches F1 mechanics and F2–F5 independent method authors next, preserving three distinct identities for sentence, check and covered code. Existing invariant checks remain unedited; planned F6 is still pending through its separate foundation route.

ESLint Parts include browser-view, simulation, account-server and build-tools: covered code and configurations/lockfile can break them. Ruff and ShellCheck Parts include all six code parts because newly owned Python/Bash there can break them, plus build-tools configuration/tool versions. Prettier additionally includes deployment because .gitattributes can break LF. Audit includes build-tools, which owns the audited manifests and lockfiles. Guidelines form names every; guideline references name agent-workflow and product-foundation, including the pin owner. These are reach choices, not claims about current script availability.

## Part-map consequences

- build-tools responsibility now includes quality checks and introduced-version audits; its old sentence is replaced, with no incoming fingerprint links found. Its meaning: narzędzia budowania odpowiadają także za kontrolę jakości kodu i audyt nowych wersji zależności.
- scripts/build.mjs expands to nonoverlapping scripts/**; tests/quality/**, eslint.config.mjs, prettier.config.mjs, requirements-quality.in and requirements-quality.txt belong to build-tools. No file is taken from another part. scripts/** currently claims the preexisting build script; new explicit patterns await their planned files.
- guidelines/** belongs to agent-workflow. Znaczenie: część kierująca pracą agentów obejmuje także wytyczne produktu. Existing invariant-test ownership and .gitattributes in deployment are retained.
- scripts/check_dependencies.py joins the build-tools trust boundary because it reads untrusted advisory responses; this future path is currently an expected map error. npm registry direction is both because auditing transmits package-name/version data. Python Package Index is recorded as an incoming untrusted tool-distribution partner, as the accepted local Python-tool installation requires.
- No new part, critical flow, surface, severity or failure mode was invented. Existing unknown failure modes continue to imply high criticality; no lowering occurs.
- Current binding-part fingerprints: build-tools@345ace6c (changed responsibility); agent-workflow@3fe5cd78 (responsibility unchanged; Files extended).

## Autonomous choices and costs

| Choice | Alternative / cost of leaving otherwise | Chosen cost and boundary |
|---|---|---|
| New stable identifiers D-28–D-37 and descriptive rule-set/invariant names | Reusing unrelated existing questions would silently change architectural meanings | Additional entries, with exact incoming fingerprints and row mapping; all old meanings preserved |
| One coherent foundation commit in facts→decisions→invariants→map dependency writing order | Separate commits could temporarily contain dangling links without improving review | One linked boundary is reviewable; no code or configuration is mixed into it |
| Review when: none on each new decision | Invented prediction/date would falsely add an agreed review trigger | No prediction is relied on; audit threshold has explicitly no scheduled automatic review; later product experience can motivate a human decision |
| Fact Method: TODO | A new watch framework expands the accepted task; a human-only path misstates an automatable route | Four facts honestly remain unchecked; exact current source evidence is still captured |
| Full source-defined ShellCheck composition | Counting codes from comments or diagnostic emissions does not identify the complete Bash set | Longer precise source citation, with no invented rule-number catalogue |
| Add audit trust boundary and package-index partner, update npm direction | Omitting these would leave a new untrusted input/distribution exchange unrecorded | Small necessary map consequence; future trust-boundary path stays an interim error until code exists |
| Preserve CRLF by newline-empty reads/writes | Rewriting existing bytes risks unrelated blame churn | No line-ending-only change; committed repository content remains LF as before |

## Verification and full command evidence

The report helper captures raw combined stdout and stderr without PowerShell decoration; each log’s adjacent .json gives the exact argv, exit code and duration. Paths below are relative to this report directory; there is no separate stderr file because stderr is redirected into the same complete log.

| Evidence log | Exit | Result |
|---|---|---|
| foundation-guard-decisions.log + .log.json | 1 | Initial: only ten request-link errors and ten matching warnings |
| foundation-guard-environment-facts.log + .log.json | 1 | Initial: three source-quote delimiter errors, corrected without changing meaning |
| foundation-guard-invariants.log + .log.json | 0 | Initial: zero errors/warnings/unchecked |
| foundation-guard-part-map.log + .log.json | 1 | Initial: five Scope-separator errors corrected, plus expected future-file errors |
| foundation-guard-decisions-final.log + .log.json | 1 | Final: ten expected request-link placeholder errors and ten warnings; no other errors |
| foundation-guard-environment-facts-final.log + .log.json | 0 | Final: zero errors/warnings/unchecked; this is form, not a fact-method pass |
| foundation-guard-invariants-final.log + .log.json | 0 | Final: zero errors/warnings/unchecked; this is form, not an invariant-method pass |
| foundation-guard-part-map-final.log + .log.json | 1 | Final: seven expected not-yet-tracked patterns/boundary errors, two preexisting dependency-criticality warnings, one unchecked dependency graph |
| foundation-guidelines-form.log + .log.json | 0 | Existing checker exits zero with no guidelines directory; actual future guideline acceptance is still pending |
| foundation-guidelines-reference.log + .log.json | 0 | Existing checker exits zero with no guidelines directory; no future-reference fidelity is claimed |
| foundation-verification.log + .log.json | 0 | 35 source/preservation assertions passed, four release endpoints read; see JSON for the full set |
| foundation-diff-check.log + .log.json | 0 | Committed range whitespace check passes |

Exact executed check commands (each matching log and sidecar above):

- `git diff --check c379207bfd8bd148d3589ea75604ba5165915d01 HEAD` — exit 0; combined stdout/stderr: `.runs/task-cycles/coding-guidelines/reports/foundation-diff-check.log`.
- `python -B .the-way/elements/decisions/format_guard.py foundations/decisions.md --base c379207bfd8bd148d3589ea75604ba5165915d01 --merge-onto c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/foundation-decisions.jsonl` — exit 1; combined stdout/stderr: `.runs/task-cycles/coding-guidelines/reports/foundation-guard-decisions-final.log`.
- `python -B .the-way/elements/decisions/format_guard.py foundations/decisions.md --base c379207bfd8bd148d3589ea75604ba5165915d01 --merge-onto c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/foundation-decisions.jsonl` — exit 1; combined stdout/stderr: `.runs/task-cycles/coding-guidelines/reports/foundation-guard-decisions.log`.
- `python -B .the-way/elements/environment-facts/format_guard.py foundations/environment_facts.md --base c379207bfd8bd148d3589ea75604ba5165915d01 --merge-onto c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/foundation-environment-facts.jsonl` — exit 0; combined stdout/stderr: `.runs/task-cycles/coding-guidelines/reports/foundation-guard-environment-facts-final.log`.
- `python -B .the-way/elements/environment-facts/format_guard.py foundations/environment_facts.md --base c379207bfd8bd148d3589ea75604ba5165915d01 --merge-onto c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/foundation-environment-facts.jsonl` — exit 1; combined stdout/stderr: `.runs/task-cycles/coding-guidelines/reports/foundation-guard-environment-facts.log`.
- `python -B .the-way/elements/invariants/format_guard.py foundations/invariants.md --base c379207bfd8bd148d3589ea75604ba5165915d01 --merge-onto c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/foundation-invariants.jsonl` — exit 0; combined stdout/stderr: `.runs/task-cycles/coding-guidelines/reports/foundation-guard-invariants-final.log`.
- `python -B .the-way/elements/invariants/format_guard.py foundations/invariants.md --base c379207bfd8bd148d3589ea75604ba5165915d01 --merge-onto c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/foundation-invariants.jsonl` — exit 0; combined stdout/stderr: `.runs/task-cycles/coding-guidelines/reports/foundation-guard-invariants.log`.
- `python -B .the-way/elements/part-map/format_guard.py foundations/part_map.md --base c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/foundation-part-map.jsonl` — exit 1; combined stdout/stderr: `.runs/task-cycles/coding-guidelines/reports/foundation-guard-part-map-final.log`.
- `python -B .the-way/elements/part-map/format_guard.py foundations/part_map.md --base c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/foundation-part-map.jsonl` — exit 1; combined stdout/stderr: `.runs/task-cycles/coding-guidelines/reports/foundation-guard-part-map.log`.
- `python -B .the-way/product-guidelines/form_check.py --record .runs/foundation-guidelines-form.jsonl` — exit 0; combined stdout/stderr: `.runs/task-cycles/coding-guidelines/reports/foundation-guidelines-form.log`.
- `python -B .the-way/product-guidelines/form_check.py --merge-onto c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/foundation-guidelines-reference.jsonl` — exit 0; combined stdout/stderr: `.runs/task-cycles/coding-guidelines/reports/foundation-guidelines-reference.log`.
- `python -B .runs/task-cycles/coding-guidelines/reports/foundation-verify.py` — exit 0; combined stdout/stderr: `.runs/task-cycles/coding-guidelines/reports/foundation-verification.log`.

The full guard argv in their sidecars names each repository foundation file, --base c379207bfd8bd148d3589ea75604ba5165915d01, and --merge-onto with that same current main commit for all except part map, which accepts no merge-onto. All records are under ignored .runs/. No `none` option masks a comparison. The exact one unchecked map result is: `the dependencies between parts, and new or stale violations — no command of the product reports the dependency graph`. The two map warnings are existing unseparated build-tools→account-server and deployment→account-server dependencies, making account-server high. The seven map errors are tests/quality/**, eslint.config.mjs, prettier.config.mjs, requirements-quality.in, requirements-quality.txt, scripts/check_dependencies.py and guidelines/** not matching tracked files yet.

Weakest-point check: rule membership can look correct by count while silently replacing an inherited rule. I independently parsed the publisher files, compared exact named sets to the newly written sentences, composed every TS override and used positive controls (`no-undef` off; `@typescript-eslint/no-unnecessary-type-assertion` error). I checked all 22 row targets, exact pinned guideline sentences and every old entry’s preservation. Observed result: 35 assertions pass, including exact 64 JS membership, 92 active TS membership, full 407 Ruff equality and the fourteen-member subtraction to 393. The source quotes all match the downloaded edition byte content after whitespace collapse. This audit is my own check, not independent acceptance of an invariant checker. Manual fidelity comparison of Q2–Q8 and rows 1–22 found no altered accepted meaning; command-execution fields for this final semantic reread are not applicable.

Sharpness from actual diff: four foundation files; no irreversible operation; no current code trust boundary is edited. The added future audit boundary is recorded for later covered-code review. All seven parts are affected through changed entries, including every on guidelines form, hence high under the existing map’s unknown-failure-mode policy. No product tests were run because this boundary changes no executable code and the relevant form/source checks are complete.

## Commit and changed counts

Commit: 75a5fc91b8e74c81cba6f0aded3f2bf3752475a6 — docs: establish coding quality foundation.

| File | Added | Removed |
|---|---:|---:|
| foundations/decisions.md | 170 | 0 |
| foundations/environment_facts.md | 32 | 0 |
| foundations/invariants.md | 80 | 0 |
| foundations/part_map.md | 11 | 3 |

Total: 293 additions, 3 removals. Report/evidence scripts and upstream source evidence are ignored and not committed. Working tree is clean at return. Private repository author email was checked after the commit and matches the configured private identity; no email is copied into this report.

Boundary reached: committed foundation entries only. Root can dispatch independent check authors from the whole invariant sentences/methods and permitted methodological sources. Remaining expected issues do not change any accepted settlement: replace request placeholder when the draft PR exists; create the planned mapped files; implement/independently accept the six new methods and good/bad cases; leave four fact TODO methods and unavailable dependency graph explicitly unchecked; finish full-change critique/assessment and final guards later. There is no unresolved question requiring a changed product decision.
