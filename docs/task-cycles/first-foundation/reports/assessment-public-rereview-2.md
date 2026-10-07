# Spec compliance

**Spec compliant for this correction.** The new observer ties a filesystem stream to the response it is actually piped into. It closes the previously demonstrated unrelated-read false positive without restoring either earlier defect: valid rooted paths remain allowed and completed outside-file transfers with HTTP 404 remain rejected.

Assessed immutable range: `66451869b4b8250fe7cd3cff7889d4be577b980b..ce55c6cda70aea18f8f4ec647776abad45574058`. HEAD matched the latter. The only product change is `tests/invariants/test_public_file_boundary.py`; I read its focused diff once. The foundation sentence, settlement, WAY-69 independence and task-reviewer/code-review instructions from the earlier review remain the basis.

The author's accidental overwrite of the previous ignored case logs is recorded in `assessment-public-fix-2.md`. I did not treat those overwritten logs as independent evidence. All evidence for this verdict was generated afresh in `.runs/task-cycles/first-foundation/public-rereview-2-independent-ce55c6c/`, through my runner `.runs/task-cycles/first-foundation/public_rereview_2_probe.py`. Earlier reviewer runners and reports were not overwritten.

## Strengths

- `tests/invariants/test_public_file_boundary.py:47-54`: the WeakMap associates each actual filesystem stream object with its selected path, without reconstructing Express root semantics or retaining stream objects strongly.
- `tests/invariants/test_public_file_boundary.py:65-69`: the per-response observer records the stream only when the response receives its `pipe` event. Reading another file during that event no longer turns an internal read into a claimed response transfer. Prepending the observer makes its capture independent of ordinary application listener order.
- `tests/invariants/test_public_file_boundary.py:70-88`: the observer is removed on completion/error before caller callback handling, and also when the original method throws synchronously. The latter was checked with an independent mutation that compares listener counts before and after an invalid sendFile call, then serves a valid public file.
- `tests/invariants/test_public_file_boundary.py:73-75`: completed transfers are still checked independently of HTTP status. Failed file attempts still follow the existing callback/error handling rather than being treated as successful file responses.

## Issues

**Critical:** none found.

**Important:** none found in this correction.

**Minor:** none requiring a change. The finite coverage limits below remain explicit; this approval is not a claim that the check proves every possible file-serving architecture.

## Independent focused checks

Every case used a disposable built application under the fresh ignored evidence directory. Before running the instrumented check I verified that the actual application still served `/` and `/main.js` with HTTP 200 and exact built public bytes. The runner also independently checked the named direct response, and asserted every final test verdict matched its written expected verdict. Only the focused public-file invariant ran; no whole suite was repeated.

| Case | Actual HTTP response | Focused result |
| --- | --- | --- |
| Public sendFile with unrelated outside read in `pipe` listener | 200, exact public main.js | GREEN |
| Same unrelated outside read before sendFile | 200, exact public main.js | GREEN |
| Invalid synchronous sendFile call followed by safe rooted sendFile | 200, exact public main.js; listener count restored | GREEN |
| Ordinary direct outside sendFile | 200, exact outside package.json | RED, boundary assertion |
| Missing outside file with successful callback fallback | 200, exactly `fallback` | GREEN |
| Safe leading-slash `/main.js` with public `root` | 200, exact public main.js | GREEN |
| Direct outside sendFile with HTTP 404 | 404, exact outside package.json | RED, boundary assertion |

The previous false-positive case's audit now contains only `dist/public/main.js`; the unrelated `package.json` is absent. Exact mutations, unittest output and Node audit output are saved as `<case>.txt` and `<case>-audit.txt` in the fresh evidence directory; `results.json` contains the full verdict matrix. Absolute outside-path mutations use `dotfiles: 'allow'` only to permit the `.runs` container; real application bytes and serving methods remain the subjects of the check.

## Mechanism, cleanup and precise limits

- **Actual transfer association:** the installed `send` implementation opens a filesystem stream and calls `stream.pipe(res)` (`node_modules/send/index.js:680-682`). Its returned stream is the same object used by the observer. Ordinary unrelated reads drained locally are not recorded even when started in the `pipe` listener. This is verified by the contrasting controls, not merely inferred from AsyncLocalStorage or request context.
- **Patch timing:** the fs patch is installed before the app is imported. Current CommonJS `send` reads `fs.createReadStream` at invocation time, so the patch applies despite Express being imported first. Outside transfers remained red, demonstrating that removing AsyncLocalStorage did not lose current Express interception.
- **Callbacks and lifecycle:** completion/error removes the observer before forwarding a supplied callback or applying Express's default handling. The synchronous catch removes it and rethrows. The invalid-call control confirms no listener remains on that branch; missing-file fallback confirms the asynchronous error branch still preserves the response behavior. No new listener is attached permanently to shared Express objects; wrappers live in a disposable Node child.
- **Resource cleanup:** the existing server-close `finally` remains at `test_public_file_boundary.py:116-117`, and the support helper retains subprocess timeout/process-tree cleanup. Built copies are restored in the runner's `finally` and removed through the existing helper. No hangs, unhandled errors or resource leaks occurred in these checks. The completed run reported `PORT_FREE=True`, and product git status was clean.
- **Finite coverage:** the unchanged router walk (`:97`) enumerates direct literal GET/all routes existing when the app is created. Nested/parameterized/conditional routes, authorization and other request-dependent branches, request-time registrations, non-GET requests, redirects, and bytes sent through other APIs remain outside this evidence. A future transform/pipeline that obscures the original filesystem stream, a different file API, or a dependency capturing createReadStream differently requires renewed review.
- **Completion boundary:** this check records successful completed file transfers. Partial failed transfers and filesystem replacement/removal while transferring are not covered by these cases; it still resolves the pathname after completion. No claim of concurrency, adversarial stream manipulation, or universal filesystem provenance is made. These are the already stated runtime boundaries, not newly introduced product constraints.

## Assessment

**Task quality: Approved.** The requested correction now distinguishes an internal read from a file sent to the response, and independent controls preserve both earlier fixes. No further product change is requested by this review.
