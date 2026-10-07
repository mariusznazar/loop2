# Spec compliance

**Issues found.** Both previous Important findings are corrected. The new AsyncLocalStorage collector nevertheless has a confirmed false positive: it equates every filesystem read stream created under the send operation with a file transmitted in the HTTP response.

Range: `afecf59ae70147573470d0ec5b8bae9e93754e48..66451869b4b8250fe7cd3cff7889d4be577b980b`; HEAD matched the latter. Read the focused diff once. The previous review's foundation sentence, settlement and WAY-69 independence constraints remain the basis; no product files, commits or index entries were changed. Independent mutations and results are under `.runs/task-cycles/first-foundation/public-rereview-cases/`; runner: `.runs/task-cycles/first-foundation/public_rereview_probe.py`.

## Strengths and closure of previous findings

- `tests/invariants/test_public_file_boundary.py:50`: observing the path selected by `send` eliminates the incorrect root reconstruction. The uninstrumented leading-slash/root control returned HTTP 200 with exact public `main.js` bytes, and the focused invariant now passes.
- `tests/invariants/test_public_file_boundary.py:67`: file completion is no longer filtered by HTTP success status. The uninstrumented status-404 mutant returned exact outside `package.json` bytes; the focused invariant now rejects it with the boundary assertion.
- `tests/invariants/test_public_file_boundary.py:67-72`: a missing outside file whose callback sends `fallback` remains green. The direct response was HTTP 200 with exactly that string, so failed attempts remain distinct from completed transfers.

## Important — new thread: unrelated read streams are classified as response files

**Anchor:** `tests/invariants/test_public_file_boundary.py:52` (consumption at `:68-69`).

**Ready to paste:** AsyncLocalStorage identifies work descending from `sendFile`, but does not establish which stream was piped to the response. A response `pipe` listener can read an internal file for its own purpose while the response contains only a public asset; the collector includes that internal file and incorrectly fails the invariant. Record streams actually piped to the audited response, rather than every stream created in its asynchronous context.

**Why this matters:** The check protects the boundary of files sent to clients, and must allow internal reads. `send` opens the public stream and pipes it to the response (`node_modules/send/index.js:680-682`). The response's normal `pipe` event listener executes within that same context. A read stream opened by that listener enters the `targets` array even if its bytes are merely drained locally with `.resume()` and never connected to the response. When the public file finishes, the check resolves and asserts both paths.

Independent compliant mutation:

```js
import fs from 'node:fs';

app.get('/review-pipe-listener', (_q, r) => {
  r.once('pipe', () => fs.createReadStream(
    fileURLToPath(new URL('../../package.json', import.meta.url))
  ).resume());
  r.sendFile('/main.js', {root: publicDirectory});
});
```

The actual application returned **HTTP 200 and exactly the bytes of public `main.js`**, with no appended internal bytes. Normal `/` and `/main.js` also worked. The audit nevertheless recorded both `dist/public/main.js` and the outside `package.json` for `/review-pipe-listener`, and the focused test failed at line 125. As a contrasting green control, the same unrelated read initiated directly before calling `sendFile` was not recorded and passed. This confirms the mechanism is asynchronous-context membership, not the actual destination of the internal stream.

No claim is made that the current product already has such a listener; this is a compliant mutation demonstrating that the new invariant check rejects innocent code. The parent explicitly requested inspection of unrelated filesystem streams. It is inside the ordinary literal GET/sendFile mechanism, not one of the accepted route-enumeration limitations.

Smallest correction: retain the actual stream object and its selected path, and include it only when that stream is piped to the current audited response. A response `pipe` observer correlated with the stream objects returned by the patched `fs.createReadStream` can establish that relationship; ensure observation is installed before invoking the original `sendFile`, and remove any per-response listener after completion/error. Do not impose a new product restriction forbidding internal filesystem reads during serving. Keep this control green while retaining outside direct/404 transfers as red cases.

Evidence: `public-rereview-cases/pipe_listener_stream.txt` contains the exact mutation and failure; `pipe_listener_stream-audit.txt` contains both recorded paths; `unrelated_stream.txt` and `unrelated_stream-audit.txt` provide the contrasting green case. All are under `.runs/task-cycles/first-foundation/` in this checkout.

## Independent focused verification

| Case | Independent HTTP observation | Focused invariant |
| --- | --- | --- |
| Safe leading slash and public root | 200; exact public main.js | GREEN — previous finding closed |
| Outside file with status 404 | 404; exact outside package.json | RED, boundary assertion — previous finding closed |
| Missing outside file with fallback | 200; exactly `fallback` | GREEN |
| Ordinary direct outside file | 200; exact outside package.json | RED, boundary assertion |
| Unrelated internal stream before sendFile | 200; exact public main.js | GREEN |
| Unrelated internal stream in response pipe event | 200; exact public main.js | RED — new false positive |

The outside absolute-path mutations retain `dotfiles: 'allow'` solely because disposable copies live beneath ignored `.runs`. The unrelated streams use Node filesystem APIs directly. Every case separately checks that normal `/` and `/main.js` return HTTP 200 and exact built public bytes. No whole suite was rerun.

## Patch timing, callbacks, cleanup and remaining limits

- Named risk: patch timing. The code imports Express first, then patches the shared default `fs.createReadStream` object before importing the app (`test_public_file_boundary.py:40-80`). The installed CommonJS `send` module reads `fs.createReadStream` at use time (`node_modules/send/index.js:680`), so it sees the patch even though Express was imported earlier. The successful red/green runs independently demonstrate interception. A future dependency that captures a separate function reference would require renewed review.
- Named risk: callback preservation. Completion/error handling still delegates the caller's callback and retains Express's default error handling at lines 72-79. The missing-file fallback provides direct evidence; neither fixed finding is hidden by swallowing the error. `realpathSync` still runs after transfer completion, so filesystem replacement/removal during transfer is not covered by these cases.
- Named risk: context isolation. Each sendFile call gets its own array at lines 64-65, and the Node child is disposable. The ordinary unrelated read control confirms it is excluded when initiated outside this context. Context membership is too broad for descendant event listeners, as demonstrated above. No concurrent-request proof is claimed; this check requests paths serially.
- Named risk: cleanup. The server still closes in the enclosing `finally` (line 104); the subprocess helper provides timeout and process-tree termination. These changes introduce no permanent global patch in the Python test process or product process: instrumentation lives in its own Node child. No resource hang or unhandled exception occurred in the six cases. The completed run reported port 3000 free; product git status remained clean.
- Route coverage remains finite: direct literal GET/all routes known at creation plus existing fixed public/traversal probes. Nested/parameterized/conditional routes, non-GET requests, request-time routes, redirect targets, and other file-return APIs remain outside this check's documented coverage. These are unchanged and are not new findings.

## Assessment

**Task quality: Needs fixes.** The two previous defects are closed with independent controls. The new stream collector still needs to distinguish a file sent to the response from unrelated internal reads in the same asynchronous context before this correction can be accepted.
