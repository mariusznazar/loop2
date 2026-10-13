### Slice 6 — deployment skill

- **Goal:** the repository skill `loop2-deploy`, identical in `.claude/skills/loop2-deploy/` and
  `.agents/skills/loop2-deploy/`, in English, written under the conventions in
  C:/Storage/The Brain/The Brain/Notes/Areas/(A) Claude code/konwencje_skilli_i_commandow.md
  (outside the repository): model-invocable, self-contained, `description` under 400 characters
  with no `: ` and no ` #`. `SKILL.md` covers seeing deployments (Actions run, deploy log, running
  commit from the container's revision label, `docker compose -p loop2 ps`), rollback (ordinary:
  merge a revert; fast: one human command `loop2-deploy <earlier sha>` lasting until the next push;
  a port change also needs the Origin Rule; no data to lose now, and code rollback never rolls back
  data later), agent versus human (the agent reads only, through the `mikrus` MCP and its `servers`
  tool, read-only commands listed; every change is the human's) and the log stages with exit codes
  2–8. `references/setup_and_secrets.md` covers the five human actions in their order before the
  merge, the two input paths, the run account's needs (Docker access, write access to the checkout,
  the log and the lock; a non-root account also needs the log file made and the lock creatable in
  `/run`), the five secret names and what each holds, the read-only deploy key and its SSH alias,
  access values by reference to the owner's private note only, rotation of the automation key, the
  deploy key and the pinned host key, and reinstalling the script — including that when a
  correction changes `deploy/loop2-deploy` before the merge, the human reinstalls from the new
  request head. `references/troubleshooting.md` covers a failed automated deployment by exit code,
  the resource gate, the installed-script warning and how to review and reinstall (keeping the
  previous copy), Cloudflare 521/522 right after a deployment against the origin probe, and
  reclaiming Docker build cache as a human decision.
- **Change:** `.claude/skills/loop2-deploy/SKILL.md`
  `.claude/skills/loop2-deploy/references/setup_and_secrets.md`
  `.claude/skills/loop2-deploy/references/troubleshooting.md`
  `.agents/skills/loop2-deploy/SKILL.md`
  `.agents/skills/loop2-deploy/references/setup_and_secrets.md`
  `.agents/skills/loop2-deploy/references/troubleshooting.md`
  `tests/agent_workflow/test_loop2_deploy_skill.py`
- **Read:** `docs/task-cycles/serwer-testowy/task-frozen.md` · `docs/task-cycles/serwer-testowy/spec.md`
  `.claude/skills/the-way-critique/SKILL.md:1-10` · `foundations/part_map.md`; made by
  Slices 2–5, so not measured here: compose.yaml, deploy/loop2-deploy,
  .github/workflows/deploy.yml; outside the repository, so not measured here: the conventions file
  named in the goal (about 26 KB)
- **Checks:** first, the failing `tests/agent_workflow/test_loop2_deploy_skill.py`: the two
  copies hold the same file names and bytes; the frontmatter `description` read whole is under 400
  characters and holds no `: ` and no ` #`; no file holds an IPv6 literal or a Mikrus server-name
  form. Then `python -B .the-way/gate/run_tests.py tests/agent_workflow`. Read by the slice's
  reviewer, not a command: every topic of To do 5 is present, and the exit codes, paths and secret
  names match `deploy/loop2-deploy` and the workflow.
- **Depends on:** Slices 2, 3, 4, 5 · settlement rows 1–4 · the part-map change

