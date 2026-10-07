# Independent assessment of the human method for `public-file-boundary/1`

## Exact scope

- Immutable product range:
  `44294da228ab8c27dfd1683f931f59f8d7f8d29d..d366b8e3c650a86c984f0a64da54dae501e243f4`.
- Assessed product files:
  - `foundations/decisions.md`
  - `foundations/invariants.md`
  - `foundations/part_map.md`
  - `foundations/public_file_boundary_assessment.md`
  - `tests/invariants/loop2_invariant_support.py`
  - `tests/invariants/test_account_server_occupied_address.py`
  - `tests/invariants/test_application_build_output.py`
  - `tests/invariants/test_application_package_layout.py`
  - `tests/invariants/test_public_file_boundary.py`
- Applicable forms: the invariant template and common rules at pinned the-way commit
  `7cfeb4c2349b181d251d1a03cb2005b980acbe9e`; the checked-out submodule and recorded gitlink agree.
- The assessment is anchored to the immutable commit object named above. No task, specification,
  plan, chronology, prompt, author report, review report or settlement was read.

## Verdict

**Rewrite.** Changing the Method from a command to a human-assessed file is the right response to
the open-ended serving surface, the absence of a human verdict correctly leaves the invariant
`unchecked`, and removing the sampled test citation prevents an invented automated pass. The
assessment file nevertheless contains one blocking false-positive instruction: it expands
“static file” into any filesystem bytes that can reach a response. That can reject legitimate
account or saved-state API data stored outside `dist/public`, even though such data is not a
static file served by the application.

## Blocking observation

### The assessment's byte-flow rule is broader than the invariant's static-file boundary

**Material.** The invariant at `foundations/invariants.md:97` says:

> The server serves static files only from the built public directory, whatever working directory
> its process starts in.

The immutable assessment file's step 3 says, in part:

> For every path that can transfer filesystem bytes to a response, including static middleware,
> `sendFile`, `download`, streams and reads followed by `send` or `end`, determine the actual file
> or possible file set. [...] Confirm that every file that can be served is within the built
> public directory.

It then treats only internal reads whose bytes cannot reach a response as exempt.

**Concrete compliant case it can reject.** The product is an account and save server. A future
account/save route may legitimately read a saved-state JSON file outside `dist/public` and return
that saved state through `send` or `end`. The bytes can be identical to bytes read from the file,
but the response is account API data selected and authorised for the caller, not a static file
published at a public path. The invariant remains true; the current instruction tells the assessor
to trace those bytes to an outside-public file and give `fail`.

The same issue appears with an attachment or export produced from product data stored in a file.
The storage medium does not by itself make the response a static-file response.

**Why this matters at the intended moment.** A human verdict lapses whenever an account-server or
build-tools change reaches the invariant. The first implementation of file-backed saves would
therefore trigger precisely this reassessment. Applied as written, the method can move the static
file boundary into the API's storage design and forbid valid save behaviour that the invariant
never settled.

**Smallest viable correction.** Define the observed distinction before the transfer inventory.
For example:

> Identify every response that exposes a file as a public resource: static middleware and direct
> file responses such as `sendFile`, `download`, or an equivalent stream/read whose response is
> the selected file representation. For each, resolve its possible files and confirm they lie
> within the built public directory. Do not classify account, saved-state or other API data as a
> static file merely because the server stores or reads that data in a file; assess whether the
> response publishes the file itself rather than application data derived from storage.

Keep the current instruction to inspect streams and reads: it catches attempts to bypass
`sendFile`. The correction must change the classification criterion, not remove those mechanisms.

## Method semantics that are correct

### No human verdict means `unchecked`

At the immutable commit:

- `foundations/invariants.md:99` names the tracked path
  `foundations/public_file_boundary_assessment.md` as the Method.
- `foundations/human_verdicts.md` does not exist, so no verdict is in force.
- The pinned invariant template's closed list of unchecked reasons explicitly includes: “the
  method is a path, and no human verdict is in force.”

Therefore `public-file-boundary/1` is **unchecked**, not pass, fail or error. This is the correct
state until a human completes the assessment and records a verdict for a named commit.

The invariant format guard reports no form error and notes that there is no human-verdict file.
That guard validates the foundation's form; the `unchecked` result follows from the pinned result
rule rather than from the guard's final count of its own checks.

### The sampled runtime test no longer invents a pass

The citation comment was removed from
`tests/invariants/test_public_file_boundary.py:test_only_built_public_files_are_served_from_a_foreign_working_directory`.
I ran the pinned test runner over `tests/invariants` with a disposable record:

```text
Ran 34 tests in 68.463s
OK
RUNNER_EXIT=0
PUBLIC_RECORD_LINES=0
```

Thus a green sample supplies evidence but records no `pass` for `public-file-boundary/1`. A failed
uncited sample would still fail the supporting test run with a null invariant record; it would not
become a human verdict for the broad invariant. This is faithful to the Method change.

### The file can support a truthful pass once the false-positive classification is corrected

The assessment has the necessary safeguards against an invented pass:

- it binds the assessment to one full product commit SHA;
- it requires inspection of source, built output, build logic, complete entry points, imported
  modules, middleware, routers and serving dependencies;
- it explicitly includes parameterized and nested routes, non-GET methods, request conditions,
  late registration, direct file APIs, streams, roots and symbolic links;
- it treats automated requests as finite supporting evidence rather than proof;
- it instructs the assessor to record no verdict and name what remains unassessed when the review
  is incomplete;
- the human-verdict row records person, date and assessed commit, and lapses after a later change
  reaches the invariant.

Those rules can truthfully cover the broad sentence for this small server: the human must close
the serving mechanisms and dependency behaviour or leave the result unchecked. The file does not
claim that following a checklist automatically proves completeness. The blocking issue is the
overbroad meaning assigned to static-file responses, not the use of a human Method.

## Cost and what can be cut

The human method is expensive: it asks for path-complete source and dependency reasoning on each
reached commit. That cost matches the broad universal invariant; the prior finite route probe
demonstrably could not establish it. The lapsed-verdict rule limits the assessment to changes that
reach `account-server`, `build-tools`, the invariant entry or its Method file.

Nothing in the assessment's coverage list should be cut: parameterized and nested routes, request
conditions, late registration, dependency behaviour and symbolic links are all concrete ways the
prior command Method missed an outside-public response. The wording should be corrected to
separate static-file publication from application data. The sampled runtime test may remain as
supporting evidence because it catches cheap regressions and now carries no authority to pass the
invariant.

## Other checks and limits

- Changing only the Method does not raise the invariant version: the pinned fingerprint covers
  the invariant sentence, which is unchanged.
- The Method file is tracked under `foundations/**`, so the part map assigns it to
  `product-foundation`. A change to a file named by a Method reaches the invariant even though its
  `Part` field names `account-server · build-tools`; an existing human verdict therefore lapses
  when the assessment instructions change.
- A first `foundations/human_verdicts.md` row will also require that new file to be assigned in the
  part map, as the pinned common rules require. Its absence at this commit is correct because no
  assessment verdict has been recorded.
- The three decision approval link placeholders remain an expected pre-request pending condition,
  not a pass; this Method change neither worsens nor settles them.
- Invariant guard: 0 errors, 0 warnings, 0 unchecked checks of its own; it notes the missing
  human-verdict file.
- Part-map guard: 0 errors, 0 warnings, dependency comparison explicitly unchecked because the
  product declares no dependency-graph command.
- `git diff --check` is clean for the immutable product range.
- Port 3000 was free after the focused run.
