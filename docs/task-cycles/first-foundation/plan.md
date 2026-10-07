# Current scope after PR #6 correction

The owner withdrew public-file-boundary/1 and its supporting artifacts. The executed correction removed that entry, recovered row, assessment document, test, part-map assignment, and unused test support option. The final request contains three new invariants and their current checks. The original plan below records the earlier dispatches; Task 3 and any instruction to add or verify the public-file invariant, four new invariants, or two recovered rows are historical and superseded. Current verification and review evidence is in the correction section of cycle.md and its reports.

# First Foundation Follow-up Implementation Plan

## Current assessment revision

The current candidate uses part-map ownership for the package check, with test-only source excluded and unknown new part ownership requiring an explicit classification when nested packaging appears. The compiler-layout citation stays only on the two existing compilation/output methods. The public-file runtime test audits static roots and direct literal Express file responses as finite evidence; independent assessment proved that ordinary parameterized, mounted and header-conditioned leaks can evade that sample. The broad sentence now uses `foundations/public_file_boundary_assessment.md` as a human-assessed Method, and the sampled test has no citation that could claim a full pass. This changes neither the sentence nor application behavior. A fresh task review found the resulting unchecked state conflicts with the frozen task's request for a protected test, while independent foundation assessment accepted the truthful human Method and its corrected API-data boundary. The draft request must report the conflict, the continuing value and limits of the supporting test, and the recurring human assessment cost. The correction, reviews and independent assessment are under `reports/`.

The original execution steps below record the work as dispatched. The second independent assessment supersedes Task 2's dedicated `test_application_build_layout.py` instructions and Task 3's fixed-prefix-only public-file probe. The current correction deletes that compiler-layout file, cites `application-build-layout/1` on the existing `test_application_build_output.py` compilation and compiler-separation methods, and removes the deleted file from `foundations/part_map.md`. The current public-file check instruments every Express static root installed by the built app, regardless of mount prefix, and retains real HTTP checks from a foreign working directory. A fresh reviewer must prove red for an arbitrary-prefix `/leak` mount and for merged compilation/output, then the orchestrator reruns the focused checks, full gate, `npm test`, affected format guards, whole-branch review, and independent assessment. The settlement is in `reports/independent-assessment-final-settlement.md`.

The current whole-branch review additionally requires the package-boundary check to accept effective TypeScript configurations inherited through `extends`. Its classification of other packages must allow TypeScript's optional `rootDir` and `outDir` defaults while still rejecting a real second application package. Review controls are inherited root configs, unrelated tooling with each omitted option, and separate browser/server packages. The review and settlement are in `reports/final-code-review-current.md` and `reports/final-code-review-current-settlement.md`.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the four existing application guarantees in the reviewed spec binding through independent invariant checks, and apply the accepted foundation wording corrections.

**Architecture:** The foundation records the four sentences and their relationships first. Separate check authors then verify the existing package layout, compiler layout, public file boundary, and occupied-address behavior; reviewers independently break each guarantee in a disposable checkout. The application remains as it is unless a check finds a real defect.

**Tech Stack:** Python 3 `unittest` and the pinned the-way gate, Node.js 24, npm, TypeScript 6.0.3, Express 5, PowerShell on Windows.

**Spec:** `.runs/task-cycles/first-foundation/spec.md` (reviewed in `.runs/task-cycles/first-foundation/reports/spec-review.md`).

## Global Constraints

