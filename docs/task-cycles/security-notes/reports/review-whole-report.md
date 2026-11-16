PASS 705be3a5f1f37a1f5ee7b2abccece9d33c6ce8e0

# Review of the whole change — task `security-notes`

Range: `b88ef2b148090e7abb89e90255de17e0f66dda1b..705be3a5f1f37a1f5ee7b2abccece9d33c6ce8e0`, one commit `705be3a5`, one author, no plan (no slices). `git rev-parse HEAD` = `705be3a5f1f37a1f5ee7b2abccece9d33c6ce8e0`, as given. Pinned the-way: `git -C .the-way rev-parse HEAD` = `bfb2e109735b5fff98802b8be0ff3c43c799262a` = the gitlink.

Blocking findings: 0. Minor findings within the task: 5. Out-of-scope findings: 1.

## Findings

### Critical

none

### Important

none

### Minor (within the task)

**M1 — `security-notes.md:7`, `:8`, `:11`, `:21`, `:25` — names the reader cannot read without the author: "the operator", "the cycles of the process the repository pins", "the operator's daily adviser".** (Appearance, plain language; within the task.)
- What is wrong: the file is the entry page for the course's reviewers, who have neither the glossary nor the process in front of them. "The operator" is never introduced; the product's glossary gives the word only in the *Not* of the entry `owner` ("the person who reaches the server and runs its commands — 'operator'"), and the file uses it more widely: the owner of the GitHub account the agents use (`:8`), the person whose work repositories are denied (`:11`), the person who ran the trial (`:21`). In stage B (`:25`) the same person appears under another name, "the account of the repository's owner", so a reader can take the operator and the repository's owner for two people, and the limit at `:31` ("nobody checked whether a session treats a foreign account differently") loses its point. "The cycles of the process the repository pins" (`:7`) points to `AGENTS.md` but names nothing a reader knows. "The operator's daily adviser" (`:11`) is the author's own tool; the reader cannot tell which sessions get the rule that denies reading the work repositories — all of them, or some.
- Why it matters: the rule on plain language in the author's instructions says a name of one's own process is jargon until the reader uses it, and asks for one sentence on first use. The facts of the file stay correct, so the effect is a reader who misreads who did what and how wide the deny rule reaches, not a wrong decision — hence Minor.
- Suggested fix, within the source: on first use, "the operator — the person who owns this repository and runs its agents"; in stage B, "the account of the repository's owner, the operator's own"; for the adviser, a clause that it is the operator's own tool outside this repository that starts some of the sessions. The task does not say more about the adviser; a fuller description is for the human to give, not to be invented (the author's rule on source fidelity).

**M2 — `security-notes.md:11` — "Unlike the limit on the server, this is a rule the session enforces."** (Clarity; within the task.)
- What is wrong: a "session" is also what the file calls the agent itself (`:7`, `:21`), so the sentence can read as the agent holding itself to the rule — which is exactly an agreement, the thing it is contrasted with. The source (task, *Context*: the deny rules are passed in `--settings` and work in the mode without permission prompts; answer 3, *Not chosen*: "przykład ograniczenia wymuszonego, nie umówionego") means a rule Claude Code's permission check enforces whatever the model decides.
- Suggested fix: "this is a rule Claude Code enforces, whatever the model decides".

**M3 — `security-notes.md:3` — the first sentence is hard to read: "This file gathers the subject of the security of the work with agents in one place".** (Appearance; within the task.)
- What is wrong: a literal rendering of the Polish ("zbiera temat bezpieczeństwa pracy z agentami w jednym miejscu"); the reader stumbles on the first line of the entry page. The content required by item 1 and the shape answer is all there.
- Suggested fix: "This file brings together, in one place, how this repository keeps the work of AI agents safe; the files it points to are the source of truth, and where this file and one of them differ, that file is right."

**M4 — `security-notes.md:21` — "to see what a session does with a planted instruction".** (Source fidelity; within the task.)
- What is wrong: the purpose of the trial is stated by neither the task nor a file of the repository; the task gives the conditions, stages, results, conclusions, limits and clean-up, not an aim. It is a restatement of what a prompt-injection trial is, so it alters no fact — hence Minor — but the task makes every statement of the trial's description trace to the source.
- Suggested fix: drop the clause, or keep it if the human confirms it as the aim.

**M5 — `README.md:42` — "`--min-release-age=0` can be added to the one command that updates the lock file".** (Translation; within the task.)
- What is wrong: the base says "do jednorazowego polecenia aktualizującego plik blokady" — a one-off command. "The one command" is this repository's set phrase for `npm test` (`README.md:84` "`npm test` is the one command of all tests", `AGENTS.md`), so the reader can take it for a particular, fixed command of the repository, or put the flag into a script for good, which is what the sentence warns against ("keeping the global settings").
- Suggested fix: "to the one-off command that updates the lock file".

### Out of scope

