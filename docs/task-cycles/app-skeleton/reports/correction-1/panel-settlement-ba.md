# Panel settlement — task/app-skeleton, correction 1 — order B → A

Settled from the files again, starting with assessment B. What I checked directly (worktree at 2544a6a, main base `91ee59e`; `.the-way` at `96c5248`, equal to the gitlink):

- The patch's hash equals the manifest's. I applied it in a throwaway worktree and removed it after the guards.
- Guards with `--base`/`--merge-onto 91ee59e`:
  - branch: decisions exit 1 (5 errors), invariants exit 1 (1 error), part map exit 1 (50 errors);
  - patched: decisions exit 1 (4 errors, all *Approved by*), invariants exit 0, part map exit 1 (10 errors, *Failure modes*).
- Every `# invariant:` line under `tests/` names one of the five written invariants.
- The gate records every failure, error and fixture failure as `fail` (`.the-way/gate/run_tests.py:639-664,708-718`).
- The five proposed new entries have no counterpart in `definicja_mvp_loop2.md`.

The test against which B's blocking remarks 11-12 and A's remark 4 must be read is WAY-126 (`.the-way/foundations/decisions.md:3575-3600`). A projected entry goes in whole, with *Approved by* copied from the gate, only "in the foundation step of the first task whose code makes it true". The part the code makes true "enters as a proposal a human accepts". The skeleton serves a blank page and a JSON 404 under `/api/` (`src/server/app.ts:6-14`; `README.md:25`). It has no accounts, no saves, no container and no simulation. The full approved D-04, D-05, D-07 and `loop2-one-serving-process` all speak of those, so this task's code does not make them true.

## Remarks of assessment B

