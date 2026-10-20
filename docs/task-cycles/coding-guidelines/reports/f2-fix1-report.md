# F2 — fix round 1

Status: DONE_WITH_CONCERNS at the committed fix-author boundary. Both review findings are addressed. No further review, broad suite, installation, configuration work, merge, push or deployment was performed.

## Inputs and selection

- Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`; branch `task/coding-guidelines`.
- Start: `103bddd04584d25ea93f64d3aace328666250845`. Pinned the-way checkout and gitlink still both equal `d829e3aa6242a9b8901274531dd82fd5c7d87628`.
- Read the complete f2-fix1-handoff.md and f2-review.md, the review probe script and complete failing output, and the focused output supporting the fixture-noise finding. Existing author contract, original stage handoff, authoritative invariant/decision/fact readings and guideline selection remain applicable; no foundation meaning or scope changed.
- Both edited files belong to build-tools. No product guideline exists yet, as recorded in F2. D-28's build/test exemplar deferral still applies; no new code kind or guideline selection expansion arose. No UI change; screenshots remain unchecked because there is no intended visible change.
- Continued focused Superpowers 6.4.1 TDD under the already-read skill/reference and implementer contract. No subagents or next stage were invoked.

## Fixes and source fidelity

**Important 1:** The bridge now parses a disable rule list once, then emits its names when nonempty and `null` when the parsed list has no names. This shared branch handles eslint-disable, eslint-disable-next-line and eslint-disable-line. It removes the distinction between an empty raw value and a nonempty value that parses to zero names. Python's existing `None` handling then rejects the blanket suppression; no invariant sentence or Python checker policy changed.

The actual semantics were independently verified in the [pinned ESLint 10.12.0 linter implementation](https://raw.githubusercontent.com/eslint/eslint/v10.12.0/lib/linter/linter.js), lines 226–227: it derives rule IDs from the parsed list and uses `[null]` for zero names. The [official parser implementation](https://raw.githubusercontent.com/eslint/rewrite/main/packages/plugin-kit/src/config-comment-parser.js), lines 171–186, splits comma-separated names, trims/unquotes them and discards empty names. Thus comma-only and quoted-empty lists are blanket suppressions. This is direct source evidence for the actual tool semantics, not an inference from the API double.

The regression fixture exercises the real JavaScript bridge, complete Python report parser and source judgment, with a narrow ESLint/parser double supplying literal empty parser results. It covers all three disable labels with empty, comma-only, whitespace/comma-only and quoted-empty values: 12 prohibition cases. Two controls keep a no-op `eslint-enable ,` and a redundant `eslint no-debugger: error` accepted. Existing named-disable, line-comment and redundant-option fixtures remain in the focused suite. The original review probe also now returns the expected failed source judgment.

**Minor 2:** The two expected-inability fixture methods redirect their operator stdout/stderr into StringIO. They retain exit-2 and null-invariant assertions and additionally verify that captured JSON equals the JSON written to the record. The real command's output behavior is untouched. A passing suite now has ordinary unittest output without fabricated fail/warning records.

## Committed scope

Range: `103bddd04584d25ea93f64d3aace328666250845..e85670a467de02ec0c46d1fb17777f54ad70ec9e`.

| File | Added | Removed |
|---|---:|---:|
| scripts/inspect_eslint.mjs | 2 | 1 |
| tests/quality/test_eslint_checks.py | 71 | 4 |

Only those explicit product paths were staged and committed. Total: +73/−5. `scripts/check_eslint.py`, common mechanics, foundation, configuration and unrelated code were unchanged. The final worktree is clean, and the commit's configured private author email was verified. Reports remain ignored.

## Exact check evidence

Paths in this table are relative to this report. Each output contains complete combined sanitized stdout/stderr, and its adjacent `.txt.json` records exact argv, child exit and elapsed time.

| Exact command | Actual exit | Complete output | Result |
|---|---:|---|---|
| `python -B -m unittest discover -s tests/quality -p test_eslint_checks.py` | 1 | f2-fix1-red.txt | Expected RED: 16 tests, 9 failed subtests. All three disable labels falsely serialized the three nonempty-but-empty-parsed lists as `[[]]` instead of `[null]`. Empty raw values and two no-op controls already behaved correctly. The old fixture-noise output is also preserved here. |
| `python -B -m unittest discover -s tests/quality -p test_eslint_checks.py` | 0 | f2-fix1-green.txt | GREEN: all 16 tests pass. No expected fail/null records or synthetic warning escape into successful unittest output. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f2-review-probe.py` | 0 | f2-fix1-probe-green.txt | Original reported case now emits `disabledRules: [null]` and `actual_source_ok: false`; bridge exit is 0 and the probe's expected rejection is satisfied. |
| `git diff --cached --check` | 0 | f2-fix1-diffcheck.txt | No whitespace errors in the final staged fix. |

The unchanged original failing probe evidence remains f2-review-probe.txt, with exit 1 in its metadata and `actual_source_ok: true`. Its green rerun uses a separate output path; no red evidence was overwritten. Backslashes added to the raw embedded JavaScript regex were checked by literal ripgrep matching after scripted writes. Existing line endings were preserved with newline='' reads/writes.

## Choices, self-review and weakest point

The fix follows parsed list length rather than raw text length. Keeping the original branch would continue accepting a forbidden blanket directive on clean source; changing this one branch closes the route for every disable spelling using it, with no new configuration or ongoing mechanism. The test costs a small narrow bridge fixture and covers empty syntax variants so the policy cannot accidentally become dependent on raw punctuation. Genuine no-op enable/redundant declarations remain controls against over-rejection.

Capturing expected fixture output removes misleading noise while preserving recorded and operator-output assertions. Silencing production output instead would remove evidence a method's operator needs, so the capture stays wholly in tests.

Read the complete fix diff and verified that the staged content equals the reviewed working diff. The weakest-point check was the original review probe plus the quote-empty/list-empty variants and the two no-op controls. It proves the bridge-to-Python zero-name route is closed and that this narrow fix does not reject those controls. It does not establish installed ESLint or type-aware parser conformance; the fixture deliberately doubles those dependencies, while pinned source supplies the semantics evidence.

Sharpness: only build-tools verdict interpretation and test-output handling change. The product consequence is preventing a false gate pass for a prohibited source directive. No application state, deployment/lockfile trust boundary or irreversible operation changes.

## Remaining concerns and boundary

- No contested or unaddressed review finding remains in this author pass. Independent re-review belongs to root.
- Authentic ESLint/type-aware integration remains unchecked until the adopted dependencies/configuration exist: parser/API resolution, normalized option equivalence, actual complete coverage and real good/bad/deliberate-break cases still require later verification. This fix introduces no installation or runtime acceptance claim.
- npm tests, complete quality/invariant suites and the two live invariant methods were not rerun: the handoff explicitly limited this round to affected focused checks, and their earlier missing-dependency inability is unaffected by the two-line bridge correction.
- No foundation file changed, so no foundation format guard was required. Whole-change gate/guidelines checks remain with later stages. Stopped immediately after the committed fix/report boundary.
