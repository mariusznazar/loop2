# Report — planner, task `reset-hasla`

**Status:** `done with concerns`

- Plan: `.runs/task-cycles/reset-hasla/plan.md` (11 slices, base `95de83b`)
- Final size report: `.runs/task-cycles/reset-hasla/plan-size.md`
- Check: `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/reset-hasla/plan.md`, exit 0,
  every slice fits; the largest is Slice 2 at about 118 000 estimated tokens and 5 files. Nothing else
  ran: no test and no gate, as the handoff gives. No file git tracks changed.

## Step 2: open design choice

None. Reading the code found no entry the change needs beyond the task's rows, the projected entries
and the spec, and no way the code makes costly to turn back. Checked against the code, not only the
spec's word: `session(...)` in `src/server/app.ts` wraps every request, so no list of routes outside
`paths` of `src/server/account-routes.ts` has to grow; `saveSession`'s statement can take the second
condition beside the block; `openAccountRuntime` gives `null` without settings, so the reset form can
be seen on a server without accounts. No schema step: the second answer stays no.

## The division

| Slice | Goal | Risk |
|---|---|---|
| Entries | 16 decisions changed or projected, 6 new; 7 invariants changed, 3 new, 1 in part; 2 facts | judged with Slice 1 |
| 1 | The database's reset operations | trust boundary |
| 2 | Decision 7 whole: no session from a login or registration in progress | trust boundary |
| 3 | The account policy | trust boundary |
| 4 | The two messages | trust boundary |
| 5 | The request route, one sending path | trust boundary |
| 6 | The set-password route | trust boundary |
| 7 | The browser client | none |
| 8 | The third state of the account screen, `createFormNote` | none |
| 9 | The reset form and the page's start | none |
| 10 | The kitchen-sink page and the styleguide | none |
| 11 | The table of the testing guidelines | none |

Every slice is on `cheaper`; *Choices* gives why. The plan's form ends at *Choices*; I added a section
"What H1 needs", because the handoff asks the plan to name it and the form has no place for it. The
script does not read it.

## Relation to the styleguide's order of work

Followed. No environment or library step and no new value: every stylesheet rule reads existing
tokens. Then the screens (Slices 8, 9), then their states on the kitchen-sink page (Slice 10). One
departure: the shared `createFormNote` comes with the first screen that uses it, not with the page,
since the page imports it from `controls/text-field.ts`.

## Concerns

1. **The two guideline skills do not run in a cycle as the handoff words it.** The handoff and the task
   send To do 11 and To do 14 "through" `the-way-maintain-styleguide` and
   `the-way-maintain-testing-guidelines`, but both work inside a refinement and settle with the human
   (`.the-way/product-guidelines/styleguide/SKILL.md:24-36`,
   `.the-way/product-guidelines/testing/SKILL.md:26-40`). The plan reads "through" as each skill's
   column "The cycle's author" and each template's section "Writing the file": Slices 10 and 11 read
   those passages and settle no meaning; a gap stops the slice. D-44 goes with the entries, because that
   column places entries in the foundation step and the styleguide wants a changed meaning before the
   code. Recorded under *Choices*.
2. **One agent writes about 35 entries.** The cycle gives the plan's *Foundation entries* to one fresh
   agent, and the size script measures slices only, so nothing here shows whether that agent can hold
   them; each entry also asks a search of the whole foundation. If it returns too large, a split by
   kind (decisions, then invariants and facts) needs nothing changed in the slices.
3. **The rendered look stays partly unchecked by agents.** The foundation settles no agent's way to a
   screenshot: D-87 and D-88 leave it to a person, D-45 gives the kitchen-sink page. Slices 9 and 10 look
   in a browser where the harness has one. The one form in place of two is on no page reachable without
   a configured server, and the page's samples do not use `.account-screen`, so that layout is seen
   first on the human's H1 visit. The plan says so in Slice 8 and in "What H1 needs".

## Guidelines found missing or uncertain

