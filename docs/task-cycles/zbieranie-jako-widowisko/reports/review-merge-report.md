PASS 1b0990ac3ff82a6a677795e48fbf270b73ff8d49

# Review of the merge of origin/main into task/zbieranie-jako-widowisko

Range: merge commit `1b0990ac3ff82a6a677795e48fbf270b73ff8d49` (HEAD confirmed); parents `d457d2384990d4562491904732ea6811c80ce34e` (reviewed head) and `952fbd078d25bc96595b7c90aa0e1a04f3500024` (origin/main). Review made read-only; no `npm test`, no build.

Changed files, `git diff d457d238 HEAD` (added / removed):

| File | + | - |
|---|---|---|
| .the-way (gitlink) | 1 | 1 |
| AGENTS.md | 3 | 3 |
| foundations/decisions.md | 28 | 14 |
| foundations/invariants.md | 12 | 2 |
| guidelines/styleguide-browser-view.md | 5 | 5 |
| guidelines/testing.md | 4 | 4 |
| tests/agent_workflow/test_tracked_file_private_paths.py | 23 | 0 |
| tests/deploy/deploy_script_support.py | 1 | 1 |
| tests/view/scene-picture.test.mjs | 2 | 2 |
| tests/view/scene.test.mjs | 1 | 1 |

(10 files, 80 insertions, 33 deletions.)

## Findings

Blocking (Critical / Important): none.

### Minor inside the task

None.

### Minor outside the task (out of scope)

1. `src/browser/styles.css:1710`, `src/browser/styles.css:1800`, `src/browser/view/scene.tsx:22`, `tests/view/icons.test.mjs:205`, `tests/view/scene.test.mjs:764` name the task by its slug ("task zbieranie-jako-widowisko") in code comments. These lines are not in the merge's diff (already reviewed `PASS` on the task side). The rule WAY-27 of the pinned decisions template covers *Origin* of entries, not code comments, and the check of tracked files passes, so this breaks no rule; it only shows that the task's name is still in tracked files. Grade Minor, out of scope for the merge.

## What was checked (the five points of the handoff)

1. Renumbering of the decisions. In `foundations/decisions.md` main's D-362 ("How does loop2 point to places on the author's disk…") stands at line 8103, and the task's four decisions are D-363 (line 8118), D-364 (8133), D-365 (8148), D-366 (8163). D-366 reads "D-364 or D-365" and *Relations* "derives from D-04 · D-317 · D-364 · D-365", which is right (the gathering icon is D-364, the dust D-365). The styleguide `guidelines/styleguide-browser-view.md:600` lists D-363 · D-364 · D-365 · D-366 and no D-362; lines 629 (bend, D-363), 635 (icon, D-364), 638 (dust, D-365), 642 (readings, D-366) match the decisions. `tests/view/scene.test.mjs:1190` reads "D-364, D-365" for the effect placed at the mage's place, which is the icon and the dust. Search of the whole tree (`git grep -E 'D-36[0-9]'` at HEAD) found no reference on an old number. The only other reference to D-362 is `foundations/invariants.md:1285` (`tracked-file-private-paths`, *Derives from*), which is main's and refers to main's D-362 correctly. At `952fbd07` (main) D-362 is referenced in exactly the same two places, so the renumbering touched none of main's references. Compared with `d457d238`, the old task-side references (D-362..D-365 in the styleguide and the test comment) were all moved by one.
2. `foundations/invariants.md`. Both entries stand whole: `tracked-file-private-paths` (main's, `Violated: no`) is identical, field by field, to the entry at `952fbd07`; `sprite-credits` (task's, `Violated: no`) is identical to the entry at `d457d238`. Order: main's first, the task's after, then the withdrawn-identifiers table. The merge also brings main's change to the *Rests on* of `cross-part-imports` (TODO with a note) and the *Derives from* of the action-duration invariant (note without disk path): both are main's lines and are not touched by the task.
3. Pin. `git -C .the-way rev-parse HEAD` = `52f8164a354ee1a704af0d58add2f3be8e4f0247`; `git ls-files --stage -- .the-way` records the same commit; the diff of the gitlink is `e3825a82..52f8164a`, exactly main's change.
4. *Origin* under the pin. The pinned `elements/decisions/template.md` (section "Origin") says that a task document is never named in *Origin*. D-363..D-366 have `Origin: none`; each keeps its reasoning in *Rationale* and *Rejected* (D-363, D-364, D-365 with real rejected options; D-366 with `none considered`, as it had before). D-271 keeps its Origin sources without the task document (ends at "scena_z_ludzikiem_loop2.md … item 2") and its *Rationale* and *Rejected*-equivalent text is intact; D-317 keeps three other Origin sources and has *Rationale* and `*Rejected:* none considered`. `git grep -i -E 'widowisko|zbieranie_jako'` finds the task document's file name nowhere in tracked files; only the slug in code comments (Minor 1). Note: `Origin: none` is allowed by the template only when "the whole reasoning is in the entry", and *Rationale* of D-363 to D-366 do carry the reasoning; I judge it holds.
5. Collisions with main. `tests/view/scene-picture.test.mjs`: main's two changed lines (the comment on the old Loop's scene, now without `the author's older repository`) are in the merged file and there is no conflict marker; the task's additions to that file carry no disk path. `AGENTS.md`, `guidelines/testing.md`, `tests/deploy/deploy_script_support.py` are main's and unchanged by the task side. The new test `tests/agent_workflow/test_tracked_file_private_paths.py` is main's, with no expected-failure marking (taken off by `b58ce12e`). `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` run at the merge head: "checked: 435 files, 0 listed, 14 binary files not read", exit 0. So no file the task added or changed (the credits, scene, styles, tests, decisions, environment fact, part map, styleguide) holds an absolute disk path or a note link. Conflict markers: `git grep -E '^(<<<<<<<|>>>>>>>)'` outside `.runs` finds none.
6. Trust boundary `assets/sprites/**`: the merge (`git diff d457d238 HEAD`) changes no file there (count 0). The two sprite files of the task (`assets/sprites/dust.png`, `assets/sprites/mage-bend.png`) are in the range `211a4ea..HEAD` only through the task side, already reviewed.
7. Entries brought in by main: the part map and environment facts diffs against `211a4ea` hold only the task's lines (the Smoke & Fire row and the `smoke-fire-particle-licence` fact); main's 14 commits touch `foundations/decisions.md` (D-82 wording, D-362), `foundations/invariants.md`, `AGENTS.md`, guidelines/testing, tests and the pin, with no other decision of the parts browser-view, simulation or product-foundation that bears on the gathering scene. The frozen task requires from the foundation: the part-map row for the pack (present), D-271 sentence about the dust (present), the decisions of the gathering (present, renumbered) and the credits invariant (present); the frozen task has no requirement of a task document in *Origin*.

