# Foundation correction — npm 12.2.1

Status: DONE_WITH_CONCERNS; committed foundation-only boundary. Actor: original foundation_author; no subagents, next-stage invocation, independent assessment, code/test/configuration edits, global writes or vault writes.
Input HEAD: b9d99e12eeb5b68f2374d2431457e2a8d886ac7d. Result: 42125f5dd4cf91d50406ccb6415610c5179a837b. Original fork and current origin/main: c379207bfd8bd148d3589ea75604ba5165915d01. Gitlink and actual process checkout both verified as d829e3aa6242a9b8901274531dd82fd5c7d87628. Worktree: C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines.

Authority: amendment-npm12.md, Mariusz’s exact accepted answer “tak, zmieńmy na 12.2.1”, alongside the unchanged frozen task.md. Read author-contract.md and foundation-handoff.md; applied project record-decision and record-invariant skills and their pinned references. Existing PR approval URL remains https://github.com/mariusznazar/loop2/pull/16.
Frozen task SHA-256 remains 718f0d973b71aba5c3039e8ec7c6549b53c1c42faca08a85a0d56bb02c85dbc3; previous reports and frozen history were not rewritten.

Selection: complete part map refreshed; changed entries name build-tools. Complete latest-Scope inspection selects D-01/1, D-02/1, D-03/2, D-04/3, D-05/3, D-06/3, D-27/1 and D-28/1 through D-33/1, read whole with their governing links. The whole-foundation search for D-33, introduced-npm, npm versions, vulnerability, advisory, threshold and audit found only the changed decision and its one fingerprint dependant; no conflicting policy. No new concept or environment fact is needed. Product guidelines are still absent; this correction stays within the ongoing task that creates them, with no UI or styleguide change. No guideline-selection expansion.

| Original settlement | Entry | Change / Polish meaning |
|---|---|---|
| 6 | D-33/1: fce481a6 → f820c28f | Audyt używa npm 12.2.1; nadal blokuje podatności od low i zachowuje cały dotychczasowy zakres oraz sposób porównania wersji. |
| 20 (dependent reference only) | introduced-npm-vulnerabilities/1: sentence fingerprint da4f7801 unchanged | Niezmiennik zachowuje to samo wymaganie; jego odwołanie wskazuje aktualne brzmienie decyzji. |

Versioning: D-33 and the derived invariant are absent at the original fork/main, so D-33 remains the branch’s new /1 entry edited before first merge; no artificial /2 is appended. Its Change remains new decision. The invariant sentence, Method, Part, Rests on and Correction stay byte-for-byte unchanged, so version /1 and Correction: none remain. Only its Derives from fingerprint changes. Both guards validate this against the original fork and current main.
Exact invariant method remains `python -B scripts/check_dependencies.py --fork-point {fork-point} --record .runs/dependency-audit.jsonl`.

Autonomous mechanics: use exactly one pin replacement plus one incoming fingerprint replacement. Leaving the old pin contradicts the accepted amendment; rewriting policy or adding a new version now adds unrelated meaning/history. Chosen cost is a deliberately temporary mismatch until the original independent audit-check author updates the executable method. No human choice beyond the explicit amendment was inferred; no new date, threshold, dependency class, suppression or availability rule was introduced.

Weakest-point / self-review: exact inverse substitution proved the complete decision file differs only by npm 11.13.0 → 12.2.1, and the complete invariants file differs only by D-33’s fingerprint. Checked PR URL preservation, all low/moderate/high/critical words, absence of D-33 from the original main and no other changed file. Five asserted preservation conditions passed in foundation-npm12-edit.py. A final diff inspection confirmed two lines only. This is fidelity evidence, not independent acceptance of an audit implementation.

Check evidence (raw stdout and stderr are combined in each full log; the adjacent .log.json records exact argv, exit and duration):
- `python -B .runs/task-cycles/coding-guidelines/reports/foundation-npm12-edit.py` — exit 0; complete output: `.runs/task-cycles/coding-guidelines/reports/foundation-npm12-edit.log`.
- `python -B .the-way/elements/decisions/format_guard.py foundations/decisions.md --base c379207bfd8bd148d3589ea75604ba5165915d01 --merge-onto c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/foundation-npm12-decisions.jsonl` — exit 0; complete output: `.runs/task-cycles/coding-guidelines/reports/foundation-npm12-decisions.log`.
- `python -B .the-way/elements/invariants/format_guard.py foundations/invariants.md --base c379207bfd8bd148d3589ea75604ba5165915d01 --merge-onto c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/foundation-npm12-invariants.jsonl` — exit 0; complete output: `.runs/task-cycles/coding-guidelines/reports/foundation-npm12-invariants.log`.
- `git diff --check` — exit 0; complete output: `.runs/task-cycles/coding-guidelines/reports/foundation-npm12-diff-check.log`.

Both changed-element guards report 0 errors, 0 warnings, 0 unchecked. Whitespace check passes. No executable dependency audit or product suite was run: covered code/tests are outside this foundation correction and still carry the old npm pin. The independent implementation acceptance remains pending, rather than being inferred from form guards. Existing fact TODO methods and broader cycle environment limitations remain outside this correction and are not claimed as passed.

| Changed path | Added | Removed |
|---|---:|---:|
| foundations/decisions.md | 1 | 1 |
| foundations/invariants.md | 1 | 1 |

Commit range: b9d99e12eeb5b68f2374d2431457e2a8d886ac7d..42125f5dd4cf91d50406ccb6415610c5179a837b; message: docs: update dependency audit npm pin to 12.2.1. Explicit path staging used; working tree clean. No package installation, lockfile, invariant check or frozen source history was changed.
Sharpness: build-tools via changed foundation entries; high because existing failure modes are unknown; no code trust-boundary file touched and no irreversible effect. Therefore no new adversarial execution is warranted within these two text changes.

Next-dispatch concern: scripts/check_dependencies.py and its tests still refer to npm 11.13.0 (observed by repository search). Root must return that method to its original independent author for npm 12.2.1, preserving low+ policy and original fork; then continue planned installation. No foundation question remains. Stop here before check authors, review, assessment or push.
