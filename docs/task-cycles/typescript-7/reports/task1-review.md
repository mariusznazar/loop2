# Task 1 review — TypeScript 7.0.2 dependency candidate

## Spec Compliance

- ❌ **Issues found:** The required cycle record groups five baseline commands under one `All exit 0` result instead of recording each command's exit code separately (`.runs/task-cycles/typescript-7/cycle.md:73`). The implementer report does give each command its own result (`.superpowers/sdd/plan/task-1-report.md`, “Workspace and baseline”), so the evidence can be copied without rerunning tests.
- ✅ **Product candidate:** The root manifest pins `typescript` to exactly `7.0.2` (`package.json:22`), and the lockfile root and compiler entries use 7.0.2 (`package-lock.json:16`, `package-lock.json:1310`). The diff adds the 20 native platform entries and matching optional dependencies, including Windows x64 (`package-lock.json:443`, `package-lock.json:1310`). Each added entry shown in the diff has an npm registry URL, a `sha512-` integrity value, and matching `os`/`cpu` selectors. Existing package entries have no unrelated version or dependency movement. The Node 24.x constraint and existing scripts remain (`package.json:6`, `package.json:9`). The diff does not touch browser/server compilation configuration or output paths.
- ⚠️ **Cannot verify from the diff alone:** Command order, clean-install success, compiler CLI output, and baseline results are evidenced by the implementer report and cycle record, not by the product diff. I checked the named risk that the Windows native package reported as installed might be absent: the installed `node_modules/typescript/package.json` declares `@typescript/typescript-win32-x64` at 7.0.2, and that installed package reports version 7.0.2, `os: [win32]`, `cpu: [x64]`. I did not rerun the already reported commands. Candidate typecheck, build, product/invariant tests and Linux verification remain unchecked at this task boundary; the first four are assigned to Task 2/3, and Linux is explicitly outside this task's verification.

## Strengths

- The version is exact in both manifest and lockfile (`package.json:22`, `package-lock.json:16`, `package-lock.json:1311`), avoiding a second resolution during later clean installs.
- The lockfile records every platform package as optional with a platform selector; the Windows x64 package points to the npm registry and carries SHA-512 integrity (`package-lock.json:443`). The TypeScript entry declares the same 20 packages at 7.0.2 (`package-lock.json:1322`).
- The change preserves the existing Node constraint, scripts, and all non-TypeScript dependency versions (`package.json:6`, `package.json:9`, `package-lock.json:1310`). The implementer expressly leaves candidate behavior checks for the dependent tasks rather than claiming migration success.

## Issues

### Critical (Must Fix)

None.

### Important (Should Fix)

#### 1. Record the baseline command exits separately

**Kotwica:** `.runs/task-cycles/typescript-7/cycle.md:73`
**Wątek:** nowy
**Do wklejenia:** The Task 1 brief requires a separate exit code for each baseline command in the cycle record. This row combines `npm ci`, the compiler version check, typecheck, build, and product tests into one `All exit 0` result. Please split it into five results using the command table already present in the Task 1 report.
**Dlaczego to zgłaszam:** The cycle record is the handoff evidence for baseline health before changing the compiler. A combined result does not preserve which command produced which result if a later reader compares the 6.0.3 baseline with a failing 7.0.2 candidate. For example, the compiler version command produced `Version 6.0.3` while `npm test` produced 5 passing tests; both are currently compressed into one row. The report already lists the commands and exit codes individually, so this is a record correction, not a reason to rerun the suite. Add one cycle-record row per command, retaining the baseline commit and environment.

### Minor (Nice to Have)

None.

## Assessment

**Task quality:** Needs fixes. The dependency candidate itself is clean and scoped; the required baseline record needs the small correction above before Task 1 is fully closed.
**Spec-compliance verdict:** ❌ Issues found, limited to the cycle record. Candidate behavior checks remain explicitly unchecked for the dependent tasks.
