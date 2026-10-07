# Public file response stream correction

Commit: `ce55c6cda70aea18f8f4ec647776abad45574058`.
Owned product path: `tests/invariants/test_public_file_boundary.py` only.
Basis: unchanged public-file-boundary/1 and the Important finding in `assessment-public-rereview.md`.

## Change

Removed AsyncLocalStorage. A WeakMap now associates filesystem stream objects with the actual path selected by send. A per-response pipe observer collects only those stream objects actually piped into the audited Express response. The observer is installed before original sendFile and removed on completion, asynchronous error, or synchronous throw. Internal read streams drained elsewhere are therefore allowed. Callback completion still controls inclusion, independently of HTTP status; caller/default error handling is preserved. Root semantics remain delegated to send and no pathname reconstruction returns.

## Verification

Replayed all 13 independently authored reviewer cases from public_rereview_probe.py, adding an in-memory assertion that every focused verdict matches expectation. Each case separately checked real uninstrumented / and /main.js responses for HTTP 200 and exact built bytes. The relevant direct route responses were checked too. Every case matched: eight GREEN controls and five RED violations, with no unexpected errors. The formerly failing pipe-listener read returned only public main.js bytes and now passes. Ordinary/404 outside responses still return outside package.json bytes and fail.

The matrix uses disposable built copies; app mutations are restored in finally and temporary copies are removed. Final PORT_FREE=True. `git diff --check` passes. Only the named test path was staged and committed. This is author reproduction; independent re-review remains required for acceptance.

## Evidence-handling deviation

The intended in-memory replacement of the runner's output directory matched a quoted basename instead of the full path and did not apply. Consequently this author rerun overwrote the ignored per-case logs and results.json in public-rereview-cases. The original reviewer report and runner remain unchanged, but those case logs now describe this correction. The parent was notified immediately on discovery. Full current per-case outputs are embedded below; the prior reviewer report retains the previous findings and observations. No tracked product file beyond the owned test was changed.

## Limits

Existing finite route/request coverage remains unchanged. The stream association observes direct filesystem streams piped to the response during sendFile, as used by current Express/send; other serving architectures, transformed streams and dependency changes require review. Partial failed transfers and simultaneous filesystem replacement during transfer remain outside this evidence. A stream read internally without being piped to this response is not a served file.

## Focused matrix

| Case | Expected pass | Actual pass | Errors | Failures |
| --- | --- | --- | --- | --- |
| unrelated_stream | True | True | 0 | 0 |
| pipe_listener_stream | True | True | 0 | 0 |
| baseline | True | True | 0 | 0 |
| outside_before | False | False | 0 | 1 |
| outside_after | False | False | 0 | 1 |
| safe_file | True | True | 0 | 0 |
| outside_download | False | False | 0 | 1 |
| outside_static | False | False | 0 | 1 |
| missing_fallback | True | True | 0 | 0 |
| safe_root_absolute | True | True | 0 | 0 |
| outside_404 | False | False | 0 | 1 |
| safe_root_relative | True | True | 0 | 0 |
| root_escape | True | True | 0 | 0 |

## Exact mutations and outputs

### unrelated_stream

```text
app.get('/review-unrelated', (_q, r) => { fs.createReadStream(fileURLToPath(new URL('../../package.json', import.meta.url))).resume(); r.sendFile('/main.js', {root: publicDirectory}); });

test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) ... ok

----------------------------------------------------------------------
Ran 1 test in 5.286s

OK

```

### pipe_listener_stream

```text
app.get('/review-pipe-listener', (_q, r) => { r.once('pipe', () => fs.createReadStream(fileURLToPath(new URL('../../package.json', import.meta.url))).resume()); r.sendFile('/main.js', {root: publicDirectory}); });

test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) ... ok

----------------------------------------------------------------------
Ran 1 test in 5.427s

OK

```

### baseline

```text


test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) ... ok

----------------------------------------------------------------------
Ran 1 test in 5.283s

OK

```

### outside_before

```text
app.get('/review-leak-before', (_q, r) => r.sendFile(fileURLToPath(new URL('../../package.json', import.meta.url)), {dotfiles: 'allow'}));

test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) ...
  test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (file_response={'url': '/review-leak-before', 'target': 'C:\\Storage\\repos\\loop2-first-foundation\\.runs\\task-cycles\\first-foundation\\public-rereview-cases\\loop2-invariant-5rhv3sh9\\package.json'}) ... FAIL

======================================================================
FAIL: test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (file_response={'url': '/review-leak-before', 'target': 'C:\\Storage\\repos\\loop2-first-foundation\\.runs\\task-cycles\\first-foundation\\public-rereview-cases\\loop2-invariant-5rhv3sh9\\package.json'})
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\tests\invariants\test_public_file_boundary.py", line 137, in test_only_built_public_files_are_served_from_a_foreign_working_directory
    self.assertTrue(Path(file["target"]).resolve().is_relative_to(expected_root),
    ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                    "a direct file response serves outside the built public directory")
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: False is not true : a direct file response serves outside the built public directory

----------------------------------------------------------------------
Ran 1 test in 5.357s

FAILED (failures=1)

```

### outside_after

