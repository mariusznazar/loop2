# Handoff — review of the whole change, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator, never to him. You made none of this change.

**Worktree.** `C:/Storage/repos/loop2-wt/logowanie-w-react`, branch `task/logowanie-w-react`. Work from its root. Read-only: change no tracked file.

**Method.** Read `.the-way/task-cycle/review/SKILL.md` whole, and a file it names only when the step or variant that names it comes. You review the whole change. You select your own foundation and guidelines by the parts of the change. You judge every slice that had no review of its own, and you name for each blocking finding the slice it comes from, or that it comes from none.

**Range.** `3d366c8..4634e6b`, on target `main` at 3d366c8. It holds the plan's foundation entries and 15 slices.

**Inputs.** Frozen task `.runs/task-cycles/logowanie-w-react/task.md`, whole. Spec `.runs/task-cycles/logowanie-w-react/spec.md`. Plan `.runs/task-cycles/logowanie-w-react/plan.md`, with `plan-size.md` beside it. Questions and choices of the cycle stand in `.runs/task-cycles/logowanie-w-react/cycle.md`, table *Questions and autonomous choices*: you may read that table for what was chosen; it rules on no finding of yours.

**Two questions at start.**

- Trust boundary: yes. `package-lock.json` of `build-tools`, partner npm registry. Slice 2 had a review of its own that passed. Check crafted input at that boundary as it stands at the head, and that `scripts/kitchen-sink.mjs` is unchanged, so the preview server still serves only its own directory on the developer's machine (D-76).
- Irreversible operation: no.

**Slices.** Only Slice 2 had a review of its own, so judge all the others.

| Slice | Range | Own review | Executor's report |
|---|---|---|---|
| Foundation entries | `3d366c8..e38278c` | no | `reports/foundation.md` |
| 1 memory limit | `e38278c..7c2faf8` | no | `reports/slice-1.md` |
| 2 packages | `7c2faf8..35371e0` | yes, PASS, `reports/slice-2-review.md` | `reports/slice-2.md` |
| 3 build and bundle | `35371e0..9df8f02` | no | `reports/slice-3.md` |
| 4 moves | `9df8f02..4273f70` | no | `reports/slice-4.md` |
| 5 harness | `4273f70..758ba84` | no | `reports/slice-5.md` |
| 6 the 69 cases | `758ba84..2046594` | no | `reports/slice-6.md` |
| 7 guards | `2046594..50461c1` | no | `reports/slice-7.md` |
| 8 React controls | `50461c1..cc1c1e8` | no | `reports/slice-8.md` |
| 9 credits | `cc1c1e8..0021295` | no | `reports/slice-9.md` |
| 10 card | `0021295..6cc3b88` | no | `reports/slice-10.md` |
| 11 page holds the card | `6cc3b88..98bb2a8` | no | `reports/slice-11.md` |
| 12 look and walk | `98bb2a8..8f242a2` | no | `reports/slice-12.md` |
| 13 README and skills | `8f242a2..5b61fd0` | no | `reports/slice-13.md` |
| 14 coding guidelines | `5b61fd0..f1e0923` | no | `reports/slice-14.md` |
| 15 testing guidelines | `f1e0923..4634e6b` | no | `reports/slice-15.md` |

All reports stand under `.runs/task-cycles/logowanie-w-react/`. `reports/spec-reviewer.md` and `reports/spec-revision-review.md` hold the reviews of the spec.

**What the mechanical checks passed on, for you to judge.**

- Slice 10 changed `src/browser/view/controls/react-button.tsx`, `react-text-field.tsx` and `tests/view/react-controls.test.mjs`, outside its *Change*, in its commit 4f51d7f: optional props decision 8 needed.
- Slice 8 was sent back once because its report said it had not read its *Read*. It then read it and changed nothing. It also closed the token guard's gap after a JSX closing tag, a change the orchestrator added to the plan (question Q16).
- The orchestrator added to the plan: the minified import in the framework guard (Q13, Slice 7), and the skill `loop2-play` (Q17, Slice 13).
- `reports/slice-12.md`, *Problems*: a click on „Autorzy grafiki” moves the summary from under the pointer, by 96 px. `reports/slice-12.md`, *Notes*: the comment at `src/browser/kitchen-sink/kitchen-sink.css:108` still speaks of the account screen.
- `reports/slice-14.md`: two questions it leaves for the human, on the status of DOM modules in *Files of this kind* and on a rule citing D-265.

**Spec decision 11 and the corrections around it were settled by the orchestrator after the spec's reviews and had no review. Judge them with the code.**

**Minor and out-of-scope findings of the slice reviews,** word for word from `reports/slice-2-review.md`:

Minor 1. `tests/invariants/test_browser_view_framework.py:38-47` — the guard no longer stops a component library built on React, and nothing says so. Within the task (To do 13), not blocking. Evidence, in a separate worktree: `@mui/material` put in `dependencies`, in a non-dev lock entry and in an import of `src/browser/zz-temp.tsx`: the test file exits 0. The same for `"react": "npm:preact@10.0.0"` in `dependencies`: exit 0, since the name is allowed and the value is not read.

Minor 2. `.runs/task-cycles/logowanie-w-react/reports/slice-2.md:21` — says `jsdom` brings 29 dev packages; the list next to it and the lockfile hold 32.

Out of scope there: `code_only` in the test reads an apostrophe in JSX text as a string's start; npm 12 blocks dependency install scripts unless `allowScripts` names them, the image's npm 11.19.1 only warns and runs them; `engines.node` `24.x` admits versions below jsdom's `^24.15.0`; the 48 advisories present at the fork point, which D-33 does not block.

**Docker runs on this machine,** so an image test can run. Stryker on a changed file of `simulation`, here `src/browser/sim/data/about.ts`, is the reviewer's by `guidelines/testing.md`.

**Safety rule.** A failing comparison on a rendered element can take down the human's machine (spec decisions 1, 9, 11). A file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation. No comparison on a rendered element runs by Node's `assert`.

**Report.** Write `.runs/task-cycles/logowanie-w-react/reports/whole-review.md`, its first line `PASS <sha>` or `FAIL <sha>` as your method gives, each check with its command and exit code, with coverage of every item of *To do*, every row of *Settlements to record* and every projected entry the task carries. Return that first line, a one-line check result naming what failed or did not run, and the report's path; reaches and **Searches not found or unclear** stand in the report. Do not run the product's gate.
