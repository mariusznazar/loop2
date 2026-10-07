# Public-file audit correction

Commit: `66451869b4b8250fe7cd3cff7889d4be577b980b`.
Changed product path: `tests/invariants/test_public_file_boundary.py` only.
Input: independent reviewer findings in `assessment-public-review.md`, unchanged public-file-boundary/1 sentence, installed Express/send implementation.

## Correction

Removed filename reconstruction. The runtime audit now intercepts fs.createReadStream inside an AsyncLocalStorage context belonging to each sendFile call and records the actual file opened by send. Consequently Express's root handling, leading slashes, and extension/index selection remain the installed library's behavior, not a second approximation in the check. The completion callback records the selected file only when transfer completes without error. HTTP status no longer filters this observation: a 404 response containing outside file bytes fails the boundary too. No-stream responses add no file observation. Existing default/caller callback error behavior, fixed probes, root inventory and explicit foreign-CWD requirement remain.

## Evidence

Thirteen focused cases below all produced expected verdicts on disposable built copies. The two reviewer findings were reproduced against the uninstrumented server before testing: the rooted leading-slash route returned status 200 and exact built main.js bytes; the outside route returned status 404 and exact root package.json bytes. Both retained normal / and /main.js bytes. The extension-fallback and missing-file-with-200-fallback cases also received separate uninstrumented status/body assertions. All built app mutations were restored in finally. Baseline, ordinary public serving, both rooted public spellings, public extension fallback, extra public static root, blocked rooted traversal and failed-file fallback pass. Direct outside routes before/after static, outside download, outside static and completed outside 404 transfer fail.

`git diff --check` passes. Only the owned test was committed. These are author reproductions of independent reviewer findings; independent re-review remains required.

## Limits

The documented finite route/request coverage remains: direct literal GET registrations at app creation only, without nested/parameterized routes, authentication variants or alternative file-response APIs. Stream observation relies on the pinned/current Express send implementation using fs.createReadStream; a serving dependency change requires review. File realpaths are resolved after successful completion and assume no simultaneous filesystem replacement. Partial transfers ending in an error are not treated as completed transfers. These limits do not hide an ordinary rooted path or a completed error-status transfer.

# Public file audit fix evidence

## baseline

```js

```

```text
.
----------------------------------------------------------------------
Ran 1 test in 5.369s

OK
```

## outside_before

```js
app.get('/leak-first', (_q, r) => r.sendFile(fileURLToPath(new URL('../../package.json', import.meta.url))));
```

```text
F
======================================================================
FAIL: test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (file_response={'url': '/leak-first', 'target': 'C:\\Users\\Mariusz\\AppData\\Local\\Temp\\loop2-invariant-xzw2pltr\\package.json'})
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\tests\invariants\test_public_file_boundary.py", line 125, in test_only_built_public_files_are_served_from_a_foreign_working_directory
    self.assertTrue(Path(file["target"]).resolve().is_relative_to(expected_root),
    ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                    "a direct file response serves outside the built public directory")
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: False is not true : a direct file response serves outside the built public directory

----------------------------------------------------------------------
Ran 1 test in 5.420s

FAILED (failures=1)
```

## outside_after

```js
app.get('/leak-last', (_q, r) => r.sendFile(fileURLToPath(new URL('../../package.json', import.meta.url))));
```

```text
F
======================================================================
FAIL: test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (file_response={'url': '/leak-last', 'target': 'C:\\Users\\Mariusz\\AppData\\Local\\Temp\\loop2-invariant-xzw2pltr\\package.json'})
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\tests\invariants\test_public_file_boundary.py", line 125, in test_only_built_public_files_are_served_from_a_foreign_working_directory
    self.assertTrue(Path(file["target"]).resolve().is_relative_to(expected_root),
    ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                    "a direct file response serves outside the built public directory")
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: False is not true : a direct file response serves outside the built public directory

----------------------------------------------------------------------
Ran 1 test in 5.747s

FAILED (failures=1)
```

## safe_file