```text
app.get('/review-leak-after', (_q, r) => r.sendFile(fileURLToPath(new URL('../../package.json', import.meta.url)), {dotfiles: 'allow'}));

test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) ...
  test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (file_response={'url': '/review-leak-after', 'target': 'C:\\Storage\\repos\\loop2-first-foundation\\.runs\\task-cycles\\first-foundation\\public-rereview-cases\\loop2-invariant-5rhv3sh9\\package.json'}) ... FAIL

======================================================================
FAIL: test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (file_response={'url': '/review-leak-after', 'target': 'C:\\Storage\\repos\\loop2-first-foundation\\.runs\\task-cycles\\first-foundation\\public-rereview-cases\\loop2-invariant-5rhv3sh9\\package.json'})
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\tests\invariants\test_public_file_boundary.py", line 137, in test_only_built_public_files_are_served_from_a_foreign_working_directory
    self.assertTrue(Path(file["target"]).resolve().is_relative_to(expected_root),
    ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                    "a direct file response serves outside the built public directory")
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: False is not true : a direct file response serves outside the built public directory

----------------------------------------------------------------------
Ran 1 test in 5.373s

FAILED (failures=1)

```

### safe_file

```text
app.get('/review-safe', (_q, r) => r.sendFile(fileURLToPath(new URL('../public/main.js', import.meta.url)), {dotfiles: 'allow'}));

test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) ... ok

----------------------------------------------------------------------
Ran 1 test in 5.330s

OK

```

### outside_download

```text
app.get('/review-download', (_q, r) => r.download(fileURLToPath(new URL('../../package.json', import.meta.url)), {dotfiles: 'allow'}));

test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) ...
  test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (file_response={'url': '/review-download', 'target': 'C:\\Storage\\repos\\loop2-first-foundation\\.runs\\task-cycles\\first-foundation\\public-rereview-cases\\loop2-invariant-5rhv3sh9\\package.json'}) ... FAIL

======================================================================
FAIL: test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (file_response={'url': '/review-download', 'target': 'C:\\Storage\\repos\\loop2-first-foundation\\.runs\\task-cycles\\first-foundation\\public-rereview-cases\\loop2-invariant-5rhv3sh9\\package.json'})
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\tests\invariants\test_public_file_boundary.py", line 137, in test_only_built_public_files_are_served_from_a_foreign_working_directory
    self.assertTrue(Path(file["target"]).resolve().is_relative_to(expected_root),
    ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                    "a direct file response serves outside the built public directory")
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: False is not true : a direct file response serves outside the built public directory

----------------------------------------------------------------------
Ran 1 test in 5.399s

FAILED (failures=1)

```

### outside_static

```text
app.use('/leak', express.static(fileURLToPath(new URL('../../', import.meta.url))));

test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) ...
  test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (static_root='C:\\Storage\\repos\\loop2-first-foundation\\.runs\\task-cycles\\first-foundation\\public-rereview-cases\\loop2-invariant-5rhv3sh9') ... FAIL

======================================================================
FAIL: test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (static_root='C:\\Storage\\repos\\loop2-first-foundation\\.runs\\task-cycles\\first-foundation\\public-rereview-cases\\loop2-invariant-5rhv3sh9')
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\tests\invariants\test_public_file_boundary.py", line 132, in test_only_built_public_files_are_served_from_a_foreign_working_directory
    self.assertTrue(Path(root).resolve().is_relative_to(expected_root),
    ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                     "Express static middleware exposes a directory outside "
                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                     "the built public directory")
                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: False is not true : Express static middleware exposes a directory outside the built public directory

----------------------------------------------------------------------
Ran 1 test in 5.306s

FAILED (failures=1)

```

### missing_fallback

```text
app.get('/review-missing', (_q, r) => r.sendFile(fileURLToPath(new URL('../../absent-review.txt', import.meta.url)), {dotfiles: 'allow'}, error => { if (error) r.status(200).send('fallback'); }));

test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) ... ok

----------------------------------------------------------------------
Ran 1 test in 5.361s

OK

```

### safe_root_absolute

```text
app.get('/review-root', (_q, r) => r.sendFile('/main.js', {root: publicDirectory}));

test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) ... ok

----------------------------------------------------------------------
Ran 1 test in 5.287s

OK

```

### outside_404

```text
app.get('/review-error-file', (_q, r) => r.status(404).sendFile(fileURLToPath(new URL('../../package.json', import.meta.url)), {dotfiles: 'allow'}));

test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) ...
  test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (file_response={'url': '/review-error-file', 'target': 'C:\\Storage\\repos\\loop2-first-foundation\\.runs\\task-cycles\\first-foundation\\public-rereview-cases\\loop2-invariant-5rhv3sh9\\package.json'}) ... FAIL

======================================================================
FAIL: test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (file_response={'url': '/review-error-file', 'target': 'C:\\Storage\\repos\\loop2-first-foundation\\.runs\\task-cycles\\first-foundation\\public-rereview-cases\\loop2-invariant-5rhv3sh9\\package.json'})
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\tests\invariants\test_public_file_boundary.py", line 137, in test_only_built_public_files_are_served_from_a_foreign_working_directory
    self.assertTrue(Path(file["target"]).resolve().is_relative_to(expected_root),
    ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                    "a direct file response serves outside the built public directory")
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: False is not true : a direct file response serves outside the built public directory

----------------------------------------------------------------------
Ran 1 test in 5.351s

FAILED (failures=1)

```

### safe_root_relative

```text
app.get('/review-root-relative', (_q, r) => r.sendFile('main.js', {root: publicDirectory}));

test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) ... ok

----------------------------------------------------------------------
Ran 1 test in 5.323s

OK

```

### root_escape

```text
app.get('/review-root-escape', (_q, r) => r.sendFile('../../package.json', {root: publicDirectory}));

test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) ... ok

----------------------------------------------------------------------
Ran 1 test in 5.420s

OK

```