Task and merge hold together.

## Declined to judge

- The correctness of main's D-362 and its wording (main's own change, already merged there).
- Task-side code behaviour (scene, credits, styles): reviewed `PASS` on `6019d7a` and `6019d7a..d457d238`; this review judged only what the merge brought and changed.

## Checks

- `git rev-parse HEAD` -> `1b0990ac3ff82a6a677795e48fbf270b73ff8d49`, parents `d457d238…` and `952fbd07…`, exit 0.
- `git diff d457d238 HEAD --numstat` / `--stat`, exit 0 (counts above).
- `git grep -n -E 'D-36[0-9]'` at HEAD and at `952fbd07` and `d457d238`, exit 0 (see point 1).
- `git grep -n -i -E 'widowisko|zbieranie_jako'` -> only the five slugs in code comments, exit 0.
- `git grep -n -E '^(<<<<<<<|>>>>>>>)' -- . ':!.runs'` -> no match.
- `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` -> `52f8164a…` both, exit 0.
- `python -B .the-way/elements/common/foundation_check.py` -> "0 errors", exit 0.
- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` -> "checked: 435 files, 0 listed, 14 binary files not read", exit 0.
- Not run: `npm test`, `npm run build` (forbidden by the handoff; the orchestrator runs the full gate).

## Reach beyond this handoff

- `.the-way/task-cycle/tracked_private_paths_check.py` (what: ran it; where: the pinned the-way; why: confirm the invariant `tracked-file-private-paths` on the merge head).
- `git log 211a4ea..952fbd07 --stat` and `git grep` at `952fbd07` and `d457d238` (what: sources of main's changes and the old numbering; why: points 1 and 7).
- `.the-way/elements/invariants/template.md` read in part (form of the entry), whole template of decisions only for *Origin*, *Rationale*, *Rejected* sections.

## Unread material

This review is of a merge, not of the whole change, so the counts of section 1 for a whole-change review do not apply. Read whole: the diff of `d457d238..HEAD` for `foundations/`, `guidelines/`, `tests/view`, `AGENTS.md`, `.the-way`, `tests/agent_workflow`, `tests/deploy`; D-271, D-317, D-362 to D-366 and the two invariants named; the review skill. Read in part: `elements/decisions/template.md` (sections on form, Origin, Rationale and Rejected; not the Examples and Relations sections), `elements/invariants/template.md` (first 60 lines), the frozen task (by search for foundation requirements, not whole). Not read: the code of the task's files (outside the merge diff), the-way's `whole_change.md`, `fix.md`.

## Searches not found or unclear

- None unclear. Searched and not found, as expected: an old numbered reference to D-362..D-365 in the tracked tree (none left); the task document's file name in a tracked file (none); a conflict marker (none); a change under `assets/sprites/` in the merge (none).
