# Return step (step 11) of the change `proba-krotszych-wytycznych`

**Status:** done
**Commit:** `e1ab9c9` on `task/proba-krotszych-wytycznych` (on top of `406f0af`). It changes only `guidelines/coding.md` (+2 lines, 304 lines after). No foundation entry was written or changed.

## What the commit corrects

D-28, *Verification*, "complies": "general and four kind guidelines follow the pinned templates, retain the stated deferrals and **direct test authors to the testing guidelines**, ...". At `406f0af` the general file `guidelines/coding.md` no longer did so: the sentence that did (S102, "Zasady testowania, wzorce według poziomów i przykład jawnego czasu określa `guidelines/testing.md`.") had been removed as a repeat of D-28. The pointer from the guidelines still stood in `guidelines/coding-mail-sending.md:132` and, outside the guidelines, in `AGENTS.md:9`, but a reviewer who compares a change to `coding.md` with D-28 would look for it in `coding.md`. I corrected the file, not the decision: S102 restored word for word under `### Odłożone rodzaje i formatowanie`. Cost: 2 lines; the main change now ends at 304 lines (base 361). Correcting the decision's wording instead would be a change to an approved decision (WAY-30, WAY-172) and was not needed.

I read the other half of the same clause, "retain the stated deferrals", as the deferrals D-28's own text states (the formatting of Python and Bash, the exemplars for building, deployment, entry points, HTML and CSS): the word "stated" points at the decision, and a change to the guidelines retains them by adding none. So S104 and S105 stay removed. If the human reads "stated" as "stated in the guidelines", the remedy is to restore S104, S105 (two lines), and the cycle should say so; I name it as the one reading I chose.

## WAY-172: is any change of the file a new or changed meaning?

No. Every changed or removed sentence rests on a decision that carries the same meaning (per-sentence evidence in `author-1-report.md` and `author-1-fix-report.md`). The three places where I wrote or reworded text were checked again against the decision:

- the sentence on the dependency audit (replaces S037 and S038): D-33 (compare with `{fork-point}`, fail from severity low up on what the fork point did not report, equal lockfile passes without a request);
- the Linter sentences with tool names added (S020, S026, S030, S031): D-29, D-30, D-31 name those tools and say that changing the set takes a human-accepted change of the decision, that the review keeps the configuration to the sets and the patterns, and that the tools are local and pinned;
- S034b, reworded to name `prettier.config.mjs`: D-32 ("an option added to `prettier.config.mjs`" violates).

So no question for the human arises from the file's meaning. The classification's claim and the cycle's choices (keep S003, S051; replace S037/S038) are not entries.

## What I compared

| Entry | Result |
|---|---|
| D-28 (`foundations/decisions.md`, section `### D-28`, whole) | Body matches the file (deferrals and testing pointer stand in the decision; `guidelines/testing.md` named by it). *Verification* clause "direct test authors to the testing guidelines": no longer true of `coding.md` at `406f0af`; corrected by restoring S102 (commit above). Clause "retain the stated deferrals": read as the decision's own statement; matches. The clause "general and four kind guidelines" is old (the table lists ten kinds); it was not made untrue by this change and is left. |
| D-29 | Matches: its values (ESLint, sets, `noInlineConfig`, empty suppressions file) are only in the decision and the configuration now; the rule names D-29, the invariant `eslint-source-rules` and S020. *Verification* "complies" (a pattern added for a new directory) needs no text in the file. |
| D-30 | Matches: the rule's `Decision` names D-30; the fourteen example rules stand under `## Examples` as D-30 says ("remain examples"). |
| D-31 | Matches: S026 and S027 (the named list in the test, no `# shellcheck` directive) stay, which is what its *Verification* checks. |
| D-32 | Matches: S034b stays, the one author action its *Verification* names ("an option added to `prettier.config.mjs`"). |
| D-33 | Matches: new `### Dependency audit` sentence agrees with the decision; no value copied. |
| D-252 | Matches: its *Verification* compares code with the decision, not with the file text; the rules on logs keep all sentences that are not repeats of it. |
| D-253 | Matches: its binding sentences are in the decision; S050, S051 and S054 (author instructions) stand in the file; the browser handler is in the decision and in `guidelines/coding-browser-module.md`. Its *Rejected* says "the coding guidelines would have to give up reading never the message or the stack": S068 is kept. |
| Decision with a Rationale on the file (`foundations/decisions.md:7113`, a game's error handling) | "degraded mode, which the coding guidelines allow only where a task sets it as a decision": S056 is kept. |
| `foundations/invariants.md` | The invariants of the rule (`eslint-source-rules`, `ruff-source-rules`, `shellcheck-source-rules`, `prettier-source-format`, `introduced-npm-vulnerabilities`) say nothing about the text of `coding.md`; the only mentions of guidelines are the withdrawn `guidelines-form` and `guidelines-reference-current`. No correction. |
| `foundations/glossary.md`, `foundations/environment_facts.md` | No term and no fact states a sentence of the file. The version facts (ESLint, Ruff, ShellCheck, Prettier, npm) are the sources the decisions rest on; the removed sentences copied their values, the facts remain. No correction. |
| `foundations/part_map.md`, part `agent-workflow` | `guidelines/**` is in its files; no file was added or removed. No change. |
| Cross-references to `coding.md` (`AGENTS.md:7`, `guidelines/testing.md:9` and `:400`, `tests/http.test.mjs:4174` comment) | Valid. The comment names the rule on recording a failure; S046 stands on main. |

## Lists the record's Return step section wants

- Decisions written or changed: none
- Invariants written or changed: none
- Environment facts: none
- Glossary terms: none
- Part-map changes: none
- Projected entries: none (the task has none)
- Rows of Settlements to record: none (the task's *Settlements to record* reads `none`)

## Checks

| Command | Exit code |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (in `the worktree of the task`, at `e1ab9c9`) | 0, "0 errors" |

Not run: any `npm test` (no test reads `guidelines/coding.md`).

## Searches not found or unclear

- Whether "retain the stated deferrals" in D-28's *Verification* means stated in the decision or stated in the guidelines is unclear; I chose the first (above). Searched: the text of D-28 and the pinned template `coding/template.md`; neither says which.
- No entry of `invariants.md`, `glossary.md` or `environment_facts.md` names `guidelines/coding.md` or quotes a removed sentence (grep for `coding.md`, `guidelines/coding`, `coding guideline`): none found.
