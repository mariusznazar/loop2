# Correction implementation report

Commit: `afecf59ae70147573470d0ec5b8bae9e93754e48`.
Parent input HEAD: `237c137e6769569631f2e1252d3bc960633816be`.
Owned change: `tests/invariants/test_public_file_boundary.py` only; foundation, application and support unchanged.
Pinned the-way checkout/gitlink: `7cfeb4c2349b181d251d1a03cb2005b980acbe9e`.

## Change and basis

The unchanged public-file-boundary/1 sentence bounds static files to the built public directory regardless of process working directory. The check now enumerates literal GET routes directly registered on Express 5's application router and requests each through a real listener from a foreign working directory. It wraps response.sendFile before importing application code, records successful completed transfers, resolves actual targets, and requires each to be within the explicit expected dist/public directory. Express download delegates through sendFile and is observed too. Existing Express-static root audit, foreign-working-directory startup, public-byte equality and traversal probes remain.

No fixed leak URL was added. The completion callback preserves caller error handling and the current Express 5 default handling (verified against node_modules/express/lib/response.js). Logs are separated from the single marked audit record. A failed attempt followed by an HTTP 200 fallback is not classified as a served file.

## Verification

The final check ran through unittest against the built disposable copy. Baseline and safe direct/static controls pass. Direct outside file routes before and after static middleware, outside download and outside static root all fail for the boundary assertion. Missing outside-file requests pass both with Express's default 404 and with a caller callback returning a 200 fallback. Exact mutations and focused outcomes follow below. Changes to built application bytes were restored in finally; the real app was untouched. This author replayed the critic's deliberate break as implementation evidence; independent acceptance remains the reviewer's responsibility under WAY-69.

`git diff --check` passes. The commit contains only the exact owned test path. No new branch or upstream was created.

## Limits

This is finite runtime evidence, not proof for every possible request: only literal GET paths registered directly on the app at creation are enumerated. Nested routers, parameterized/regex paths, routes created at request time, authentication and other request-dependent branches, non-GET routes, and filesystem bytes returned through other APIs can escape observation. Redirect targets are not followed. The router stack and default sendFile error handling depend on Express 5; a serving architecture or Express change requires renewed review. The earlier fixed public/traversal probes retain their own finite coverage. No undocumented blanket prohibition of sendFile is imposed.

## Input-scope deviation

An initial tool read accidentally printed the complete independent assessment and settlement reports instead of extracting only observation 2. The parent was notified immediately. The correction uses observation 2 and the unchanged binding sentence; no other observation motivated an edit in this owned file.

# Public file boundary check correction

## Focused disposable verification

## baseline

Mutation after `const app = express();`:

```js

```

```text
.
----------------------------------------------------------------------
Ran 1 test in 5.436s

OK
```

## outside_direct_before

Mutation after `const app = express();`:

```js
app.get('/unprobed-static-leak', (_request, response) => response.sendFile(fileURLToPath(new URL('../../package.json', import.meta.url))));
```

```text
F
======================================================================
FAIL: test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (file_response={'url': '/unprobed-static-leak', 'target': 'C:\\Users\\Mariusz\\AppData\\Local\\Temp\\loop2-invariant-2aw3l891\\package.json'})
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\tests\invariants\test_public_file_boundary.py", line 114, in test_only_built_public_files_are_served_from_a_foreign_working_directory
    self.assertTrue(Path(file["target"]).resolve().is_relative_to(expected_root),
    ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                    "a direct file response serves outside the built public directory")
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: False is not true : a direct file response serves outside the built public directory

----------------------------------------------------------------------
Ran 1 test in 5.536s

FAILED (failures=1)
```

## outside_direct_after

Mutation after `app.use(express.static(publicDirectory));`:

```js
app.get('/different-path', (_request, response) => response.sendFile(fileURLToPath(new URL('../../package.json', import.meta.url))));
```

```text
F
======================================================================
FAIL: test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (file_response={'url': '/different-path', 'target': 'C:\\Users\\Mariusz\\AppData\\Local\\Temp\\loop2-invariant-2aw3l891\\package.json'})
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\tests\invariants\test_public_file_boundary.py", line 114, in test_only_built_public_files_are_served_from_a_foreign_working_directory
    self.assertTrue(Path(file["target"]).resolve().is_relative_to(expected_root),
    ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                    "a direct file response serves outside the built public directory")
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: False is not true : a direct file response serves outside the built public directory

----------------------------------------------------------------------
Ran 1 test in 5.435s

FAILED (failures=1)
```

## safe_direct

Mutation after `const app = express();`:

```js
app.get('/safe-direct', (_request, response) => response.sendFile(fileURLToPath(new URL('../public/main.js', import.meta.url))));
```

```text
.
----------------------------------------------------------------------
Ran 1 test in 5.482s

OK
```

## safe_static

Mutation after `const app = express();`:

```js
app.use('/safe-static', express.static(publicDirectory));
```

```text
.
----------------------------------------------------------------------
Ran 1 test in 5.368s

OK
```

## outside_static

Mutation after `const app = express();`:

```js
app.use('/leak', express.static(fileURLToPath(new URL('../../', import.meta.url))));
```

```text
F
======================================================================
FAIL: test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (static_root='C:\\Users\\Mariusz\\AppData\\Local\\Temp\\loop2-invariant-2aw3l891')
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\tests\invariants\test_public_file_boundary.py", line 109, in test_only_built_public_files_are_served_from_a_foreign_working_directory
    self.assertTrue(Path(root).resolve().is_relative_to(expected_root),
    ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                     "Express static middleware exposes a directory outside "
                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                     "the built public directory")
                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: False is not true : Express static middleware exposes a directory outside the built public directory

----------------------------------------------------------------------
Ran 1 test in 5.429s

FAILED (failures=1)
```

## outside_download

Mutation after `const app = express();`:

```js
app.get('/download-route', (_request, response) => response.download(fileURLToPath(new URL('../../package.json', import.meta.url))));
```

```text
F
======================================================================
FAIL: test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (file_response={'url': '/download-route', 'target': 'C:\\Users\\Mariusz\\AppData\\Local\\Temp\\loop2-invariant-2aw3l891\\package.json'})
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\tests\invariants\test_public_file_boundary.py", line 114, in test_only_built_public_files_are_served_from_a_foreign_working_directory
    self.assertTrue(Path(file["target"]).resolve().is_relative_to(expected_root),
    ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                    "a direct file response serves outside the built public directory")
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: False is not true : a direct file response serves outside the built public directory

----------------------------------------------------------------------
Ran 1 test in 5.506s

FAILED (failures=1)
```

## outside_missing_error

Mutation after `const app = express();`:

```js
app.get('/missing-file', (_request, response) => response.sendFile(fileURLToPath(new URL('../../missing.txt', import.meta.url))));
```

```text
.
----------------------------------------------------------------------
Ran 1 test in 5.538s

OK
```

## outside_missing_handled

Mutation after `const app = express();`:

```js
app.get('/handled-missing', (_request, response) => response.sendFile(fileURLToPath(new URL('../../missing.txt', import.meta.url)), error => { if (error) response.status(200).send('fallback'); }));
```

```text
.
----------------------------------------------------------------------
Ran 1 test in 5.558s

OK
```