- Work only in `C:/Storage/repos/loop2-first-foundation` on `task/first-foundation`; the fork point is `44294da228ab8c27dfd1683f931f59f8d7f8d29d`. Verify the `.the-way` gitlink and checkout both equal `7cfeb4c2349b181d251d1a03cb2005b980acbe9e` before dispatch.
- The reviewed spec is the design authority. D-04/1, D-05/1, and D-06/1 are the approved source versions; keep them intact. Their appended D-04/2, D-05/2, and D-06/2 entries are current and repeat the binding sentences unchanged. Add no deployment or account route behavior and make no TypeScript 7 change.
- Use the project skills `the-way-record-invariant`, `the-way-record-decision`, and `the-way-update-part-map` with their pinned `.the-way` sources for foundation edits. Search the whole current foundation before drafting entries.
- The invariant sentence author, citing-check author, and covered application-code author must be distinct. Give a check author the sentence and method, without the application author's reasoning. A reviewer who did not write the check derives each deliberate break from the sentence.
- Once Tasks 2–4 and their reviews finish the foundation step, keep invariant test files read-only during implementation. If a real defect calls for a change to one, return to the foundation step and repeat its review and deliberate break.
- Run `npm ci` at the repository root before the invariant methods in a fresh checkout. Missing dependencies make the gate report an error, not `unchecked`.
- Preserve the existing line endings when rewriting existing files. Add and commit only explicit paths. All run records stay under ignored `.runs/`.
- Use Superpowers 6.4.1 `subagent-driven-development` with a fresh implementer and reviewer for each meaningful unit, and one final whole-branch review. The orchestrator answers intermediate approvals provisionally; the request is the human's decision point.

## Review Focus

1. A separate package placed around browser or server source must make the package-layout check fail; an unrelated tooling package must remain allowed (Task 2).
2. Browser and server configurations that point to the same output directory must make the compiler-layout check fail, even if an old build artifact remains (Task 2).
3. A static root accidentally changed to the process's working directory must not expose a planted file when the server starts elsewhere (Task 3).
4. Encoded separators and dot segments in requested paths must not expose files outside `dist/public`; the response page's wording is irrelevant (Task 3).
5. A generic startup failure must not count as detection of an occupied address; unoccupied control launches before and after the blocked launch must become ready (Task 4).

## File Structure and Agent Boundaries

| File | Responsibility | Writer |
|---|---|---|
| `foundations/invariants.md` | `npm ci` precondition, four sentences, and two recovered rows | Foundation author, Task 1 |
| `foundations/decisions.md` | Approved D-04/1, D-05/1, D-06/1 as source; appended current /2 versions carry the example, origin, and verification edits | Foundation author, Task 1 |
| `foundations/part_map.md` | Product-foundation wording and ownership of four check files | Foundation author, Task 1 |
| `tests/invariants/test_application_package_layout.py` | One application package and lockfile | Fresh check author, Task 2 |
| `tests/invariants/test_application_build_layout.py` | Distinct compiler configurations and outputs | Fresh check author, Task 2 |
| `tests/invariants/test_public_file_boundary.py` | Runtime static-file isolation from a foreign working directory | Fresh check author, Task 3 |
| `tests/invariants/test_account_server_occupied_address.py` | Runtime control launch and occupied-address failure | Fresh check author, Task 4 |
| `tests/invariants/loop2_invariant_support.py` | Optional safe foreign-directory server launch only if current helper cannot provide it | Task 3 check author, with a separate review |

The files above are the full expected product write boundary. `src/**`, `scripts/**`, `package*.json`, `tsconfig*.json`, ordinary tests, and the vault are read-only unless a new invariant check establishes a real application defect; in that case the orchestrator scopes a new TDD and review unit before touching application code. Reviewers change application code only in a disposable worktree for deliberate breaks. The cycle record, reports, and SDD ledger are orchestrator-owned ignored files, not product edits.

## Task 1: Write the foundation entries and accepted field corrections

**Files:** Modify `foundations/invariants.md`, `foundations/decisions.md`, and `foundations/part_map.md` only.

**Execution state:** The product edits are committed in `d5feaf9`. Resume from its review gate; do not append another /2 entry.

**Interfaces:** Produces exactly four current `identifier/1` invariant sentences, all with `Method: python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`, for the check authors. D-06/1 is the approved source; appended D-06/2 is current, repeats its binding text, and retains fingerprint `094e6fa7`.

