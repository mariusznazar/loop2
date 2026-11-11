# Author report — repo-na-zrzuty (one author, no plan)

**Status:** done with concerns (the concerns are the choices and the unverified points named below; none blocks).

Worktree `the repository's root`, branch `task/repo-na-zrzuty`, base `a4015546163f24f82f4694830fcad457efa1caf2`. Nothing pushed, no repository created, `mariusznazar/screenshots` not written to.

## Commits

| Commit | Content |
|---|---|
| `51ce2e5` | foundation: decisions D-357, D-358, D-359; environment facts `playwright-mcp-persistent-profile`, `playwright-cli-workspace-sessions`, `screenshots-repository-visibility`; one row of the part map's external context |
| `16f6b32` | skill `loop2-play`, both copies (byte-identical) |

## Files changed (added / removed lines)

| File | + / - |
|---|---|
| `foundations/decisions.md` | +45 / -0 |
| `foundations/environment_facts.md` | +18 / -0 |
| `foundations/part_map.md` | +1 / -0 |
| `.claude/skills/loop2-play/SKILL.md` | +54 / -10 (git counts 64 changed lines per copy) |
| `.agents/skills/loop2-play/SKILL.md` | same, byte-identical to the one above |

## Entries written, each through its element's skill (invoked `the-way-record-decision`, `the-way-record-environment-fact`, `the-way-update-part-map`; each routes to its method in `.the-way`, which I followed)

| Entry | Row | Meaning in one English sentence | Meaning in Polish (the task's language) |
|---|---|---|---|
| D-357 | row 1 | The screenshots a loop2 task cycle shows the human lie in the public repository `mariusznazar/screenshots`, in `loop2/` and a directory per cycle, and the request embeds each by a link to the file in a commit with `?raw=true`; the repository may be cleared and old images then break. | Zrzuty, które cykl pokazuje człowiekowi, leżą w publicznym repo `mariusznazar/screenshots` w `loop2/` i katalogu cyklu, a opis PR-a osadza je linkiem do pliku w commicie z `?raw=true`; repo wolno wyczyścić. |
| D-358 | row 2 | The agent pushes the screenshot itself to that repository with the `gh` account of its owner, with no step of the human. | Agent sam wypycha zrzut do tego repo z konta `gh` jego właściciela, bez kroku człowieka. |
| D-359 | row 3 | An agent uses Playwright MCP only from a session started in the worktree of its cycle; narrows D-254. | Z Playwright MCP wolno korzystać tylko z sesji agenta uruchomionej w worktree cyklu; zawęża D-254. |
| `playwright-mcp-persistent-profile` | row 4 | By default Playwright MCP keeps a persistent profile for the workspace root of its client, usable by one browser instance at a time, so concurrent clients of one workspace conflict. | Playwright MCP trzyma domyślnie trwały profil dla korzenia obszaru roboczego klienta, z którego naraz korzysta jedna przeglądarka, więc klienci tego samego obszaru się blokują. |
| `playwright-cli-workspace-sessions` | row 5 | Playwright CLI 0.1.22 keeps sessions apart per workspace (the nearest directory upward holding `.playwright`), shares one workspace where none holds it, and names the unnamed session `default`. | Playwright CLI 0.1.22 rozdziela sesje według obszaru roboczego (najbliższy katalog w górę z `.playwright`), a bez takiego katalogu wszyscy dzielą jeden obszar. |
| `screenshots-repository-visibility` | the cycle's | The repository `mariusznazar/screenshots` is public. | Repo `mariusznazar/screenshots` jest publiczne. |
| part map, External context row | the cycle's | The GitHub repository `mariusznazar/screenshots`, direction us -> them, nothing comes in (`—`). | Repo na zrzuty jako partner zewnętrzny: wychodzi od nas, nic nie wchodzi. |

No glossary entry (no new or moved term) and no invariant (the task carries none). D-254 is not edited; D-359 narrows it through `Relations: narrows D-254`.

## Checks run (command -> exit code)

- `npm test -- tests/agent_workflow/test_loop2_play_skill.py` -> 0 (8 tests OK; both copies byte-identical, description under 400 characters, 391, YAML-safe). Run once; no failing run, since the change is prose and the existing test is not changed.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` (after the decisions) -> `0 errors`; `python -B .the-way/elements/common/foundation_check.py` (final) -> `0 errors`, exit 0.
- Not run: the full `npm test` (the orchestrator runs it, as told). Not run: any push to `mariusznazar/screenshots` (out of scope), so the rendering of a link to a commit on a non-default branch of that repository is unverified (see Choices 1).

## Own-work check (WAY-164)

Requirement most likely not met: To do 2, that the skill tells an agent a way that really works — where the screenshot goes and how it reaches the description — with nothing in it an access value.

- The skill's commands run on this computer, against scratch copies (never the real repository):
  - `playwright-cli open about:blank` then `playwright-cli screenshot --filename=.playwright-cli/shot.png` -> exit 0, file is a 1280 x 720 PNG.
  - `gh repo clone mariusznazar/screenshots <dir>` (read-only clone) -> exit 0, branch `main`, origin `https://github.com/mariusznazar/screenshots.git`.
  - The first version of the push steps (`git push origin main`, to a scratch bare repository) FAILED: this computer's global `pre-push` hook refuses a push to `main` ("PUSH ZABLOKOWANY: cel to gałąź chroniona"), and the guard forbids the override `ALLOW_PROTECTED_PUSH`. The exit code of that run was not captured (my pipe took `tail`'s); the refusal text and `error: failed to push some refs` were in the output. I changed the skill to push to a branch `loop2/<cycle>` (Choices 1).
  - The second version, run twice (two clones `A` and `B` of a scratch bare repository, each `git switch -c loop2/cyc-<X>`, `git add <path>`, `git commit`, `git push -u origin loop2/cyc-<X>`, `git rev-parse HEAD`) -> both pushes exit 0 (`[new branch]`), two commits, no collision.
  - `curl -sIL "https://github.com/mariusznazar/screenshots/blob/main/README.md?raw=true"` -> 302, 302, 200 (the form of the link resolves to the file for a file on `main`).