**O1 — `AGENTS.md` (section "Pinned the-way process", the sentence on CI) — out of scope, Minor.** `AGENTS.md` says the CI result "is a check this repository requires before a merge, which the repository's owner may bypass", while the orchestrator's reading of the ruleset `main` (handoff, *Reconciliation*) lists only `deletion`, `non_fast_forward` and `pull_request`, with no required status check and no bypass actor. The change does not touch `AGENTS.md`, and `security-notes.md` states nothing about CI, so this lies outside the task; the author's report raised it too. I did not read the ruleset myself. If the sentence of `AGENTS.md` describes GitHub's settings and not the owner's practice, a red pull request can merge while agents believe it cannot.

## Against the task

- *To do* 1: met — `security-notes.md` in the root, English, first sentence says the file gathers the subject in one place and the linked files are the source of truth (`:3`; see M3 on wording).
- *To do* 2: met — mode of work with the four limits (`:7`, and that the deny rules and the guard lie outside the repository, as *Context* says; `.claude/settings.json`, the one tracked settings file, holds only the pin-check hook, so "no file here shows them" holds); GitHub account and ruleset (`:8`, matching *Context* and the reconciliation; nothing about who merges, answer 4); secret scanning with push protection (`:9`, D-412); test server read-only by agreement, D-12, link to "Agent or human" (`:10`); work repositories without the employer (`:11`, answer 3); the test of private paths (`:12`, its description matches the invariant `tracked-file-private-paths` and the test).
- *To do* 3: met — one sentence and the link (`:16`); "how they are rotated" traces to the reference's own heading "Setup, secrets and rotation".
- *To do* 4: met — every fact of the trial's conditions, stage A, result A, stage B, result B, conclusions, limits and clean-up is present and agrees with the task, dated 14 November 2026, a record of an event; the planted instructions are rendered in the author's own words, with no verbatim quote (answer 5). The added conclusion at `:29` comes from answer 1 ("zostaje na razie wyłącznie w opisie próby"), read as the description of the trial in this file — the task's item 4 calls that part "opis"; I accept that reading.
- *To do* 5: met — see the README check below; one added line at `README.md:11`.
- *Acceptance criterion*: met — no token value, the decoy token included, and no host name in `security-notes.md` or in `README.md:11` (manual read of the whole file, and the search below).
- Answers 1–6: met (1 English; 2 the mode; 3 no company; 4 nothing about who merges; 5 own words; 6 README translated in this task).
- *Out of scope*: respected — no security skill, no change of permissions or settings.
- D-362 and its invariants: `tracked-file-private-paths` passes (test below); `tracked-file-private-names` (review): the new file and the README name no note, no folder of notes, no path on the author's disk and no file of the private repository of the old loop game.
- Part map: `security-notes.md` in *Files* of `agent-workflow`; the template's rule "every file belongs to exactly one part" holds (foundation check, 0 errors). The part's sentence "directs and records the work performed on this repository" covers a page that states how agents may work and records a trial on their sessions; `build-tools`, which holds `README.md`, was the other candidate and fits no better. No finding.
- Commit and route: one author, no plan, no trust boundary, no operation that cannot be undone, no reserved choice (no language, library or store chosen).

## Checks

| Check | Command or method | Exit / result |
|---|---|---|
| Head and pin | `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | `705be3a5…`; `bfb2e109…` both — agree |
| Range | `git log --stat <base>..<head>`; `git diff <base>..<head>` | 1 commit, 3 files |
| Foundation check, whole | `python -B .the-way/elements/common/foundation_check.py` | 0 — "0 errors" (no file claimed by no part or by two) |
| Test of private paths | `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` | 0 — 1 test OK |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 — 0 errors, 143 warnings, 7 info; none on `README.md` or `security-notes.md`; the one on `foundations/part_map.md:205` (`mariusznazar/screenshots` "does not exist") predates the change |
| File sizes | `python -B .the-way/task-cycle/change_file_sizes.py <base> <head>` | 0 — `README.md` 94→96, `foundations/part_map.md` 222→223, `security-notes.md` —→36 |
| Size invariant | search of `guidelines/coding.md` for the heading `### Size of a function and a file` | no such heading — no size test; no code changed, so no finding of structure |
| README facts | script (kept: `.runs/task-cycles/security-notes/reports/review-whole-readme-compare.md`) comparing code spans, link targets, numbers outside code, fenced blocks, headings and quoted strings of `README.md` at base and head | code spans and links: only `security-notes.md` added; numbers and fenced blocks identical; six `##` headings in the same order; quoted strings: the Polish screen strings in both, English glosses added |
| README text | manual, paragraph by paragraph against `git show <base>:README.md` | same content and order; D-390 and D-413 statements unchanged in meaning; one wording finding (M5) |
| Screen strings | `git grep -F -c` in `src/browser` for "Załóż konto", "Autorzy grafiki", "Siedziba", "Wyloguj", "Konto", "Mapy", "Skraj lasu", "Wejdź", "Przejście", "Kronika", "Teren" | each found (1–12 files); "Headquarters" matches the glossary's `headquarters` |
| Link targets | `Test-Path` and `git ls-files --error-unmatch` on `AGENTS.md`, `foundations/decisions.md`, `.agents/skills/loop2-deploy/SKILL.md`, `.agents/skills/loop2-deploy/references/setup_and_secrets.md`, `tests/agent_workflow/test_tracked_file_private_paths.py`, `security-notes.md` | all exist and are tracked; `#agent-or-human` matches `## Agent or human` at `.agents/skills/loop2-deploy/SKILL.md:45` |
| Tokens, hosts, private paths | `Select-String` on `security-notes.md` for domain names, drive paths, `~/`, `[[`, URLs, token prefixes, long random strings; on both files for the author's name | no hit but the test's file name; the name only in the GitHub URL of `README.md:7`, present before the change |
| Not run | the full gate (`npm test` with no arguments) | the orchestrator's, by the handoff |

