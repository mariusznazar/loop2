# Fix 1 — findings I1 and I2 of the review of 4634e6b

**Status:** done

## Commits
- `test: make the framework guard read aliases and lock names and refuse libraries built on React` — `tests/invariants/test_browser_view_framework.py`
- `test: make the token reader skip the end of a JSX tag after braces and an address in JSX text` — `tests/invariants/test_browser_view_token_values.py`
(hashes: see `git log` on `task/logowanie-w-react`, the two commits above 4634e6b)

## I1 — fixed
- `runtime_names(manifest, lock)` now holds, besides the keys, what an `npm:` alias in `dependencies` installs and the `name` of each non-dev lock entry. So `"react": "npm:preact@10.0.0"` and a lock entry `node_modules/react` with `"name": "preact"` are both refused.
- `react_libraries(lock)`: a non-dev lock entry other than `react`/`react-dom` whose `peerDependencies` names `react`. Checked on the tree at the head: only `react`, `react-dom` (peer on react, excluded by name) and `scheduler` (no peers) are non-dev there, so the set is empty and the guard passes. `refused_names(lock)` = `UI_FRAMEWORKS` + that set; the source-import test uses it too, so `@mui/material` imported from `src/browser` is refused.
- Controls (`test_control_the_dependency_check_reads_what_an_entry_really_is`): seven crafted manifest/lock pairs (alias to listed, alias without version, alias to scoped, lock `name`, nested lock `name`, component library on React declared, one only in the lock) plus an import of `@mui/material/Button`; the real-tree shape and a dev entry with a peer on react pass. Seen failing with the old reading patched in (8 failures: the 7 cases and the test), passing with the change.
- Stated limit (docstring): a library built on React that declares no peer dependency on react is outside the guard. A consequence for the human: any later non-dev React helper library with such a peer (a router, a state library) will be refused until the guard is changed on purpose.

## I2 — fixed
- `literal_texts`: a `/` right after `}` and followed by `>` is the end of a JSX tag, not a regex; a `//` right after `:` is not a comment (the address in JSX text). Other regex starts (after `}` on a new line, after `<` with a space) are unchanged.
- Controls added: FLAGGED `a.tsx` — ternary, array, assignment after `<X y={1} />`, assignment after `<p>https://x</p>`; CLEAN `a.tsx` — `<X y={1} />`, a regex after `}` and after `<` hiding `"#fff"`, a real `//` comment after `: ` and after `/>`. Seen failing before the change (5 failures), passing after.
- Stated limit (docstrings): a `//` in JSX text not right after `:` is still read as a comment.

## Checks
- `npm test -- tests/invariants/test_browser_view_framework.py` exit 0 (8 tests)
- `npm test -- tests/invariants/test_browser_view_token_values.py` exit 0 (4 tests)
- `npm test -- tests/quality/test_quality_invariants.py` exit 0 (5 tests)
- `python -B .the-way/elements/common/foundation_check.py` exit 0 (0 errors)
- Full product gate: not run (the orchestrator's).

## Reach beyond the handoff / searches
none. Searches not found or unclear: none.