- [ ] **Step 1: Verify sources and search collisions.** Read the frozen task, reviewed spec, all five files under `foundations/`, pinned element skills/templates, and the earlier proposal at `5928e7b:docs/task-cycles/app-skeleton/reports/correction-1/return/proposal-pl.md`, part C. Read approved D-04/1, D-05/1, D-06/1 as the source and inspect appended D-04/2, D-05/2, D-06/2 as current versions. Use `rg -n "application-build|public-file|occupied-address|D-04|D-05|D-06|product-foundation" foundations` and read every matching entry whole. Search `README.md`, `src/server/app.ts`, `src/server/main.ts`, `tests/http.test.mjs`, `tests/startup.test.mjs`, and relevant git history for the two recovered rows; record what was searched and the actual source locations found, without inferring a source's reason.
- [ ] **Step 2: Write the four entries via `the-way-record-invariant`.** Insert the precondition directly below `# Invariants`:

  ```text
  Before running an invariant Method in a fresh checkout, run `npm ci` from the repository root.
  ```

  Use these exact binding sentences, with fields as shown:

  ```text
  application-package-layout/1
  The browser and server use a single shared npm package and lockfile, with no separate application package for either side.
  Derives from: D-06@094e6fa7; Part: build-tools · browser-view · account-server

  application-build-layout/1
  The browser and server have distinct TypeScript compilation configurations and output directories.
  Derives from: D-06@094e6fa7; Part: build-tools · browser-view · account-server

  public-file-boundary/1
  The server serves static files only from the built public directory, whatever working directory its process starts in.
  Derives from: none; Part: account-server · build-tools

  account-server-occupied-address/1
  When the account and save server's listening address is already in use, the server process exits with a non-zero code without printing its readiness line `Loop: <address>`.
  Derives from: none; Part: account-server · build-tools
  ```

  Set `Rests on: none` and `Correction: none` for each. Keep the existing seven invariant entries unchanged. The two non-derived entries need rows under `## Recovered invariants` with `searched:` and `found:` locations established in Step 1; the two D-06-derived entries do not. Do not call the provisional no-verdict gate state a pass.
- [ ] **Step 3: Append dependent decision versions via `the-way-record-decision` and edit the map via `the-way-update-part-map`.** Leave D-04/1, D-05/1, and D-06/1 intact. In current D-04/2 replace only the violation example with `a part of the game written as a Godot scene, or a script of the game's own code that the browser loads, written directly in JavaScript instead of compiled from TypeScript`. In current D-05/2 set *Origin* to `the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What serves the built game and account requests in the container?"`. In current D-06/2 set *Verification* to `level 1 — invariants: application-package-layout · application-build-layout · application-build-output`. All three /2 entries repeat their /1 binding sentences, use `Change: unchanged sentences`, and hold `Approved by: Mariusz, merge of <request link>` until the request exists. Change the `product-foundation` sentence to `The part holds the product's foundation.` Add the Task 2 files under `build-tools` and Task 3–4 files under `account-server`. Assign the support file as it already is in `build-tools` if changed. Do not create a new part or lower criticality by hand.
- [ ] **Step 4: Run the three format guards against the real fork point and merge target.** From the worktree root run:

  ```powershell
  python -B .the-way/elements/invariants/format_guard.py foundations/invariants.md --base 44294da228ab8c27dfd1683f931f59f8d7f8d29d --merge-onto 44294da228ab8c27dfd1683f931f59f8d7f8d29d
  python -B .the-way/elements/decisions/format_guard.py foundations/decisions.md --base 44294da228ab8c27dfd1683f931f59f8d7f8d29d --merge-onto 44294da228ab8c27dfd1683f931f59f8d7f8d29d
  python -B .the-way/elements/part-map/format_guard.py foundations/part_map.md --base 44294da228ab8c27dfd1683f931f59f8d7f8d29d
  ```

  Expected after the planned check files exist: zero errors in all three. At this intermediate point, the invariant guard or gate may flag absent citations/files: record the exact red result, then finish Tasks 2–4. The part-map guard's `unchecked: the dependencies between parts, and new or stale violations — no command of the product reports the dependency graph` is an existing baseline condition, never a pass.
