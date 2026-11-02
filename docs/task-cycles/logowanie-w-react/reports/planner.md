# Report — planner, task `logowanie-w-react`

**Status:** done with concerns.

- Plan: `.runs/task-cycles/logowanie-w-react/plan.md`, 15 slices, 23 foundation rows plus S1–S6.
- Size report: `.runs/task-cycles/logowanie-w-react/plan-size.md`, last run exit 0, every slice `fits`.
- No tracked file changed; `git status --short` is empty. No code, test or foundation entry was written.

## Open design choice or reserved choice

None. Reading the code found no entry beyond the task's rows, the projected entries and the spec, and no way the code makes costly to turn back. React, esbuild and jsdom are settled by D-03 as projected, row S6 and spec decision 1; `@types/react` and `@types/react-dom` are named by spec decision 4.

## The shape of the plan

| Slices | What | Why there |
|---|---|---|
| 1 | Memory limit, proof, guard | Spec decision 7 fixes it first; nothing on jsdom exists yet |
| 2 | Packages and the framework guard | The one slice with *Risk*; `react` in `dependencies` fails the guard from that moment |
| 3 | `dist/browser`, bundle, path literals | Atomic: the move and the 78 test files cannot stand apart |
| 4 | `about.ts`, `account-rules.ts` | Pure moves, before the port |
| 5–6 | Harness, then the 69 cases on today's page | The harness's `assert` before the first case (spec decision 7); a lost protection is seen apart from a changed requirement |
| 7 | Guards read `.tsx` | Before the first `.tsx` file |
| 8–9 | React controls, folded credits | What the card builds on |
| 10–11 | The card, then the page takes it | A fault of the page stays apart from a fault of the card |
| 12 | Look and the real-browser walk | A walk with no commit fails the mechanical check, so it goes with the stylesheet, and may fix what it finds |
| 13–15 | README and deploy skill; coding guidelines; testing guidelines | They describe what stands |

No slice leaves the tree broken for the next one, so the gate could stand between any two. Slice 11 leaves the card unstyled, which the plan says.

The safety rule of the handoff stands in the *Goal* of Slices 1, 2, 5, 6, 8, 10, 11 and 12, and Slice 9 says it stays off jsdom. Slice 15 writes the rule of spec decision 11 into `guidelines/testing.md`. The plan's form has no field for it, so *Goal* carries it.

H1 is in no slice, and no slice deploys or sends mail; *Coverage* marks it.

## Relation to the styleguide's example of the order of work

Followed in spirit: environment and library first (Slices 1–3), one screen next (Slices 10–11), its states and look after (Slice 12). The departures: no step of values, since the card adds no token (spec constraints), and the shared controls come before the screen, not after it, since the card builds on them.

## Guidelines found missing or uncertain

- `guidelines/styleguide-browser-view.md`, rule *States of shared controls*, lists the deviations of `src/browser/view/controls/button.ts` by path, and rule *The kitchen-sink page* says a new shared control goes on the page in the same change. The spec reads a React form as the same control, so neither text changes and no slice touches that file. The file does not say so. The cycle's earlier reviewer read it the same way and left it to the foundation step. Proposed: leave it, name it in the request.
- `guidelines/testing.md` holds no rule on document imitations until Slice 15; each slice's *Goal* holds the safety rule until then.

## Questions

