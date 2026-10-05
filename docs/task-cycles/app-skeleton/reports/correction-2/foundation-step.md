# Foundation step F2 — correction 2 (task/app-skeleton)

Worktree `C:\Storage\repos\loop2-skeleton`, branch `task/app-skeleton`, HEAD `0b96e9e`.
the-way pinned at `96c52488752701ffa321ca69c0c2aa2dd3e46d2d` — `git -C .the-way rev-parse HEAD` and
`git ls-files --stage -- .the-way` both show it. Nothing committed.

Skills used: `the-way-record-decision`, `the-way-record-invariant`, `the-way-update-part-map`
(each read `.the-way/elements/<element>/skill/SKILL.md`). Also read in full:
`.the-way/elements/common/way_of_working.md`, `rules.md`, the three templates, the three
`examples.md` and the entries they name in `.the-way/foundations/` (WAY-03; log-entry-field-presence,
decision-guard-overdue-review, file-part-assignment, fingerprint-definition, return-step-record;
part-map, task-cycle, wording-reaches-dependants, content-fingerprint, entry-format), the product's
five foundation files, the-way's glossary, the accepted patch, `proposal-pl.md` and
`review-comment.md`.

No entry was shown to the human for wording: the human accepted every entry in PR comment
6002054885 (WAY-114 satisfied there, per the prompt). No critique run: the set was already reviewed
by the human.

## What was written

Method: the accepted patch
`.runs/task-cycles/app-skeleton/reports/correction-1/return/UNAPPROVED-proposed-foundation-against-ab34d90.patch`
was applied with `git apply` (it applied cleanly to HEAD; `foundations/` unchanged since ab34d90),
then only the rulings below were changed. A diff of the written files against the patch's text
shows exactly these differences and no others:

### foundations/decisions.md

- D-01/1: *Scope* `account-server, build-tools`; *Relations* `derives from D-07@8ab1f8bc`. Version 1,
  *Approved by* `Mariusz, 2026-10-04` kept.
- D-02/1: *Scope* `account-server, build-tools`; *Verification* keeps `invariants:` (T10). Version 1,
  approval kept.
- D-03/1: *Scope* `browser-view, build-tools`; *Relations* `derives from D-04@b703ab2a`. Version 1,
  approval kept.
- D-04/1 "What is the game built with?" — as in the patch; *Approved by* `Mariusz, 2026-10-05`.
- D-05/1 "What serves the built game and account requests in the container?" — as in the patch
  (*Relations* `derives from D-02@06e6d3d8`, *Verification* `level 1 — invariants:
  loop2-one-serving-process · loop2-api-error-route`); *Approved by* `Mariusz, 2026-10-05`.
- D-06/1 "How are the browser and server built together?" — as in the patch except
  *Verification* `level 1 — invariants: application-build-output`; *Approved by*
  `Mariusz, 2026-10-05`.
- D-07/1 "How is the work of the game split between the server and the browser?" — as in the patch;
  *Approved by* `Mariusz, 2026-10-05`.

### foundations/invariants.md

- loop2-api-error-route/1: *Derives from* `D-05@e11aec4d`; nothing else changed.
- loop2-one-serving-process/1 (new): sentence, *Derives from* `D-05@e11aec4d`, *Part* `every` as in
  the patch; *Method* `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`.
- application-build-output/1 (new): sentence, *Derives from* `D-06@094e6fa7`, *Part*
  `build-tools · browser-view · account-server` as in the patch; *Method* the same gate command.
- Not written: application-build-layout, public-file-boundary, account-server-occupied-address,
  missing-page-response. None of them existed on 91ee59e (that commit's invariants file holds no
  entry at all), so rules.md ("one that never reached the main branch may go") requires no row on
  the withdrawn-identifiers list. The list is unchanged.

### foundations/part_map.md

- Five parts browser-view, account-server, build-tools, agent-workflow, product-foundation, exactly
  as in the patch (responsibility, *Files*, *Depends on* with the mutual account-server ↔ build-tools
  draft, *Trust boundary*), with `Failure modes: none` in all five.
- Added `tests/invariants/test_loop2_one_serving_process.py` to account-server and
  `tests/invariants/test_application_build_output.py` to build-tools.
- External context rows `HTTP clients | both | untrusted | no` and
  `npm registry | them → us | untrusted | no`. Criticality scale left empty.

## Fingerprints (computed with the-way's code)

Script: `relation-model/fingerprint.py` `fingerprint()` over the binding sentences as parsed by
`elements/decisions/format_guard.py` `parse_log` and the invariant sentences parsed by
`elements/invariants/format_guard.py` `parse_file` — computed on the patch's text before writing and
again on the written files; both runs identical.

| Entry | Computed | Expected | |
|---|---|---|---|
| D-01/1 | e57a4766 | e57a4766 (cited by D-02 and two invariants) | match |
| D-02/1 | 06e6d3d8 | 06e6d3d8 (cited by D-05, account-server-express-http) | match |
| D-03/1 | fb5aa3b0 | fb5aa3b0 (cited by browser-view-framework) | match |
| D-04/1 | b703ab2a | b703ab2a | match |
| D-05/1 | e11aec4d | e11aec4d | match |
| D-06/1 | 094e6fa7 | 094e6fa7 | match |
| D-07/1 | 8ab1f8bc | 8ab1f8bc | match |
| loop2-one-serving-process/1 | 1e0b09c2 | 1e0b09c2 | match |
| application-build-output/1 | c97273f9 | — | (for the check author) |
| loop2-api-error-route/1 | a6ff5b60 | — | unchanged sentence |

No mismatch.

## Search of the whole foundation

