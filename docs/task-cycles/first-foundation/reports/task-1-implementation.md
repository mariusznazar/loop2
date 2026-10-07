# Task 1 implementation report

Status: DONE_WITH_CONCERNS
Model: GPT-6 (inherited parent model; no override).
Range: 44294da228ab8c27dfd1683f931f59f8d7f8d29d..d5feaf9
Commit: d5feaf9 — docs: bind build layout and server boundaries in foundation

## Work performed

Only foundations/invariants.md, foundations/decisions.md, and foundations/part_map.md changed. The ignored report is the fourth authorized write. No tests, application files, vault files, or other worker changes were edited.

Applied the project skills the-way-record-invariant, the-way-record-decision, and the-way-update-part-map, including pinned templates, common rules, way_of_working, examples, example entries and glossaries. The checked gitlink and checkout both report 7cfeb4c2349b181d251d1a03cb2005b980acbe9e. Read the frozen task, reviewed spec, brief, task-cycle skill, and SDD implementer prompt.

## Meaning of each changed entry

- application-package-layout/1: Przeglądarka i serwer korzystają z jednego wspólnego pakietu npm i pliku blokady, bez osobnego pakietu aplikacji dla którejkolwiek strony.
- application-build-layout/1: Przeglądarka i serwer mają osobne konfiguracje kompilacji TypeScript oraz katalogi wynikowe.
- public-file-boundary/1: Serwer podaje pliki statyczne wyłącznie ze zbudowanego katalogu publicznego, niezależnie od katalogu uruchomienia procesu.
- account-server-occupied-address/1: Zajęty adres nasłuchiwania kończy proces serwera kodem różnym od zera bez wypisania linii gotowości.
- D-04/2: Przykład naruszenia dotyczy własnego kodu gry, więc nie rozciąga reguły języka na zewnętrzne biblioteki.
- D-05/2: Pole pochodzenia wskazuje pełny zatwierdzony wpis określający proces podający grę i obsługujący żądania kont.
- D-06/2: Weryfikacja obejmuje wspólny pakiet i plik blokady, osobne konfiguracje i katalogi wynikowe oraz kompilację obu stron.
- product-foundation: Ta część przechowuje fundament produktu.
- build-tools: Ta część otrzymuje dwa planowane testy układu pakietu i kompilacji.
- account-server: Ta część otrzymuje dwa planowane testy granicy plików publicznych i zajętego adresu.

Fresh-checkout setup is stated immediately below the invariant title; all Method fields remain the single declared test-gate command. All seven old invariant entries are unchanged.

## Source search and collisions

Read all five product foundation files whole. Ran the prescribed rg search for application-build, public-file, occupied-address, D-04, D-05, D-06 and product-foundation. No identifier collision or conflicting binding rule found. D-06 already binds package sharing, separated compiler configurations/outputs and compiling both; the existing application-build-output covers only the last promise. Neither D-05 nor another product decision binds public-directory isolation or occupied-address exit.

Read README.md, src/server/app.ts, src/server/main.ts, tests/http.test.mjs, tests/startup.test.mjs. Read historical changes 11c7cbb (initial source, README, HTTP tests), de3ceb3 (startup failure behavior and test), 3af85d1 (rewritten server with same public root and startup failure semantics). History command used explicit paths. Source output included author metadata; none is reproduced here.

Read part C at 5928e7b:docs/task-cycles/app-skeleton/reports/correction-1/return/proposal-pl.md and PR #3 body using gh pr view 3 --json body --jq .body. Relevant sections U1–U4 and U8 establish accepted wording and scope; U7 confirms the prior startup error semantics. Part C supplies the exact two non-derived sentences and the former combined layout sentence. The reviewed spec supplies its two-way split.

Recovered rows record searched locations and actual source locations rather than inferred rationale. The public-file sources include README's local work/verification section and the HTTP foreign-directory/traversal tests. Occupied-address sources include the named startup exit/no-readiness test. Both identify their exact part C proposal entry at its fixed commit. The row does not attach D-05 as a derivation or manufacture a reason.

No live external documentation was used to change a fact; existing citations were copied unchanged.

## Choices and rulings

1. Escalated literal /1 edits versus the pinned append-only decision log. Orchestrator ruling C9 requires appended /2 versions with unchanged sentences and branch approval placeholders. This keeps merged records intact, at the cost of repeated fields. Editing /1 would be shorter but breach the pinned rule.
2. Proposed new Rationale for change and Rejected prose limited to each accepted field correction. Orchestrator provisionally approved and recorded C10. Copying old technical rejections would misdescribe this change.
3. Used the declared method before new citing files exist, as the task explicitly requires. This is an intermediate state, not evidence of a passing invariant result.
4. Assigned planned files explicitly to their existing responsible parts. The support file already belongs to build-tools; no further assignment was needed. No part or failure mode was invented.
5. Rests on remains none because no external fact changes the stated package, compiler separation, public-directory or process-exit promises. The Node support schedule is only a reason behind the existing runtime decision.
6. Part coverage: build-tools can alter installation/compiler settings, outputs and startup; browser-view or account-server can acquire a separate package or compiler setup; account-server can alter the static root or startup failure handling. These match the brief's exact Part values.

