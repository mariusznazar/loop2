# S12 author report

Status: DONE_WITH_CONCERNS. S12 implementation complete and committed; returned before independent review. No push, merge, deployment, external write or subagent. Worktree: C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines, branch task/coding-guidelines, matching upstream origin/task/coding-guidelines.

## Result and versions

Start: a98222d9306d1011290e7092251cbf30764a1384.
End: e31f6a4051f33b832cb8603d67e815240af5464f, docs: point code changes to coding guidelines.
Range: a98222d..e31f6a4. One tracked file, AGENTS.md, +2/-0 (one instruction and one blank separator). No code or foundation/check changes.

Inserted outside the installer block, before its opening marker:

> Before changing product code, including scripts and tests, read `guidelines/coding.md`.

Pinned the-way checkout and Git gitlink both d829e3aa6242a9b8901274531dd82fd5c7d87628. Python 3.14.3. Method input: personal maintain-instruction-files SKILL.md, redirected by its own selection rule to the verified product pin's instruction-files/SKILL.md, principles.md and tool_loading.md. Superpowers implementer-prompt.md read from 6.4.1. No runtime behavior change, so TDD not applicable; no new tracked test mirroring prose.

Frozen task.md read whole with amendment-npm12.md: npm 12.2.1 supersedes the original 11.13.0; threshold remains low or higher. Author contract, authoritative plan S12 and applicable execution constraints, and extracted task-12-brief read. The brief matches S12 except heading. No tools installed or version changes.

## Foundation and guideline selection

Foundation revision a98222d. Complete part map read; AGENTS.md belongs to agent-workflow. No interface, trust boundary, irreversible effects or critical flow changes. Failure impact is missing pre-edit reading guidance, reversible by editing this line. No new styleguide need or screenshot route: screenshots unchecked, because this slice changes instruction prose only.

Complete decision heading/Scope inspection found current agent-workflow matches D-12/1 (decisions.md:312), D-13/1 (:337), D-15/1 (:379), D-28/1 (:823), D-30/1 (:857), D-31/1 (:873); all read whole. D-09/1 (:218) read as governing relation of D-15. Expanded reading included D-29/1, D-32/1 and D-33/1 while understanding the general guideline target, without changing their tools. D-28 expressly carries accepted deferred kinds. No missing agent-workflow Scope match. Invariant Part fields inspected across file, including every. Applicable guidelines-form/1 and guidelines-reference-current/1 read whole with exact Methods and no Rests-on/Derives-from dependencies; standing code checks identified but no Python/Bash source is changed. Broad invariant suite is root's final gate, not a claimed S12 pass.

