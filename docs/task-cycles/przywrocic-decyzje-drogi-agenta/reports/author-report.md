# Author report — `przywrocic-decyzje-drogi-agenta`

**Status:** done

**Commits** (branch `task/przywrocic-decyzje-drogi-agenta`, author address the repository's author address, nothing under `.runs/`):

- `38e84eee` docs: :card_file_box: restore the decisions ... under D-417 to D-420, with the nine facts they rest on — `foundations/decisions.md` (+119/-6), `foundations/environment_facts.md` (+63/-9).
- `787acccd` docs: :memo: let the skill loop2-play and the comment of the scene test cite D-417 to D-420 ... — `.claude/skills/loop2-play/SKILL.md` and `.agents/skills/loop2-play/SKILL.md` (each +8/-16, byte-identical), `tests/view/scene.test.mjs` (+1/-1).

## Where the pinned template and this change part

The pinned decisions template (question 1 of "Where it goes") sends an instruction for how an agent works to a skill; this change writes the four decisions into `foundations/decisions.md` because the human's accepted answer (task *Questions to settle* 1 and 3, *Context* bullets 3 and 4) binds, and the pin stays at `bfb2e109`.

## Old → new

| Old | New |
|---|---|
| D-254 | D-417 |
| D-357 | D-418 |
| D-358 | D-419 |
| D-359 | D-420 |
| playwright-cli-token-use | playwright-cli-token-efficiency |
| playwright-cli-config-path | playwright-cli-default-config-file |
| playwright-cli-context-options | playwright-cli-config-browser-context |
| playwright-screencast-frames | playwright-screencast-frame-delivery |
| chrome-devtools-ignore-certificate-errors | devtools-protocol-certificate-error-switch |
| screenshots-repository-visibility | screenshots-repository-readers |
| playwright-mcp-persistent-profile | playwright-mcp-default-profile-sharing |
| playwright-cli-workspace-directory | playwright-cli-workspace-lookup |
| playwright-cli-sessions-per-workspace | playwright-cli-session-separation |

Numbers: the log's highest entry is D-416, the highest withdrawn number D-361, so D-417 to D-420 are free (grep of the repository for D-417 to D-429 found none before). Each new fact identifier was grepped across `foundations/` (decisions, invariants, facts, part map, glossary) and the withdrawn tables first and was found nowhere.

## Entries (meaning in English, then Polish; mark)

- **D-417** (section "The gate, test tools and the local start"): An agent operates the running game in a real browser with Playwright CLI, with Playwright MCP where the CLI fails, and reads motion from a stream of frames; this adds to the checks of D-75 and D-88 and replaces none. — Agent obsługuje działającą grę w prawdziwej przeglądarce przez Playwright CLI, a przez Playwright MCP tam, gdzie CLI zawodzi, i czyta ruch ze strumienia klatek; to sprawdzenie dodaje się do sprawdzeń D-75 i D-88 i żadnego nie zastępuje. — `row 1`
- **D-418**: The screenshots a task cycle shows the human lie in the public repository `mariusznazar/screenshots`, in `loop2/<cycle>` on the branch `loop2/<cycle>`, and the request embeds each by a link to a file in a commit with `?raw=true`. — Zrzuty ekranu pokazywane człowiekowi leżą w publicznym repozytorium `mariusznazar/screenshots`, w katalogu `loop2/<cykl>` na gałęzi `loop2/<cykl>`, a opis prośby osadza je linkiem do pliku w commicie z `?raw=true`. — `row 2`
- **D-419**: The agent that shows a screenshot pushes it itself to `mariusznazar/screenshots` with the owner's `gh` account, with no step of the human. — Agent, który pokazuje zrzut, sam wypycha go do `mariusznazar/screenshots` kontem `gh` właściciela, bez kroku człowieka. — `row 3`
- **D-420**: An agent uses Playwright MCP only from a session started in the worktree of its cycle. — Agent używa Playwright MCP tylko z sesji uruchomionej w worktree swojego cyklu. — `row 4`
- **Nine facts** (the sentences of the old facts, one each; the mapping above): each is the sentence and source of the old entry under the new identifier. They are marks of *To do* 4, which no single row of *Settlements to record* carries whole (the rows carry the decisions; *To do* 4 orders the facts and their identifiers), so I mark them `the cycle's` — a judgement for the orchestrator to confirm. — Dziewięć faktów: zdania i źródła dawnych wpisów pod nowymi identyfikatorami; znak `the cycle's` (to wykonanie punktu 4 *To do*, nie wiersza *Settlements to record*).
- **Withdrawn tables**: D-254/357/358/359 rows: *Why* rewritten to "withdrawn when it was taken for an instruction to the agent; its question, ..., is answered again by D-4xx", *Successors* the new number (`the cycle's`, task *To do* 2). The nine fact rows: *Successors* set to the new identifiers; *Why* left unchanged ("no decision is based on it and no invariant rests on it"), because it is still true of the old identifier and says nothing against the restored decisions (`the cycle's`, *To do* 4).
- **Section sentence**: now "How the full gate runs its stages, Docker and the test tools, what the local start gives an agent that checks the game, and where the screenshots an agent shows the human lie." (`the cycle's`, *To do* 3). The four entries stand at the end of the section, in the order D-417, D-418, D-419, D-420.
- **D-264** *Rationale*: "(D-88)" became "(D-88, D-417)"; **D-347** *Relations*: now "derives from D-417 · derives from D-323 · derives from D-253"; scene test comment: "(D-417, D-88)" (*To do* 5).
- **Skill copies** (*To do* 6): the sentences listed there are gone from both copies (grep count 0); the rule steps stay; the paragraph "`npm run local` builds the game" and the section "Operate the game with Playwright CLI" cite D-417, "Show a screenshot to the human" cites D-418 and D-419, "Where the CLI fails: Playwright MCP" cites D-420. The copies stay byte-identical.

## Own-work check

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after the foundation commit and after the last commit) | 0 — "0 errors" |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 — "0 error, 144 warn, 7 info"; the warnings that name the skill are dead-path notices of paths the skill gives for running the game (`.playwright-cli/`, `mariusznazar/screenshots`, ...), none from my lines |
| `npm test -- tests/agent_workflow/test_loop2_play_skill.py` | 0 — 8 tests OK (copies byte-identical, same files, frames text) |
| `npm test -- tests/view/scene.test.mjs` | 0 — 71 pass |
| `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` | 0 — 1 test OK |
| `grep` of the repository (without `.runs`, `.the-way`, `node_modules`) for `D-254`, `D-357`, `D-358`, `D-359` | only the four rows of the withdrawn table of the decision log |
| `grep` of the nine old fact identifiers outside the withdrawn table | 0 hits |