## Verification commands and outputs

All commands ran from the task worktree root. The real base and merge target are 44294da228ab8c27dfd1683f931f59f8d7f8d29d.

### python -B .the-way/elements/invariants/format_guard.py foundations/invariants.md --base 44294da228ab8c27dfd1683f931f59f8d7f8d29d --merge-onto 44294da228ab8c27dfd1683f931f59f8d7f8d29d

Exit: 0

```text
note: there is no violated_invariants.md; the list of violated invariants is read as empty
note: there is no human_verdicts.md; no human verdict is given
0 error(s), 0 warning(s), 0 unchecked
```

### python -B .the-way/elements/decisions/format_guard.py foundations/decisions.md --base 44294da228ab8c27dfd1683f931f59f8d7f8d29d --merge-onto 44294da228ab8c27dfd1683f931f59f8d7f8d29d

Exit: 1

```text
foundations/decisions.md:156: error: D-04/2: *Approved by* is the placeholder `merge of <request link>`, which a merge onto the main branch does not take
foundations/decisions.md:173: error: D-05/2: *Approved by* is the placeholder `merge of <request link>`, which a merge onto the main branch does not take
foundations/decisions.md:191: error: D-06/2: *Approved by* is the placeholder `merge of <request link>`, which a merge onto the main branch does not take
foundations/decisions.md:156: warning: *Approved by* is the placeholder `merge of <request link>`
foundations/decisions.md:173: warning: *Approved by* is the placeholder `merge of <request link>`
foundations/decisions.md:191: warning: *Approved by* is the placeholder `merge of <request link>`
note: who approves a version is checked only in the-way's own log
3 error(s), 3 warning(s), 0 unchecked
```

### python -B .the-way/elements/part-map/format_guard.py foundations/part_map.md --base 44294da228ab8c27dfd1683f931f59f8d7f8d29d

Exit: 1

```text
foundations/part_map.md:17: error: pattern `tests/invariants/test_public_file_boundary.py` of `account-server` matches no file git tracks
foundations/part_map.md:17: error: pattern `tests/invariants/test_account_server_occupied_address.py` of `account-server` matches no file git tracks
foundations/part_map.md:33: error: pattern `tests/invariants/test_application_package_layout.py` of `build-tools` matches no file git tracks
foundations/part_map.md:33: error: pattern `tests/invariants/test_application_build_layout.py` of `build-tools` matches no file git tracks
unchecked: the dependencies between parts, and new or stale violations — no command of the product reports the dependency graph
4 error(s), 0 warning(s), 1 unchecked
```

The initial invariant guard had five errors because PowerShell piped non-ASCII separators into Python as question marks. Fixed the newly written separators/section marker with explicit Unicode escapes, preserving existing bytes, and reran all three guards. The initial decision and map results were identical to the final intermediate limitations above.

Additional verification:
- git diff --check: exit 0.
- Byte-preserving read/write used for all existing-file edits.
- One-off Python source comparison confirmed all old decision text remains an exact prefix, and D-04/2, D-05/2, D-06/2 binding text equals /1. Fingerprints: b703ab2a, e11aec4d, 094e6fa7 respectively.
- The first heading-count probe wrongly excluded digits in identifiers and failed its count assertion. Corrected the probe to accept digits, checked its population, and reran: exit 0, eleven entries and all seven old entries unchanged.
- git status --short before commit: only the three authorized foundation files modified.
- git branch --show-current: task/first-foundation.
- Explicit git add of the three foundation paths followed by git commit: exit 0; three files, 102 insertions and one deletion.
- Full invariant gate, npm test, focused new checks and deliberate breaks were NOT run in Task 1. Their check files do not exist yet. No result is claimed for them. TDD does not apply to these source-only foundation edits.

## Self-review

Read the complete working diff. No remaining correction found in source fidelity, old-entry preservation, binding fingerprints, repeated fields, source-only recovered rows or ownership. All four invariant sentences and their fields match the brief. The two recovered rows name sources and contain no inferred rationale. The two derived invariants have no recovered rows. The ordinary application/tests remain untouched. The append-only question was settled before decision edits.

## Concerns and handoff

The branch is not merge-ready at this boundary: decision guard reports the three deliberate request-link placeholders; the map guard reports four missing planned test paths; the dependency graph remains unchecked. Replace placeholders only when the orchestrator creates the request. Independent check authors must write the four citing checks and the reviewers must provide deliberate breaks before the final gate. Task 1 does not treat a successful format guard as a verdict on behavior.

The current decisions are /2, while /1 remains historical. The orchestrator is reconciling source plan wording under C9. Fresh task review is the orchestrator's next step; no subagent or reviewer was spawned here.
