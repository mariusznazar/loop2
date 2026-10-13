# Slice 6 review - loop2-deploy skill (ebfb73b..c9c85c2)

Method: Superpowers task reviewer; contract at reports/reviewer-contract.md. No invariant covers the skill, so no deliberate break. No deploy/** change, so the WAY-48 crafted-input check does not apply (the skill's input description was only checked against the script: exit 2 conditions match read_input).

Run: `python -B .the-way/gate/run_tests.py tests/agent_workflow` - 5 tests OK. Copies: `diff -r` identical; `git ls-files --eol` shows i/lf for all six files. Grep of the skill for the SSH port, user, server name, IPv6 forms and `mikrus.cloud|xyz`: none (only the MCP name `mikrus`).

## Verdicts

- Spec compliance: PASS with one Important finding (build-cache prune command).
- Task quality: PASS with minor findings.

## Findings

### Important

1. `docker builder prune` is a host-wide, unfiltered prune. `troubleshooting.md:56-60` (`.claude/skills/loop2-deploy/references/troubleshooting.md`, same line in the `.agents` copy) tells the human to run it. The reviewer contract forbids "no host-wide or unfiltered prune" in any command the change adds, and `SKILL.md:17-19` itself says "never prunes host-wide". BuildKit cache cannot be filtered per Compose project, so the command also drops cache the old game's builds use (running containers and images stay, but the old game's next rebuild is slower). The justification "never docker system prune, which would reach the old game's resources" applies, in smaller form, to this command too. Fix: either give only the read-only part (`docker system df`, `docker builder du` if wanted) and leave the choice of prune to the human with the stated effect (host-wide, shared with the old game, next build of both slower, running containers untouched), or state that reach explicitly next to the command and have the agent never propose it unprompted. Spec § 7 and the brief require "reclaiming Docker build cache as a human decision", so the topic stays; the unqualified command wording is the defect.

### Minor

2. `SKILL.md:44-46` (after the table) says "The container's last 50 log lines after an exit 8" go to the server log. In `deploy/loop2-deploy` `start_container` (lines 315-322) logs them only when the start/health wait fails; a probe failure (`probe_origin`, exit 8) logs the restore line but no container lines. `troubleshooting.md` row 8 repeats it. Say "after a failed start (health wait)"; for a probe failure point to `docker compose -p loop2 logs`.
3. `SKILL.md:27-28` allows `git -C /srv/loop2 status` through the MCP, which runs as root. `git status` can rewrite the index (as root) and may stop on "dubious ownership". Prefer `git --no-optional-locks -C /srv/loop2 status` or `log`/`rev-parse` only.
4. The agent's read-only list names `exec` but does not say that the other `mikrus` tools (`upload`, `porty`, `domains`) change things and are the human's. Settlement row 3 is met by "reads only", but one clause would remove doubt.
5. `SKILL.md:35-37`: "A reader shares Actions logs with this in mind" is unclear; reword as "mind this when sharing Actions logs".
6. The script's third warning (installed script unreadable, script lines 208-210) is not described in the skill; `troubleshooting.md` covers only the "differs" and "no source" cases.
7. Test regex `IPV6_LITERAL` also matches `::` alone and would match a time such as `10:20:30`; fine today (passes), brittle if the skill later quotes a timestamp. Informational.

## Named checks

- Exit codes, stages, thresholds (1024 MiB, 4 GiB, 900 s, 120 s), paths (/srv/loop2, /usr/local/bin/loop2-deploy, /var/log/loop2-deploy.log, /run/loop2-deploy.lock), port 18080/3000, project/service/container names, revision label key, memory 512m = 536870912, `previously running commit` line, installed-script warning text, secret names DEPLOY_HOST/PORT/USER/SSH_KEY/KNOWN_HOSTS, variables LOOP2_PUBLIC_URL/OLD_GAME_URL, workflow error text and the two workflow steps: all match script, compose.yaml, Dockerfile and deploy.yml, except finding 2.
- To do 5 topics: seeing deployments, secrets (where they lie, rotation of all three), rollback (ordinary = open and merge a revert; fast = one command; data statement), agent versus human, log reading (stages, exit codes, deploy log, `compose logs`, Actions log, 521/522 with origin probe): all present.
- Human actions: five, in spec order, stated as all before the merge with the reason; action 4 requires verifying the exact `restrict,command="/usr/local/bin/loop2-deploy"` prefix by reading the file; action 5 reads `HostConfig.Memory` (536870912); reinstall-from-new-head rule present.
- Agent only reads (settlement row 3), every change the human's: yes (SKILL.md "Agent or human").
- No server name, SSH port, SSH user or IPv6 address: none; access values referred to by role or secret name and the owner's private note.
- Other workload: no command in the skill touches `loop` or another project except finding 1; the human's commands (`loop2-deploy`, `docker compose -p loop2`, `docker inspect loop2`, `diff`, `cp`) are scoped to loop2.
- Conventions: model-invocable (no disable-model-invocation), `description` under 400 chars with no `: ` or ` #` (test-verified), self-contained (reads only repo files; the owner's note is informational), notes in `references/`, English, two identical copies. No twin-pair registration is owed (repo skill, not a vault set).

## Re-review after e52937a

Scope: c9c85c2..e52937a (SKILL.md and troubleshooting.md, both copies). `diff -r` of the copies: identical; tests/agent_workflow: 5 OK.

- Important, `docker builder prune`: ADDRESSED. The command is gone; the section gives `docker system df`, states that emptying the cache reaches every project including the old game's (slower next builds, running containers unaffected), bars `docker system prune`, and says the agent does not reclaim it.
- Exit-8 log lines: ADDRESSED. Matches deploy/loop2-deploy: `start_container` logs the last 50 lines only when the healthy start fails; `probe_origin` logs only the restore line.
- `git status` as root: ADDRESSED. `git -C /srv/loop2 --no-optional-locks status` (valid global-option order) and `git log`.
- `mikrus` changing tools: ADDRESSED (`upload`, `porty`, `domains`, state-changing `exec` named as the human's).
- Actions-log sentence: ADDRESSED in SKILL.md. The 255 row of troubleshooting.md keeps the older wording "mind that when sharing the log"; understandable, no action needed.
- Unreadable installed script: ADDRESSED. Matches the script's `! -r` warning (missing or unreadable, so not compared).

New breakage in the fix diff: none found.