The full gate (`npm test`) was not run, as the handoff says; the orchestrator runs it.

Requirement most likely missed: "no text refers to a withdrawn number or identifier, and each cited number is right". Check: the two greps above plus `foundation_check` (it reports a reference to a withdrawn number and a successor the log does not hold) — all clean. A second one: the sources of the facts. Mechanical check of all nine sources on 2026-11-16: the five raw GitHub addresses and the two unpkg addresses opened and every passage stands in them word for word, once markup (bold, backticks) is dropped, as the template's "Source" reads a passage; `playwright-core` pin in `@playwright/cli@0.1.22/package.json` stands.

## Read dates

- Eight facts keep the old read dates (frozen in a commit or a version: 2026-11-02 and 2026-11-11).
- `screenshots-repository-readers` (live address): read again with `curl https://api.github.com/repos/mariusznazar/screenshots` on 2026-11-16: `"visibility": "public"`, and the Internet Archive CDX index (`web.archive.org/cdx/search/cdx?url=api.github.com/repos/mariusznazar/screenshots&limit=3`) gave an empty answer, so "no archived copy ... checked 2026-11-16". New date 2026-11-16 (the old entry's compact `"visibility":"public"` became the raw output's `"visibility": "public"`, with the space the API sends). Reading was by `curl` of the public address, no account used.
- D-418 *Based on* cites the description of pull request #67 with `read 2026-11-11`; I opened it again (`gh api repos/mariusznazar/loop2/pulls/67`, a read) on 2026-11-16 and the passage still stands, but kept the old date because the handoff gives a new date only to the live-address fact. Say if you want 2026-11-16 there.

## D-362 check

