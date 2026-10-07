# Spec compliance

**Issues found.** The requested ordinary literal GET regressions are detected, and the check allows a safe direct file response and a failed outside transfer with a successful fallback. However, the new response wrapper rejects a compliant Express `root` option and overlooks a completed outside-file transfer with HTTP 404. These are defects inside the claimed direct-route mechanism, not the explicitly accepted finite-route coverage limits.

Assessed immutable range: `237c137e6769569631f2e1252d3bc960633816be..afecf59ae70147573470d0ec5b8bae9e93754e48`. Only `tests/invariants/test_public_file_boundary.py` changes. HEAD matched the supplied head. Pinned `.the-way` checkout and gitlink both equal `7cfeb4c2349b181d251d1a03cb2005b980acbe9e`.

Basis: unchanged `public-file-boundary/1`, `foundations/invariants.md:97`; current independent assessment observation 2 and its settlement; Superpowers 6.4.1 task reviewer instructions; WAY-69 at `.the-way/foundations/decisions.md:1908`; user's code-review playbook. I wrote the deliberate mutations independently and did not write this check or its foundation sentence. I read the changed file before locating the task-reviewer prompt, then read the full diff once. No application, test, support, foundation, index, branch or commit was changed.

## Strengths

- `tests/invariants/test_public_file_boundary.py:74`: runtime enumeration finds a literal route without hardcoding the leaking URL. Direct GET routes both before and after static middleware fail the boundary assertion.
- `tests/invariants/test_public_file_boundary.py:57`: an actual completion callback distinguishes a failed file transfer with HTTP 200 fallback from a served outside file. The fallback control passes.
- `tests/invariants/test_public_file_boundary.py:100`: audit records are separated from ordinary application logs, so a normal missing-file message is not parsed as JSON.
- `tests/invariants/test_public_file_boundary.py:124`: the existing uninstrumented startup and exact public-byte checks remain; all my mutants separately retained normal `/` and `/main.js` responses.

## Important — new thread: valid root-relative serving crashes the audit

**Anchor:** `tests/invariants/test_public_file_boundary.py:56` (uncaught error at `:59`).

**Ready to paste:** `resolve(root, file)` does not reproduce Express's `root` semantics: `sendFile('/main.js', {root: publicDirectory})` serves the correct public file, but this audit attempts `realpathSync('C:\\main.js')` and fails. Resolve paths according to the actual transfer mechanism and retain a green control for both relative and leading-slash paths with `root`.

**Why this matters:** The wrapper must identify the file actually sent, so it can compare it with `dist/public`. Express's installed `send` implementation (`node_modules/send/index.js:424-441`) first normalizes `'.' + separator + path`, then joins that beneath the supplied root. Node `resolve(root, '/main.js')` instead discards the root, yielding the drive-root path on Windows. The uninstrumented mutation returned HTTP **200**, with a body exactly equal to `dist/public/main.js`. The invariant test failed at line 98 because the child crashed with uncaught `ENOENT: ... lstat 'C:\\main.js'` from line 59. This is a compliant application rejected by the check, not merely a poor diagnostic.

Mutation:

```js
app.get('/review-root', (_q, r) => r.sendFile('/main.js', {root: publicDirectory}));
```

The plain relative variant `sendFile('main.js', {root: publicDirectory})` passes. A root escape `sendFile('../../package.json', {root: publicDirectory})` is refused by Express with HTTP 403 and does not return the outside bytes; it must remain green. The correction must therefore preserve Express's rooted containment semantics, not reinterpret leading `/` as a filesystem escape. For these cases, use the same normalized path-under-root operation as `send` (root branch: normalize the `'.' + separator + file` path, then join it to the resolved root), leaving unrooted absolute paths separate. Prefer observing the actual resolved transfer path if extending support to other `send` options; reconstructing filenames also has to account for options such as extension fallback. Do not merely catch and ignore `realpathSync` failures, which would turn an unknown transfer into a silent pass.

Evidence: `.runs/task-cycles/first-foundation/public-review-cases/safe_root_absolute.txt`, `safe_root_absolute-audit.txt`, `safe_root_relative.txt`, and `root_escape.txt`; independently authored runner `.runs/task-cycles/first-foundation/public_review_probe.py`.

## Important — new thread: completed outside transfer with HTTP 404 is not recorded

**Anchor:** `tests/invariants/test_public_file_boundary.py:58`.

**Ready to paste:** Restricting completed file transfers to HTTP 2xx lets `response.status(404).sendFile(outsideFile)` pass this invariant even though the client receives the entire outside file. Record transfers that actually completed with file bytes regardless of whether their HTTP status denotes success; retain the missing-file fallback control to distinguish an unsuccessful attempt.