| # | Remark | Holds? | Evidence |
|---|---|---|---|
| B1 | Branch alone fails the merge-onto guards; Scope needs the map | holds | Guard output: `decisions.md:9,11,26,50,52` and `invariants.md:49`. The three `TODO` links point at projected D-07, D-04 and D-05. The branch therefore needs some written form of those three, and a part map. |
| B2 | Written entries match the definition | holds | D-01 = definition :514-527; D-02 = :533-554; D-03 = :496-508. Five invariant sentences = :1941, :1953, :1965, :1977, :2002; `program` = :2122-2123; fact = :2326-2330. Only the `TODO` links and *Method* differ, and `invariants:` was normalised. |
| B3 | Citations are in WAY-65 form | holds | Every test method has `# invariant: <id>/1`: 7/5/3/6/2 across the five invariants. |
| B4 | Checks write out their expectations | holds | Literal constants: `EXPECTED_EXPRESS_MAJOR` (`test_account_server_express_http.py:28`), `UNMATCHED_API_PATHS` (`test_loop2_api_error_route.py:29-36`), `DELIBERATE_TYPE_ERROR` (`test_account_server_typecheck.py:29-33`). |
| B5 | The deployment tripwire is not about the typecheck sentence; cut | holds in part | `test_account_server_typecheck.py:90-94`. Its docstring :17-20 says what it is for: read "before deployment" correctly once a deployment file exists. Without it a later Dockerfile skipping the type check passes silently. Where it misfires is on files that deploy nothing: version pins (`loop2_invariant_support.py:301`) and a test-only CI workflow. That is a fix to its data, not a reason to cut it. |
| B6 | Runtime deployment parsing is unexercised; cut | holds | `test_account_server_runtime.py:86-213`; no deployment file exists, so the loop at :201 runs zero times. It also misses a final stage that is not a `node` image (A, situation 11). Removing it changes what part of the sentence is checked, so it is not mechanics: Q4. |
| B7 | Blocklists too long, collision risk | holds in part | `test_browser_view_framework.py:38-46`; `test_account_server_express_http.py:31-36`. Generic names (`cycle`, `van`) could match an unrelated lockfile entry, but none does now. A (A10) wants the list longer, not shorter. No present defect, so no fix now. |
| B8 | Reading `document.body` counts as rendering | holds | `test_browser_view_framework.py:64-71`. Weakens the positive half of the sentence. |
| B9 | Express check rests on `router`'s debug output | holds | `test_account_server_express_http.py:44,139-151`. No fact names it. A change there gives a loud `fail`, not a false pass. Q5. |
| B10 | Glossary `program` is the first thing to drop | holds in part | Its only use is D-03's rationale (`decisions.md:58`). WAY-126 carries the projected terms an entry "uses", so the task writes it. Dropping it gains nothing measurable. |
| B11 | Patched D-04/D-05/D-07 are not the approved text (blocking) | holds in part | The differences are real: D-04 keeps one sentence of three (definition :465-468 vs patch :45); D-05 drops "account and save" and "in the loop2 container" (:740-742 vs :63-64); D-07 keeps "computes nothing of the game" only (:166-168 vs :105). The conclusion does not hold: the patch does not carry the gate's approval, and writing them whole is not open to this task. Full D-07, D-05 and D-04 state accounts, a container and a simulation that do not exist. WAY-126's violates-example forbids the shortened form *with the gate's Approved by*, not the shortened form as a proposal. |
| B12 | "On acceptance" is neither the gate's record nor a fresh approval (blocking) | holds in part | The form error is real: decision template :275-277. The patch's route is WAY-126's partial-entry route, whose *Approved by* the human writes on acceptance. Same point as A4. |
| B13 | D-06 and four invariants are new (blocking) | holds in part | They are new: no match in the definition. They need acceptance of their wording (WAY-114) and have none yet, which the patch shows openly. Nothing in WAY-11, WAY-126 or WAY-01 makes them illegal in this change. Whether they belong here is the human's call: Q1. |
| B14 | Occupied-address: should be recovered or `TODO`; two rules; could cite `startup.test.mjs` | holds in part | Not recovered: the behaviour was added on this branch in de3ceb3 (manifest). WAY-58 (:1599-1603) covers only what the product did "before the task writing it began", and its complies-example keeps such entries off the list. `Derives from: none` is legal after a search (WAY-71 :1962). The sentence's second half is the problem (= A2). `startup.test.mjs:30` demands the address in stderr, so citing it would contradict the sentence. |
| B15 | `public-file-boundary` derives from a D-05 that does not state it | holds | D-05 patch :63-64 is silent on the directory; the invariant (patch :185) and D-05's *Verification* (:70-71) assume it. The behaviour is true (`app.ts:9-10`). |
| B16 | Build invariants unchecked though checkable; layout is two rules | holds | Both have *Method* `TODO` (patch :167,177), so D-06's level 1 gives only `unchecked` (WAY-63). Layout joins two separately breakable conditions (WAY-56). |
| B17 | Part narrowing of two written invariants is unneeded | holds | The definition gives `every` (:1982, :2007) and the branch writes it. The patch changes it (:130,140) with no gain. WAY-62 favours more parts in doubt. |
| B18 | Map is the author's; `TODO` failure modes; cycle; spurious dependency; two parts only to claim files | holds in part | It is not projected, the failure modes are `TODO` (10 errors) and build-tools ↔ account-server is a cycle (patch :232,250). account-server → browser-view has a basis: the server serves browser-view's build output (`app.ts:9`). `agent-workflow` is required by WAY-44 (part-map template :213-215). |
| B19 | Scope `build-tools` for D-02/D-03 is wrong | does not hold | WAY-21 finds decisions through the parts of touched files. A framework added to `package.json` must find D-02/D-03 through `build-tools`. |
| B20 | D-01/D-03 relation fingerprints are of the truncated sentences | holds | The guard accepts `D-07@8ab1f8bc` and `D-04@b703ab2a` now. A later completion flags them by design (WAY-02). |

## Remarks of assessment A

