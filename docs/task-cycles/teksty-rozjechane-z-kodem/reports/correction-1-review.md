PASS 102b4f3b20312465524b3ce85797012f0a3c56d9

# Review of correction 1 (range `e9bca2f..102b4f3`, commits `f33f110` and `102b4f3`)

Variant: a later change to an open request, a correction for the human's answer (option A on item 1). The answer
stands in place of a findings file; the choice itself was not re-opened. `git rev-parse HEAD` shows `102b4f3b20312465524b3ce85797012f0a3c56d9`, the head given.

## The human's answer: made or not

Option A, "allow four version queries in the deploy skill, and finish the four facts": **made.**
- Step 1 adds the four commands to both copies of the skill and nothing else (see check (a)).
- Step 2 gives the four facts a reading in the template's form made on 2026-11-10 (see checks (b) and (c)).

## Findings

### Critical
none

### Important
none

### Minor (within the task, non-blocking)

**M1. `foundations/environment_facts.md:19`, `loop2-host-forced-command-entry`: the sentence is a little wider than its reading.**
The sentence says the test server's authorized_keys "contains exactly one entry beginning with
`restrict,command="/usr/local/bin/loop2-deploy"`". The reading counts lines that begin with that text *and a
following space* (`grep -c -e '^restrict,command="/usr/local/bin/loop2-deploy" '`), in `~/.ssh/authorized_keys` of
the account the MCP command runs as. A line that began `restrict,command="/usr/local/bin/loop2-deploy",from=...`
would satisfy the sentence's prefix and not be counted, so a count of `1` does not strictly exclude a second such line.
The same gap stood in the 2026-10-13 reading (it also tested `line.startswith(... + " ")`), the handoff told the
executor to keep this sentence, and the skill's allowed command is fixed with the trailing space, so the executor
cannot be blamed. Why it matters: little. D-16 needs "a forced-command line naming the installed copy" and is not
weakened by an exotic second line. Evidence: sentence at line 17, command at line 19. If the author wants strictness, the
sentence can say "exactly one line beginning with `restrict,command="/usr/local/bin/loop2-deploy" `" (with the space).

**M2. `foundations/environment_facts.md:31`, `mikrus-host-docker-workloads`: the sentence names "the old loop game", the quoted rows show an image `loop:latest`.**
The rows are cut before PORTS (to keep host port numbers out of the file), so the NAMES column, which stands after
PORTS and held `loop` and `foundryvtt`, is not quoted. What the quote shows word for word: a container from image
`loop:latest` and one from `felddy/foundryvtt:12.331`, both `Up ... (healthy)`. "Old" and "game" come from the
surrounding foundation (`SKILL.md` says "The old game (`loop`)"), not from the output. The match of the words `loop` and
`foundryvtt` between sentence and image names is close enough that a reader comparing would accept it, and the
executor named this limit in its report. Why it matters: the previous source (`docker ps --format '{{.Names}} {{.Status}}'`) showed the names; the new
one shows them less directly. A fix, not needed to pass, would add the NAMES column as its own fragment
(`"loop"` · `"foundryvtt"`), which holds no port.

**M3. `foundations/environment_facts.md:31`, same entry: the form of the quotation is a little loose.**
(i) The fragments are the first five columns of two rows, not whole lines; the entry does not say they stop before
PORTS, so a reader running `docker ps` sees longer rows. (ii) The fragment is delimited by double quotes and holds the
COMMAND column's own double quotes (`"docker-entrypoint.s…"`), so where the quote ends is ambiguous to the eye.
(iii) The container ids `6e63d970d315` and `bbe6f6752113` add nothing the sentence rests on and change whenever a
container is recreated; they are harmless (no secret, no server identifier, no host port) but it is more text to
compare. The template's "the lines of it the sentence rests on" allows a subset of the output; I judge a prefix of a
row acceptable here because the cut is made for a stated reason (no host port in the repository) and each fragment
carries the whole of what the sentence rests on (image, state). The unchanged `…` (U+2026) is what Docker itself prints
when it shortens the COMMAND column, so it is the output word for word, not a decoration.

### Out of scope
none

### Declined to judge
- Whether the quoted outputs are what the test server's host returned on 2026-11-10: I may not call the `mikrus` MCP
  (the handoff), so this is unverified by me. See "Checks I could not run".
- The earlier wording of D-14's rationale "the host already runs Docker with Compose": the facts never named Compose
  and the sentence is unchanged by this range; outside the diff.

## Checks run

