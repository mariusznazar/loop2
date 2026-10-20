# Spec Compliance

- PASS: F6 is compliant with its assigned brief. No missing, extra or misunderstood implementation found in 17d23b997bc3febb827dc330410dad3458ba9e34..34e7d2a7c9d67845a983eb626029d92f3cf5cf36.
- Task quality: Approved. No Critical, Important or Minor source finding.
- Cannot verify as passed: actual pinned Ruff; live Unix process tools; container execution; final deliberate-break acceptance. These remain explicitly outstanding rather than being inferred from successful fixture tests.

## Scope, sources and review method

Reviewed exactly three files, +75/-1. Read the assigned full diff package once; no second git diff or source mutations. Read the exact Superpowers 6.4.1 task-reviewer template, reviewer contract, complete code-review playbook, F6 brief and author report. Did not read the frozen task, plan or covered-code authors' reasoning. No subagents, suite reruns, application execution or external writes.

The assigned invariant dependencies require reading the existing methods whole. The package cuts tcp_listeners at its start and provides only part of the API file, so I expanded to both complete existing checks and shared support to evaluate whether the new guards alter the promised observation or API behavior. No additional changed-file reread was needed for the complete new 68-line quality test. Code pass and documentation pass were separate: all three executable changes were assessed first; then method-reading docstrings and final foundation sentences were compared independently. There are no documentation edits in this range.

Pinned the-way check: `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` both showed d829e3aa6242a9b8901274531dd82fd5c7d87628 (actual exit 0). Complete part map and product-guidelines/reading.md were read. Authoritative invariant entries read: loop2-one-serving-process/2, loop2-api-error-route/1 and ruff-source-rules/1; their governing D-05/3 and D-30/1 were checked. No foundation sentence is edited by this range.

Guideline selection independently refreshed: account-server owns the two existing checks, build-tools owns tests/quality and shared support; deployment remains relevant to the container promise without an edited deployment file. `Test-Path guidelines` returned False and `Get-ChildItem -LiteralPath . -Directory -Filter guidelines` found no directory. Selected guideline files: none. This is the declared gap being filled by the overall task; the reading procedure permits work creating its own missing guidelines. No selection expansion or contradictory metadata found.

## Strengths and requirement checks

