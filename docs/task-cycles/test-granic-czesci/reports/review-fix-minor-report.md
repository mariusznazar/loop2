PASS 842beb729dff9e465dda99c3a1e0250350d074b6

# Review of the fix of the Minor findings (review-change, variant: the fix of earlier findings)

Range `628bd1bb74de5ef90128bde7066c48fcb51b5d4b..842beb7` (one commit, `842beb7`). `git rev-parse HEAD` in the worktree is
`842beb729dff9e465dda99c3a1e0250350d074b6`. Findings file: `docs/task-cycles/test-granic-czesci/reports/findings-minor-whole.md`
(findings 1, 4, 5). Fix report read whole. Counts: blocking 0, new Minor 1, out-of-scope 0.

## Findings of the findings file

1. **`Rests on: none` of `cross-part-imports`** (`foundations/invariants.md:1244`): **fixed**, in the bare form. The field now reads
   `Rests on: TODO`, so the entry no longer claims it rests on nothing; the missing link is marked as WAY-17 asks for a link the
   author knows is missing. I checked the author's claim that a descriptive TODO is rejected: in a scratch worktree of `842beb7`
   (with a copy of `.the-way`) I changed the line to `TODO — git matching of attribute-file path patterns` and ran
   `foundation_check.py`: exit 1, `foundations/invariants.md:1244: `TODO — git matching of attribute-file path patterns` is no
   identifier of a fact`, "1 error". With the bare `TODO` the same check reports "0 errors". So the claim is true, and the bare form
   is the only form the checker accepts. The disagreement is real: `.the-way/elements/invariants/template.md:44` shows
   `TODO — <the fact, with its source>` while the checker splits the field on `·`/`,` and wants an identifier per item. That is a defect
   of the pinned the-way (outside this repository's change), not of the fix. The environment fact itself is still not recorded; the
   fixer did not read an official source for git's matching in its session, so not recording it is right (WAY-80).
4. **Three blank lines before the controls section** (`tests/invariants/test_cross_part_imports.py:527`): **fixed**. The diff removes two
   of the four blank lines; two stay, as the style of the file's other sections has them.
5. **Docstring paraphrased the invariant** (`tests/invariants/test_cross_part_imports.py:1-5`): **fixed**. I joined the first paragraph
   of the docstring (after the `Invariant cross-part-imports: ` prefix) and compared it with the sentence at
   `foundations/invariants.md` `## cross-part-imports` by a script: the two are equal, whitespace collapsed (output `True`). The
   blank line after the paragraph is kept (checked in the diff).

## What the fix itself broke

The diff is three hunks: one field value, a docstring rewrap and the removal of two blank lines. No code line changed. No new Critical
or Important finding. The test still passes and Ruff passes.

New Minor (the request's list, outside the fix diff's intent): a bare `Rests on: TODO` carries no hint of which fact is missing, so a
later reader sees only that a link is open, not that it is git's path-pattern matching. The only trace is in the review report and
the fix report, which are not kept in the repository. Within the task only in the sense that the entry is the change's own; the fix
cannot do better until the-way's template and checker agree (see Searches), or until the fact is recorded.

## Checks I ran

| Command | Exit |
|---|---|
| `git rev-parse HEAD`; `git log --oneline 628bd1b..842beb7`; `git diff 628bd1b..842beb7` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree, head) | 0, "0 errors" |
| same in a scratch worktree of `842beb7` with `Rests on: TODO — git matching of attribute-file path patterns` | 1, "is no identifier of a fact", "1 error" |
| `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` | 0, 10 tests OK |
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache tests scripts` | 0 |
| script comparing the test docstring's first paragraph with the invariant's sentence | 0, `True` |

Not run: the whole `npm test`, the Prettier/ESLint quality test (no JavaScript file touched), mutation tooling. The scratch worktree was
removed; the reviewed worktree, its index and branch were not changed (`git status --short` empty).

## Reaches beyond the dispatch

- `.the-way/elements/common/foundation_check.py` (the `Rests on` / identifier handling) and `.the-way/elements/invariants/template.md:40-46`:
  to check the claim about the descriptive TODO.

## Searches not found or unclear

- Why the pinned the-way template shows `TODO — <the fact, with its source>` for *Rests on* while `foundation_check.py` rejects it: I did
  not find which of the two is meant to hold; I only showed they disagree at the pin `294af7f`.
- No loop2 environment fact for git's path-pattern matching exists, as before; nothing in the fix adds one.
