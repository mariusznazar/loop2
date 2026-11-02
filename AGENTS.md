## Backlog

- Projects: C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\
- Tasks: C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_tasks_active.md

Before changing product code, including scripts and tests, read `guidelines/coding.md`.

Before writing, changing or reviewing tests, read `guidelines/testing.md`.

Before changing a file of the part `browser-view`, read `guidelines/styleguide-browser-view.md`; the part's files are listed in `foundations/part_map.md`.

When working in `src/browser/`, read `src/browser/AGENTS.md`.

To run the game on this computer or operate it in a real browser, read `.claude/skills/loop2-play/SKILL.md`.

Every test of this repository runs with `npm test`.

<!-- the-way:begin -->
# Pinned the-way process

This repository uses the-way, the process for its foundation, at the commit the gitlink of the Git submodule `.the-way` records. After a fresh clone run `git submodule update --init -- .the-way`; it needs read access to the Git URL in `.gitmodules`. Before use, `git -C .the-way rev-parse HEAD` must show the commit `git ls-files --stage -- .the-way` records. If initialization fails or the commits differ, stop; never use another copy or version of the-way.

Write foundation entries only through the project skills `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-update-part-map`, `the-way-record-environment-fact`. Use the project skills `the-way-find-foundation-entries`, `the-way-define-project`, `the-way-plan-project`, `the-way-lead-project`, `the-way-settle-technology`, `the-way-refine-task`, `the-way-implement-task`, `the-way-plan-task`, `the-way-write-spec`, `the-way-make-change`, `the-way-review-change`, `the-way-critique`, `the-way-maintain-styleguide`, `the-way-maintain-coding-guidelines`, `the-way-maintain-testing-guidelines` for their named work. Where a skill or a file it reads names one without the `the-way-` prefix, use the prefixed project skill, never a personal skill of that name. In a task cycle the methods of the-way apply — `the-way-write-spec`, `the-way-plan-task`, `the-way-make-change` and `the-way-review-change` — even where an installed plugin offers methods of its own.

Run the-way's scripts from this repository's root as `.the-way/<path>`. There `python -B .the-way/elements/common/foundation_check.py` checks this repository's foundation, its guidelines and the part each file git tracks belongs to. The skills of the-way keep their working files under `.runs/`, which `.gitignore` must keep ignored.

Until the part map has its first parts, `foundation_check.py` reports every file git tracks as claimed by no part; that is expected, and it is not a pass. The first map is written with `the-way-update-part-map`.

Before a merge, run every test of this repository with its one command, which runs `python -B .the-way/elements/common/foundation_check.py` too, and report what failed and what stayed unchecked. While the one command does not run that check, run it on its own and report the check as left unchecked by the one command. A check that did not run is never a pass.
<!-- the-way:end -->
