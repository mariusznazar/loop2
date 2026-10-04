# Pinned the-way process

This repository uses the-way, the process for its foundation, at the commit the gitlink of the Git submodule `.the-way` records. After a fresh clone run `git submodule update --init -- .the-way`; it needs read access to the Git URL in `.gitmodules`. Before use, `git -C .the-way rev-parse HEAD` must show the commit `git ls-files --stage -- .the-way` records. If initialization fails or the commits differ, stop; never use another copy or version of the-way.

Write foundation entries only through the project skills `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-update-part-map`, `the-way-record-environment-fact`. Use the project skills `the-way-find-foundation-entries`, `the-way-define-project`, `the-way-settle-technology`, `the-way-critique` for their named work. Where a skill or a file it reads names one without the `the-way-` prefix, use the prefixed project skill, never a personal skill of that name.

Run the-way's scripts from this repository's root as `.the-way/<path>` and always name this repository's file or directory, e.g. `python -B .the-way/gate/run_tests.py <directory>` and `python -B .the-way/elements/<element>/format_guard.py foundations/<file>`. A guard run inside `.the-way` without a file checks the-way's own files. Records of a run (`--record`) go under `.runs/`, which `.gitignore` must keep ignored.

The main branch is the branch task branches merge into. In a clone, `git symbolic-ref --short refs/remotes/origin/HEAD` names it as `origin/<branch>`; otherwise ask the human. On a task branch pass `--base` the commit `git merge-base HEAD <main branch>` prints and `--merge-onto` the commit of the main branch the merge goes onto (the part map's guard takes no `--merge-onto`). Pass `none` only while this repository has no main branch at all; a command that cannot find the branch means a wrong name, not a missing branch. With `none` the checks that need the commit stay unchecked.

Until the part map has its first parts, its guard reports every tracked file as claimed by no part; that is expected, and it is not a pass.

Nothing runs these checks automatically. Before a merge, run the format guard of every changed foundation file and the tests of every changed part, and report what failed and what stayed unchecked. A check that did not run is never a pass.