- [test_loop2_one_serving_process.py:74](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/tests/invariants/test_loop2_one_serving_process.py#L74): nonzero Windows process reads fail before any stdout parsing. Plausible partial records cannot become positive evidence; replacement decoding retains a diagnostic even for invalid stderr bytes. No concern found.
- [test_loop2_one_serving_process.py:85](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/tests/invariants/test_loop2_one_serving_process.py#L85): the same boundary holds for ps. No process-table schema, arguments or timing is changed. No concern found.
- [test_loop2_one_serving_process.py:130](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/tests/invariants/test_loop2_one_serving_process.py#L130): lsof now fails before parsing failed output, consistent with the unchanged Windows listener failure check at line 117. Both listener and process readers reject failed observations on either platform. No concern found.
- [test_process_observation.py:13](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/tests/quality/test_process_observation.py#L13): only branch selection and subprocess boundary are patched; actual readers and parsers execute. Unexpected command names raise ValueError and cannot accidentally satisfy an expected AssertionError. Patches restore automatically. No concern found.
- [test_process_observation.py:24](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/tests/quality/test_process_observation.py#L24): four rejection cases cover both readers on both platforms using plausible stdout. Four success controls from line 43 assert complete hand-written pid/parent/creation/name or listener tuples, preventing an implementation that rejects every observation. No concern found.
- [test_loop2_api_error_route.py:24](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/tests/invariants/test_loop2_api_error_route.py#L24): removing only unused os preserves HTTP methods, paths, Accept variants and all response assertions. It is the brief's requested narrow F401 repair. No concern found.

## Independent sentence/method comparison

The serving-process sentence promises one Express 5 process in the container serving game and API. The current local method observes built-file bytes, API responses, Express major/router dispatch and the listening process tree; its docstring explicitly delegates container checks and limits observation to the probe window. The new status guards strengthen the reliability of the process/listener observations without changing that interpretation. The final container promise is not certified by this task review.

The API sentence forbids returning the game's HTML for unmatched /api/ requests. The existing method compares real built HTML and a live root control, then checks JSON error status/media/body across its named methods, paths and headers. The sole import removal cannot alter that coverage. Its stated exclusions remain unchanged.

The Ruff sentence requires all adopted blocking rules and no inline suppression. No suppression is introduced, and the specified unused import is removed, but successful execution of Ruff is indispensable to establish full compliance. Its recorded exit 2 remains a non-pass until S2 supplies the tool.

Root confirmed that full sentence-derived deliberate breaks on final code are assigned to a later scratch-worktree verification stage. That acceptance is not assigned to F6 and remains unchecked here. No good/bad exemplar acceptance is assigned in this range.

## Evidence inspected; no routine reruns

All output paths below are under `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/`. For each captured run I inspected its complete output and adjacent `.txt.json` command/exit metadata. These are author executions, not reviewer reruns. No missing or noisy output found; intended RED failures and the unavailable Ruff result remain visible.

| Check / exact command | Actual exit | Observed evidence / complete combined stdout-stderr |
|---|---:|---|
| `python -m unittest discover -s tests/quality -p test_process_observation.py` initial RED | 1 | 8 tests, 3 expected AssertionError-not-raised failures; f6-red.txt |
| Same command, final RED | 1 | Same three failure boundaries; f6-red-final.txt |
| Same command, GREEN | 0 | 8/8, no noise; f6-green.txt |
| `python -m unittest discover -s tests/invariants -p test_loop2_one_serving_process.py` | 0 | 5/5 local Windows live checks; f6-one-serving-process.txt |
| `python -m unittest discover -s tests/invariants -p test_loop2_api_error_route.py` | 0 | 2/2 live API checks; f6-api-error-route.txt |
| `C:/Program Files/nodejs/npm.CMD test` | 0 | 173/173; f6-product-suite.txt |
| `python -m unittest discover -s tests/quality` | 0 | 101/101; f6-quality-suite.txt |
| `python -B scripts/check_ruff.py --record .runs/task-cycles/coding-guidelines/reports/f6-ruff.jsonl` | 2 | Local pinned Ruff unavailable, invariant verdict null; f6-ruff-method.txt |
| `python -B .runs/task-cycles/coding-guidelines/reports/f6-real-failure.py` | 0 | 8/8 failed real child-process observations rejected; f6-weakest-point.txt |

Weakest-point script was inspected, not merely its success line: it preserves real subprocess.run, starts Python children that exit 7, emits plausible or empty bytes, and passes each real CompletedProcess to both readers under both platform branches. Any successful reader return raises an error. This independently supports nonzero-status rejection for a second failure status and empty output. It does not run actual Unix ps/lsof or prove their permissions/availability.

Author-reported `git diff --check` exited 0 with no output; it has no separate capture and is not used as proof of behavioral correctness. The author report explicitly records that broad product/quality runs exceeded the narrow dispatch; this review neither repeats nor treats them as mandatory F6 acceptance.

## Issues

### Critical

None.

### Important

None.

### Minor

None.

## Risks, limitations and handback

Actual change sharpness is limited to account-server/build-tools verification code: seven guard lines, 68 regression-test lines and one unused import. There is no new product data write, irreversible operation, runtime routing change or deployment edit. The relevant boundary is external command output: failed observations must never certify process topology. Existing cleanup remains untouched and belongs to a separate authored change.

Unresolved verification: pinned Ruff unavailable (exit 2, must be run after S2 installation); live Unix observations unchecked; container execution unchecked; final independent deliberate-break acceptance unchecked. No blocking source concern is identified. No broader foundation or whole-branch merge verdict is issued.

Task quality: Approved for F6; spec compliance: PASS for the assigned implementation, with the named verification limits preserved.