Read all five product files and the-way's glossary. Findings:

1. **No collision between decisions.** D-05 serves D-02 (D-02's rationale foresees Express serving
   the built game in one process); D-06's rejected bundler and D-03's rejected UI frameworks do not
   overlap; D-07 ("server computes nothing of the game") agrees with D-01's "small responsibility"
   and with D-05 (serving files and `/api/` is no game computation); D-04 and D-01 both pick
   TypeScript, for different sides. No option one entry adopts is in another's *Rejected*. No
   `narrows` needed.
2. **D-06's first binding sentence has no verification.** "The browser and server share one npm
   package and lockfile, and have separate TypeScript compilation configurations and output
   directories." is covered by neither level 1 (application-build-layout deferred) nor a level 2
   pair. The guard does not flag it; the decision template says a decision may combine levels, each
   covering what it can check. This is the cost the panel named for the chosen T6 option; the human
   chose "later". Question Q1 below.
3. **Normative word outside binding sentences.** D-05 *Rationale* (decisions.md:95) reads "The
   application must set static-file and fallback rules carefully …". The decision template says
   *must* appears only in binding sentences (that rule is itself marked `TODO — decision pending`
   in the template). Guard passes. Text is accepted wording, so not edited. Question Q2.
4. **Glossary paraphrase.** product-foundation's responsibility "The part holds the product rules
   and the map of its responsibilities." speaks of what the-way's glossary terms *foundation* and
   *part map* define; rules.md asks for the term, never a paraphrase. Accepted wording, not edited.
   Question Q3.
5. **Pre-existing, not part of this change:** D-02 *Rationale* "those HTTP mechanics" uses
   *mechanics* outside the-way's glossary meaning (the way a test reaches the product). Same
   handling as 4 if the human wants it.
6. No new entry uses the product's term `program`; no other glossary term of the product or the-way
   is used in another meaning by the new text. No identifier collides across invariants, part map
   and environment facts (guards confirm). environment_facts.md needs no change: no new entry rests
   on a fact.

## Guard runs (from the repository root)

Base `91ee59e295b8e0b024c4af1d4d1318738ab8f29e` (= `git merge-base HEAD origin/main`).

| Command | Exit | Errors / warnings / unchecked |
|---|---|---|
| `python -B .the-way/elements/decisions/format_guard.py foundations/decisions.md --base 91ee59e…` | 0 | 0 / 0 / 0 |
| same `--base 91ee59e… --merge-onto 91ee59e…` | 0 | 0 / 0 / 0 |
| `python -B .the-way/elements/invariants/format_guard.py foundations/invariants.md --base 91ee59e…` | 0 | 0 / 0 / 0 |
| same `--merge-onto 91ee59e…` | 0 | 0 / 0 / 0 |
| `python -B .the-way/elements/part-map/format_guard.py foundations/part_map.md --base 91ee59e…` | 1 | 2 / 0 / 1 |
| `python -B .the-way/elements/glossary/format_guard.py foundations/glossary.md --base 91ee59e…` | 0 | 0 / 0 / 0 |
| same `--merge-onto 91ee59e…` | 0 | 0 / 0 / 0 |
| `python -B .the-way/elements/environment-facts/format_guard.py foundations/environment_facts.md --base 91ee59e…` | 0 | 0 / 0 / 0 |
| same `--merge-onto 91ee59e…` | 0 | 0 / 0 / 0 |

Notes the guards printed (informational): decisions — "who approves a version is checked only in
the-way's own log"; invariants and environment facts — no `violated_invariants.md` /
`human_verdicts.md`, read as empty; without `--merge-onto` the merge checks are not run (stated by
each guard).

**Expected until checks land** (part map):

- `foundations/part_map.md:17: error: pattern tests/invariants/test_loop2_one_serving_process.py of account-server matches no file git tracks`
- `foundations/part_map.md:31: error: pattern tests/invariants/test_application_build_output.py of build-tools matches no file git tracks`

**Other unchecked line** (part map): `unchecked: the dependencies between parts, and new or stale
violations — no command of the product reports the dependency graph`. This one stays after the
checks land; the product declares no dependency-graph command.

No file is reported as claimed by no part or by two parts.

**Not run:** the gate (`python -B .the-way/gate/run_tests.py tests/invariants …`). Outside this
step's checks; with no check citing loop2-one-serving-process/1 or application-build-output/1 yet,
the gate gives those two entries no verdict (the template: "a run that records no verdict for the
entry never gives it a pass"), which is expected until the checks land. A check that did not run is
not a pass.

## Hand-off (record-invariant, after step 4.4)

Both new invariants have a command method, so two instructions per entry go to two other agents
(WAY-69). The orchestrator says these are already running:

- check: loop2-one-serving-process/1 and application-build-output/1, method the gate command above,
  cited as `invariant: <identifier>/1`, in the files the part map now names;
- deliberate break: written from each sentence alone, without the check or the files it reads.

## Questions for the orchestrator

- Q1 (D-06 coverage): D-06's first binding sentence is now verified by nothing until
  application-build-layout is written. Leave it so (the human's T6 choice, guard passes), or ask the
  human for a level 2 pair for that sentence now? Recommendation: leave it; record it in the PR
  description as an open debt tied to the deferred invariant.
- Q2 (D-05 rationale "must"): leave accepted wording, or raise with the human as an editorial fix
  (outside the binding sentences, fingerprint unchanged)? Recommendation: raise, not blocking.
- Q3 (product-foundation sentence paraphrases *foundation* / *part map*): e.g. "The part holds the
  product's foundation." — raise with the human? Recommendation: raise, not blocking; the binding
  sentence of a part is what references rest on, so better settled before merge.
