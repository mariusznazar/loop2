# Planner report — serwer-testowy

Planner: fresh agent (Claude Code, claude-opus-5-5), the-way `plan-task` at the pinned `.the-way`
(d04c3feb). Dispatch: `reports/plan-prompt.md`. Written: `plan.md`, `plan-size.md`, this report.
Nothing else was changed: no code, test, foundation entry, server, Cloudflare or GitHub setting.

## Read

- `task-cycle/plan/SKILL.md` in full; `task-cycle/slice_size.py`; the foundation-step and slice
  paragraphs of `task-cycle/skill/SKILL.md`; the usage lines of `gate/run_tests.py` and of the four
  format guards.
- `task-frozen.md`, `spec.md` (revision 2), `reports/spec-re-review.md` (with "Revision 2
  review"), `cycle.md`.
- Sources: `definicja_mvp_loop2.md` — projected decisions "Where does the MVP run?", "How does a
  change reach the server?", "What serves the built game and account requests in the container?",
  invariants `loop2-container-isolation/1`, `loop2-distinct-address/1`,
  `loop2-one-serving-process/1` (container wording), the gate record (Mariusz, 2026-10-04);
  `plan_mvp_loop2.md` row 2 and its *Projected entries* rows for item 2.
- `foundations/*.md`; `src/server/*.ts`; `package.json`; README; `.gitignore`;
  `tests/startup.test.mjs`; `tests/invariants/loop2_invariant_support.py` and the typecheck,
  runtime, one-serving-process and occupied-address checks.
- The sections of `konwencje_skilli_i_commandow.md` on a skill carrying its notes, instruction
  language, `description` parsing and per-repository skills.
- Local tools: Git Bash 5.3, Python 3.14 (PyYAML present but not assumed), Compose CLI 5.4.0;
  no `flock`, `shellcheck` or `actionlint`; Docker daemon not running.

## Open design choice

None found. The spec settles every component, the input paths, the test seam, the exit codes and
the foundation entries. Everything the plan decides beyond the spec is how to make it: those
decisions are in the plan's *Choices*.

## Plan

Six slices, all `fits` (`plan-size.md`; the script exited 0; it reads 21–30 thousand estimated
tokens a slice and changes 2–7 files):

1. Listen address from the environment: `src/server/main.ts`, `tests/startup.test.mjs`,
   README.
2. Container image and Compose service: `Dockerfile`, `.dockerignore`, `compose.yaml`.
3. Script steps 1–6, with `.gitattributes`, the test seam and the adversarial and accepted-commit
   tests. The exit-3 case is tested in both states the orchestrator asked for.
4. Script steps 7–13, with the build-stage and switch-stage tests.
5. The workflow, with a static test that uses the standard library only.
6. The skill in both copies, with the copy and description test. It covers reinstalling the script
   from the new request head when a correction changes it.

The foundation step writes every entry before Slice 2. The invariant checks are part of that step:
the extended typecheck check, the new isolation and distinct-address checks, and the new
one-serving-process version with its container part. Slice 1 depends on no entry.

Size measurement: files that do not exist yet are listed in *Read* without backticks, so they are
not measured. These are files an earlier slice or the foundation step creates, plus the skill
conventions file, which is outside the repository (about 26 KB).

## Questions still open, with proposed answers

1. **`curl` on the server.** The server read covered `git`, `flock` and Docker, but not `curl`,
   which step 11 calls. If `curl` is missing, the probe fails after the switch with exit 8, and
   loop2 is left switched to the new commit. Proposed answer: before human action 5, the
   orchestrator runs the read-only `command -v curl` through the `mikrus` MCP. The script does not
   change. If `curl` is absent, installing it becomes an extra human action.
2. **Lock and log for a non-root run account.** The spec does not name the run account. A non-root
   account cannot create `/run/loop2-deploy.lock`, because `/run` is emptied at boot, and cannot
   create `/var/log/loop2-deploy.log` either. Proposed answer, already taken as a choice in the
   plan: a lock file the script cannot open exits 4 with its own message. The skill's setup says
   what a non-root account needs. Nothing about the account is recorded.
3. **Gate verdict on this machine.** The container part of `loop2-one-serving-process` cannot run
   without a Docker daemon, so it is skipped. Under the gate runner, a skipped citing test leaves
   that invariant with no `pass`, so the gate reads `error` for it here. The same holds for any
   Docker-dependent part of the typecheck check. Proposed answer: the request names these as
   unchecked rather than passing. The human's first deployment (action 5) is their first real run.
   A gate run on a machine with Docker can close them.
4. **Twin-pair registration.** The two in-repository copies of the skill are a pair under the
   owner's conventions, and the pair register lives in the vault, outside this repository.
   Proposed answer: keep it as the process remark the design revision already raised. It is not a
   slice.

Every slice's checks avoid running `npm test` and the invariant gate at the same time, because both
use port 3000. That collision already happened in the baseline run.