- [ ] **Step 5: Commit only these three files and obtain a fresh task review.** The review checks source fidelity, full foundation collisions, fingerprints, recovered-row evidence, and file ownership. Record the commit range and resolve findings through the SDD fix loop before handing the sentences to check authors.

## Task 2: Check the application package and compiler layout

**Files:** Create `tests/invariants/test_application_package_layout.py` and `tests/invariants/test_application_build_layout.py` only.

**Interfaces:** Consumes the two invariant sentences derived from current D-06/2 (with the unchanged D-06/1 fingerprint `094e6fa7`) and their Method. Uses `loop2_invariant_support.ROOT` and `listed_files()` for tracked working-tree files. Produces one gate verdict for each identifier through `# invariant: .../1` citations. The existing `test_application_build_output.py` remains the check that `npm run build` compiles both configurations.

- [ ] **Step 1: Install prerequisites and write the package check.** Run `npm ci` from the worktree root. In the new Python `unittest` file, put `# invariant: application-package-layout/1` beside each asserting test. Read root `package.json` and `package-lock.json` as JSON; assert both exist, the lockfile's `packages[""]` names the root package, and there is a nonempty TypeScript source set under each literal application root `src/browser/` and `src/server/`. Walk the ancestors of those source files up to but excluding the repository root and reject a `package.json` or an npm lockfile there. A `scripts/tooling/package.json` outside both application trees remains allowed. Use `# data: package.json` and `# data: package-lock.json` annotations where these tracked files are read. A compact check shape is:

  ```python
  manifest = json.loads(Path(support.ROOT, "package.json").read_text(encoding="utf-8"))
  lockfile = json.loads(Path(support.ROOT, "package-lock.json").read_text(encoding="utf-8"))
  self.assertEqual(lockfile["packages"][""]["name"], manifest["name"])
  tracked = set(support.listed_files())
  application_roots = ("src/browser", "src/server")
  separate_manifests = ("package.json", "package-lock.json", "npm-shrinkwrap.json")
  for side in application_roots:
      sources = [p for p in tracked if p.startswith(side + "/") and p.endswith((".ts", ".mts", ".cts"))]
      self.assertTrue(sources, f"{side} contains no application TypeScript")
      for source in sources:
          parent = Path(source).parent
          while parent != Path("."):
              for filename in separate_manifests:
                  self.assertNotIn((parent / filename).as_posix(), tracked)
              parent = parent.parent
  ```

  Treat package files elsewhere as tooling unless evidence shows they are a browser/server application package. Do not globally ban nested packages.
- [ ] **Step 2: Write the compiler-layout check.** Cite `# invariant: application-build-layout/1`. Parse the two literal current config files `tsconfig.browser.json` and `tsconfig.server.json`; require each to be a distinct file, each to include its own application source, and both `compilerOptions.rootDir` and `compilerOptions.outDir` to be present and pairwise distinct. This compares actual config values to the literal expectation that the two sides differ, without requiring an unapproved fixed output-directory spelling. Example core assertions:

  ```python
  def load_json(relative):
      return json.loads(Path(support.ROOT, relative).read_text(encoding="utf-8"))

  configs = [load_json("tsconfig.browser.json"), load_json("tsconfig.server.json")]
  roots = [item["compilerOptions"]["rootDir"] for item in configs]
  outputs = [item["compilerOptions"]["outDir"] for item in configs]
  self.assertEqual(len(set(roots)), 2)
  self.assertEqual(len(set(outputs)), 2)
  self.assertTrue(any("src/browser" in pattern for pattern in configs[0]["include"]))
  self.assertTrue(any("src/server" in pattern for pattern in configs[1]["include"]))
  ```

  Annotate named data files. Reject a config whose own source is absent; do not let two unrelated configs count as browser and server configurations.