- `git rev-parse HEAD` — `102b4f3b20312465524b3ce85797012f0a3c56d9`; `git log --oneline e9bca2f..102b4f3` — two commits as named; `git diff --name-only e9bca2f..102b4f3` — exactly three files: the two skill copies and `foundations/environment_facts.md`.
- (a) `git diff e9bca2f..102b4f3` of both skill copies — each gets the same 3 inserted lines, one new bullet, "Allowed, for a reading in an environment fact only": `stat --version`, `grep --version`, `docker --version` and `free --version`, "each run alone with no pipe or other option", the first line of the output is what a reading quotes, "they expect no fixed value". No existing line touched; the prohibitions (lines of "No ..." bullets) are unchanged. The bullet names no server, id, port or address. `cmp .claude/skills/loop2-deploy/SKILL.md .agents/skills/loop2-deploy/SKILL.md` — exit 0 (identical).
- (a) `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` in a scratch copy made by `git archive 102b4f3` outside the worktree (`a scratch folder outside the repository`) — exit 0, "Ran 5 tests ... OK". I read the first 60 lines of the test (the two copies hold the same files and are byte-identical, description short and YAML-safe; the rest names IPv6 and mikrus name patterns); the test is static and does not bear on the added bullet beyond byte-identity and the name/address patterns, which it passes.
- (b) Per-entry form check against `.the-way/elements/environment-facts/template.md` and WAY-80 (`.the-way/foundations/decisions.md:1832`). Each of the four *Source* lines has: `reading:`, the command in backticks, "on the test server's host", the tool with its version (grep (GNU grep) 3.7; stat (GNU coreutils) 8.32; Docker version 28.1.1, build 4eba377; free from procps-ng 3.3.17), the output word for word or lines joined by ` · ` after an em dash, and `run 2026-11-10`. All four commands are on the skill's Allowed list: the two with versions are the four new queries, and `grep -c ...`, `stat -c '%a %U:%G' ...`, `docker ps` (bare) and `free` (bare) were already listed.
- (b) Scan of the added lines for `joanna|273|mikrus\.|` four-or-five-digit port forms, `0.0.0.0`, `::` — no match. No server name, identifier, port, address, host port number, secret or key content. Non-ASCII in the added lines: the em dash and ` · ` of the template form and the Docker `…` only.
- (b) Plausibility of the quoted outputs, since I cannot read the host: the versions equal the 2026-10-13 versions the old sources gave (coreutils 8.32, Docker 28.1.1 build 4eba377) and match the standard Ubuntu 22.04 packages (grep 3.7, procps-ng 3.3.17); the column widths in the `docker ps` rows are mutually consistent (IMAGE padded to 27 characters in both rows; COMMAND 22, CREATED 16); the `free` header and `Swap:` row have the layout procps-ng 3.3.17 prints. Consistent, not proof.
- (c) D-14, D-16, D-17, D-231 read whole (`foundations/decisions.md` from `### D-14` line 307, `### D-16`, `### D-17`, `### D-231` line 4443). Judgment: D-14 rests on Docker running the old loop game beside the new container — the rows show a `loop:latest` and a foundryvtt container `Up`. D-16 rests on exactly one forced-command line and a root-owned installed copy — counts `1` and `755 root:root` (M1 is a hair of wording only). D-17 rests on a host shared with the old game and one more workload, with no swap — two containers shown, `Swap: 0 0 0`. D-231 rests on a host without swap — the same. The narrowed swap sentence ("reports zero total swap", without "in `/proc/meminfo`") is what `free` shows and is still what D-17 and D-231 say ("has no swap", "a host without swap"). `grep` of the repository for the four identifiers found only these four decisions and the entries; no invariant's *Rests on* names them. All four stand; none needs an edit.
- (d) Nothing else changed: three files only, and `f33f110` touches only the two skill copies (`git show --stat`).
- (e) `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors". `git diff --check e9bca2f..102b4f3` — exit 0, clean. `git status --short` shows no tracked change (the worktree stayed untouched by me).

### Checks I could not run
- A re-reading of the host (`stat --version`, `grep --version`, `docker --version`, `free --version`, `docker ps`, `free`, the `stat` and the `grep -c`): forbidden to me (no `mikrus` MCP call). The outputs are the executor's claims in `reports/correction-1-step-2-report.md`; I checked them for form, internal consistency and agreement with the earlier readings only.

## Reaches beyond the dispatch

- `.the-way/foundations/decisions.md:1832` (WAY-80) — to read the exact rule for a reading's form, which the handoff names by number.
- `foundations/decisions.md` around lines 300-392 and 4440-4490 — to read D-14, D-16, D-17 and D-231 whole, as the handoff asks.
- A `grep` of the repository (outside `.runs`, `.the-way`, `node_modules`) for the four fact identifiers — to confirm the dependants.

## Unread material

- `reports/correction-1-handoff.md`, `reports/correction-1-step-1-report.md` and `reports/correction-1-step-2-handoff.md`: not read whole. I read `correction-1-step-2-report.md` whole and the lines 7-8 of the step-2 handoff (the answers on docker ports and escaping) by search. The step-1 report was not needed, because I computed the step-1 diff myself.
- `tests/agent_workflow/test_loop2_deploy_skill.py`: read lines 1-60, ran the whole file.
- `foundations/environment_facts.md`: read the four changed entries (through the diff and the `reading:` lines of the file) and the template; the other entries not read.
- `.the-way/elements/common/rules.md`: only searched for WAY-80 (found no hit, the rule is in `decisions.md`); the template's own pointer to it was not needed for the form of a reading.

## Searches not found or unclear

- `grep -n "WAY-80" .the-way/elements/common/rules.md` returned nothing; WAY-80 stands in `.the-way/foundations/decisions.md:1832`, which the template cites. The handoff's pointer to "`elements/common/rules.md` (WAY-80)" is therefore slightly off; it did not hinder the review.
- The executor's note that its viewer showed a different line count for `foundations/environment_facts.md` than a read gave: not reproduced; `grep -c .` shows 365 non-empty lines and the file read fine.
