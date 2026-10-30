# Slice 8 report

**Status:** done

**Commit:** `11d1fb6` (`guidelines/testing.md`, +15 −9).

**Changes** (all in § Trust boundaries):
- *Decision* line gains D-179, D-181, D-183, D-186, D-187; *Invariant* line gains `player-save-isolation`, `save-version`.
- Boundary table: new row `src/browser/sim/saved-game.ts` (`save-version`, four cases of `tests/sim/saved-game.test.mjs`); the `src/server/` row names the save-route cases for `player-save-isolation`, the 401 pair under `account-session-authorization` and `blocked-account-access`, the sixth guarded route under `account-mutation-request-guards`, and the save-route case under `account-request-transport`.
- Permissions table: D-109 and D-137 401 rows and the identifier-in-request row name `GET`/`PUT /api/saved-game` (D-179 added to the last); both D-104 rows name the save route and its 64 KiB beside 16 KiB; the transport row goes from six to seven paths; five new rows of the save routes' own results (read with `save: null`, replace with revision, `save-conflict`, `save-outdated` before the basis, `save-too-large`) with decisions D-181, D-186, D-187, D-104.

**Checks:**
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors".
- Own-work check: every test name cited in the guideline was grepped verbatim in its file (all five server cases found once; the four simulation names were copied from the file). Not run: the tests themselves (prose-only slice).

**Reaches beyond the dispatch:** decision D-183 (`foundations/decisions.md:3291`) for the simulation row's *Decision*; the names of the two other 401/transport test cases by grep in `tests/http.test.mjs` and `tests/transport.test.mjs`.

**Searches not found or unclear:** the product skill `the-way-maintain-testing-guidelines` is written for refinement; in the cycle I followed its template's section "Writing the file" and `product-guidelines/testing/template.md`. The save routes' 400 `invalid-request` case has no row of its own: the existing D-104 body rows (object of expected fields) cover it.

**Choices:** the 409 `save-conflict` row's condition says "version not lower than held" to keep it apart from `save-outdated`; rejected: one 409 row for both (they differ in code and in order of checking). `save-too-large` row states "up to 64 KiB per player" from D-104.

**Meanings needing the human's approval (WAY-172):** none — every row restates D-104, D-109, D-137, D-179, D-181, D-183, D-186, D-187 and the spec's decision 1; no new meaning was added.
