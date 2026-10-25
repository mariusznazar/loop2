# Installer evidence

- Old gitlink and checked-out HEAD verified: 4302f72ba638fb222fc3d9de73decacdf7ca6682.
- Exact accepted target: 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c, verified available from configured origin.
- Preserved configured URL: https://github.com/mariusznazar/the-way.git.
- Installer source was a detached worktree of the exact target, created with git -C .the-way worktree add --detach.
- Preview command: python -B .runs/task-cycles/przewodnik-testow/installer/installation/install.py . --url https://github.com/mariusznazar/the-way.git. Exit 0.
- Orchestrator inspected the preview: 38 wrapper replacements, two new testing-skill wrappers, managed AGENTS block and exact gitlink upgrade; no additional intended product files. Explicit apply authorization followed completed baseline checks.
- Apply command: 'y' | python -B .runs/task-cycles/przewodnik-testow/installer/installation/install.py . --url https://github.com/mariusznazar/the-way.git --apply. Exit 0.
- Post-apply gitlink and checked-out HEAD both equal the accepted target.
- Atomic installer commit: 12179e0, chore: adopt the-way testing guidelines process. 42 files, 68 insertions, 40 deletions. Git holds the authoritative file manifest and generated changes.
- No relevant changes between pins in task-cycle/change, elements/common, decision/invariant/glossary element methods or instruction-files methods. The new testing method and template were read from the target; all subsequent methods use the installed pin.
- Installer source checkout moved by git worktree move to C:/Storage/repos/loop2-wt/przewodnik-testow/.runs/installer-2895e0e. It is scratch outside the cycle record.
- Raw preview/apply logs, which duplicate generated diffs, moved to C:/Storage/repos/loop2-wt/przewodnik-testow/.runs/installer-logs/preview.log and apply.log. They are scratch outside the cycle record.