## Declined to judge

- Whether `agent-workflow` or `build-tools` is the better part for `security-notes.md` beyond the template's rules — both fit; the orchestrator chose, and the rules hold.
- Whether the ruleset and secret scanning on GitHub are as the file says today — taken from the task's *Context* and the orchestrator's `gh api` reading; I did not call GitHub.
- The content of the private trial protocol — unreachable; the task's restatement is the source, as the handoff says.

## Reaches beyond the dispatch

- `.claude/settings.json` (whole) — to test the claim at `security-notes.md:7` that no file of the repository shows the deny rules and the guard.
- `.agents/skills/loop2-deploy/SKILL.md:40-117` — the section "Agent or human", to check the anchor and that it lists the allowed reads.
- `.agents/skills/loop2-deploy/references/setup_and_secrets.md` — searched for "rotat", "GitHub secret", "private note", to check the one sentence's "how they are rotated".
- `tests/agent_workflow/test_tracked_file_private_paths.py` (whole) — to check the description at `:12`.
- `.the-way/elements/part-map/template.md` (whole) — the rules for assigning files.
- `src/browser` — searched for the screen strings the README quotes.

## Working copies and an incident

- `.runs/review-whole/` of the task's worktree held the decision indexes, the outputs of the checks and the comparison script with its output. I kept the comparison as `.runs/task-cycles/security-notes/reports/review-whole-readme-compare.md` and removed the directory; `Test-Path` shows it gone. Nothing remains.
- Incident: by a slip in one command I ran `git checkout -q b88ef2b1…` in the reviewed worktree, which detached it at the base commit for one step. I restored it at once with `git checkout -q task/security-notes`; afterwards `git rev-parse HEAD` = `705be3a5…`, `git status --short --branch` shows `## task/security-notes` and no change, and `.the-way` is still at `bfb2e109…`. No file, index entry or branch of the worktree stays changed. Every check above that reads the worktree ran before the slip (foundation check, focused test, instruction check, sizes) or after the restore (link targets, search, screen strings).

## Unread material

- Decisions: the index of my selection (sections "Code rules, exemplars and static checks", "The server: hosting, deployment, logs and failure reports", "The gate, test tools and the local start"; parts `agent-workflow`, `build-tools`, `product-foundation`; decisions D-12, D-13, D-362, D-412, D-390, D-413) lists 54 in full and 51 by heading. I read 4 whole (D-12, D-13, D-362, D-412) and the binding sentences of the other 50 in the index; I ran through the 51 headings and found none whose question bears on a Markdown page and a translation that keeps every fact. D-390 and D-413 were not opened whole: the README states their binding sentences, which the index gives, and the translation was compared with the base text.
- Invariants: `tracked-file-private-paths` and `tracked-file-private-names` read whole. The other invariants whose *Part* names `every`, `agent-workflow`, `build-tools` or `product-foundation` (about 44, among them `node-test-selection`, `focused-test-execution`, `mutation-test-selection`) were found by heading and not read: the change holds no code or test, and the README's statements they reach were compared with the base text, not with the invariants.
- `foundations/part_map.md` and `foundations/glossary.md`: read whole. The-way's own glossary at the pinned commit: not read — the file uses no word of the process that a product's glossary would qualify, beyond those of M1.
- `.agents/skills/loop2-deploy/references/setup_and_secrets.md`: searched, not read whole (only linked by the change).
- Guidelines: `guidelines/coding.md` searched for the size rule only; `guidelines/testing.md` not read — the change reaches no code or test.

## Searches not found or unclear

- `python -B .the-way/elements/common/decision_index.py --decision 12` fails with "no decision 12"; the switch takes `D-12`. The script's help does not say so.
- `guidelines/coding.md`: no heading `### Size of a function and a file`, so `whole_change.md` gives no test of size here.
- What "the operator's daily adviser" is, and whether every agent session or only some get the deny rule for work repositories: neither the task nor the repository says (M1).