None is missing. Four say less than the change will make true. Each sentence stays true but narrower;
the task's *To do* names only the styleguide and the testing guidelines:

- `guidelines/coding-session-store.md`, *Callback po operacji*: says nothing of `expectPasswordHash`.
- `guidelines/coding-database-access.md`, *Stan konta w instrukcji zapisu*: names only the block, not
  the password hash.
- `guidelines/coding-mail-sending.md`, *Wzorzec rodzaju*: names only the confirmation message; the rule
  *Jedna wiadomość dla jednego odbiorcy* cites only D-158.
- `guidelines/coding-browser-module.md`: *Files of this kind* does not list `account-screen.ts`,
  `email-confirmation.ts` or `email-status.ts`, and `password-reset.ts` will join them unlisted; its
  example of shared controls names `createFormWarning` and not `createFormNote`.

## Reaches beyond the dispatch

- `.the-way/task-cycle/skill/foundation_step.md`, `planning.md` and `.the-way/task-cycle/skill/SKILL.md:236-315`:
  who writes the entries and what a slice's handoff carries, which set the plan's Foundation table and
  *Read*.
- `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `ui_check.md`: what a slice's executor does, to word
  *Checks* and the states.
- `.the-way/product-guidelines/reading.md`, the two skills above and the section "Writing the file" of
  both templates: concern 1.
- `.the-way/elements/common/way_of_working.md:45-104`: *Read*'s selection.
- `.the-way/elements/common/foundation_check.py`, its header and a search: whether entries written
  before their tests fail the check. They do not.
- `foundations/decisions.md` D-15, D-45, D-87, D-88, and `foundations/invariants.md` entries of the
  account server beyond those the task quotes: H1 and the check of states.
- `src/browser/AGENTS.md`: the instruction for work in `src/browser/`.
- `.claude/skills/loop2-deploy/SKILL.md` and `.claude/skills/loop2-deploy/references/setup_and_secrets.md`,
  section *Deploying a request head and accepting it*: what H1 needs.
- `.runs/task-cycles/reset-hasla/cycle.md`: the state of the cycle.

Ranges of *Read*: every entry's range was computed from the headings at the base, not read through.
Entries the slices name that I did not read beyond the task's quotation or at all, among them D-36,
D-38 to D-43, D-47, D-99 to D-116 and D-155 to D-163, are for the slices' agents; whether each one
belongs in its slice is for your check of *Read*. Invariants with *Part* `every` that a code change
reaches, such as `eslint-source-rules`, are carried by `guidelines/coding.md` and not named per slice.

## Searches not found or unclear

- A settled way for an agent to see a running screen: searched the decisions, the facts, the README and
  the guidelines for screenshot, Playwright, headless and running product; none found (concern 3).
- A check that an invariant with *Method* `test` has a test citing it: not found in `foundation_check.py`
  by a search of that file, so a slice that omits a mark fails no script; review has to catch it.
- A place in the plan's form for a human action: none (see *The division*).

## Questions still open

Neither blocks a slice; both have an answer I propose.

1. `.claude/skills/loop2-deploy/SKILL.md:136` will say the application sends "the address-confirmation
   message", and `:152-155` lists what an agent never does on the test server without „Wyślij odnośnik”,
   a third way to send a real message. The general ban in the same sentence still covers it. The task's
   *Context* takes the skill out of the change as far as how and where the game runs, and this is
   neither. Leave it: the skill stays slightly behind and an agent has to read the general ban. Fix it:
   about two lines in that file and in its copy under `.agents/skills/loop2-deploy/`. **Proposed:** fix
   it at the return step, no slice.
2. The four guideline files above. `.the-way/product-guidelines/reading.md` puts an extension of existing
   guidelines into the current task unless the human separates it, yet the task names none of them, and
   a coding guideline changes through `the-way-maintain-coding-guidelines`. Leave them: each sentence
   stays true and the next reader of these files sees less than the code does. Extend them: four small
   edits outside the task's *To do*. **Proposed:** name them in the request under the process remarks and
   leave the files as they are, unless the return step finds a sentence false.
