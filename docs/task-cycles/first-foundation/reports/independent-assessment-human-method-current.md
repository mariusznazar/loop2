# Independent assessment: current human method

## Verdict

**APPLY.** The correction at `ce649b7331d1057621a9e09ca32120093a5eb19f` removes the concrete false-positive instruction found in the human assessment method. I found no remaining blocker or new concrete false positive or false negative in the assessed foundation and invariant-test changes.

`public-file-boundary/1` is still **unchecked**, as it should be. Its Method is a path and `foundations/human_verdicts.md` does not exist at the assessed commit. The procedure provides a route to a later human verdict; it does not manufacture one.

## Immutable range and filtered input

- Base: `44294da228ab8c27dfd1683f931f59f8d7f8d29d`
- Head: `ce649b7331d1057621a9e09ca32120093a5eb19f`
- Targeted correction checked separately: `d366b8e3c650a86c984f0a64da54dae501e243f4..ce649b7331d1057621a9e09ca32120093a5eb19f`
- Assessed paths:
  - `foundations/decisions.md`
  - `foundations/invariants.md`
  - `foundations/part_map.md`
  - `foundations/public_file_boundary_assessment.md`
  - `tests/invariants/loop2_invariant_support.py`
  - `tests/invariants/test_account_server_occupied_address.py`
  - `tests/invariants/test_application_build_output.py`
  - `tests/invariants/test_application_package_layout.py`
  - `tests/invariants/test_public_file_boundary.py`

I did not read the task, project definition, specification, plan, chronology, prompts, author/reviewer reports, or settlement reports.

## Targeted correction result

The correction changes only `foundations/public_file_boundary_assessment.md` (two inserted and two removed lines). The corrected step 3 now requires the assessor to classify the returned data and explicitly distinguishes:

| Behavior | Required classification |
|---|---|
| A requested account/save application record stored outside `dist/public` | May comply; its storage location alone does not make it forbidden static serving |
| A static file or asset outside `dist/public` | Fail |
| An unrelated repository file, such as `package.json`, returned through an `/api/` route or wrapped as data | Disguised file leak; fail |
| An internal filesystem read whose bytes cannot reach a response | Does not violate this invariant |
| A direct file response rooted in built `dist/public` | May comply |

This is the needed distinction. It prevents a legitimate file-backed account/save API from being rejected merely because response bytes came from outside `dist/public`, while retaining the broad checks needed to catch parameterized routes, nested routers, streams, `sendFile`, `download`, and reads followed by response writes. Classifying by the data returned also prevents an `/api/` prefix or response wrapper from hiding a static-file leak.

Step 5 now assigns `fail` to an outside-public static file or disguised file leak, consistent with step 3. It still requires complete serving and relevant dependency behavior before `pass`, and requires no verdict when the assessment is incomplete. A human can therefore truthfully assess the invariant's broad sentence without treating every file-backed application record as a static asset and without inventing a pass from sampled requests.

## Check state and evidence

- `HEAD` resolved to the exact assessed head SHA.
- `git diff --check d366b8e3c650a86c984f0a64da54dae501e243f4 ce649b7331d1057621a9e09ca32120093a5eb19f -- foundations/public_file_boundary_assessment.md` produced no output.
- `git diff --name-only` over the full filtered range returned exactly the nine paths listed above.
- The pinned invariant template says a path Method with no human verdict in force is `unchecked`; it also says a run recording no verdict never gives a pass.
- `foundations/human_verdicts.md` is absent at the assessed head.
- No executable product or test code changed in `d366b8e3..ce649b7`; per the requested targeted recheck, I did not repeat the earlier runtime mutation controls or the full test suite. This verdict concerns the corrected procedure semantics.

## Remaining conditions and limits

- The three `Approved by: Mariusz, merge of <request link>` values in `foundations/decisions.md` remain intentional pending placeholders until a draft request URL exists. They are pending completion conditions, not passed approvals and not a blocker to this assessment.
- A future human verdict is trustworthy only if the assessor performs the complete route, dependency, and response-path trace the method requires. Until then, `public-file-boundary/1` remains unchecked.
- I found no further wording that can be cut without weakening the distinction or the completeness requirement. The `package.json` example is useful because it establishes that API wrapping does not convert an unrelated repository file into a legitimate application record.

## Explicit no-concern items

- No remaining contradiction between the invariant sentence and the human method.
- No invented pass from the removed sampled test citation.
- No new issue in the unchanged package-layout, build-output/build-layout, occupied-address, support helper, part-map, or public-boundary test changes within this targeted recheck.
- No product files were edited for this assessment.
