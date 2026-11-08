# Slice 7 report — the coding guidelines' tables know the new files

**Status:** done

**Commits:** `1880393` (docs: add the four rows to `guidelines/coding-browser-module.md`).
Range from the slice base `2ca73e1` to the head `1880393`: one commit, one file.

**Files changed**

- `guidelines/coding-browser-module.md`: +4, −0. Rows added to *Files of this kind*, in path order:
  - `src/browser/view/chronicle-entries.ts` — copy — `—`
  - `src/browser/view/chronicle.ts` — copy — `—`
  - `src/browser/view/discovery-band-text.ts` — copy — `—`
  - `src/browser/view/right-area.tsx` — copy — `—`

**Not changed, as the slice requires:** `guidelines/coding-simulation-module.md`. The change added no new file under `src/browser/sim/`: `git diff --name-status 3ea46e8..HEAD -- src` shows only `M` entries under `src/browser/sim/` (`body.ts`, `game.ts`, `programs.ts`, `run.ts`). The file stays as it is.

## Checks

| Check | Command | Exit code | Result |
|---|---|---|---|
| Foundation check (the slice's *Checks*) | `python -B .the-way/elements/common/foundation_check.py` | 0 | "0 errors" |
| Rows match tracked files | `grep` of the table's `src/browser/view/` paths, each tested with `git ls-files --error-unmatch` | (loop; no `UNTRACKED` line printed) | every row names a tracked file |
| Each new file has exactly one row | `grep -c` for each of the four paths | 1 each | one row per file |
| No DOM in the new files, so `copy` fits | `grep -n "document\.\|createElement\|innerHTML"` on the four files | 1 (no match) | no DOM use |
| Sim guideline unchanged | `git diff --quiet -- guidelines/coding-simulation-module.md` | 0 | unchanged |

The full suite (`npm test`) was not run, as the handoff says; the orchestrator runs it. The one command's own run of `foundation_check` is the check this slice names.

**Test first:** not applicable. The change is a table of prose guidelines, which is configuration-like under `make-change` section 2; no test was written and none was seen failing.

## Own-work check

- **Requirement most likely missed:** that every new file of `src/browser/view/` has one row, and that the four rows sit in path order with the status of their like. The status choice is the one a reviewer may question: `chronicle.ts` is stateful but has no React and no DOM, and `chronicle-entries.ts` and `discovery-band-text.ts` are pure. The guideline's rule is that `do not copy` marks a file that builds DOM elements; none of the four does.
- **Check made:** the path-to-tracked-file loop, the one-row count for each new file, the DOM grep on the four files, and the `git diff --stat` showing only the four `+` lines. The four rows are the only diff lines; no existing row changed.
- **Result:** all pass as in the table above.

## Choices

- **Status `copy` for all four files.** The precedent is commit `434f32b`, which gave `now-lines.ts` and `now-rows.tsx` the status `copy`. `chronicle.ts` has the nearest like in `clock.ts` and `away-report.ts`, both `copy`, and `right-area.tsx` is a React screen part like `now-rows.tsx`. The rejected option was `do not copy` for `chronicle.ts`, which would have marked a file with no DOM as one to avoid; its cost would be that a later reader would take it for a file a new screen must not copy. Nothing in the rules depends on this beyond the reading.
- **Decision column `—`** on every new row, as the template gives for a non-exemplar.

## Reaches beyond the handoff

- `foundations/glossary.md:248-252` (the term `chronicle`) was read to check the name; the handoff named it.
- `guidelines/coding-simulation-module.md` was read in full to confirm that its table needs no row.
- `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/coding/template.md` were read as the slice names; the coding template's *Files of this kind* form (status and decision columns, path in backticks) was followed.
- The gitlink of `.the-way` was checked: `294af7f` in the index and in the submodule, matching the pinned commit.

## Files changed beyond the slice's *Change*

None. The slice's *Change* is `guidelines/coding-browser-module.md` and `guidelines/coding-simulation-module.md`; the second is unchanged, as the slice says it may be.

## Searches not found or unclear

- **Pre-existing gap, not from this change:** `src/browser/view/end-question.tsx` is tracked and has no row in *Files of this kind*. It was added in `c5befaf` and `15dfb9f`, both ancestors of the slice base `2ca73e1`, and it is not in `git diff --name-status 3ea46e8..HEAD`. The slice's scope is the new files of this change, so it is not added here. The template says a file added after the last audit takes no row until the guidelines are refreshed, so this is for the audit to take up. Recorded as a remark for the orchestrator to decide.
- **Glossary term `chronicle`:** read only its heading and first lines (`foundations/glossary.md:248-252`), enough to confirm the name; it bears on no status here.
- The handoff's ranges for `foundations/decisions.md` were not needed: the slice names no decision beyond those in the guideline's own rows.