1. **Are the rules of hooks and of effects a meaning the task settled?** To do 16 says a new meaning the document does not settle is proposed to the human at the blocked draft (WAY-172), and `.the-way/product-guidelines/coding/template.md:314` says such a choice stops the cycle. Spec decision 5 gives these rules; the task does not. Proposed answer: the spec binds where it settles more than the task (`plan/SKILL.md`, step 1), so Slice 14 writes them, and since H1 opens the request as a blocked draft anyway, the request names them for the human. Slice 14 returns anything beyond the spec as a question. No slice waits on this.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| How entries and slices run in the cycle | `.the-way/task-cycle/skill/SKILL.md:250-344`, `.the-way/task-cycle/skill/foundation_step.md`, `.the-way/task-cycle/skill/planning.md` | Who writes the plan's *Foundation entries*, and when, decides how slices cite them |
| What the foundation check holds | `.the-way/elements/common/foundation_check.py:1-66` and `:480-569` | Whether a slice boundary could fail it: an `invariant:` comment needs the entry, an invariant needs no test yet |
| How an invariant's test is seen failing | `.the-way/elements/invariants/template.md:60-90` | Checks of Slices 1, 2, 3, 9 |
| How entries and guidelines are selected for *Read* | `.the-way/elements/common/way_of_working.md:50-96`, `.the-way/product-guidelines/reading.md` | Named by `plan/SKILL.md` |
| What a guideline author may write | `.the-way/product-guidelines/testing/SKILL.md`, `.the-way/product-guidelines/coding/SKILL.md:40-43`, both `template.md` headings and *Writing the file* | Routes of To do 15, 16, 18 |
| Package versions | `.runs/task-cycles/logowanie-w-react/spec-trials/react-card/package.json` | The spec names only jsdom's version; read as data, no code of the trial |
| The cycle's state | `.runs/task-cycles/logowanie-w-react/cycle.md`, `reports/spec-revision-review.md:1-60`, `reports/spec-designer.md:86-88` | What was and was not run |
| Agent's browser check | `.claude/skills/loop2-play/SKILL.md` | Checks of Slice 12; D-254 |
| Decisions read beside the named ones | D-46, D-255, D-256 in `foundations/decisions.md`, by adjacency | No slice needs them |
| Code and tests | `scripts/build.mjs`, `scripts/kitchen-sink.mjs`, `scripts/test.py`, `scripts/test-node-file.mjs`, `Dockerfile`, `eslint.config.mjs`, `stryker.config.json`, the three guard tests, `tests/invariants/test_browser_view_framework.py`, `tests/invariants/test_icon_credits.py`, `tests/view/account-screen.test.mjs` as to its structure, `src/browser/view/app.ts`, `footer.ts`, `password-reset.ts`, `email-confirmation.ts` in parts | To name each slice's files |

## Searches not found or unclear

- To do 16, third bullet, says the table of `guidelines/coding-browser-module.md` lacks `account-screen.ts` and `password-reset.ts`. On the base both stand at `:16` and `:34`, and every `.ts` file of `src/browser/view/` and `controls/` has a row (compared by a script). So the work there is the new files and the removal of `account-screen.ts`; Slice 14 says so.
- The spec does not name the versions of React, react-dom, esbuild and the type packages. The plan takes the trial's, as a choice.
- The spec does not name where the harness's own failing cases stand, though decision 10 says they exist. The plan adds `tests/view/page-document.test.mjs`, which makes three files on jsdom where decision 9's sum says two; its limit of 13 holds.
- `plan/SKILL.md` speaks of a deterministic command writing files as one unit, with a generator in mind. The rewrite of path literals is a one-off replacement. The plan counts it that way, three patterns plus one file, and says no line it writes is edited by hand. If the orchestrator reads the rule more narrowly, Slice 3 cannot be split without leaving the tree red.
- A check of a whole stage in Slice 3 (`node --test` over the Node patterns, `python -B -m unittest discover -s tests/invariants`) stands close to the gate. `npm test -- <file>` takes one file and the rewrite touches 78, so I named them; it is not `npm test`, and it leaves out the other Python directories and the foundation check. Only the discovery form was tried, on `tests/quality`.
- Slice 2's 332,826 characters are almost all `package-lock.json`, which the script counts as read because *Change* names it. The agent need not read it whole.
- No Docker daemon answers on this machine (`reports/gate-base.log:1461-1473`), though the client is installed, so the image and `npm ci` on Linux stay unchecked locally. Slice 11 names the image's test and reports it as unchecked; H1's deployment is the first real build of the image. A failing focused run is expected there: `npm test -- <file>` fails when every test is skipped.
- `playwright-cli --version` answers 0.1.22 here, so Slice 12's walk can run.
- Whether the words „above the account forms” of D-97, D-156, D-160, D-211 and D-225 need a change once the sentence stands inside the card: the plan carries the spec's reading in row S3, and the foundation step's search may judge otherwise.
- `foundations/decisions.md` holds `dist/public` once, at `:1570`, the name of a test. No entry says that tests import from there.

## Checks

| Command | Result |
|---|---|
| `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/logowanie-w-react/plan.md` | exit 0; 15 slices `fits`, kept as `plan-size.md` |
| `python -B -m unittest discover -s tests/quality -p "test_node_test_selection.py"` | exit 0; tried only to confirm the form of the discovery command |

Nothing of the slices' *Checks* ran: the plan writes no code. The gate was not run.