**Why this matters:** The foundation bounds where served static files come from, not their HTTP status. The `sendFile` callback reports successful stream completion without an error even when the handler intentionally sets status 404, as in a custom error page. The status condition discards that observation. My direct, literal route returned status **404** and a body exactly equal to the disposable root `package.json`; `/` and `/main.js` still returned their expected public bytes. The focused invariant nevertheless passed and its audit record had `files: []`. This is an ordinary use of the already instrumented API and enumerated path, not an authentication, parameterization or alternative-API coverage limitation.

Mutation (the dotfile option permits the ignored `.runs` test-container path):

```js
app.get('/review-error-file', (_q, r) =>
  r.status(404).sendFile(fileURLToPath(new URL('../../package.json', import.meta.url)),
                       {dotfiles: 'allow'}));
```

Use transfer completion rather than the HTTP success class as the inclusion criterion, distinguishing responses that carry no file body if needed. A missing outside file whose callback sends the string `fallback` is different: its file callback has an error, and that control correctly remains green. No product requirement authorizes static bytes outside public merely because the response is an error page.

Evidence: `.runs/task-cycles/first-foundation/public-review-cases/outside_404.txt` and `outside_404-audit.txt`; the runner asserts the real response body before invoking the invariant.

## Independent focused verification

All mutations were made only to disposable built copies under ignored `.runs/task-cycles/first-foundation/public-review-cases/`; their original app bytes were restored in `finally`, and the copies removed by the existing helper. Individual outputs and exact mutations remain in that directory. No full suite was rerun.

| Case | Direct application observation | Focused invariant |
| --- | --- | --- |
| Baseline | `/` and `/main.js`: 200, exact built bytes | GREEN |
| Outside literal GET before static middleware | 200, exact outside `package.json` | RED, boundary assertion |
| Outside literal GET after static middleware | 200, exact outside `package.json` | RED, boundary assertion |
| Safe direct `sendFile` | 200, exact public `main.js` | GREEN |
| Outside `download` | 200, exact outside `package.json` | RED, boundary assertion |
| Outside static root mounted at `/leak` | Normal public assets remain valid | RED, root assertion |
| Missing outside file with fallback | 200, `fallback` | GREEN |
| Safe leading slash with `root` | 200, exact public `main.js` | RED, audit child crashes — finding 1 |
| Safe relative path with `root` | 200, exact public `main.js` | GREEN |
| Escape above supplied public root | 403, does not return outside bytes | GREEN |
| Outside file with error status | 404, exact outside `package.json` | GREEN — finding 2 |

An initial version of the disposable absolute-path mutants used Express's default dotfile policy. Because their absolute paths contained `.runs`, Express returned 404 instead of sending the intended file. Independent direct-response assertions exposed that setup issue; those runs are not accepted as boundary evidence. Final absolute-file cases use `{dotfiles: 'allow'}` only to permit the ignored container. Rooted cases do not need this option because `send` tests path components beneath the root. Normal public assets were independently checked in every run.

## Runtime and coverage assessment

- Named risk: callback error handling. Compared the wrapper with installed Express `response.js:378-424`. Missing-file callbacks remain caller-controlled; absent callbacks preserve Express's EISDIR/abort/write-error handling. The unsafe synchronous realpath call is the confirmed uncaught-error case above.
- Named risk: shared state and completion. `roots` and `files` live in a fresh Node child. Requests are awaited serially, complete bodies are consumed, and the server is closed before printing the audit. No data race was observed in these cases; the check is not a concurrency or filesystem-replacement test. Resolving a file after completion still assumes the pathname has not changed during transfer.
- Named risk: cleanup. The audit uses an ephemeral port and closes in `finally`; the shared `run` helper kills the process tree on error/timeout (`loop2_invariant_support.py:128`). The normal server uses `stop()` (`:279`). Port 3000 was free after completed probe runs. A hung request can wait for the 10-second fetch abort and, if close cannot finish, the outer 300-second process timeout; no hung process was observed.
- `test_public_file_boundary.py:74-80` inspects only the direct application router's literal GET/all registrations. Nested routers, parameters/regex paths, request-time registration, authorization or header/cookie/query-dependent handlers, non-GET routes, redirects and raw filesystem bytes returned through other APIs are outside coverage. These limits are documented at lines 7-10 and in the settlement; the check does not prove the universal sentence for all serving architectures.
- The root inventory checks registered Express static roots regardless of mounting prefix or actual accessibility. This is existing conservative coverage; the changed wrapper does not remove it. The new mechanism additionally depends on Express 5's router stack and callback behavior. A serving architecture or dependency change requires review.
- The expected containment boundary is literal `dist/public` (`:106`), independently of the application's `publicDirectory` calculation. Exact public bytes are read from the build as in the existing test; this correction does not redefine the expected boundary from app logic.

## Assessment

**Task quality: Needs fixes.** The intended regression is now caught and the stated finite enumeration boundary is explicit. The response wrapper still has one confirmed false positive and one confirmed false negative within its own advertised mechanism, so this range is not ready for acceptance.
