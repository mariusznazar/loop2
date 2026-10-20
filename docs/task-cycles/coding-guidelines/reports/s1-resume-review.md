# S1 independent scoped review

## Spec compliance

**Verdict: Spec compliant for the S1 boundary, with one Minor setup-documentation finding.** All seven assigned paths have their corresponding change. The accepted amendment and current D-33 pin npm **12.2.1**; the older pin in the extracted brief is superseded. No missing S1 implementation, unrequested feature, rule weakening or silent successful result was found.

**Task quality: Approved, with the Minor finding below.** This is approval of the bounded installation/configuration slice, not approval to merge the enclosing task.

- Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`.
- Assessed range: `403c446f5b90c408e013f176516ebc16e8a30a0c..3a769e67dcdeada5481df0e93b37f2d8f5a1eedf`, filtered to the seven S1 paths. It includes both `3781ff9` and `3a769e6`, not merely the continuation commit.
- Review input: the complete supplied review package, read in consecutive sections, with 3,560 additions and 47 removals. No changed source file needed a separate whole-file reread to complete a cut-off function. No git command was rerun.
- Requirements: frozen task, npm12 amendment, extracted task-1 brief, authoritative plan's S1 and global boundaries, complete author continuation report, reviewer prompt and code-review playbook.

## Strengths

- [package.json:25](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/package.json#L25), [package.json:32](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/package.json#L32) and [scripts/build.mjs:7](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/scripts/build.mjs#L7): the local npm pin, actual TS6 API override and explicit TS7 compiler path address three distinct dependencies. The override closes the compatibility wrapper's otherwise moving `^6` dependency; it does not replace the application compiler.
- [eslint.config.mjs:38](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/eslint.config.mjs#L38), [eslint.config.mjs:72](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/eslint.config.mjs#L72) and [eslint.config.mjs:87](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/eslint.config.mjs#L87): lint-only Programs cover recursive typed roots outside the application tsconfigs, while inherited TypeScript compatibility overrides are applied to all four typed extensions. This preserves application compilation boundaries and type-aware rules.
- [prettier.config.mjs:1](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/prettier.config.mjs#L1) and [.gitattributes:4](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/.gitattributes#L4): an explicit empty configuration uses the pinned defaults without a second partial options list; LF attributes are limited to the selected web code and browser markup paths, alongside the pre-existing deployment rule.
- The retained evidence distinguishes unavailable, violating and passing states. In particular, the real configuration method rejects the wrong exported API and an intentionally disabled rule; the remaining source/format violations are reported as failures.

## Issues

### Critical

None found in S1.

### Important

None found in S1.

### Minor — state the development toolchain's minimum Node 24 release

**Thread:** new.

**Anchor:** [README.md:19](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/README.md#L19); supporting dependency constraint: [package-lock.json:2186](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/package-lock.json#L2186).

**Do wklejenia:** The new setup paragraph should state that the pinned development tools require Node 24.15.0 or newer within the Node 24 line. npm 12.2.1 declares `^24.15.0` support, whereas the README's existing `24.x` requirement also admits older Node 24 installations, leaving a contributor following the setup instructions with an unsupported local npm.

**Dlaczego to zgłaszam:** The README helps a contributor choose a runtime before installing the quality tools. S1 introduces npm 12.2.1, whose lock entry explicitly requires `^22.22.2 || ^24.15.0 || >=26.0.0`; the product requires Node 24, so the relevant minimum is 24.15.0. For example, Node 24.14.0 satisfies the README's stated `24.x` requirement but does not satisfy this new development dependency. That mismatch can yield engine warnings, or installation refusal where engine-strict is enabled, before the contributor reaches the documented checks. Document the development minimum in this setup section while retaining the accepted npm pin. This is Minor because the retained execution uses supported Node 24.17.0, no tested installation/build is broken, and I did not reproduce failure on an older Node release. The application's existing major-version runtime policy need not be broadened or otherwise redesigned to fix this wording.

## Requirement-by-requirement assessment

| Assigned path | Observed S1 change and assessment |
|---|---|
| [package.json](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/package.json) | Exact accepted ESLint, preset, globals, Prettier, npm and TypeScript aliases; explicit real-API override. One application package remains. |
| [package-lock.json](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/package-lock.json) | Root declarations agree with the manifest; TS7 native platform dependencies remain; npm12 and its bundled subtree are locked; actual TS6 package is 6.0.2. Full net diff reviewed, including changes first introduced in the partial commit. |
| [scripts/build.mjs](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/scripts/build.mjs) | Both configurations retain the same check/build subprocess handling; only the compiler path changes semantically. HTML/icon copying remains after compilation. |
| [eslint.config.mjs](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/eslint.config.mjs) | Adopted presets, complete current owned TS/JS roots, root configs, HTTP/startup tests, browser/Node globals, recursive typed Program roots and exclusions. No extra stylistic rule set or suppression added. |
| [prettier.config.mjs](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/prettier.config.mjs) | One explicit configuration using pinned defaults. |
| [.gitattributes](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/.gitattributes) | Narrow LF patterns for all eight covered language extensions, browser HTML/CSS and the explicit root/test files. |
| [README.md](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/README.md) | Documents installation, local checks, API/compiler separation, explicit audit base, release-age override and result codes; the development minimum merits the Minor correction above. |

## Foundation and guidelines

I applied the pinned foundation-reading and guideline-selection procedures to the actual seven paths. The affected parts are **build-tools** and **deployment**; the full part map was read, including dependencies, trust boundaries and the criticality scale. I retain the controller's clarification that unknown build-tools failure modes count as the highest criticality; the author's statement that no label was invented is not used to reduce required scrutiny.

The complete current decision-log Scope inspection yields 23 matches: D-01/1, D-02/1, D-03/2, D-04/3, D-05/3, D-06/3, D-08/1 through D-17/1 and D-27/1 through D-33/1. I read all whole selected entries, including rationale and rejected alternatives, plus linked D-07/1. A read-only exact-text comparison of the supplied reading copy against the latest entries in the current decision log found all 23 matches, no missing match and no stale copied entry. D-33 currently says 12.2.1 at [foundations/decisions.md:905](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/foundations/decisions.md#L905).

I read the complete invariants, product glossary, pinned process glossary, the two complete ESLint membership facts, and linked relevant environment facts. Topic searches across all five foundation elements covered the tools, API/compiler split, package boundaries, lock, format, LF and deployment consequences. No additional current entry changes the S1 assessment. No foundation file is changed by S1; no foundation guard or decisions-found-for-change pass is inferred from reading or search.

`guidelines/` is absent at review time, so no product guideline file is selected. The enclosing task creates the missing discipline files and does not wait for its own output. D-28 expressly defers separate build/test exemplars. No screen or new formal code-kind exemplar is introduced by S1; screenshot/UI verification is not applicable to this scoped change. The later creation and acceptance of the guidelines remain outstanding enclosing-task work.

## Concrete risks checked and evidence

All evidence paths in this section are under [the reports directory](s1-resume-report.md), beside the author's continuation report. I read the referenced full captured outputs and the adjacent `.txt.json` command/exit records. I also read the probe implementations where their result needed interpretation. These are existing author executions, not executions by this reviewer.

| Named risk | Focused inspection and observed result |
|---|---|
| Metadata reports TS6 while the wrapper exports a different API | [s1-resume-runtime.mjs](s1-resume-runtime.mjs) resolves through the parser/estree chain; [s1-resume-runtime.txt](s1-resume-runtime.txt) records actual exported API 6.0.2 and all exact accepted installed tool versions on Node 24.17.0, exit 0. The earlier real wrong-API result is unavailable, not pass, in the retained red-config output. |
| An alias exists but compilation actually uses TS6 | [s1-resume-compiler-check.py](s1-resume-compiler-check.py), its preload and the build/typecheck process records observe both real TS7 subprocesses, version 7.0.2, correct configs and check-only `--noEmit`. The wrapper does not replace spawn or the compiler. Native `tsc --version` independently prints 7.0.2. Both green commands exit 0. |
| New typed/untyped files are ignored or typed lint has no type information | [s1-resume-new-paths.mjs](s1-resume-new-paths.mjs) and [its full output](s1-resume-new-paths-fixed.txt): 112 real-ESLint cases over seven nested roots and eight extensions, good/bad pairs, no fatal parser results, expected no-floating-promises/no-debugger failures, 64/92 active rules, exit 0. The actual configuration method passes independently on the real product. |
| A green configuration result merely trusts its own preset or rule count | Focused inspection of the unchanged method at [scripts/check_eslint.py:250](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/scripts/check_eslint.py#L250) and [scripts/inspect_eslint.mjs:55](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/scripts/inspect_eslint.mjs#L55) confirms full rule/options equality with independently supplied expected membership. [s1-resume-config-negative.txt](s1-resume-config-negative.txt) retains the real `no-debugger=off` violation (inner exit 1); the outer probe exits 0 only after asserting that failure and restoring exact original bytes in finally. |
| LF scope is broader/narrower than intended or the editor uses different formatting | The same new-path probe checks 122 selected attribute paths, five exclusion controls and actual explicit/editor Prettier resolution. Owned final formatter check passes; the full product formatter still returns the separately reported baseline fail. |
| Untrusted dependency input or unrelated lock changes are accepted without evidence | Full supplied lock diff read. Plain `npm ci` installs successfully with no warning in [s1-resume-npm-ci.txt](s1-resume-npm-ci.txt), exit 0. [s1-resume-audit.txt](s1-resume-audit.txt) records the actual invariant pass using original fork `c379207bfd8bd148d3589ea75604ba5165915d01`, exit 0. The preservation probe checks all 346 lock entries; its 101 changed entries are limited to the continuation's root/npm/real-API changes. That probe's baseline is continuation-start HEAD, not a substitute for reading the complete S1 net diff. |
| Compiler-path/formatting changes disturb built application behavior | Complete [s1-resume-npm-test.txt](s1-resume-npm-test.txt) and metadata read: uninstrumented `npm.cmd test`, exit 0, 173 pass, zero fail/cancel/skip/todo. The diff itself preserves both config iterations, failure propagation and asset-copy behavior. |

The package-lock trust boundary is covered here by installation/integrity behavior, complete net-diff inspection, exact runtime resolution and the real independently authored audit. The weakest new configuration behavior—typed files outside application tsconfigs—has the targeted real-tool good/bad cases above. Frozen check authors remain separate from the configuration author. I did not regrade the intervening check-method/foundation commits as S1 changes.

## Outstanding results, declined scope and evidence limits

- [s1-resume-source-final.txt](s1-resume-source-final.txt) and its command record show exit 1 with exactly 16 no-unnecessary-type-assertion reports: 12 in hex, one each in layout, program, run and terrain-picture. Those are the accepted later-slice repairs; they are not waived or new S1 violations.
- [s1-resume-format-final.txt](s1-resume-format-final.txt) and its command record show exit 1 for 44 remaining original files. S1 formats its build/config files. The enclosing task must finish all formatting before merge.
- No new test was run by this reviewer: there was no unanswered behavior doubt requiring duplication of the existing focused evidence. Manual review method: one complete net-diff reading, current-foundation selection/exact-copy comparison, and focused inspection of the named existing evidence and unchanged interfaces. Actor: independent S1 reviewer. Manual command-execution fields: not applicable.
- The new-path fixture uses the real installed tools through a junction, but does not itself exercise the independent method's locality/discovery layer on a newly added real-product path. The live method runs on the actual current product; final guideline cases and deliberate-break acceptance remain assigned to later complete-product verification.
- The live audit is point-in-time advisory evidence. Installation and checks do not attest arbitrary registry tarball contents or future advisory results. No audit threshold, dependency class, original comparison base or unavailable-result semantics are weakened by S1.
- No container/deployment run, final whole-part gate, final foundation assessment, screenshot, Python/ShellCheck installation or guideline acceptance is claimed here. These are later enclosing-task obligations, not permission to merge now.
- I decline additional permanent tests that merely duplicate the ignored real-tool probes, extra style rules, new application tsconfigs/packages and an unsolicited compiler/npm replacement: none is required by the reviewed behavior.

## Assessment

The installation and configuration implement the accepted S1 behavior with meaningful evidence for the actual tools and compiler execution. No Critical or Important S1 finding remains; the setup documentation should acknowledge npm12's Node 24.15.0 minimum. The 16 source violations, 44 formatting files and final complete-task acceptance work remain explicitly unresolved outside S1.