- [ ] **Step 3: Run each focused check on the unchanged product.** Run `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py -v` and the analogous command with `test_application_build_layout.py`. Expected green: both pass on the existing repository. A missing dependency, bad import, or failed build is an error to fix, not evidence of either sentence.
- [ ] **Step 4: Commit only the two green check files.** Record the pre-dispatch `BASE` and resulting `HEAD`; stage the two exact paths. The implementation author self-reviews but does not approve their own test.
- [ ] **Step 5: Give an immutable `BASE..HEAD` review package to a fresh reviewer who did not write the checks.** Generate the SDD review package from those exact commits. The reviewer derives one separate application package break and one merged-configuration/output break from the sentences, applies each only in a disposable worktree under ignored `.runs/`, and runs the corresponding focused check. Expected red: the package check fails on the separate application package, the compiler check fails on the merged layout. The reviewer also checks the unrelated tooling-package control remains green. Require both a spec-compliance and a task-quality verdict, plus each mutation, command, failure assertion, and cleanup in the report; no broken file reaches the task branch. Resolve findings through fix commits and a scoped re-review before the next unit, rerunning the affected focused checks and deliberate breaks.

## Task 3: Check the static public-file boundary at runtime

**Files:** Create `tests/invariants/test_public_file_boundary.py`; modify `tests/invariants/loop2_invariant_support.py` only to enable safe launch of the already built server from another working directory if necessary.

**Interfaces:** Consumes the `public-file-boundary/1` sentence and Method, `support.built_copy()`, `support.Server`, and `support.request`. Produces a cited gate verdict from a running server. The support helper retains its existing `Server(copy, extra_env=None)` behavior for all current tests.

- [ ] **Step 1: Add the minimum safe launch option if the existing helper cannot launch from a foreign directory.** In `Server.__init__`, add an optional `working_directory=None`. With the default, retain `[npm(), "start"]` and `copy.path`. With a foreign directory, run `node` on `copy.file("dist/server/main.js")` from that directory while reusing the helper's log files, readiness wait, and `stop()` process-tree cleanup. The process creation change is:

  ```python
  launch_cwd = copy.path if working_directory is None else working_directory
  if working_directory is None:
      launch_args = [npm(), "start"]
  else:
      node = shutil.which("node")
      if node is None:
          raise AssertionError("node is not on PATH")
      launch_args = [node, copy.file("dist/server/main.js")]
  self.process = popen(launch_args, launch_cwd, env=env,
                       stdout=self._stdout, stderr=self._stderr)
  ```

  Update the helper's docstring for the two launch modes. Keep the server's fixed host and port unchanged. This support change is warranted only because `npm start` requires the package root and a duplicated ad hoc launcher would lose the existing cleanup guarantees. Write a focused helper-use assertion in the new check and run existing server invariant checks after changing the helper.
- [ ] **Step 2: Write the cited runtime test.** Build a fresh copy through `support.built_copy()`. Before starting the server, read literal `dist/public/index.html` and `dist/public/main.js` bytes. Create a temporary foreign working directory and plant fixed sentinel bytes in a file there, in the copy's repository root, and in `dist/server/`, all outside literal `dist/public/`. Start `support.Server(copy, working_directory=foreign)`. Assert `GET /` and `GET /main.js` return status 200 and the corresponding built public asset bytes. For direct requests to the planted basename and `/package.json`, and crafted paths such as `/../package.json`, `/%2e%2e/package.json`, `/..%2f..%2fpackage.json`, and `/..%5c..%5c/package.json`, assert no returned body equals or contains the sentinel and no response returns the root `package.json` bytes. Do not assert a specific non-API error page body. Cite `# invariant: public-file-boundary/1` inside the asserting test. Annotate only tracked named data files such as `package.json`; generated and temporary files are not valid `data:` targets for the guard. Always call `stop()` in cleanup. The core test is:

  ```python
  # invariant: public-file-boundary/1
  copy = support.built_copy()
  public_html = Path(copy.file("dist/public/index.html")).read_bytes()
  public_script = Path(copy.file("dist/public/main.js")).read_bytes()
  root_manifest = Path(copy.file("package.json")).read_bytes()
  marker = b"loop2-invariant-outside-public-asset"
  with tempfile.TemporaryDirectory(prefix="loop2-foreign-cwd-") as foreign:
      Path(foreign, "outside-public.txt").write_bytes(marker)
      Path(copy.file("outside-public.txt")).write_bytes(marker)
      Path(copy.file("dist/server/outside-public.txt")).write_bytes(marker)
      server = support.Server(copy, working_directory=foreign)
      try:
          for path, expected in (("/", public_html), ("/main.js", public_script)):
              status, _headers, body = support.request("GET", path)
              self.assertEqual(status, 200)
              self.assertEqual(body, expected)
          for path in ("/outside-public.txt", "/package.json", "/../package.json",
                       "/%2e%2e/package.json", "/..%2f..%2fpackage.json",
                       "/..%5c..%5c/package.json"):
              _status, _headers, body = support.request("GET", path)
              self.assertNotIn(marker, body)
              self.assertNotEqual(body, root_manifest)
      finally:
          server.stop()
  ```
