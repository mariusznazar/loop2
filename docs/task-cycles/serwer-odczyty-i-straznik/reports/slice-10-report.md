# Report - slice 10 of `serwer-odczyty-i-straznik`

**Status:** done

## Commits and files

- `628e637b184c0519fd675d05e26ea39339a5e435` on `task/serwer-odczyty-i-straznik` (base `9289c29f`): "docs: :memo: narrow the invariants of the application port, the container and the address to what their tests check in the files of the repository".
- `foundations/invariants.md` (+3/-3), `tests/invariants/test_loop2_application_port.py` (+8/-3), `tests/invariants/test_loop2_container_isolation.py` (+19/-16), `tests/invariants/test_loop2_distinct_address.py` (+5/-2). Total 35 added, 24 removed.
- Only the module docstrings of the tests changed. No assertion, no case, no `# invariant:` line.

## The new wording (before -> after)

- `loop2-application-port`
  - before: "The application port is inaccessible from the Internet outside Cloudflare."
  - after: "The Compose file of loop2 publishes no port of any of its services and declares no network, network mode, link, inclusion or extension that would put a service on a network other than the one Compose creates for the project."
  - the test reads only `compose.yaml`: top-level `networks`/`include`/`extends`; for every service `ports`, `network_mode`, `networks`, `extends`, `links`, `external_links`.
- `loop2-container-isolation`
  - before: "The loop2 instance runs in a container separate from the existing loop instance."
  - after: "The Compose file of loop2 names its own project and containers, mounts only the account volume of loop2, includes or extends no other file and shares no namespace, link, device, external network or external volume with another container, and neither that file nor the Dockerfile mounts the Docker socket or names the old loop instance."
- `loop2-distinct-address`
  - before: "The public address of loop2 differs from `kantarion.bieda.it`."
  - after: "The deployment workflow declares the public address of loop2 exactly once, as the value of a variable named with LOOP2, and its host name is not `kantarion.bieda.it`."
- *Method* `test`, *Rests on* `none`, *Derives from* (D-08, D-10, D-08), *Part* and *Violated* are unchanged.

The three tests cite the identifiers unchanged, so each cited test was checked against the new wording (see the own-work check).

## Checks (command, exit code)

All run from the worktree root, one at a time. The named runner finished at once for every check, so no substitute was needed.

| Command | Exit | Result |
|---|---|---|
| `python -B scripts/test.py tests/invariants/test_loop2_application_port.py` | 0 | 2 tests OK |
| `python -B scripts/test.py tests/invariants/test_loop2_container_isolation.py` | 0 | 3 tests OK |
| `python -B scripts/test.py tests/invariants/test_loop2_distinct_address.py` | 0 | 2 tests OK |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | "0 errors" |
| `python -B scripts/test.py tests/quality/test_quality_invariants.py` | 0 | 5 tests OK (54 s) |

After one more docstring edit (the line about `include`/`extends`) all five were run again: all exit 0.

The invariant tests were not "seen failing once" by this slice: the slice changes no test behaviour, and the earlier slice that wrote them saw them fail. As the own-work check I did break the behaviour for a moment (below).

## Own-work check

Requirement most likely not met: each sentence says only what its test checks, so a clause the test does not reach would be a claim nobody checks. Check: map each clause to an assertion, then break the file the clause is about and see the test fail.

- Mapping, by reading the three tests: every clause above has an assertion. One clause I first wrote too wide: the docstring of container-isolation said "top-level or service `include` or `extends`", but the test checks `include` only at the top level (`extends` at both). I corrected the docstring ("no top-level `include` or `extends` and no service `extends`"); the sentence says "includes or extends no other file", which holds.
- Breaks, each restored with `git checkout -- <file>` before the commit (`git status` showed only my four files after):
  1. `compose.yaml` with `ports: - "3000:3000"` on `app`: `python -B scripts/test.py tests/invariants/test_loop2_application_port.py` exit 1, FAILED (failures=1).
  2. `compose.yaml` with `network_mode: container:loop` on `app`: container-isolation test exit 1, FAILED (failures=1); it reports both `network_mode` and the old name `loop`.
  3. `.github/workflows/deploy.yml` with `LOOP2_PUBLIC_URL: https://kantarion.bieda.it/`: distinct-address test exit 1, FAILED (failures=1), naming the old game's address.
- Not broken: the Dockerfile clause of container-isolation (name of the old instance, Docker socket), the "exactly once" clause of the address test. They are asserted by `test_dockerfile_names_nothing_of_another_deployment` and `test_public_address_is_declared_once`; I read them, did not break them.

## Choices (with the way rejected and the cost if wrong)

- *Rests on* stays `none` for all three. Rejected: naming `mikrus-host-docker-workloads` in container-isolation (it carries that the old game runs as another container, which is the part that left the sentence, not a condition of the new one) and a fact on Compose creating a default network per project in application-port (no such fact exists; making one is outside the slice). Cost if wrong: one line added to *Rests on* and, for the Compose fact, a new environment fact.
- The sentence of application-port says "the network Compose creates for the project" without a fact. It is the meaning of the reader's "private Compose network" in the test. Cost if wrong: a reviewer wants the Compose behaviour as a fact (see above).
- The handoff's goal lists "the Compose file and the Dockerfile" for all three; the application-port test reads only `compose.yaml`, so that sentence names only the Compose file. Only container-isolation reads the Dockerfile and names it.
- "its own project and containers" in container-isolation stands for the exact names the test asserts (`loop2`, `app`/`loop2`, `cloudflared`/`loop2-cloudflared`); the names stay in the docstring, not in the sentence, so a rename of a container that the test is updated for does not need a new sentence.
- The old wording of the three sentences occurs nowhere else outside `foundations/decisions.md` (D-08 text and verification, not edited here) and the test docstrings. A search of the repository for the old sentences, "old IPv6 host port", "existing loop instance" and "application port" found two other lines, `.claude/skills/loop2-deploy/references/troubleshooting.md:160` and `.../setup_and_secrets.md:59` (and the `.agents/skills` copies); they describe the deployment, not the invariant, so I left them.

