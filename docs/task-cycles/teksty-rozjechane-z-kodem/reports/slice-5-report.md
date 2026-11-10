# Slice 5 report — the tests say "restore" where a destroyed session or counter comes back

**Status:** done

## Change

- Commit: `75d9943` on `task/teksty-rozjechane-z-kodem` (base `60c799e`).
- `tests/http.test.mjs` line 669: comment `// D-101: a delayed renewal cannot resurrect a destroyed session.` now says `restore`. 1 line changed.
- `tests/sim/program-counts.test.mjs` line 258: case name `... completion does not resurrect it` now says `restore`. 1 line changed.
- Totals: 2 files changed, 2 insertions, 2 deletions. `git diff -U0` shows only these two lines. No assertion, no other word touched.

## Searches

- `grep -rnwi -e restore -e resurrect -e resurrects -e resurrected -e resurrection tests src`: the only `resurrect` (exact word) hits in `tests` and `src` were the two lines changed. All other `resurrection` hits mean a character's resurrection. The `restore` hits are `restore-trial` file names, `mock.restore()` calls, a comment about `ServerResponse`, and a backup/restore comment in deploy tests. None means a restored session or counter.
- Not changed, noted for the cycle: `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:148` quotes the old D-101 wording ("cannot resurrect a destroyed session") in the frozen task. It is a task document, not in this slice.
- `plan.md` and the handoff still quote the old case name; that is expected.

## Checks

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/sim/program-counts.test.mjs` | 0 | 11 tests, 11 pass, 0 fail |
| `npm test -- tests/http.test.mjs` | 0 | 89 tests, 89 pass, 0 fail |
| `git diff -U0` | 0 | only the comment line and the case name changed |

Mismatch: the handoff's *Checks* line names `python -B scripts/test.py <file>`; the handoff's own note says `npm test -- <file>` is the form for `.mjs` files. I ran the `npm test` form, as the note says. The `python -B scripts/test.py` form was not run.

Not run: the full `npm test` (the orchestrator runs it), and `foundation_check.py` (not part of this slice).

## Own-work check (section 3)

- Requirement: the slice must change only the comment and the case name, with no assertion or other word changed, and "resurrect" must stay where it means a character's resurrection.
- Check: `git diff -U0` (above) plus the grep above.
- Shows: exactly two lines changed; the grep finds no other exact `resurrect` word in `tests` or `src`.

## Unread material

None. `guidelines/coding.md` and `guidelines/testing.md` were read whole (testing.md in two reads, lines 1-464). Foundation entries and passages read whole or at the handoff's ranges: D-101 (decisions.md 1874-1885), glossary `resurrection` (203-209), part_map simulation (30-60) and account-server (62-82), task.md 70 and 99-104.

## Searches not found or unclear

None.

## Reach beyond the handoff

- `a rule file of the author's agent instructions` (user's global git rule, read before the commit). Used for the commit: `git add` by path, English message in the repo's style. The author email on the commit is the private address the rule describes for the `mariusznazar` remote.
- `.the-way/task-cycle/change/SKILL.md` and `slice.md` were read as the handoff names them. No `reserved_choices.md` read was needed; no reserved choice arose.

## Questions and concerns

None for the cycle. Note only the check-command mismatch above.