- A search of the diff for access values and absolute paths: `git diff | grep -i "<drive letter>|vault|token|password"` found only the three lines that tell the agent not to write a token or a real password (skill text, D-358's *violates*). No value, no private-note path.
- The two copies compared: `cmp` same.

Mutation in the head: the change is prose and entries. A missing `?raw=true`, a link to a branch or a wrong directory in the skill is caught by no test, because the testing guidelines give prose for people no test and a text that instructs agents is tested by what an agent does with it; that is the review's and the first real cycle's job. The one protected behaviour — the copies being equal — has its test.

## Reaches beyond the dispatch (section 1)

- `.the-way/elements/part-map/skill/decide_entry.md`, `write.md`, `template.md` (external context): the handoff named the part-map skill but the External-context row was not in the row list; read to decide whether the entries call for a row.
- `.the-way/elements/common/rules.md`, `way_of_working.md`, `decisions/template.md`: named by the element skills.
- `the owner's global rules file on git (outside the repository)`: the user's global instructions require it before a commit; it also explained the push block.
- `registry.js of the Playwright CLI package installed on the computer (outside the repository)` and `program.js`: to find out how the CLI picks its workspace, since no public text gives it (Searches below).
- Public pages through `curl`: the README of `microsoft/playwright-mcp` at `e436f64eb7e1904b6c302da0997a2243496d191e`, the README of `microsoft/playwright-cli`, `registry.js` and `package.json` of the npm editions at `unpkg.com`, `gh api repos/mariusznazar/screenshots`, `gh pr view 67`.
- The Skill tool resolved the three project skills to `.claude/skills/... of the main checkout of the repository` (the main checkout) for the wrapper text only; I read and edited only this worktree.

## Unread material

- `guidelines/testing.md`: read whole except that the long cells of the trust-boundary table were cut at about 1200-1500 characters per line when printed (rows for the account server, `deploy/` and others); nothing in them concerns skills or the-way.
- Invariants: the handoff names those whose *Part* names agent-workflow, product-foundation or `every`, and those my entries link to. I listed the *Part* lines (`awk` on `foundations/invariants.md`) and read none whole; my entries link to no invariant and the task carries none. The *Part* lines that continue onto a second line may have been missed by the filter.
- Glossary: listed the headings of `foundations/glossary.md` and grepped both glossaries for "screenshot", "worktree" and "zrzut"; read no entry (none matched).
- The element skills: not read `.the-way/elements/environment-facts/skill/draft.md` and `projected.md`, `.the-way/elements/decisions/skill/projected.md`, `.the-way/elements/part-map/skill/first_map.md`, and not the skills of `record-glossary-term` and `record-invariant` (no such entry written). `draft.md` is named by the environment-fact method for step 3 and I did not read it; I took the source from the template instead.
- `.the-way/elements/decisions/examples.md` read (WAY-03), but the example decision WAY-03 and the-way's own environment facts examples were not read.
- `.the-way/task-cycle/skill/request_template.md`: read the screenshot passages and items 4 and 13 of *For you to decide*, not the whole file.
- D-347 and D-255 read whole; WAY-316..319 and WAY-219 read whole; D-12, D-13, D-254 read whole; the part map read whole.

## Searches not found or unclear

- A public statement that Playwright CLI separates its default session "by repository" (the task's wording of row 5): not found in the README at the pinned commit or at `main`. The behaviour comes from the code: the workspace is the nearest directory upward with a `.playwright` directory, not the repository. In this repository every worktree tracks `.playwright/cli.config.json`, so every worktree is its own workspace; I checked it with a scratch repository with two worktrees (separate browsers; titles not shared). A scratch pair of repositories without `.playwright` shared one browser (observed). So row 5's "according to the repository" is imprecise; the fact is written as the code gives it.
- A public statement that Playwright MCP's "workspace root" is the directory a Claude Code session started in (the task's wording of row 4, from AIR-454 in a private note): not found. The fact says "workspace root of its client", as the README says; D-359 carries the step to "session started in the worktree" as a hypothesis, marked in its rationale.
- Any decision or invariant of the product mentioning screenshots or the `loop2-play` skill: none found (`grep -i "screenshot\|loop2-play\|worktree\|playwright mcp"`; only D-254).
- Where the *Rejected* of rows 2 and 3 get their ways not chosen: the task's *Questions to settle* hold none for them, so both read `unknown`.
- The identifier or name of the "directory for each cycle": the task does not name it (see Choices 2).

## Choices made (the way rejected, the cost if wrong)

1. **The push goes to a branch `loop2/<cycle>` of `mariusznazar/screenshots`, never to `main`.** Rejected: push to `main` with `pull --rebase` when refused. Reason: the global `pre-push` hook of this computer stops a push to `main` (`the owner's global pre-push hook (outside the repository)`, per the user's `git.md`), the guard forbids the override, and a branch per cycle also keeps two cycles from meeting. Cost if wrong: the owner may have meant `main` (the task says "wypycha ... do repozytorium", no branch); changing it is a edit of the skill's commands. Unverified: that GitHub serves `blob/<commit>/...?raw=true` for a commit that lies only on a non-default branch of the real repository (it does for any commit of a repository's object store by my knowledge; I could not test it without pushing). D-357 and D-358 say nothing on the branch, so a change of this choice touches only the skill.
2. **The directory of a cycle is named as the cycle's directory under `.runs/task-cycles/`** (here `repo-na-zrzuty`); the branch has the same name. Rejected: the task branch name, a date, a free name. Cost if wrong: a rename in the skill; the link in an old request stays valid.
3. **A fifth fact, `screenshots-repository-visibility`, and a part-map row** that no row of the task asks for, marked `the cycle's`. Reason: the template makes a decision that declares a setting of who can open a repository rest on a fact (WAY-84, WAY-90), and says an exchange with the external context that an entry needs gets its row in the same change. Rejected: citing the visibility in D-357's *Based on* as a quoted address, no row in the map. Cost if wrong: two small entries to remove; they also appear in the request's item 6 for the human to see.
4. **D-359 is a new decision with `narrows D-254`, and D-254 is not edited.** Rejected: adding the condition into D-254's binding sentences (a number stands for a question, and the condition answers a new one). Cost if wrong: a reader of D-254 alone sees the unconditional fallback; its `narrows` relation and `Based on` are in D-359.
5. **`Origin: none` in D-357, D-358 and D-359, and no path of a private note anywhere.** The handoff says to cite no path of a private note; older decisions of the log name a vault file. The reasoning is written whole in the *Rationale* and *Rejected*. Cost if wrong: a reader finds no pointer to the task note; git history holds the task copy in the cycle's record.
6. **D-357 *Based on* quotes the description of PR #67 as a precedent** of the form `blob/<commit>/<path>?raw=true` (the passage checked by `gh pr view 67`, read 2026-11-11). That the images showed to the owner is stated in the task's *Context*, not by that page.
7. **Sources of the facts**: row 4 from the README of `microsoft/playwright-mcp` at the frozen commit `e436f64e...` (the head on 2026-11-11); row 5 from the code of `playwright-core@1.64.0-alpha-1790635538000` (identical, by `cmp`, to the installed copy) and the `package.json` of `@playwright/cli@0.1.22`, which pins that version, joined as the pages of one edition. A code passage is quoted where a documentation page does not say it. Rejected: a reading on this computer (the template allows a reading only for a host the product's people run, for a state no page shows). Cost if wrong: the review may hold two addresses to be two editions; then the second fact should cite the code only.
8. **The description line of the skill changed** ("showing a screenshot" added, the closing sentence shortened to stay under 400 characters; 391 now).
9. **The skill's new section "Show a screenshot to the human"** stands between the stream of frames and "Where the CLI fails"; it tells the agent to look at the screenshot before pushing (the repository is public), to put the link in the report so the request embeds it, to push nothing and say so where the push fails, and the cleanup of `.runs/screenshots/` joined "End the check". The sentence of To do 2 about "report or request" is kept for the rest of the evidence.
10. **No new test.** Reason: prose for agents; the existing test keeps the two copies equal and the description short.

## Problems and mismatches observed

- The task's wording of row 5 ("by repository") and of row 4 ("the directory the session started in") differs from what the sources say; see Searches. Neither changes what the decisions bind.
- The README of the product (`README.md:74`) describes the skill in one sentence and still reads true; not changed.
- The decision D-254's *Verification* "the evidence in the request" still reads true.
- The task's *Context* line says the Playwright MCP profile is "for the directory the session started in"; the README says "workspace root"; whether a Claude Code session in a worktree has that worktree as the workspace root is not verified here (guess, from the owner's notes).
- A leftover: scratch files under the session's scratchpad directory (`...\scratchpad\pwtest`, `pwwt`, `gittest*`); browsers opened for the checks were all closed (`playwright-cli list --all` shows no browsers).