| # | Remark | Holds? | Evidence |
|---|---|---|---|
| A1 | `loop2-one-serving-process` *Method* is a command nothing answers (blocking) | holds | Patched `invariants.md:57`. No test cites the identifier. WAY-61's last clause: a run with no verdict for the entry never passes it. Under the invariant template's result rules, that gives `error` on every gate run, while its guard reports 0 errors. |
| A2 | Occupied-address sentence contradicts current code on its plain reading (blocking) | holds | `invariants.md:95` vs `src/server/main.ts:5` and `tests/startup.test.mjs:30-31`. Two readings ("no address at all" / "no ready line"); the code meets only the second. |
| A3 | Map guard fails; scale empty (blocking, human's answer) | holds | Patched `part_map.md:10,23,41,54,63` and the empty `## Criticality scale` at :66. Part-map template :26: no field takes `TODO`. |
| A4 | *Approved by* placeholder is the human's precondition | holds | 4 guard errors. WAY-126 / WAY-114. |
| A5 | No pointer from shortened D-04/D-07 to the rest of their approved text | holds | `decisions.md:73,133` name only the concept document. The decision template :256 lets *Origin* name the document holding the full reasoning. |
| A6 | D-07 rationale dropped the accepted cost | holds | Definition :183-186 is missing from patch :118-121. *Rationale* is outside the fingerprint. |
| A7 | `public-file-boundary` not implied by D-05 | holds | = B15. |
| A8 | Typecheck tripwire too wide | holds | `loop2_invariant_support.py:298-309` (`.nvmrc`, `.node-version`, `.tool-versions`, `.github/workflows/*`); test at `test_account_server_typecheck.py:90-94`, not :306-310 as A cites. |
| A9 | API-error check stricter than sentence | holds in part | JSON required (`test_loop2_api_error_route.py:11-12,99-104`); `/api/` probed (:30). A's line numbers are wrong. Today both agree with README :25. A future route at `/api/` would go back to the foundation step (WAY-03). No fix now. |
| A10 | Browser-view check tighter and looser than sentence | holds in part | :193-196 rejects any foreign-origin script; libraries absent from :38-46 pass. A level-2 pair in D-03 changes a written projected entry: human, later. |
| A11 | Map: server→view dependency, cycle, test files by name | holds in part | As B18. A per-part test directory is a preference, not a defect. |
| A12 | "D23" vs product "D-NN" | holds in part | The *Origin* text is the definition's own (:178, :479), prefixed by the file name. The risk is minor. |
| A13 | D-06 "both configurations" | holds in part | Patch :85-87; true of `scripts/build.mjs:9`. Matters only if D-06 stays. |
| A14 | Port held → `fail`, not `error` | holds in part | It is recorded `fail`. The cause is the gate's mapping (`run_tests.py:639-664,712-718`), not the `AssertionError` at `loop2_invariant_support.py:225-228`. The template leaves this `TODO`. |

## Recommendation

**Call: accept with fixes.** B's redraft would write wording the code does not make true, with an approval that wording did not get in this form. A's reading follows WAY-126. The open points are a handful of entry defects and the human's answers that the template requires.

Fixes, each staying within the decisions in force:

1. `loop2-one-serving-process/1`: *Method* `` `TODO` `` (or a citing check accepted with the change under WAY-03/WAY-69). **Human.**
2. `account-server-occupied-address/1`: a sentence that matches `main.ts:5`/`startup.test.mjs:30`, such as "…exits with a non-zero code and does not report that it is listening". Or remove the entry (Q1). **Human.**
3. Part map: failure modes, or `none`, for each of the five parts, and degrees in the criticality scale, from the human. `agent-workflow` stays. **Human.**
4. D-04…D-07 *Approved by*: the accepting human and date, not the gate record. **Human.**
5. `public-file-boundary/1`: `Derives from: none` after a search, removed from D-05 *Verification*. Or remove the entry (Q1). D-05's sentence stays as proposed. **Human.**
6. D-07/1 *Rationale*: put back definition :183-186 (forged progress, accepted cost, account isolation). **Human.**
7. *Origin* of D-04/1 and D-07/1: add the project definition as the place of the full approved entry. **Human.**
8. *Part* of `account-server-express-http/1` and `browser-view-framework/1`: back to `every`. **Human.**
9. Typecheck tripwire: a list of its own in `loop2_invariant_support.py` that leaves out `.nvmrc`, `.node-version` and `.tool-versions`. The runtime check keeps reading them; CI workflows stay listed. **Test mechanics — panel.**
10. `DOM_RENDERING_MEMBERS` (`test_browser_view_framework.py:64-67`) without `body`, `head` and `documentElement`. `main.ts`'s `createElement` keeps it passing. **Test mechanics — panel.**

Deferred, not fixes: B7 trimming, A9 probe change, A10-A14. Each belongs to the later task it would affect.

## Questions for the human

- **Q1.** The new entries are D-06 and the invariants `application-build-layout`, `application-build-output`, `public-file-boundary` and `account-server-occupied-address`; none of them is in the definition. Do you accept them in this change or take them as a later proposal? If they stay, `application-build-layout` splits in two (WAY-56) and the build invariants get a check or stay `unchecked`. Recommendation: keep D-06 with `application-build-output`, since both describe the product as it is. Leave the other three out for now.
- **Q2.** For D-05's link to D-02, the definition said "narrows"; the patch says "derives from". Nothing in D-05 goes against D-02 (WAY-32), so "derives from" fits. Confirm the departure.
- **Q3.** Accept D-04/1, D-05/1 and D-07/1 as partial entries under WAY-126? When the save and simulation tasks later write the rest as a new version, should that version carry the gate's approval (2026-10-04)? That is how WAY-126 reads, but it would carry an earlier date than its /1.
- **Q4.** Should the runtime check's unexercised deployment parsing be removed? Recommendation: yes, but only with fix 9's tripwire kept.
- **Q5.** Should the express check's reliance on `DEBUG=router` output become an environment fact?

## Agreement with the A → B settlement

Same call (accept with fixes), the same ten fixes and the same two test-mechanics fixes (9, 10). The panel can therefore decide fixes 9 and 10. Fixes 1-8 and the change as a whole go to the human.
