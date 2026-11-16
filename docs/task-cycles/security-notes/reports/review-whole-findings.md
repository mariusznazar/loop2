# Findings for the fix — task `security-notes`

Source: `reports/review-whole-report.md`, the review of the whole change, first line `PASS 705be3a5f1f37a1f5ee7b2abccece9d33c6ce8e0`. No blocking finding. The five Minor findings within the task below are cut from the report in the reviewer's words; the reviewer marked none of them outside the task's scope.

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