- [ ] **Step 3: Run the focused check.** `python -B -m unittest discover -s tests/invariants -p test_public_file_boundary.py -v`. Expected green: the built asset bytes are served from the public directory, all outside sentinels remain unavailable, and the foreign-directory launch succeeds. If setup fails to bind or build, fix setup rather than treating the failure as proof of isolation.
- [ ] **Step 4: Commit the green check and any justified support edit.** Stage only the new check path and, if changed, `tests/invariants/loop2_invariant_support.py`. Record the pre-dispatch `BASE` and resulting `HEAD`. Re-run the focused check and the affected existing server invariant checks after a support change.
- [ ] **Step 5: Send an immutable `BASE..HEAD` review package to a fresh reviewer.** The reviewer derives the deliberate break from the sentence, makes the server serve static files from an outside directory or process working directory only in a disposable worktree under ignored `.runs/`, runs the focused check, and requires red on sentinel exposure or a missing real public asset. Include encoded traversal probes in the review. Require both SDD spec-compliance and task-quality verdicts and a cleanup report. Resolve findings with fix commits and a scoped re-review, then rerun the affected checks and break.

## Task 4: Check occupied-address exit at runtime

**Files:** Create `tests/invariants/test_account_server_occupied_address.py` only.

**Interfaces:** Consumes the `account-server-occupied-address/1` sentence and Method, `support.built_copy()`, `support.Server`, `support.HOST`, `support.PORT`, and `support.port_in_use()`. Produces a cited gate verdict from both a normal launch and an occupied launch.

- [ ] **Step 1: Write the normal-launch control and occupied launch in one `unittest` check.** First require `support.port_in_use()` to be false, then start `support.Server(copy)` and wait for its exact readiness line `Loop: http://127.0.0.1:3000`; stop it and wait for the port to be free. Bind a Python TCP socket to `127.0.0.1:3000` with `SO_REUSEADDR` left off; verify it owns the address. Run `[node, copy.file("dist/server/main.js")]` with a finite timeout while the socket remains open. Require a nonzero exit code and no line matching `^Loop: http://127\.0\.0\.1:3000$` in combined stdout/stderr. Do not constrain the diagnostic text: the sentence permits the address to appear there. Check the blocker still owns the address after the failed launch. Release the socket in `finally`, then perform a second normal-launch control with the same built copy. This before/after control makes an unrelated persistent build or startup failure visible. Cite `# invariant: account-server-occupied-address/1` inside the asserting test. The central blocked launch is:

  ```python
  with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as blocker:
      blocker.bind((support.HOST, support.PORT))
      blocker.listen(1)
      self.assertTrue(support.port_in_use())
      result = subprocess.run([node, copy.file("dist/server/main.js")],
                              cwd=copy.path, capture_output=True, text=True,
                              timeout=10)
      self.assertNotEqual(result.returncode, 0)
      output = result.stdout + "\n" + result.stderr
      self.assertNotRegex(output, r"(?m)^Loop: http://127\.0\.0\.1:3000$")
      self.assertTrue(support.port_in_use())
  ```