```js
app.get('/safe', (_q, r) => r.sendFile(fileURLToPath(new URL('../public/main.js', import.meta.url))));
```

```text
.
----------------------------------------------------------------------
Ran 1 test in 5.497s

OK
```

## safe_static

```js
app.use('/safe-static', express.static(publicDirectory));
```

```text
.
----------------------------------------------------------------------
Ran 1 test in 5.346s

OK
```

## outside_download

```js
app.get('/download', (_q, r) => r.download(fileURLToPath(new URL('../../package.json', import.meta.url))));
```

```text
F
======================================================================
FAIL: test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (file_response={'url': '/download', 'target': 'C:\\Users\\Mariusz\\AppData\\Local\\Temp\\loop2-invariant-xzw2pltr\\package.json'})
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\tests\invariants\test_public_file_boundary.py", line 125, in test_only_built_public_files_are_served_from_a_foreign_working_directory
    self.assertTrue(Path(file["target"]).resolve().is_relative_to(expected_root),
    ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                    "a direct file response serves outside the built public directory")
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: False is not true : a direct file response serves outside the built public directory

----------------------------------------------------------------------
Ran 1 test in 5.389s

FAILED (failures=1)
```

## outside_static

```js
app.use('/leak', express.static(fileURLToPath(new URL('../../', import.meta.url))));
```

```text
F
======================================================================
FAIL: test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (static_root='C:\\Users\\Mariusz\\AppData\\Local\\Temp\\loop2-invariant-xzw2pltr')
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\tests\invariants\test_public_file_boundary.py", line 120, in test_only_built_public_files_are_served_from_a_foreign_working_directory
    self.assertTrue(Path(root).resolve().is_relative_to(expected_root),
    ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                     "Express static middleware exposes a directory outside "
                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                     "the built public directory")
                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: False is not true : Express static middleware exposes a directory outside the built public directory

----------------------------------------------------------------------
Ran 1 test in 5.379s

FAILED (failures=1)
```

## missing_fallback

```js
app.get('/missing', (_q, r) => r.sendFile(fileURLToPath(new URL('../../missing.txt', import.meta.url)), error => { if (error) r.status(200).send('fallback'); }));
```

```text
.
----------------------------------------------------------------------
Ran 1 test in 5.425s

OK
```

## safe_root_absolute

```js
app.get('/safe-root', (_q, r) => r.sendFile('/main.js', {root: publicDirectory}));
```

```text
.
----------------------------------------------------------------------
Ran 1 test in 5.524s

OK
```

## safe_root_relative

```js
app.get('/safe-relative', (_q, r) => r.sendFile('main.js', {root: publicDirectory}));
```

```text
.
----------------------------------------------------------------------
Ran 1 test in 5.431s

OK
```

## safe_extension

```js
app.get('/safe-extension', (_q, r) => r.sendFile('main', {root: publicDirectory, extensions: ['js']}));
```

```text
.
----------------------------------------------------------------------
Ran 1 test in 5.414s

OK
```

## root_escape

```js
app.get('/escape', (_q, r) => r.sendFile('../../package.json', {root: publicDirectory}));
```

```text
.
----------------------------------------------------------------------
Ran 1 test in 5.395s

OK
```

## outside_404

```js
app.get('/outside-404', (_q, r) => r.status(404).sendFile(fileURLToPath(new URL('../../package.json', import.meta.url))));
```

```text
F
======================================================================
FAIL: test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (file_response={'url': '/outside-404', 'target': 'C:\\Users\\Mariusz\\AppData\\Local\\Temp\\loop2-invariant-xzw2pltr\\package.json'})
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\tests\invariants\test_public_file_boundary.py", line 125, in test_only_built_public_files_are_served_from_a_foreign_working_directory
    self.assertTrue(Path(file["target"]).resolve().is_relative_to(expected_root),
    ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                    "a direct file response serves outside the built public directory")
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: False is not true : a direct file response serves outside the built public directory

----------------------------------------------------------------------
Ran 1 test in 5.421s

FAILED (failures=1)
```