Whole-foundation search: rg -l 'guideline|instruction|AGENTS|agent-workflow|coding' foundations -g '*.md' returned decisions, invariants, part map and environment facts. Relevant instruction/guideline semantics read at their decision/invariant entries; no product glossary term concerns the pointer. Product glossary inspected whole, pinned glossary terms/Avoid inspected, relevant guidelines and repository instruction file definitions read whole. An initial PowerShell literal foundations/*.md rg invocation failed as an invalid path; corrected to directory plus -g, never treated as absence.

Guideline procedure .the-way/product-guidelines/reading.md read whole. All five guideline headers and complete coding kind index inspected; selected guidelines/coding.md read whole. Only agent-workflow is affected; no kind condition matches AGENTS prose. Selection agrees with handoff, no expansion or missing-kind finding. Four kind files' conditions read, without treating them as selected whole reads.

## Method, choices and costs

Place mode carries the already accepted task To do 10 and D-28 discipline, rather than claiming repeated incidents. User authorization for this exact pointer is already in the frozen accepted task; no new human approval requested. Trigger is any product-code change, including scripts/tests. Root AGENTS.md is the shared location; existing CLAUDE.md @AGENTS.md import preserved. General guidelines remain the single index for kinds and methods. Adding direct kind paths or tool commands would duplicate changing sources; omitting the pointer would leave a normal code edit without an explicit route to the accepted guidelines. Cost is ten extra words in every session and conditional reading at code changes. No replacement sentence existed.

Instruction layout/settings inspected narrowly: current session uses Codex, installer maintains Claude/Codex paired skills, and common layout supports Cursor. Root start is supplied by task dispatch. Codex project_doc_max_bytes is 65536 and fallback CLAUDE.md; Claude claudeMdExcludes contains C:/Storage/AGENTS.md, not product instructions. No repository loading-setting override found. No fresh headless loading/compliance measurement was made; static layout cannot establish model compliance or future nested-session loading.

## Checks and full evidence

Each log below is under C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/. Each command was executed through `python -B .runs/task-cycles/coding-guidelines/reports/capture.py <log> <command>`; paired <log>.json stores command, actual exit and duration. Combined stdout/stderr preserved without shell recoding.

| Exact checked command | Exit | Full log | Verdict |
|---|---:|---|---|
| python -B .the-way/instruction-files/check_instructions.py | 0 | s12-instructions-before.log | 0 errors, 10 existing remote-Linux-path warnings, 2 size info |
| python -B .the-way/instruction-files/check_instructions.py | 0 | s12-instructions.log | 0 errors, 11 warnings, 3 size info; details below |
| python -B .the-way/gate/run_tests.py tests/agent_workflow --record .runs/agent-workflow.jsonl | 0 | s12-agent-workflow.log | 5 tests passed |
| python -B .the-way/product-guidelines/form_check.py --record .runs/guidelines-form.jsonl | 0 | s12-guidelines-form.log | form passes; explicitly does not test merge result |
| python -B .the-way/product-guidelines/form_check.py --merge-onto c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/guidelines-reference.jsonl | 0 | s12-guidelines-reference.log | form and merge references pass; exact current local origin/main used |
| python -B .runs/task-cycles/coding-guidelines/reports/s12-weakest-point.py | 1 | s12-weakest-point-initial.log (also s12-weakest-point.log) | initial manual helper incorrectly compared CRLF worktree bytes to LF Git blob; instrument failure |
| git diff --check | 0 | s12-diff-check.log | passes |
| python -B .runs/task-cycles/coding-guidelines/reports/s12-weakest-point.py | 0 | s12-weakest-point-green.log | corrected Git-blob-to-Git-blob check passes |

Weakest point is accidentally editing installer-owned content or inserting a duplicated route. Final helper verifies exactly one conditional pointer, it precedes installer marker, removing it and its separator yields byte-for-byte original Git blob, unchanged CLAUDE blob/import, and existing target. The first helper failure exposed a comparison bug (git ls-files --eol shows i/lf w/crlf for both instruction files), not product damage. Editing preserved worktree CRLF using bytes. Final helper compares the same representation. This proves exact committed scope/preservation; it cannot prove an agent follows the instruction.

## Self-review and remaining concerns

Read entire changed AGENTS.md and its diff; only intended sentence and blank separator added. Existing backlog and installer text unchanged; no kind-path/command duplication, new import or global instruction/method-source edit. Whole CLAUDE.md read and unchanged. No broad unrelated suites run.

Instruction scan retains ten baseline warnings for Linux paths in the two deploy-skill copies: /usr/local/bin/loop2-deploy, /srv/loop2, /var/log/loop2-deploy.log (twice), /run/loop2-deploy.lock. They describe remote paths, unavailable locally. New pointer makes scanner inspect coding.md and produces one additional warning at guidelines/coding.md:31: @eslint/js interpreted as an import. Source line is a package name in ordinary guideline prose, not an intended instruction import. This is an observed checker limitation, not a zero-warning pass. Do not alter frozen checker or S11 guideline out of S12 scope. Root/reviewer should assess this warning.

No fresh remote main fetch (read current local origin/main c379207); root must refresh merge target at final gate. Full product/invariant/runtime gates and independent review are intentionally unrun here. Pre-existing untracked tests/invariants/__pycache__/ and tests/quality/__pycache__/ remain untouched and uncommitted. No remaining implementation defect identified; scan warning and static-loading limits remain explicit.