- [ ] **Step 2: Run the focused check.** `python -B -m unittest discover -s tests/invariants -p test_account_server_occupied_address.py -v`. Expected green: both unoccupied controls reach readiness; occupied startup exits nonzero with no readiness line. A missing `node`, an occupied port before the control, or a timeout is an error, never a passing negative case.
- [ ] **Step 3: Commit only the green new check file.** Record the pre-dispatch `BASE` and resulting `HEAD`; stage the exact path `tests/invariants/test_account_server_occupied_address.py`.
- [ ] **Step 4: Send an immutable `BASE..HEAD` review package to a fresh reviewer.** The reviewer derives the deliberate break from the sentence. In a disposable worktree under ignored `.runs/`, change the server's error path so it either prints the readiness line or exits successfully when the address is occupied. Run the focused check and require red for the relevant assertion. The reviewer also verifies the control still passes before the break's occupied case; require process/socket cleanup and both SDD spec-compliance and task-quality verdicts. Repair findings through fix commits and scoped re-review, rerunning the focused check and its break after a test change.

## Task 5: Complete verification, return, independent assessment, and request handoff

**Files:** No expected product edits. This is an orchestrator closeout stage, not a new SDD implementer dispatch. The orchestrator owns `.runs/task-cycles/first-foundation/` and the SDD ledger. A real defect or a return-step finding reopens the affected earlier task and review.

**Interfaces:** Consumes the reviewed and committed Tasks 1–4. Produces recorded gate reports, the final assessed commit range and file list, and a reviewable draft pull request. The orchestrator handles record commits and request mechanics.

- [ ] **Step 1: Freeze the foundation step.** Mark the four new invariant check files read-only for subsequent implementation. Use Superpowers `subagent-driven-development` to finish per-unit reviews and run one fresh whole-branch review of the complete diff. Record all findings and their settlements; do not dispatch a duplicate final reviewer for the same range.
- [ ] **Step 2: Run the product checks from the repository root after `npm ci`.** Run all four focused unittest commands from Tasks 2–4, `npm test`, `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`, and the three Task 1 format guards with the actual `git merge-base HEAD main` as `--base` and current `main` commit as `--merge-onto` where supported. Require a recorded `pass` for each of the four new identifiers and report every other result by name. The existing part-map dependency-graph `unchecked` remains named as unchecked. Confirm direct runtime checks have exercised the server; do not infer a pass from an unrun check.
- [ ] **Step 3: Perform the WAY-11 return step on the real diff and choice log.** Check for new binding decisions, rules, uncovered behavior, environment facts, terms, part-map changes, and projected entries the code makes true. Write a missed binding entry through its project skill only if evidence requires it, with an independent check author and deliberate-break reviewer for an invariant. Record nonbinding choices in the cycle table. Do not add speculative application behavior or unresolved work items.
- [ ] **Step 4: Obtain one independent foundation assessment.** Follow pinned `.the-way/elements/common/critique/SKILL.md` with an agent on a different model where available. Supply only the assessed code/foundation/invariant-test diff and files, without the task, spec, plan, chronology, prompts, or author reasoning. Settle every remark against the sources and rerun affected checks/reviews after any change. Record the assessed commit range and file list.
- [ ] **Step 5: Reconcile and hand off.** Recheck `main`, merge or otherwise reconcile only as the task-cycle skill permits, repeat any invalidated collision search, reviews, assessment, guards, and tests. Inspect `git diff --check` and the final changed-file list. The orchestrator commits explicit product paths and opens a draft request, then swaps `<request link>` in the *Approved by* fields of current D-04/2, D-05/2, and D-06/2 for that request's URL and commits and pushes only the placeholder change. The /1 source versions remain untouched. The orchestrator executes the cycle record's add/remove commit pair, updates the request links by record commit SHA, and marks the request ready after all evidence is current. Do not merge the request. Name in the request the two recovered rows with the gate report, D-04/2, D-05/2, D-06/2 as current decisions (with /1 as their approved sources), every other changed foundation entry, each pass/fail/error/unchecked result, and the existing dependency-graph unchecked condition.
