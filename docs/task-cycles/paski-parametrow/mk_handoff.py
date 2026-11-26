"""Build the handoff of one slice: python mk_handoff.py N BASE EXTRAFILE (EXTRAFILE may be '-')."""
import re,subprocess,sys
n=int(sys.argv[1]); base=sys.argv[2]; extra=sys.argv[3]
R='.runs/task-cycles/paski-parametrow'
plan=open(R+'/plan.md',encoding='utf-8').read()
m=re.search(r'^### Slice %d .*?(?=^### Slice |^## Coverage)'%n,plan,re.S|re.M)
section=m.group(0).rstrip()
wc=subprocess.run(['sed','-n','357,375p','.the-way/task-cycle/skill/SKILL.md'],capture_output=True,text=True,encoding='utf-8').stdout
ex=open(extra,encoding='utf-8').read() if extra!='-' else ''
head=f"""# Handoff — executor of slice {n} — task `paski-parametrow`

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator. The orchestrator's answers are never that person's approval. You ask no human; questions go back to the orchestrator in your report (status `questions`).

## Where you work and what you make
- Worktree (your working directory): `.`, branch `task/paski-parametrow`, HEAD at the start of your work `{base}`. `.the-way` is at `b502011f`, equal to the gitlink; `node_modules` is installed in the worktree.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md`, variant "a slice, or the retry of a slice" — read it whole, then `.the-way/task-cycle/change/slice.md` as it gives; read other files it names only when their step comes.
- You make slice {n} of the plan below, and only it. Commit on the branch, by path (`git add <path>…`, never `-A`, `.` or `commit -a`), in English; the commit message has the form of the repository's earlier commits (`type: :emoji: text`).
- Your directory for working copies: `.runs/executor-{n}/`.
- Report path: `.runs/task-cycles/paski-parametrow/reports/executor-{n}-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); if the harness still refuses the write, return the report whole as your answer. The report ends with **Unread material** and **Searches not found or unclear** (`none` is an answer), holds each check with its command and exit code, your own-work check as the method gives it, and names every departure from the task's answers and from the plan with its reason.
- Run no full gate (no bare `npm test`): the checks of the slice are focused (`npm test -- <one file>` runs exactly one Node or Python test file). The full gate is the orchestrator's.
- Frozen task: `.runs/task-cycles/paski-parametrow/task.md`; the plan: `.runs/task-cycles/paski-parametrow/plan.md` — read in them the passages the slice's *Read* names; `cycle.md` and the other agents' handoffs and reports are not yours unless named here.
- The foundation entries of the task are already written (commit `7308e0bd`): D-337, the new D-450, D-311, D-178, D-39, D-40, D-42, D-44, D-04 and the invariant `design-token-contrast`; read each entry your slice's *Read* names as it stands now, whole. Current ranges (the plan's line ranges of `foundations/decisions.md` are stale; these hold):
{open(R+'/ranges-after-entries.txt',encoding='utf-8').read()}
  Invariants (`foundations/invariants.md`): `browser-view-token-values` 478, `browser-view-focus-outline` 488, `design-token-contrast` 498, `design-token-sources` 508, `application-build-kitchen-sink` 518 — each to the next `##`.
- Names the entries gave the five new roles: `satiety-fill`, `chill-zone` (also the bluish frame), `safe-zone`, `scale-marker`, `warming-frame` (the amber frame; named so because `outline` is the CSS property kept for keyboard focus, D-47).
- Rulings of the orchestrator that bind you: (1) the task is the human's accepted text, so where it says the agent chooses a value of a role, you choose it and write it with its `Source:` in `src/browser/tokens.css`, naming it in the report so the request can show it for the human's veto; (2) reduced motion and the standing of game time are handled in CSS alone where possible (D-04 lets the view read the reduced-motion setting only for the scene; if your slice cannot do without reading it in TypeScript, return `questions`); (3) a killing blow while game time stands: the marker appears and stands still at its first frame, going on when time goes on; (4) the explanation on a click and the blow marker are the decisions D-450, the rest of the body row D-337.
- The tests the plan leaves failing at the base of this slice: none, save that `python -B .the-way/elements/common/foundation_check.py` prints one line about `design-token-contrast` having a changed sentence while its test is unchanged, which slice 1 resolves.

{ex}

## The plan's section of slice {n}, word for word (`plan.md`)

{section}

## Working copies — copied word for word from the cycle's skill
{wc}"""
open(R+f'/reports/executor-{n}-handoff.md','w',encoding='utf-8',newline='\n').write(head)
print(len(head))