## For the return step

Dates of the facts are of the reading, 2026-11-14.

- `loop2-application-port` (the part that left: "inaccessible from the Internet outside Cloudflare"):
  - the host publishes no port: carried by `loop2-containers-published-ports` (both loop2 containers publish no host port) - should be named in *Based on* of **D-10** ("The application publishes no host port"); the invariant's sentence says the same of the Compose file only.
  - the tunnel's outbound reach: `mikrus-tunnel-outbound-tcp` is already in D-10's *Based on*.
  - the Cloudflare side - that no AAAA or A record, Origin Rule or Configuration Rule bypasses the tunnel for `loop2.mariusznazar.com` - is carried by **no fact**. The human checked it in the Cloudflare panel on 2026-11-14 (`task.md:122`): one proxied CNAME to `<UUID of the tunnel>.cfargotunnel.com`, no AAAA or A record, no Origin Rule or Configuration Rule, published route to `http://app:3000`. Keep it in D-10's rationale as the human's check. "Inaccessible from the Internet" as a whole (that no route reaches the origin but the tunnel) is likewise a statement about the world that no check of the repository reaches.
  - `loop2-host-installed-copies-agree`: not needed by this invariant.
- `loop2-container-isolation` (the part that left: that the loop2 instance *runs* in a container, and that the old loop instance is a container of its own):
  - that the old game runs as a Docker container: `mikrus-host-docker-workloads` - should be named in *Based on* of **D-08** ("The existing loop container remains untouched").
  - that the loop2 containers run on the host as the two named containers: `loop2-containers-published-ports` (its readings show the containers `loop2` and `loop2-cloudflared` of the Compose project `loop2`) - may be named in *Based on* of **D-08** for the same reason.
  - the old instance's container name and what it does after a deployment are not carried by a fact; the deployment's read-only `inspect` of `loop` is checked by `loop2-host-sharing`, outside this slice.
- `loop2-distinct-address` (the part that left: that the *real* public address of loop2, the DNS name, differs from the old game's):
  - **No fact carries it.** The only reading is the human's Cloudflare-panel check of 2026-11-14 (`task.md:122`: for `loop2` one proxied CNAME to the tunnel's `cfargotunnel.com` name); the live address of the old game is not a fact either. Keep both in D-08's rationale as the human's check.
- D-08 and D-10 are not edited here.

## Reach beyond the handoff

- `.the-way/task-cycle/change/slice.md` (named by SKILL.md for a slice).
- The skill `the-way-record-invariant`: `.the-way/elements/invariants/skill/{SKILL,decide_entry,draft,write}.md` and `.the-way/elements/invariants/template.md` (read whole; `.the-way/elements/common/rules.md` and `way_of_working.md` not read - `foundation_check.py` passed and the entry form did not change).
- `foundations/invariants.md:1-30` and `95-164` (the three entries and their neighbours, to see the form).
- `tests/invariants/test_loop2_host_sharing.py:1-40` and `255-285` (`volume_problems`, imported by the container-isolation test, to state the volume clause exactly).
- `deploy.yml:1-40`, `Dockerfile` (read whole), `ruff.toml` head (line length: no limit rule in the selected set).
- A repository-wide Grep for the three identifiers and for the old wording (listed above); `slice-5-report.md` (the form of "For the return step").
- The user's global rules `scripts.md` and `git.md` (hooks required them before a script and a commit).

## Unread material

- `.runs/.../task.md:29` and `task.md:122`: read (the one line each).
- `foundations/decisions.md:253-272` (D-08) and `295-310` (D-10): read whole at the current ranges (the handoff's ranges).
- `foundations/environment_facts.md:59-63` (`mikrus-host-docker-workloads`): read; its long *Source* line was shown as omitted by the viewer, so I read of it the sentence and the quoted first line only. `312-316` (`mikrus-tunnel-outbound-tcp`): read whole. The facts `loop2-containers-published-ports` and `loop2-host-installed-copies-agree` (not in the slice's *Read*) I read of the first two lines only (the viewer omitted their *Source* lines); I cited them from their sentences.
- `guidelines/coding.md` and `guidelines/testing.md`: read whole.
- `compose.yaml`: read whole. The three test files: read whole.
- None of the other slices' material was read.

## Searches not found or unclear

- No environment fact carries (a) that nothing in the Cloudflare configuration bypasses the tunnel, (b) where the DNS name of loop2 points. Both stand only in the human's panel check (`task.md:122`), as written under "For the return step".
- The handoff says the Compose file and the Dockerfile together "publish no application port"; the application-port test reads only `compose.yaml`. I followed the test (see Choices).
- The viewer cut the long *Source* lines of environment facts ("Omitted long context line"), so I did not see the full readings of `mikrus-host-docker-workloads` beyond its first line, nor those of `loop2-containers-published-ports` and `loop2-host-installed-copies-agree`.
- No other use of the old three sentences was found outside the decisions D-08/D-10 and the test docstrings.