Every restored sentence names only `mariusznazar/screenshots` (public, read above), `mariusznazar/loop2` (public, fact `loop2-repository-visibility`) and its pull request #67, and the owner's `gh` account as a role; no note of the author's private notes, no folder of them, no repository the readers cannot reach. "a private repository" and "a private product" stand in the entries only as generic cases of *Rejected* / *Verification*, as before. No change needed.

## Changes to the old wording

Only these: new numbers and identifiers; the *Relations* of D-418 and D-419 and the references inside D-420 (binding sentence and Rationale) to the new D-417; the join of two broken lines in D-417's *Rejected* ("types apart"); and one added clause in D-417's *Rationale*, "that measurement is the product's own, and its record is not open to a reader of the repository", which the current template requires of a measurement of the product's own people (the old text carried no such clause). The wording, fields, *Rationale*, *Rejected* and *Based on* values otherwise come from `git show 1a56e519^:foundations/decisions.md`.

## Every reach beyond the handoff

- `git show 1a56e519` full diff of `guidelines/testing.md`: the withdrawal also changed a reference to D-80 there; not part of this task and not touched (D-80 stays withdrawn).
- `git show 65d858b9 4398d136 -- .claude/skills/loop2-play/SKILL.md`: to see exactly which sentences the two commits added.
- `.the-way/elements/decisions/skill/{read,decide_entry}.md`, `.../environment-facts/skill/{read,decide_entry,draft,write}.md`, `.../decisions/examples.md`: named by the two `SKILL.md`; read.
- `grep` of the repository for the skill's sentences and for `loop2-play`; read `tests/agent_workflow/test_loop2_play_skill.py` by its test names (no test depends on a removed sentence).
- `foundations/environment_facts.md` entry `playwright-cli-console-messages` (D-347's *Based on*) and the neighbours of the places where I inserted; to see positions.
- Network: five raw GitHub addresses, two unpkg addresses, the GitHub API of the screenshots repository, the Internet Archive CDX index, and pull request #67 by `gh api` — all reads.

## Task and code disagree

Nothing the task lists is missing. Two small notes: the task's line number for D-264 ("about 1264") is right; the D-347 *Based on* stays `playwright-cli-console-messages` (no change asked).

## Unread material

- `guidelines/styleguide-browser-view.md`: read in part (its head up to the roles table, the list of headings and the lines that mention a comment or `tests/view`; the bodies of the rules not read). Reason: the change touches no screen and one comment of a test file; I judged a full read of the 86 KB file not needed and name it here.
- The remaining sixteen entries of the section "The gate, test tools and the local start": read from the index (binding sentences and scope) and D-255 to D-258 and D-264 with D-347 whole where they touch the change; the other entries (D-49, D-94, D-95, D-268, D-390 to D-392, D-405, D-406, D-413, D-414) not opened whole, as none of them touches the questions of the four decisions.
- D-75, D-88, D-264, D-347, D-362: read whole.
- `guidelines/coding.md`, `guidelines/testing.md`, `foundations/part_map.md`, `AGENTS.md`, both copies of the skill: read whole.
- The glossary and the invariants file: not read whole; searched for `playwright`/`screenshots` (no entry), and the invariants `tracked-file-private-paths` / `tracked-file-private-names` as D-362 names them were not opened beyond D-362's text.

## Searches not found or unclear

- None unclear. The old entries and the nine facts were all found in git (`1a56e519^`). No archived copy of the screenshots API address exists in the CDX index (the entry says so).

## Choices

- Fact identifiers: chose names of what each fact is about (table above) over reusing a trimmed old name; cost if wrong: a reviewer may prefer other words, nothing else depends on them but the four decisions' *Based on* and the withdrawn table, both written in this change.
- Facts left their old positions (five after `python-uncaught-default-print`, four after `browser-bare-import-resolution`) as before the withdrawal.
- No new invariant, no glossary term, no part-map change.

## Problems observed

None.

## Working copies

`.runs/author/` of the worktree: held the old files from git, the fetched sources, the index and the output of `check_instructions.py`. Removed before returning (see the line below).

Removed: `.runs/author/` was deleted with `rm -rf` before this return; nothing remains of it. Reports stay in `reports/` (this file).
